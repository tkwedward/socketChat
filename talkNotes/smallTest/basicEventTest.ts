import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteSvgDataClass"



console.log("Basic event model")
let basicDiv = document.createElement("div")
basicDiv.style.width = "90vw"
basicDiv.style.height = "80vh"
basicDiv.style.background = "gold"
EventModel.addMovingEvent(basicDiv)

let insideDiv1 = document.createElement("div")
insideDiv1.style.width = "10vw"
insideDiv1.style.height = "10vh"
insideDiv1.style.background = "red"
EventModel.addMovingEvent(insideDiv1)

// svg div board
let svgBoard = GreatNoteSvgDataClass.GNSvg("", "", false, false, false)
svgBoard.appendToContainer(basicDiv)
console.log(22, svgBoard.svgNode)
svgBoard.svgNode.style.background = "blue"
EventModel.addMovingEvent(svgBoard.svgNode)
basicDiv.appendChild(insideDiv1)
document.body.appendChild(basicDiv)


let svgCircle = GreatNoteSvgDataClass.GNSvgCircle("", "", false, false, false)
svgCircle.appendTo(svgBoard)
console.log(svgCircle)
EventModel.addMovingEvent(svgCircle.node)

let svgRect = GreatNoteSvgDataClass.GNSvgRect("", "", false, false, false)
svgRect.applyStyle({"x": "200px", "y": "100px", "width": "100px", "height": "100px", "fill":"pink"})
svgRect.appendTo(svgBoard)
EventModel.addMovingEvent(svgRect.node)
