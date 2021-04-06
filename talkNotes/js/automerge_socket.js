
socket.on("connect", ()=>{
    // ask the server for initial data
    socket.emit("message", "user connected")
    socket.emit("initialDataRequest")

})

socket.on("askRootUserForInitialData", data=>{
  // sender: server ask the root user to get the initial data
  // action: root user will save the automerge document and then send back to the server the required initial data
  data.initialData = Automerge.save(newDoc)
  socket.emit("sendInitialDataToServer", data)
})

socket.on("processInitialData", data=>{
    console.log("processing initial data");
    console.log(data);
    newDoc = Automerge.load(data.initialData)
    previousDoc = newDoc
    newDoc[container].forEach((p, i)=>{
        elemIndex = searchElemIDFromIndex(newDoc[container], i)
        createCard(p, -1, elemIndex)
    })
})


// synchronize with other nodes

// server ask all clients to give it the changes. client reply the server's request for synchronization
socket.on("serverInitiatesSynchronization", ()=>{
  let changes = Automerge.getChanges(previousDoc, newDoc)
  socket.emit('clientSendChangesToServer', {
      "changeData": JSON.stringify(changes),
      "clientId": socket.id
  })
})

socket.on("deliverSynchronizeDataFromServer", changeList=>{

    // sender: the guy who initiate a synchronize data request
    // action: to synchronize the changes with the current data
    console.log("get deliverSynchronizeDataFromServer");
    previousDoc = newDoc
    changeList.forEach(change=>{
       changeJSON = JSON.parse(change.changeData)
       console.log(changeJSON);
       newDoc = Automerge.applyChanges(newDoc, changeJSON)
    })

    let newChanges = Automerge.getChanges(previousDoc, newDoc)

    elemContainer = newDoc[container]

    let batchChangeObject = {
      "ins": [],
      "del": []
    }

    newChanges.forEach(_change=>{
      console.log("Is it a delete operator? ", _change["ops"][0].action == "del");
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
    })

    // to process the insert operation

    batchChangeObject["ins"]
      .sort((a, b)=> a.position - b.position)
      .forEach(p=>{
          console.log(p);
          createCard(p.data, p.position, p.elemID)
      })

    batchChangeObject["del"].forEach(delObject=>{
          let convertedClassID = convertIdToHtmlReadableId(delObject.deleteObjectId, true)
          let delObjectHTML = document.querySelector(convertedClassID)
          delObjectHTML.remove()
      })

    // newChanges.forEach(p=>{
    //   console.log(p);
    // })

    previousDoc = newDoc
})
