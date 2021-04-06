var dataArray
let cardArrays = []
const socket = io()


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
  let newCard = createCard(cardData, 0)

})

// to broadcast the change of self doc to other
updateDataButton.addEventListener("click", (e)=>{
    // find out the change between the previous doc and the current doc
    socket.emit("_clientAskServerToInitiateSynchronization")
})


socket.on("connect", ()=>{
    // ask the server for initial data
    socket.emit("message", "user connected")
    // socket.emit("initialDataRequest")

})

socket.on("_serverInitiatesSynchronization", (data)=>{
  console.log("serverInitiatesSynchronization");
  socket.emit('_clientSendChangesToServer', {
      "changeData": cardArrays,
      "clientId": socket.id
  })
})

socket.on("_deliverSynchronizeDataFromServer", (data)=>{
  console.log(data);
})


fetch("data/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dataArray = data
    console.log(submitButton);

    for (let i = 0; i<3; i++){
      let number = Math.floor(Math.random() * data.length)

      let pkm =  data[number]
      let pkm_no = pkm["number"]
      let pkm_name = pkm["name"]
      let pkm_type = pkm["type"]
      let pkm_image = pkm["image"]

      let cardData = {
        "pkm_no": pkm_no,
        "pkm_name": pkm_name,
        "pkm_type": pkm_type,
        "pkm_image": pkm_image,
        "source_id": socket.id
      }
      console.log(cardData);
      cardArrays.push(cardData)
      let newCard = createCard(cardData, 0)
    }
  })
