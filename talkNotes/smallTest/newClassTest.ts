import * as Automerge from 'automerge'
import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import * as GreatNoteControllerClass from "./GreatNoteControllerClass"
import {MainDocArrayEnum}  from "./constructInitialCondition"
import {socket} from "./socketFunction"




let GNDataStructureMapping
mainController.GNDataStructureMapping = {
    GNInputField: GreatNoteDataClass.GNInputField,
    GNContainerDiv: GreatNoteDataClass.GNContainerDiv,
    GNEditableDiv: GreatNoteDataClass.GNEditableDiv,
    GNImage: GreatNoteDataClass.GNImage,
    GNDivPage: GreatNoteDataClass.GNDivPage
}
console.log(mainController.GNDataStructureMapping)
// socket.emit("loadMainDoc")

// to create a controller
if (mainController.template){
    document.body.style.display = "grid"
    document.body.style.gridTemplateColumns = "1fr 3fr"

    let bookmarkArrayId = mainController.mainDocArray["bookmark"]

    let controllerStyleList = {
        "width": "95%",
        "height": "100vh",
        "border": "2px black solid",
        "margin": "20px auto"
    }
    //
    let controller = document.createElement("div")
    controller.classList.add("controller")
    controller.innerHTML = "king"
    controller.style.width = "95%"
    controller.style.height = "100vh"
    controller.style.border = "2px black solid"
    controller.style.margin = "20px auto"
    document.body.appendChild(controller)
    //
    let linkArrayInfo = document.createElement("div")
    linkArrayInfo.classList.add("linkArrayInfo")
    controller.appendChild(linkArrayInfo)

    let saveButton = document.createElement("button")
    saveButton.innerHTML = "save"
    saveButton.addEventListener("click", (e)=>{
        let s = mainController.saveMainDoc()
        socket.emit("saveMainDocToDisk", s)
        console.log(mainController.mainDoc)
    })
    let loadButton = document.createElement("button")
    loadButton.innerHTML = "load"
    loadButton.addEventListener("click", (e)=>{
        socket.emit("loadMainDoc")
    })
    controller.appendChild(saveButton)
    controller.appendChild(loadButton)
    //
    let contentContainer = document.createElement("div")
    contentContainer.classList.add("contentContainer")
    document.body.appendChild(contentContainer)


    function addAccessPointerAndDataPointerDiv(htmlObject){
      let containerInfo = document.createElement("div")
      containerInfo.innerHTML +=  "=========================<br>"
      let dpContainer = document.createElement("div")

      dpContainer.innerHTML += "DP:" + htmlObject.getDataPointer() + "<br>"
      dpContainer.addEventListener("click", function(){
          console.log(mainController.getObjectById(htmlObject.getDataPointer()))
      })

      let apContainer = document.createElement("div")
      apContainer.innerHTML += "AP:" + htmlObject.getAccessPointer() + "<br>"
      apContainer.addEventListener("click", function(){
          console.log(mainController.getObjectById(htmlObject.getAccessPointer()), htmlObject, htmlObject.stylesheet)
      })

      containerInfo.append(dpContainer, apContainer)
      controller.appendChild(containerInfo)
    }


    let bigFourContainer = GreatNoteDataClass.GNContainerDiv("bigFourContainer", bookmarkArrayId)
    bigFourContainer.appendTo(contentContainer)


    let clickEvent = function(_object){
        let triggerEvent = new Event("changeStatusEvent")
        let currentIndex = _object.statusList.indexOf(_object.innerText)
        let nextIndex = (currentIndex + 1) % _object.statusList.length
        _object.innerText = _object.statusList[nextIndex]
        console.log(98, _object, _object.statusList, currentIndex)

        _object.dispatchEvent(triggerEvent)
    }

    let selectObject = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer.getAccessPointer())
    selectObject.addClickEvent(clickEvent)
    selectObject.appendTo(bigFourContainer)
    addAccessPointerAndDataPointerDiv(selectObject)

    function createHTMLObject(){
      let _object = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer.getAccessPointer(), false, selectObject.getDataPointer())
      _object.addClickEvent(clickEvent)
      _object.appendTo(bigFourContainer)
      addAccessPointerAndDataPointerDiv(_object)
    }

    let number = 20
    for (let i = 0; i< number; i++){
      createHTMLObject()
    }
}





// let firstContainer
// Object.entries(mainController.mainDocArray).forEach(([arrayName, accessPointer], index) => {
//     // let container =
//     // if ()
//     let containerEditable = GreatNoteDataClass.GNEditableDiv("editable", bigFourContainer.getAccessPointer(), false, firstContainer?.getDataPointer())
//
//     if (index==0){
//       firstContainer = containerEditable
//     }
//
//
//     let containerInfo = document.createElement("div")
//     containerInfo.innerHTML +=  "=========================<br>"
//     let dpContainer = document.createElement("div")
//
//     dpContainer.innerHTML += "DP:" + containerEditable.getDataPointer() + "<br>"
//     dpContainer.addEventListener("click", function(){
//         console.log(mainController.getObjectById(containerEditable.getDataPointer()))
//     })
//
//     let apContainer = document.createElement("div")
//     apContainer.innerHTML += "AP:" + containerEditable.getAccessPointer() + "<br>"
//     apContainer.addEventListener("click", function(){
//         console.log(mainController.getObjectById(containerEditable.getAccessPointer()), containerEditable, containerEditable.stylesheet)
//     })
//
//
//
//     containerInfo.append(dpContainer, apContainer)
//     controller.appendChild(containerInfo)
//
//
//     // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
//     let styleList = {
//         "width": "95%",
//         "height": "200px",
//         "border": "2px black solid",
//         "margin": "20px auto"
//     }
//     containerEditable.applyStyle(styleList)
//     console.log(containerEditable.stylesheet)
//
//     bigFourContainer.appendChild(containerEditable)
// });
