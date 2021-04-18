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
var EventModel = __importStar(require("./EventModel"));
var GreatNoteSvgDataClass = __importStar(require("./GreatNoteSvgDataClass"));
console.log("Basic event model");
var basicDiv = document.createElement("div");
basicDiv.style.width = "90vw";
basicDiv.style.height = "80vh";
basicDiv.style.background = "gold";
EventModel.addMovingEvent(basicDiv);
var insideDiv1 = document.createElement("div");
insideDiv1.style.width = "10vw";
insideDiv1.style.height = "10vh";
insideDiv1.style.background = "red";
EventModel.addMovingEvent(insideDiv1);
// svg div board
var svgBoard = GreatNoteSvgDataClass.GNSvg("", "", false, false, false);
svgBoard.appendToContainer(basicDiv);
console.log(22, svgBoard.svgNode);
svgBoard.svgNode.style.background = "blue";
EventModel.addMovingEvent(svgBoard.svgNode);
basicDiv.appendChild(insideDiv1);
document.body.appendChild(basicDiv);
var svgCircle = GreatNoteSvgDataClass.GNSvgCircle("", "", false, false, false);
svgCircle.appendTo(svgBoard);
console.log(svgCircle);
EventModel.addMovingEvent(svgCircle.node);
var svgRect = GreatNoteSvgDataClass.GNSvgRect("", "", false, false, false);
svgRect.applyStyle({ "x": "200px", "y": "100px", "width": "100px", "height": "100px", "fill": "pink" });
svgRect.appendTo(svgBoard);
EventModel.addMovingEvent(svgRect.node);
