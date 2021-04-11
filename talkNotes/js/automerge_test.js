
let saveString
// let container = "cards"

// controller tools
let submitButton = document.querySelector(".submitData")
let updateDataButton = document.querySelector(".updateData")
let loadDataButton = document.querySelector(".loadData")
let deleteButton = document.querySelector(".deleteData")
let deleteAtXButton = document.querySelector(".deleteAtXButton")

let notecardDisplay =  document.querySelector(".notecardDisplay")


// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true, characterData:true };

let currentProperty
let currentElementID
let currentPosition

const callback = function(mutationsList, observer) {
    console.log("=============");
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
        else if (mutation.type === 'characterData') {
            // console.log('The ' + mutation.attributeName + ' attribute was modified.');
            console.log(mutation);
            let className = mutation.target.parentNode && mutation.target.parentNode.classList
            let classNameList = []
            // let baseObject = mutation.target
            // if ()

            console.log(mutation.target, mutation.target.nodeName);

            let elemID
            let elemProperty
            let elemPosition

            if (mutation.target.parentNode){
                [elemID, elemProperty] =  traceAutomergeElemIdAndProperty(mutation.target.parentNode)

                elemPosition = searchIndexInAContainerByElemID(rootDocument.doc[cardContainer.containerObjectName], elemID)


                if (elemProperty && elemID){
                    currentElementID = elemID
                    currentProperty = elemProperty
                    currentPosition = elemPosition
                }
            }

            console.log(elemID, elemProperty);


            rootDocument.doc = Automerge.change(rootDocument.doc, doc=>{
                if (elemID && elemProperty){
                  doc[cardContainer.containerObjectName][elemPosition][elemProperty] = getElementInnerHTML(mutation.target)
                } else {
                  console.log(currentPosition, currentProperty);
                  doc[cardContainer.containerObjectName][currentPosition][currentProperty] = document.querySelector(`.${convertIdToHtmlReadableId(currentElementID)} .${currentProperty}`).innerHTML
                }


            })
            updateDataButton.click()
        }
    }
};

const observer = new MutationObserver(callback);

function createCard(cardData, position, elemIndex, automergeContainer){
    let cardContainer = document.createElement("div")
    let element_property

    let convertedClassID = convertIdToHtmlReadableId(elemIndex)
    cardContainer.classList.add("card", convertedClassID)

    let card_name = document.createElement("div")
    card_name.contentEditable = true
    element_property = "pkm_name"
    card_name.classList.add(element_property)
    card_name.setAttribute("elem_property", element_property)
    card_name.innerHTML = cardData.pkm_name

    let card_no = document.createElement("div")
    card_no.contentEditable = true
    element_property = "pkm_no"
    card_no.classList.add(element_property)
    card_no.setAttribute("elem_property", element_property)
    card_no.innerHTML = cardData.pkm_no

    let card_type = document.createElement("div")
    card_type.contentEditable = true
    element_property = "pkm_type"
    card_type.classList.add(element_property)
    card_type.setAttribute("elem_property", element_property)
    card_type.innerHTML = cardData.pkm_type

    let card_image = document.createElement("img")
    card_image.contentEditable = true
    element_property = "pkm_image"
    card_image.classList.add(element_property)
    card_image.setAttribute("elem_property", element_property)
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


    let _e = new Element(cardContainer, cardContainer)
    cardContainer.addEventListener("click", e=>{
        let color = ["blue", "red", "yellow"]
        cardContainer.style.background = color[Math.floor(Math.random() * color.length)]
        console.log(cardContainer.automergeReference);
    })


    observer.observe(cardContainer, config)

    return cardContainer
}

function deleteDataAtX(position){
    let elemID = searchElemIDFromIndex(rootDocument.doc[cardContainer.containerObjectName], position)
    let convertedClassID = convertIdToHtmlReadableId(elemID, true)
    rootDocument.doc = Automerge.change(rootDocument.doc, doc=>{
        doc[cardContainer.containerObjectName].deleteAt(position)
    })
    console.log(convertedClassID);
    document.querySelector(convertedClassID).remove()
    updateDataButton.click()
}

submitButton.addEventListener("click", (e)=>{
  let number = Math.floor(Math.random() * dataArray.length)
  let randomPosition = Math.floor(Math.random() * cardsContainerObject.length)

  let pkm =  dataArray[number]
  let pkm_no = pkm["number"]
  let pkm_name = pkm["name"]
  let pkm_type = pkm["type"]
  let pkm_image = pkm["image"]

  let cardData = {
    "pkm_no": pkm_no,
    "pkm_name": pkm_name,
    "pkm_type": pkm_type,
    "pkm_image": pkm_image,
    "pkm_array": [{
                "a": [{"b": 123}, "123"],
                "d": "123"
            }, 123, 456]
  }

  rootDocument.doc = Automerge.change(rootDocument.doc, "change value", doc=>{
    // insert a new card Data to the container
    // cardContainer.insertAt(randomPosition, cardData)
    cardsContainerObject.insertAt(doc, randomPosition, cardData)
  })

  let elemIndex = searchElemIDFromIndex(cardsContainerObject.getObjectInDoc(), randomPosition)

  let newCard = createCard(cardData, randomPosition, elemIndex)

  updateDataButton.click()
})

deleteButton.addEventListener("click", ()=>{
  rootDocument.doc = Automerge.change(rootDocument.doc, doc=>{
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

rootDocument.doc = Automerge.change(rootDocument.doc, doc=>{
    doc.girls = []
    doc.girls.push("Rashida")
})
let cards = rootDocument.doc.cards
let girls = rootDocument.doc.girls

console.log(cardsContainerObject, girlContainerObject);

function getObjectWithObjectID(objectID){

}
