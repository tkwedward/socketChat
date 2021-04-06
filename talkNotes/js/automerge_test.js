var dataArray
fetch("data/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dataArray = data
  })

const socket = io()

let newDoc = Automerge.from({cards: []})
let previousDoc = Automerge.init()
let saveString
let container = "cards"

// controller tools
let submitButton = document.querySelector(".submitData")
let updateDataButton = document.querySelector(".updateData")
let loadDataButton = document.querySelector(".loadData")
let deleteButton = document.querySelector(".deleteData")
let deleteAtXButton = document.querySelector(".deleteAtXButton")

let notecardDisplay =  document.querySelector(".notecardDisplay")


function createCard(cardData, position, elemIndex){
    let cardContainer = document.createElement("div")
    let convertedClassID = convertIdToHtmlReadableId(elemIndex)
    cardContainer.classList.add("card", convertedClassID)

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

    let allCards = notecardDisplay.querySelectorAll(".card")

    if (position != -1 && position>=0 && position <= allCards.length){

        let targetPosition = allCards[position]

        let targetNextSibling = targetPosition.nextSibling

        if (targetNextSibling){
          notecardDisplay.insertBefore(cardContainer, targetPosition);
        }
    }

    return cardContainer
}

function deleteDataAtX(position){
    let elemID = searchElemIDFromIndex(newDoc[container], position)
    let convertedClassID = convertIdToHtmlReadableId(elemID, true)
    newDoc = Automerge.change(newDoc, doc=>{
        doc[container].deleteAt(position)
    })
    console.log(convertedClassID);
    document.querySelector(convertedClassID).remove()
    updateDataButton.click()
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
    doc.cards.insertAt(randomPosition, cardData)
  })

  let elemIndex = searchElemIDFromIndex(newDoc[container], randomPosition)

  let newCard = createCard(cardData, randomPosition, elemIndex)

  updateDataButton.click()
})

deleteButton.addEventListener("click", ()=>{
  newDoc = Automerge.change(newDoc, doc=>{
    doc.cards = []
  })
  updateDataButton.click()
})

// to broadcast the change of self doc to other
updateDataButton.addEventListener("click", (e)=>{
    // find out the change between the previous doc and the current doc
    socket.emit("clientAskServerToInitiateSynchronization")
})

deleteAtXButton.addEventListener("click", ()=>{
    deleteDataAtX(0)
})
