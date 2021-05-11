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
exports.polylineMouseDownFunction = void 0;
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteClass/GreatNoteSvgDataClass"));
var toolBoxHelperFunction_1 = require("./toolBoxHelperFunction");
function polylineMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("polylineItemButton")) {
        return;
    }
    var polylineController = mainController.attributeControllerMapping.polylineController;
    var offsetX, offsetY, touchIsPen, ratio;
    var originalWidth = mainController.pageCurrentStatus.fullPageSize[0];
    if (e.type == "touchstart") {
        var rect = e.target.getBoundingClientRect();
        ratio = rect.width / originalWidth;
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        touchIsPen = e.targetTouches[0].radiusX > 10 ? false : true;
    }
    if (e.type == "mousedown") {
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetX, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetY, ratio);
        // testInfo.innerHTML = `dist
    }
    // touchIsPen = true
    if (e.type == "mousedown" || touchIsPen) {
        e.preventDefault();
        var _a = polylineController.extract(), strokeColor = _a[0], strokeWidth = _a[1];
        var polyline_1 = GreatNoteSvgDataClass.GNSvgPolyLine({ name: "", arrayID: svgBoard.getAccessPointer(), insertPosition: false, dataPointer: false, saveToDatabase: true, specialCreationMessage: "polylineCreated" });
        polyline_1.style.pointerEvents = "none";
        var pointArray_1 = [[offsetX, offsetY]];
        //
        polyline_1.soul.plot(pointArray_1);
        polyline_1.appendTo(svgBoard);
        polyline_1.applyStyle({ "stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none" });
        //
        // define the mouse move event
        var mouseMoveFunction_1 = function (e) {
            e.preventDefault();
            var newOffsetX, newOffsetY;
            if (e.type == "touchmove") {
                var rect = e.target.getBoundingClientRect();
                newOffsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
                newOffsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
            }
            if (e.type == "mousemove") {
                newOffsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetX, ratio);
                newOffsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.offsetY, ratio);
            }
            pointArray_1.push([newOffsetX, newOffsetY]);
            polyline_1.soul.plot(pointArray_1);
        };
        svgBoard.addEventListener(moveEventName, mouseMoveFunction_1);
        //
        // define the mouse move function
        var mouseUpFunction_1 = function (e) {
            e.preventDefault();
            polyline_1.saveHTMLObjectToDatabase();
            svgBoard.removeEventListener(moveEventName, mouseMoveFunction_1);
            svgBoard.removeEventListener(upEventName, mouseUpFunction_1);
        };
        svgBoard.addEventListener(upEventName, mouseUpFunction_1);
    }
}
exports.polylineMouseDownFunction = polylineMouseDownFunction;
