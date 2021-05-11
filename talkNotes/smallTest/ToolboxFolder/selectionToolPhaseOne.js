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
exports.markObjectInsideSelectionArea = exports.selectionToolPhaseOneMouseDownFunction = void 0;
var toolBoxHelperFunction_1 = require("./toolBoxHelperFunction");
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteClass/GreatNoteSvgDataClass"));
var Settings = __importStar(require("../settings"));
var strokeColor = "blue";
var strokeWidth = "2px";
function selectionToolPhaseOneMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (selectionStatusObject.mode == "phaseTwo") {
        return;
    }
    var _a = toolBoxHelperFunction_1.getOffSetXY(e), originalPositionX = _a[0], originalPositionY = _a[1], touchIsPen = _a[2];
    var _b = [originalPositionX, originalPositionY], offsetX = _b[0], offsetY = _b[1];
    touchIsPen = true;
    if (e.type == "mousedown" || touchIsPen) {
        selectionStatusObject.selectedObjectArray = [];
        selectionStatusObject.counter += 1;
        var polyline_1 = GreatNoteSvgDataClass.GNSvgPolyLine({ name: "", saveToDatabase: false });
        polyline_1.style.pointerEvents = "none";
        polyline_1.soul.plot([[offsetX, offsetY]]);
        polyline_1.appendTo(svgBoard);
        polyline_1.applyStyle({ "stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none" });
        polyline_1.style["stroke-dasharray"] = "5";
        selectionStatusObject.polyline = polyline_1;
        var polylineArray_1 = polyline_1.soul.array().value;
        // calculate the ratio
        var rect = e.target.getBoundingClientRect();
        var ratio_1 = rect.width / Settings.pageSizeInfo.fullPageSize[0];
        var mouseMoveFunction_1 = function (e) {
            var _a;
            e.preventDefault();
            var offsetX, offsetY;
            if (e.type == "touchmove") {
                var rect_1 = e.target.getBoundingClientRect();
                offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect_1.left, ratio_1);
                offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect_1.top, ratio_1);
            }
            else if (e.type == "mousemove") {
                _a = [e.offsetX, e.offsetY], offsetX = _a[0], offsetY = _a[1];
            }
            polylineArray_1.push([offsetX, offsetY]);
            polyline_1.soul.plot(polylineArray_1);
        };
        var mouseUpFunction_1 = function (e) {
            e.preventDefault();
            // cleaan up
            polylineArray_1.push([originalPositionX, originalPositionY]);
            polyline_1.soul.plot(polylineArray_1);
            // cleaan up
            toolBoxHelperFunction_1.clearUpEvent(svgBoard, moveEventName, mouseMoveFunction_1);
            toolBoxHelperFunction_1.clearUpEvent(svgBoard, upEventName, mouseUpFunction_1);
            markObjectInsideSelectionArea(svgBoard, selectionStatusObject);
        };
        // define the mouse move event
        svgBoard.addEventListener(moveEventName, mouseMoveFunction_1);
        svgBoard.addEventListener(upEventName, mouseUpFunction_1);
    } // if touch is pen
} // mouseDownEventBeforeSelection
exports.selectionToolPhaseOneMouseDownFunction = selectionToolPhaseOneMouseDownFunction;
function markObjectInsideSelectionArea(svgBoard, selectionStatusObject) {
    var selectionObjectSet = new Set();
    var polyline = selectionStatusObject.polyline;
    var newPoint = svgBoard.createSVGPoint();
    svgBoard.childNodes.forEach(function (object) {
        // the object cannot  be the polyline
        if (object != polyline && object.soul) {
            var lineArray = object.soul.array().value;
            Array.from(lineArray).forEach(function (p) {
                newPoint.x = p[0];
                newPoint.y = p[1];
                if (polyline.isPointInFill(newPoint)) {
                    selectionObjectSet.add(object.getAccessPointer());
                }
                return;
            }); // Array.from(lineArray)
            return;
        } // if object!=polyline)
    }); // svgBoard.childNodes.forEach
    selectionStatusObject.selectedObjectArray = Array.from(selectionObjectSet);
    selectionStatusObject.selectedObjectArray = selectionStatusObject.selectedObjectArray.map(function (p) { return svgBoard.querySelector("polyline[accessPointer='" + p + "']"); });
    // selectionStatusObject.selectedObjectArray.push(polyline)
}
exports.markObjectInsideSelectionArea = markObjectInsideSelectionArea;
