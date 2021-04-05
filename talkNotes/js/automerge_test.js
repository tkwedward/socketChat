const socket = io()
let change

let newDoc = Automerge.from({cards: []})
let previousDoc = Automerge.init()
let saveString

// controller tools
let submitButton = document.querySelector(".submitData")
let updateDataButton = document.querySelector(".updateData")
let loadDataButton = document.querySelector(".loadData")
let notecardDisplay =  document.querySelector(".notecardDisplay")

function createCard(cardData){
    let cardContainer = document.createElement("div")
    cardContainer.classList.add("card")

    let card_title = document.createElement("div")
    card_title.innerText = cardData.title

    let card_longVersion = document.createElement("div")
    card_longVersion.innerText = cardData.longVersion

    let card_shortVersion = document.createElement("div")
    card_shortVersion.innerText = cardData.shortVersion

    cardContainer.append(card_title, card_longVersion, card_shortVersion)

    notecardDisplay.append(cardContainer)

    return cardContainer
}

function updateCardDisplay(newData){
    notecardDisplay.innerHTML = ""
    newData.forEach(p=>createCard(p))
}

submitButton.addEventListener("click", (e)=>{
  let title = document.querySelector(".title")
  let longVersion = document.querySelector(".longVersion")
  let shortVersion = document.querySelector(".shortVersion")

  let cardData = {
    "title": title.value,
    "longVersion": longVersion.value,
    "shortVersion": shortVersion.value
  }

  newDoc = Automerge.change(newDoc, "change value", doc=>{
    doc.cards.push(cardData)
  })

  let newCard = createCard(cardData)

})

// to broadcast the change of self doc to other
updateDataButton.addEventListener("click", (e)=>{
    // find out the change between the previous doc and the current doc
    socket.emit("clientAskServerToInitiateSynchronization")
})



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
    newDoc.cards.forEach(p=>createCard(p))
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
    console.log(changeList);

    changeList.forEach(change=>{
      if (change.id != socket.id && change.changeData != "[]"){
           newDoc = Automerge.applyChanges(newDoc, JSON.parse(change.changeData))
      }
    })
})
