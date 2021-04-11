socket.on("connect", ()=>{
    // ask the server for initial data
    socket.emit("message", "user connected")
    socket.emit("initialDataRequest")

})

socket.on("askRootUserForInitialData", data=>{
  // sender: server ask the root user to get the initial data
  // action: root user will save the automerge document and then send back to the server the required initial data
  data.initialData = Automerge.save(rootDocument.doc)
  socket.emit("sendInitialDataToServer", data)
})

socket.on("processInitialData", data=>{
    rootDocument.doc = Automerge.load(data.initialData)
    this.previousDoc = rootDocument.doc
    let _container = cardsContainerObject.getObjectInDoc()
    console.log(_container);
    _container.forEach((p, i)=>{
        elemIndex = searchElemIDFromIndex(_container, i)
        createCard(p, -1, elemIndex)
    })
})


// server ask all clients to give it the changes. client reply the server's request for synchronization
socket.on("serverInitiatesSynchronization", ()=>{
  let changes = Automerge.getChanges(this.previousDoc, rootDocument.doc)
  socket.emit('clientSendChangesToServer', {
      "changeData": JSON.stringify(changes),
      "clientId": socket.id
  })
})

socket.on("deliverSynchronizeDataFromServer", changeList=>{

    // sender: the guy who initiate a synchronize data request
    // action: to synchronize the changes with the current data
    // console.log("get deliverSynchronizeDataFromServer");
    this.previousDoc = rootDocument.doc
    changeList.forEach(change=>{
       changeJSON = JSON.parse(change.changeData)
       // console.log(changeJSON);
       rootDocument.doc = Automerge.applyChanges(rootDocument.doc, changeJSON)
    })

    let newChanges = Automerge.getChanges(this.previousDoc, rootDocument.doc)

    elemContainer = cardsContainerObject.getObjectInDoc()

    let batchChangeObject = {
      "ins": [],
      "del": [],
      "set": []
    }

    newChanges.forEach(_change=>{
      if (_change["ops"][0].action == "ins"){
          // pattern of insert = [ins, makeMap, set, ..., link]
          // get the link action
          let changeObjectId = _change["ops"][_change["ops"].length-1].key

          let position = searchIndexInAContainerByElemID(elemContainer, changeObjectId)

          // to filter out the required data to create an object
          let data = {}
          _change["ops"].filter(p=>p.action == "set")
              .forEach(p=>{
                  data[p.key] = p.value
          })

          batchChangeObject["ins"].push({
            "data": data,
            "position": position,
            "elemID": changeObjectId
          })
      }
      else if (_change["ops"][0].action == "del")
      {
          let deleteObjectId = _change["ops"][0].key

          batchChangeObject["del"].push({
            "deleteObjectId": deleteObjectId
          })
      }
      else if (_change["ops"][0].action == "set")
      {
          let changedObject = _change["ops"][0]
          let setObjectId = changedObject.obj
          let key = changedObject.key
          let value = changedObject.value

          batchChangeObject["set"].push({
            "setObjectId": setObjectId,
            "className": key,
            "setValue": value
          })
      }
    })

    // to process the insert operation
    // console.log("The batch object is: ", batchChangeObject);
    batchChangeObject["ins"]
      .sort((a, b)=> a.position - b.position)
      .forEach(p=>{
          createCard(p.data, p.position, p.elemID)
      })

    batchChangeObject["del"].forEach(delObject=>{
        let convertedClassID = convertIdToHtmlReadableId(delObject.deleteObjectId, true)
        let delObjectHTML = document.querySelector(convertedClassID)
        delObjectHTML.remove()
    })

    batchChangeObject["set"].forEach(setObject=>{
        let elemID = getElemIDFromObjectID(rootDocument.doc[cardContainer.containerObjectName], setObject.setObjectId)
        let convertedClassID = convertIdToHtmlReadableId(elemID)
        let setObjectHTML = document.querySelector(`.${convertedClassID} .${setObject.className}`)
        setObjectHTML.innerHTML = setObject.setValue
    })
    // newChanges.forEach(p=>{
    //   console.log(p);
    // })

    this.previousDoc = rootDocument.doc
})
