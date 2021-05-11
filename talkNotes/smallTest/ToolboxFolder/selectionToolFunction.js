"use strict";
exports.__esModule = true;
exports.overallMouseDownFunction = void 0;
var toolBoxHelperFunction_1 = require("./toolBoxHelperFunction");
var selectionToolPhaseOne_1 = require("./selectionToolPhaseOne");
var selectionToolPhaseTwo_1 = require("./selectionToolPhaseTwo");
function overallMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    var _a;
    if (!mainController.toolBox.checkToolBoxItemStatus("selectionToolItemButton"))
        return;
    var offsetX, offstY, touchIsPen;
    _a = toolBoxHelperFunction_1.getOffSetXY(e), offsetX = _a[0], offstY = _a[1], touchIsPen = _a[2];
    if (!touchIsPen)
        return;
    e.preventDefault();
    if (selectionStatusObject.mode == "phaseOne") {
        selectionToolPhaseOne_1.selectionToolPhaseOneMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
        selectionStatusObject.mode = "phaseTwo";
    }
    else if (selectionStatusObject.mode == "phaseTwo") {
        selectionToolPhaseTwo_1.selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
    }
} // overallMouseDownFunction
exports.overallMouseDownFunction = overallMouseDownFunction;
