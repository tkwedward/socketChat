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
exports.attachEventListenerToDivLayer = exports.attachEventListenerToSvgBoard = void 0;
var ToolboxEventFunction_1 = require("../ToolboxFolder/ToolboxEventFunction");
var EraserFunction = __importStar(require("../ToolboxFolder/eraserFunction"));
var SelectionToolFunction = __importStar(require("../ToolboxFolder/selectionToolFunction"));
var AddCommentFunction = __importStar(require("../ToolboxFolder/addCommentFunction"));
var MoveObjectInDivFunction = __importStar(require("../ToolboxFolder/moveObjectInDivFunction"));
function attachEventListenerToSvgBoard(mainController, svgBoard) {
    var polylineMouseDown = {
        eventNameList: ["touchstart"],
        eventFunction: function (e) {
            ToolboxEventFunction_1.polylineMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend");
        }
    };
    var eraserMouseDownFunction = {
        eventNameList: ["touchstart"],
        eventFunction: function (e) {
            EraserFunction.eraserMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend");
        }
    };
    var selectionStatusObject = {
        mode: "selectionMode",
        polyline: null
    };
    var selectionToolMouseDownFunction = {
        eventNameList: ["touchstart"],
        eventFunction: function (e) {
            SelectionToolFunction.selectionToolMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend", selectionStatusObject);
        }
    };
    var eventArray = [polylineMouseDown, eraserMouseDownFunction, selectionToolMouseDownFunction];
    eventArray.forEach(function (toolboxEvent) {
        toolboxEvent.eventNameList.forEach(function (eventName) {
            svgBoard.addEventListener(eventName, toolboxEvent.eventFunction);
        });
    });
}
exports.attachEventListenerToSvgBoard = attachEventListenerToSvgBoard;
function attachEventListenerToDivLayer(mainController, divLayer) {
    var addCommentMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: function (e) {
            AddCommentFunction.addCommentMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup");
        }
    }; // addCommentMouseDownFunction
    var divSelctionObjectStatus = {
        "selectedObject": null
    };
    var moveObjectInDivMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: function (e) {
            MoveObjectInDivFunction.moveObejectInDivMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup", divSelctionObjectStatus);
            // AddCommentFunction.addCommentMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup")
        }
    };
    var eventArray = [addCommentMouseDownFunction, moveObjectInDivMouseDownFunction];
    // let eventArray = [addCommentMouseDownFunction]
    eventArray.forEach(function (toolboxEvent) {
        toolboxEvent.eventNameList.forEach(function (eventName) {
            divLayer.style.background = "maroon";
            divLayer.addEventListener(eventName, toolboxEvent.eventFunction);
        });
    });
}
exports.attachEventListenerToDivLayer = attachEventListenerToDivLayer;
