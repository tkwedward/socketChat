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
exports.eraserMouseDownFunction = exports.detectCollision = void 0;
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteClass/GreatNoteSVGDataClass"));
var ToolBoxHelperFunction = __importStar(require("./toolBoxHelperFunction"));
function detectCollision(svgBoard, eraser) {
    var objectsInTheLayer = svgBoard.querySelectorAll("polyline");
    var newPoint = svgBoard.createSVGPoint();
    objectsInTheLayer.forEach(function (object) {
        var lineArray = object.soul.array().value;
        Array.from(lineArray).forEach(function (p) {
            newPoint.x = p[0];
            newPoint.y = p[1];
            if (eraser.isPointInFill(newPoint)) {
                object.deleteFromDatabase();
                return;
            }
        });
        return;
    });
}
exports.detectCollision = detectCollision;
function eraserMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("eraserItemButton")) {
        return;
    }
    var _a = ToolBoxHelperFunction.getOffSetXY(e), offsetX = _a[0], offsetY = _a[1], touchIsPen = _a[2];
    console.log(44, 44, 44, touchIsPen);
    if (!touchIsPen)
        return;
    e.preventDefault();
    if (e.type == "mousedown" || touchIsPen) {
        var cx = offsetX + "px";
        var cy = offsetY + "px";
        var r = "20px";
        var eraser_1 = GreatNoteSvgDataClass.GNSvgCircle({ name: "123", arrayID: "", insertPosition: false, dataPointer: false, saveToDatabase: false });
        eraser_1.style["cx"] = cx;
        eraser_1.style["cy"] = cy;
        eraser_1.style["r"] = r;
        // console.log(545454, e, eraser, moveEventName)
        var mouseMoveFunction_1 = function (e) {
            // t1 = t2
            // t2 = e.timeStamp
            var _a = ToolBoxHelperFunction.getOffSetXY(e), offsetX = _a[0], offsetY = _a[1], touchIsPen = _a[2];
            eraser_1.style["cx"] = offsetX;
            eraser_1.style["cy"] = offsetY;
            detectCollision(svgBoard, eraser_1);
        };
        var mouseUpFunciton_1 = function (e) {
            svgBoard.removeEventListener(moveEventName, mouseMoveFunction_1);
            svgBoard.removeEventListener(upEventName, mouseUpFunciton_1);
            eraser_1.remove();
        };
        svgBoard.addEventListener(moveEventName, mouseMoveFunction_1);
        svgBoard.addEventListener(upEventName, mouseUpFunciton_1);
        svgBoard.appendChild(eraser_1);
    } // if (e.type=="mousedown" || touchIsPen)
} // eraserMouseDownFunction
exports.eraserMouseDownFunction = eraserMouseDownFunction;
