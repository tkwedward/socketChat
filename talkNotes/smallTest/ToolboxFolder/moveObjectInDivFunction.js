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
exports.moveObejectInDivMouseDownFunction = void 0;
var settings_1 = require("../settings");
var ToolBoxHelperFunction = __importStar(require("./toolBoxHelperFunction"));
var allowedSelectionObject = [settings_1.ClassNameCollection.commentContainer];
function moveObejectInDivMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName, divSelctionObjectStatus) {
    var _a;
    var originalObjectPosition, _;
    var clickedPosition = { x: 0, y: 0 };
    if (!mainController.toolBox.checkToolBoxItemStatus("moveObjectInDivButton")) {
        return;
    }
    if (divSelctionObjectStatus.selectedObject) {
        divSelctionObjectStatus.selectedObject.classList.remove("selectedObjectInDiv");
    }
    if (allowedSelectionObject.indexOf(e.target.className) == -1)
        return;
    // if the objeect is in the allowedSelectionObject list, then
    divSelctionObjectStatus.selectedObject = e.target;
    e.target.classList.add("selectedObjectInDiv");
    // get the object's original position
    _a = ToolBoxHelperFunction.getPageXY(e), clickedPosition.x = _a[0], clickedPosition.y = _a[1], _ = _a[2];
    originalObjectPosition = { x: divSelctionObjectStatus.selectedObject.offsetLeft, y: divSelctionObjectStatus.selectedObject.offsetTop };
    // mousemove event listener
    var _moveEventFunction = function (e) {
        console.log(34, "moveEventFUnction");
        moveEventFunction(e, divSelctionObjectStatus, originalObjectPosition, clickedPosition);
    };
    // mouseup event listener
    var _upEventFunction = function (e) {
        console.log(349, "_upEventFunction");
        divLayer.removeEventListener(moveEventName, _moveEventFunction);
        divLayer.removeEventListener(upEventName, _upEventFunction);
        divSelctionObjectStatus.selectedObject.saveHTMLObjectToDatabase();
    };
    divLayer.addEventListener(moveEventName, _moveEventFunction);
    divLayer.addEventListener(upEventName, _upEventFunction);
}
exports.moveObejectInDivMouseDownFunction = moveObejectInDivMouseDownFunction;
function moveEventFunction(e, divSelctionObjectStatus, originalObjectPosition, clickedPosition) {
    var _a;
    var newPosition;
    var deltaX, deltaY;
    var _b = ToolBoxHelperFunction.getPageXY(e), offsetX = _b[0], offsetY = _b[1], _ = _b[2];
    _a = [offsetX - clickedPosition.x, offsetY - clickedPosition.y], deltaX = _a[0], deltaY = _a[1];
    divSelctionObjectStatus.selectedObject.style.position = "absolute";
    newPosition = {
        x: originalObjectPosition.x + deltaX + "px",
        y: originalObjectPosition.y + deltaY + "px"
    };
    divSelctionObjectStatus.selectedObject.style.left = newPosition.x;
    divSelctionObjectStatus.selectedObject.style.top = newPosition.y;
}
// function upEventFunction(divLayer, divSelctionObjectStatus:any, _moveEventName:string, _moveEventFunction, _upEventName:string, _upEventFunction){
//     console.log(divLayer, divSelctionObjectStatus, _moveEventName, _moveEventFunction, _upEventName, _upEventFunction)
//     divLayer.removeEventListener(_moveEventName, _moveEventFunction)
//     divLayer.removeEventListener(_upEventName, _upEventFunction)
//     // divSelctionObjectStatus.selectedObject.saveHTMLObjectToDatabase()
//
// }
function objectTranslateWithMouse(object, left, top) {
}
