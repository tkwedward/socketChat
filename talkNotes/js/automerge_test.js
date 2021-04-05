var dataArray
fetch("data/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dataArray = data
  })




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

function createCard(cardData, position){

    let cardContainer = document.createElement("div")
    cardContainer.classList.add("card")

    let card_name = document.createElement("div")
    card_name.innerText = cardData.pkm_name

    let card_no = document.createElement("div")
    card_no.innerText = cardData.pkm_no

    let card_type = document.createElement("div")
    card_type.innerText = cardData.pkm_type

    let card_image = document.createElement("img")
    card_image.src = cardData.pkm_image
    card_image.style.width = "80%"

    cardContainer.style.display = "grid"
    cardContainer.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"

    cardContainer.append(card_name, card_no, card_type, card_image)

    notecardDisplay.append(cardContainer)

    return cardContainer
}

function updateCardDisplay(newData){
    notecardDisplay.innerHTML = ""
    newData.forEach(p=>createCard(p))
}

submitButton.addEventListener("click", (e)=>{
  let number = Math.floor(Math.random() * dataArray.length)
  let randomPosition = Math.floor(Math.random() * newDoc.cards.length)

  let pkm =  dataArray[number]
  let pkm_no = pkm["number"]
  let pkm_name = pkm["name"]
  let pkm_type = pkm["type"]
  let pkm_image = pkm["image"]

  let cardData = {
    "pkm_no": pkm_no,
    "pkm_name": pkm_name,
    "pkm_type": pkm_type,
    "pkm_image": pkm_image
  }

  newDoc = Automerge.change(newDoc, "change value", doc=>{
    doc.cards.push(cardData)
  })
  console.log(randomPosition);
  let newCard = createCard(cardData, randomPosition)

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
  console.log(changes);
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
       newDoc = Automerge.applyChanges(newDoc, changeJSON)
    })


    let newChanges = Automerge.getChanges(previousDoc, newDoc)
    newChanges.forEach(_change=>{
         let position = _change["ops"][0].elem-1
         let data = {}
         _change["ops"].filter(p=>p.action == "set")
             .forEach(p=>{
                 data[p.key] = p.value
             })
         createCard(data, position)
    })


    console.log(newChanges);
    previousDoc = newDoc


})
