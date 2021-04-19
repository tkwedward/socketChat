import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteSvgDataClass"
import * as ToolBoxModel from "./ToolBoxModel"
import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"

let toolBoxController = new ToolBoxModel.ToolBoxClass()


// let pageViewController = document.querySelector(".pageViewController")
// let addButton = document.querySelector(".navBara .addButton")
// let pageDiv = fetch('../templates/pageTemplate/pageDiv.ejs')
//   .then(response => response.text())
//   .then(data => {
//       let template = document.createElement("template")
//       template.innerHTML = data
//
//       var newNode = document.importNode(template.content, true)
//
//       pageViewController.appendChild(newNode)
//   });

let eventStatus = document.createElement("div")
eventStatus.style.display = "flexbox"
eventStatus.style.margin = "10px 5px"
eventStatus.style["align-items"] = "center"
eventStatus.style["justify-content"] = "center"
eventStatus.style.width = "90vw"
eventStatus.style.height = "80px"
eventStatus.style.margin = "auto"
eventStatus.style.background = "pink"
console.log(mainController.mainDocArray["bookmark"])
let currentEventNameDiv = document.createElement("div")
currentEventNameDiv.innerText = "Current Event Name: "
let currentEventFunctionDiv = document.createElement("div")
currentEventFunctionDiv.innerText = "Current Event Functions: "

let printMainDocButton = document.createElement("button")
printMainDocButton.innerText = "print mainDoc"
printMainDocButton.addEventListener("click", (e)=>{
    console.log(mainController.mainDoc["array"][1]["array"])
    console.log(mainController.mainDoc["array"][1]["array"].length)
})


let bookmarkArrayId = mainController.mainDocArray["bookmark"]
console.log(45, bookmarkArrayId)
GreatNoteDataClass.GNContainerDiv("div", bookmarkArrayId, false, false, true)

eventStatus.append(currentEventNameDiv, currentEventFunctionDiv, printMainDocButton)



toolBoxController.eventNameDiv = currentEventNameDiv
toolBoxController.eventFunctionDiv = currentEventFunctionDiv

document.body.appendChild(eventStatus)

let toolBoxHtmlObject = toolBoxController.createToolboxHtmlObject()


let bookmarkArrayId = mainController.mainDocArray["bookmark"]
console.log(30, bookmarkArrayId)

let basicDiv = document.createElement("div")
basicDiv.style.width = "90vw"
basicDiv.style.height = "80vh"
basicDiv.style.background = "gold"
// // svg div board
let svgBoard = GreatNoteSvgDataClass.GNSvg("fast", bookmarkArrayId, false, false)
svgBoard.appendToContainer(basicDiv)
toolBoxController.targetPage = svgBoard
svgBoard.svgNode.style.background = "pink"

console.log(mainController.mainDoc)

let newPolyLineItemButton = toolBoxController.createNewPolyLineItemButton(toolBoxHtmlObject)
let newEraserItemButton = toolBoxController.createEraserItemButton(toolBoxHtmlObject)

console.log(newPolyLineItemButton)


console.log(toolBoxHtmlObject)
document.body.appendChild(toolBoxHtmlObject)
document.body.appendChild(basicDiv)


// EventModel.addMovingEvent(svgBoard.svgNode)






// EventModel.addMovingEvent(basicDiv)
//
// let insideDiv1 = document.createElement("div")
// insideDiv1.style.width = "10vw"
// insideDiv1.style.height = "10vh"
// insideDiv1.style.background = "red"
// EventModel.addMovingEvent(insideDiv1)
// basicDiv.appendChild(insideDiv1)


//
//
// let svgCircle = GreatNoteSvgDataClass.GNSvgCircle("", "", false, false, false)
// svgCircle.appendTo(svgBoard)
// console.log(svgCircle)
// EventModel.addMovingEvent(svgCircle.node)
//
// let svgRect = GreatNoteSvgDataClass.GNSvgRect("", "", false, false, false)
// svgRect.applyStyle({"x": "200px", "y": "100px", "width": "100px", "height": "100px", "fill":"pink"})
// svgRect.appendTo(svgBoard)
// EventModel.addMovingEvent(svgRect.node)
