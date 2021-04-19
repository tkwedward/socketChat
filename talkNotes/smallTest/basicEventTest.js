"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var GreatNoteSvgDataClass = __importStar(require("./GreatNoteSvgDataClass"));
var ToolBoxModel = __importStar(require("./ToolBoxModel"));
var constructInitialCondition_1 = require("./constructInitialCondition");
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var toolBoxController = new ToolBoxModel.ToolBoxClass();
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
var eventStatus = document.createElement("div");
eventStatus.style.display = "flexbox";
eventStatus.style.margin = "10px 5px";
eventStatus.style["align-items"] = "center";
eventStatus.style["justify-content"] = "center";
eventStatus.style.width = "90vw";
eventStatus.style.height = "80px";
eventStatus.style.margin = "auto";
eventStatus.style.background = "pink";
console.log(constructInitialCondition_1.mainController.mainDocArray["bookmark"]);
var currentEventNameDiv = document.createElement("div");
currentEventNameDiv.innerText = "Current Event Name: ";
var currentEventFunctionDiv = document.createElement("div");
currentEventFunctionDiv.innerText = "Current Event Functions: ";
var printMainDocButton = document.createElement("button");
printMainDocButton.innerText = "print mainDoc";
printMainDocButton.addEventListener("click", function (e) {
    console.log(constructInitialCondition_1.mainController.mainDoc["array"][1]["array"]);
    console.log(constructInitialCondition_1.mainController.mainDoc["array"][1]["array"].length);
});
var bookmarkArrayId = constructInitialCondition_1.mainController.mainDocArray["bookmark"];
console.log(45, bookmarkArrayId);
GreatNoteDataClass.GNContainerDiv("div", bookmarkArrayId, false, false, true);
eventStatus.append(currentEventNameDiv, currentEventFunctionDiv, printMainDocButton);
toolBoxController.eventNameDiv = currentEventNameDiv;
toolBoxController.eventFunctionDiv = currentEventFunctionDiv;
document.body.appendChild(eventStatus);
var toolBoxHtmlObject = toolBoxController.createToolboxHtmlObject();
var bookmarkArrayId = constructInitialCondition_1.mainController.mainDocArray["bookmark"];
console.log(30, bookmarkArrayId);
var basicDiv = document.createElement("div");
basicDiv.style.width = "90vw";
basicDiv.style.height = "80vh";
basicDiv.style.background = "gold";
// // svg div board
var svgBoard = GreatNoteSvgDataClass.GNSvg("fast", bookmarkArrayId, false, false);
svgBoard.appendToContainer(basicDiv);
toolBoxController.targetPage = svgBoard;
svgBoard.svgNode.style.background = "pink";
console.log(constructInitialCondition_1.mainController.mainDoc);
var newPolyLineItemButton = toolBoxController.createNewPolyLineItemButton(toolBoxHtmlObject);
var newEraserItemButton = toolBoxController.createEraserItemButton(toolBoxHtmlObject);
console.log(newPolyLineItemButton);
console.log(toolBoxHtmlObject);
document.body.appendChild(toolBoxHtmlObject);
document.body.appendChild(basicDiv);
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
