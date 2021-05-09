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
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteClass/GreatNoteSvgDataClass"));
var toolBoxHelperFunction_1 = require("./toolBoxHelperFunction");
function polylineMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName) {
    console.log(mainController);
    if (!mainController.toolBox.checkToolBoxItemStatus("polylineItemButton")) {
        return;
    }
    var polylineController = mainController.attributeControllerMapping.polylineController;
    var offsetX, offsetY, touchIsPen, ratio;
    var originalWidth = mainController.pageCurrentStatus.fullPageSize[0];
    var testInfo = document.querySelector(".testInfo");
    if (e.type == "touchstart") {
        var rect = e.target.getBoundingClientRect();
        ratio = rect.width / originalWidth;
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        console.log(e);
        touchIsPen = e.targetTouches[0].radiusX > 10 ? false : true;
    }
    if (e.type == "mousedown") {
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetX, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetY, ratio);
        // testInfo.innerHTML = `distance_1 = ${distance1} <br>` + `distance_2 = ${distance2} <br>` + `totalDistance = ${distance1 + distance2}, scale = ${scale}, scale = ${scale + scaleDirection * deltaScale}, direction = ${scaleDirection}, finalX = ${finalPointX}, finalY = ${finalPointY}, finalX2 = ${finalPointX2}, finalY2 = ${finalPointY2}, width ${e.target.getBoundingClientRect().width}`
    }
    touchIsPen = true;
    if (e.type == "mousedown" || touchIsPen) {
        e.preventDefault();
        var _a = polylineController.extract(), strokeColor = _a[0], strokeWidth = _a[1];
        var polyline_1 = GreatNoteSvgDataClass.GNSvgPolyLine({ name: "", arrayID: svgBoard.getAccessPointer(), insertPosition: false, dataPointer: false, saveToDatabase: true, specialCreationMessage: "polylineCreated" });
        polyline_1.style.pointerEvents = "none";
        //
        polyline_1.soul.plot([[offsetX, offsetY]]);
        polyline_1.appendTo(svgBoard);
        polyline_1.applyStyle({ "stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none" });
        //
        // define the mouse move event
        var mouseMoveFunction_1 = function (e) {
            e.preventDefault();
            testInfo.innerHTML = "offsetX = " + offsetX * 1 / ratio + " <br>" + ("offsetY = " + offsetY * 1 / ratio + " <br> ratio = " + ratio);
            polylineMouseMoveFunction(e, polyline_1, ratio);
        };
        svgBoard.addEventListener(moveEventName, mouseMoveFunction_1);
        //
        // define the mouse move function
        var mouseUpFunction_1 = function (e) {
            e.preventDefault();
            polylineMouseUpFunction(e, svgBoard, polyline_1, mouseMoveFunction_1, mouseUpFunction_1, moveEventName, upEventName);
        };
        svgBoard.addEventListener(upEventName, mouseUpFunction_1);
    }
}
exports.polylineMouseDownFunction = polylineMouseDownFunction;
function polylineMouseMoveFunction(e, polyline, ratio) {
    var offsetX;
    var offsetY;
    if (e.type == "touchmove") {
        var rect = e.target.getBoundingClientRect();
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
    }
    if (e.type == "mousemove") {
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetX, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetY, ratio);
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
