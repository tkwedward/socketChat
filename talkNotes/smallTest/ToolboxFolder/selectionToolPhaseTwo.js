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
exports.selectionToolPhaseTwoMouseDownEvent = void 0;
var toolBoxHelperFunction_1 = require("./toolBoxHelperFunction");
var PopUpBoxManager = __importStar(require("../pageControllerFolder/PopUpBoxFunction"));
function selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    var _a;
    if (selectionStatusObject.mode != "phaseTwo") {
        return;
    }
    var clickedPoint = svgBoard.createSVGPoint();
    var touchIsPen;
    _a = toolBoxHelperFunction_1.getOffSetXY(e), clickedPoint.x = _a[0], clickedPoint.y = _a[1], touchIsPen = _a[2];
    if (!touchIsPen)
        return;
    e.preventDefault();
    var targetObjectOriginalDataArray = selectionStatusObject.selectedObjectArray.map(function (p) { return p.soul.array().value; });
    var selectionPolylineOriginalData = selectionStatusObject.polyline.soul.array().value;
    // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
    if (!selectionStatusObject.polyline.isPointInFill(clickedPoint)) {
        selectionStatusObject.polyline.remove();
        selectionStatusObject.polyline = null;
        selectionStatusObject.mode = "phaseOne";
        selectionStatusObject.selectedObjectArray = [];
        return;
    }
    //
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
        if (blockEvent)
            return;
        blockEvent = true;
        setTimeout(function () { blockEvent = false; }, 100);
        var _a = toolBoxHelperFunction_1.getOffSetXY(e), newX = _a[0], newY = _a[1], _ = _a.slice(2);
        var _b = [newX - clickedPoint.x, newY - clickedPoint.y], deltaX = _b[0], deltaY = _b[1];
        toolBoxHelperFunction_1.changeItemPosition(selectionStatusObject.polyline, selectionPolylineOriginalData, deltaX, deltaY);
        selectionStatusObject.selectedObjectArray.forEach(function (p, i) {
            if (p.soul) {
                toolBoxHelperFunction_1.changeItemPosition(p, targetObjectOriginalDataArray[i], deltaX, deltaY);
            }
        });
        var distance = toolBoxHelperFunction_1.calculateDistance(newX, newY, clickedPoint.x, clickedPoint.y);
        if (distance > 0.5)
            selectionStatusObject.triggerFlag = false;
    };
    var mouseUpFunction = function (e) {
        e.preventDefault();
        selectionStatusObject.triggerFlag = false;
        console.log(selectionStatusObject);
        selectionStatusObject.selectedObjectArray.forEach(function (p) { return p.saveHTMLObjectToDatabase(); });
        svgBoard.removeEventListener(moveEventName, mouseMoveFunction);
        svgBoard.removeEventListener(upEventName, mouseMoveFunction);
    };
    // define the mouse move event
    svgBoard.addEventListener(moveEventName, mouseMoveFunction);
    svgBoard.addEventListener(upEventName, mouseUpFunction);
}
exports.selectionToolPhaseTwoMouseDownEvent = selectionToolPhaseTwoMouseDownEvent;
// a popup box comes out
function addHoldTouchAction(e, svgBoard, selectionStatusObject) {
    var popUpBox = PopUpBoxManager.createPopUpBox();
    var _a = toolBoxHelperFunction_1.getPageXY(e), pageX = _a[0], pageY = _a[1], _ = _a.slice(2);
    svgBoard.parentNode.appendChild(popUpBox);
    popUpBox.style.left = (pageX + 10) + "px";
    popUpBox.style.top = (pageY + 10) + "px";
    PopUpBoxManager.addItemToCreatePopUpBox(popUpBox, "deleteAll", function () {
        selectionStatusObject.selectedObjectArray.forEach(function (p) {
            p.remove();
        });
        popUpBox.remove();
    });
}
