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
exports.selectionToolMouseDownFunction = exports.selectionToolMouseUpFunction = exports.selectionToolMouseMoveFunction = exports.markObjectInsideSelectionArea = void 0;
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteClass/GreatNoteSvgDataClass"));
var toolBoxHelperFunction_1 = require("./toolBoxHelperFunction");
var Settings = __importStar(require("../settings"));
function markObjectInsideSelectionArea(svgBoard, selectionStatusObject) {
    var selectionObjectSet = new Set();
    var polyline = selectionStatusObject.polyline;
    var newPoint = svgBoard.createSVGPoint();
    svgBoard.childNodes.forEach(function (object) {
        // console.log(121210002, object!=polyline, object.id, svgBoard.childNodes, selectionStatusObject)
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
function selectionToolMouseMoveFunction(e, selectionStatusObject, ratio) {
    var offsetX;
    var offsetY;
    if (e.type == "touchmove") {
        var rect = e.target.getBoundingClientRect();
        offsetX = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = toolBoxHelperFunction_1.mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
    }
    if (e.type == "mousemove") {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
    var newPoint = selectionStatusObject.polyline.soul.array().value;
    // console.log(newPoint)
    newPoint.push([offsetX, offsetY]);
    selectionStatusObject.polyline.soul.plot(newPoint);
}
exports.selectionToolMouseMoveFunction = selectionToolMouseMoveFunction;
function selectionToolMouseUpFunction(e, svgBoard, polyline, mouseMoveFunctionToBeRemoved, mouseUpFunctionToBeRemoved, moveEventName, upEventName) {
    // connect the last point with the first point
    var newPoint = polyline.soul.array().value;
    newPoint.push(newPoint[0]);
    polyline.soul.plot(newPoint);
    // cleaan up
    toolBoxHelperFunction_1.clearUpEvent(svgBoard, moveEventName, mouseMoveFunctionToBeRemoved);
    toolBoxHelperFunction_1.clearUpEvent(svgBoard, upEventName, mouseUpFunctionToBeRemoved);
}
exports.selectionToolMouseUpFunction = selectionToolMouseUpFunction;
function selectionToolMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (!mainController.toolBox.checkToolBoxItemStatus("selectionToolItemButton")) {
        return;
    }
    var _a = toolBoxHelperFunction_1.getOffSetXY(e), originalPositionX = _a[0], originalPositionY = _a[1], touchIsPen = _a[2];
    var _b = [originalPositionX, originalPositionY], offsetX = _b[0], offsetY = _b[1];
    touchIsPen = true;
    // if (!touchIsPen) return
    e.preventDefault();
    if (selectionStatusObject.mode == "selectionMode") {
        mouseDownEventBeforeSelection(e, mainController, svgBoard, moveEventName, upEventName, originalPositionX, originalPositionY, offsetX, offsetY, touchIsPen, selectionStatusObject);
        selectionStatusObject.mode = "selectedMode";
    }
    else if (selectionStatusObject.mode == "selectedMode") {
        mouseDownEventAfterSelection(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
    }
} // selectionToolMouseDownFunction
exports.selectionToolMouseDownFunction = selectionToolMouseDownFunction;
function mouseDownEventBeforeSelection(e, mainController, svgBoard, moveEventName, upEventName, originalPositionX, originalPositionY, offsetX, offsetY, touchIsPen, selectionStatusObject) {
    if (e.type == "mousedown" || touchIsPen) {
        selectionStatusObject.selectedObjectArray = [];
        var strokeColor = "blue";
        var strokeWidth = "2px";
        var polyline = GreatNoteSvgDataClass.GNSvgPolyLine({ name: "", saveToDatabase: false });
        polyline.style.pointerEvents = "none";
        polyline.soul.plot([[offsetX, offsetY]]);
        polyline.appendTo(svgBoard);
        polyline.applyStyle({ "stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none" });
        polyline.style["stroke-dasharray"] = "5";
        selectionStatusObject.polyline = polyline;
        var rect = e.target.getBoundingClientRect();
        var ratio_1 = rect.width / Settings.pageSizeInfo.fullPageSize[0];
        var mouseMoveFunction_1 = function (e) {
            e.preventDefault();
            var _a = toolBoxHelperFunction_1.getOffSetXY(e), newX = _a[0], newY = _a[1], _ = _a.slice(2);
            var distance = toolBoxHelperFunction_1.calculateDistance(newX, newY, offsetX, offsetY);
            // console.log(112112, selectionStatusObject.polyline.soul.array().value.length, newX, newY, distance)
            console.log("----------------");
            selectionToolMouseMoveFunction(e, selectionStatusObject, ratio_1);
        };
        var mouseUpFunction_1 = function (e) {
            e.preventDefault();
            // cleaan up
            selectionToolMouseUpFunction(e, svgBoard, selectionStatusObject.polyline, mouseMoveFunction_1, mouseUpFunction_1, moveEventName, upEventName);
            markObjectInsideSelectionArea(svgBoard, selectionStatusObject);
        };
        // define the mouse move event
        svgBoard.addEventListener(moveEventName, mouseMoveFunction_1);
        svgBoard.addEventListener(upEventName, mouseUpFunction_1);
    }
} // mouseDownEventBeforeSelection
function mouseDownEventAfterSelection(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    var _a;
    var clickedPoint = svgBoard.createSVGPoint();
    var touchIsPen;
    _a = toolBoxHelperFunction_1.getOffSetXY(e), clickedPoint.x = _a[0], clickedPoint.y = _a[1], touchIsPen = _a[2];
    if (!touchIsPen) {
        // return
    }
    e.preventDefault();
    // let targetObjectOriginalDataArray = selectionStatusObject.selectedObjectArray.map(p=>p.soul.array().value);
    // console.log(144, "lenght of targetObjectOriginalDataArray", targetObjectOriginalDataArray.length)
    var selectionPolylineOriginalData = selectionStatusObject.polyline.soul.array().value;
    // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
    if (!selectionStatusObject.polyline.isPointInFill(clickedPoint)) {
        selectionStatusObject.polyline.remove();
        selectionStatusObject.polyline = null;
        selectionStatusObject.mode = "selectionMode";
        return;
    }
    selectionStatusObject.triggerFlag = true;
    setTimeout(function () {
        if (selectionStatusObject.triggerFlag) {
            // if hold, then create popup box
            addHoldTouchAction(e, svgBoard, selectionStatusObject);
        }
        else {
            console.log("I will not trigger.");
        }
    }, 1000);
    var blockEvent = false;
    var mouseMoveFunction = function (e) {
        e.preventDefault();
        if (!selectionStatusObject.polyline)
            return;
        // console.log(selectionStatusObject.polyline)
        // return
        // if (blockEvent) return
        // blockEvent = true
        // setTimeout(()=>{blockEvent = false}, 100)
        var _a = toolBoxHelperFunction_1.getOffSetXY(e), newX = _a[0], newY = _a[1], _ = _a.slice(2);
        var _b = [newX - clickedPoint.x, newY - clickedPoint.y], deltaX = _b[0], deltaY = _b[1];
        console.log(179, "newX, newY", newX, newY, "deltaX, Y; ", deltaX, deltaY);
        // selectionStatusObject.polyline.soul.plot(selectionStatusObject.polyline.soul.array().value.map(p=> [p[0] + deltaX, p[1] + deltaY]))
        toolBoxHelperFunction_1.changeItemPosition(selectionStatusObject.polyline, selectionPolylineOriginalData, deltaX, deltaY);
        // selectionStatusObject.selectedObjectArray.forEach((p, i)=>{
        //   if (p.soul){
        //       changeItemPosition(p, targetObjectOriginalDataArray[i], deltaX, deltaY)
        //   }
        //
        //   // try {
        //   //     // p is the pint arrays
        //   //     // targetObjectOriginalDataArray is the original positionss of the points of the polylines
        //   //
        //   // } catch {
        //   //     // console.log("some error", targetf12ObjectOriginalDataArray)
        //   //     return
        //   // }
        //
        //
        //
        // })
        var distance = toolBoxHelperFunction_1.calculateDistance(newX, newY, clickedPoint.x, clickedPoint.y);
        if (distance > 0.5)
            selectionStatusObject.triggerFlag = false;
    };
    var mouseUpFunction = function (e) {
        e.preventDefault();
        selectionStatusObject.triggerFlag = false;
        selectionToolMouseUpFunction(e, svgBoard, selectionStatusObject.polyline, mouseMoveFunction, mouseUpFunction, moveEventName, upEventName);
        svgBoard.removeEventListener(mouseMoveFunction, mouseMoveFunction);
    };
    // define the mouse move event
    svgBoard.addEventListener(moveEventName, mouseMoveFunction);
    // svgBoard.addEventListener(upEventName, mouseUpFunction)
}
// a popup box comes out
function addHoldTouchAction(e, svgBoard, selectionStatusObject) {
    // let popUpBox = PopUpBoxManager.createPopUpBox()
    // let [pageX, pageY, ..._] = getPageXY(e)
    // svgBoard.parentNode.appendChild(popUpBox)
    // popUpBox.style.left = (pageX + 10) + "px"
    // popUpBox.style.top = (pageY + 10) + "px"
    //
    // PopUpBoxManager.addItemToCreatePopUpBox(popUpBox, "deleteAll", function(){
    //     selectionStatusObject.selectedObjectArray.forEach(p=>{
    //         p.remove()
    //     })
    //     popUpBox.remove()
    // })
}
