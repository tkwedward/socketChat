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
exports.polylineMouseUpFunction = exports.polylineMouseMoveFunction = exports.polylineMouseDownFunction = void 0;
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteSvgDataClass"));
function polylineMouseDownFunction(e, svgBoard, polylineController, moveEventName, upEventName) {
    e.preventDefault();
    var _a = polylineController.extract(), strokeColor = _a[0], strokeWidth = _a[1];
    var polyline = GreatNoteSvgDataClass.GNSvgPolyLine({ name: "", arrayID: svgBoard.getAccessPointer(), insertPosition: false, dataPointer: false, saveToDatabase: true, specialCreationMessage: "polylineCreated" });
    polyline.style.pointerEvents = "none";
    var offsetX;
    var offsetY;
    if (e.type == "touchstart") {
        var rect = e.target.getBoundingClientRect();
        offsetX = e.targetTouches[0].pageX - rect.left;
        offsetY = e.targetTouches[0].pageY - rect.top;
    }
    if (e.type == "mousedown") {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
    console.log(offsetX, offsetY);
    //
    polyline.soul.plot([[offsetX, offsetY]]);
    polyline.appendTo(svgBoard);
    polyline.applyStyle({ "stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none" });
    //
    // define the mouse move event
    var mouseMoveFunction = function (e) {
        e.preventDefault();
        polylineMouseMoveFunction(e, polyline);
    };
    svgBoard.addEventListener(moveEventName, mouseMoveFunction);
    //
    // define the mouse move function
    var mouseUpFunction = function (e) {
        e.preventDefault();
        polylineMouseUpFunction(e, svgBoard, polyline, mouseMoveFunction, mouseUpFunction, moveEventName, upEventName);
    };
    svgBoard.addEventListener(upEventName, mouseUpFunction);
}
exports.polylineMouseDownFunction = polylineMouseDownFunction;
function polylineMouseMoveFunction(e, polyline) {
    var offsetX;
    var offsetY;
    if (e.type == "touchmove") {
        var rect = e.target.getBoundingClientRect();
        offsetX = e.targetTouches[0].pageX - rect.left;
        offsetY = e.targetTouches[0].pageY - rect.top;
    }
    if (e.type == "mousemove") {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
    var newPoint = polyline.soul.array().value;
    newPoint.push([offsetX, offsetY]);
    polyline.soul.plot(newPoint);
}
exports.polylineMouseMoveFunction = polylineMouseMoveFunction;
function polylineMouseUpFunction(e, svgBoard, polyline, mouseMoveFunctionToBeRemoved, mouseUpFunctionToBeRemoved, moveEventName, upEventName) {
    console.log(145, "save to database", new Date());
    polyline.saveHTMLObjectToDatabase();
    svgBoard.removeEventListener(moveEventName, mouseMoveFunctionToBeRemoved);
    svgBoard.removeEventListener(upEventName, mouseUpFunctionToBeRemoved);
}
exports.polylineMouseUpFunction = polylineMouseUpFunction;
