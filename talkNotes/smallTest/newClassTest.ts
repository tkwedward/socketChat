import * as Automerge from 'automerge'
import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import * as GreatNoteControllerClass from "./GreatNoteControllerClass"
import {MainDocArrayEnum}  from "./constructInitialCondition"


// export var mainController:DatabaseCode.MainControllerInterface
// mainController = new DatabaseCode.MainController()


var dataArray
fetch("../data/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dataArray = data
})

function createPokemonContainer(){
    let chosenPKM = dataArray[Math.random()*dataArray.length]
    let pkmImgSrc = chosenPKM.image
    let pkmName = chosenPKM.name
    let pkmType = chosenPKM.type
    let pkmNumber = chosenPKM.number

    let pkmContainer = GreatNoteDataClass.GNContainerDiv()

    let pkmNameContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer)
    pkmNameContainer.innerHTML = pkmName

    let pkmTypeContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer)
    pkmTypeContainer.innerHTML = pkmType

    let pkmNumberContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer)
    pkmNumberContainer.innerHTML = pkmNumber
    let pkmImage = GreatNoteDataClass.GNImage("image", pkmImgSrc)

    pkmContainer.appendElements(pkmNameContainer, pkmTypeContainer, pkmNumberContainer)
}

// to create a controller
document.body.style.display = "grid"
document.body.style.gridTemplateColumns = "1fr 3fr"

let bookmarkArrayId = mainController.mainDocArray["bookmark"]
let controller = GreatNoteDataClass.GNContainerDiv("controller", bookmarkArrayId)
let controllerStyleList = {
    "width": "95%",
    "height": "100vh",
    "border": "2px black solid",
    "margin": "20px auto"
}
controller.innerHTML = "king"
controller.applyStyle(controllerStyleList)
document.body.appendChild(controller)

let linkArrayInfo = document.createElement("div")
linkArrayInfo.classList.add("linkArrayInfo")
controller.appendChild(linkArrayInfo)

let firstContainer


let bigFourContainer = GreatNoteDataClass.GNContainerDiv("bigFourContainer", bookmarkArrayId)
console.log(63,bigFourContainer.getAccessPointer )
document.body.appendChild(bigFourContainer)
Object.entries(mainController.mainDocArray).forEach(([arrayName, accessPointer], index) => {
    // let container =
    console.log(74, firstContainer?.getDataPointer())
    // if ()
    let containerEditable = GreatNoteDataClass.GNEditableDiv("editable", bigFourContainer.getAccessPointer(), false, firstContainer?.getDataPointer())

    if (index==0){
      firstContainer = containerEditable
    }


    let containerInfo = document.createElement("div")
    containerInfo.innerHTML +=  "=========================<br>"
    containerInfo.innerHTML += "DP:" + containerEditable.getDataPointer() + "<br>"
    containerInfo.innerHTML += "AP:" + containerEditable.getAccessPointer() + "<br>"


    controller.appendChild(containerInfo)


    // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
    let styleList = {
        "width": "95%",
        "height": "200px",
        "border": "2px black solid",
        "margin": "20px auto"
    }
    containerEditable.applyStyle(styleList)

    bigFourContainer.appendChild(containerEditable)

});
