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
exports.getTouchOffset = exports.getScale = exports.getPageXY = exports.getOffSetXY = exports.changeItemPosition = exports.mousePositionRatioAdjustment = exports.calculateDistance = exports.clearUpEvent = void 0;
var Settings = __importStar(require("../settings"));
function clearUpEvent(svgBoard, eventName, eventFunction) {
    svgBoard.removeEventListener(eventName, eventFunction);
}
exports.clearUpEvent = clearUpEvent;
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}
exports.calculateDistance = calculateDistance;
function mousePositionRatioAdjustment(length, ratio) {
    return length * 1 / ratio;
}
exports.mousePositionRatioAdjustment = mousePositionRatioAdjustment;
function changeItemPosition(p, originalPointArray, deltaX, deltaY) {
    var newPointArray = originalPointArray.map(function (_a, i) {
        var x = _a[0], y = _a[1];
        return [x + deltaX, y + deltaY];
    });
    p.soul.plot(newPointArray);
}
exports.changeItemPosition = changeItemPosition;
function getOffSetXY(e) {
    var offsetX, offsetY, touchIsPen;
    var rect = e.target.getBoundingClientRect();
    var ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0];
    if (e.type == "touchstart" || e.type == "touchmove") {
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        touchIsPen = e.targetTouches[0].radiusX < 10 ? true : false;
    }
    if (e.type == "mousedown" || e.type == "mousemove") {
        offsetX = mousePositionRatioAdjustment(e.offsetX, ratio);
        offsetY = mousePositionRatioAdjustment(e.offsetY, ratio);
    }
    return [offsetX, offsetY, touchIsPen];
}
exports.getOffSetXY = getOffSetXY;
function getPageXY(e) {
    var offsetX, offsetY, touchIsPen;
    var rect = e.target.getBoundingClientRect();
    var ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0];
    if (e.type == "touchstart" || e.type == "touchmove") {
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX, ratio);
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY, ratio);
        touchIsPen = e.targetTouches[0].radiusX > 10 ? false : true;
    }
    if (e.type == "mousedown" || e.type == "mousemove") {
        offsetX = e.pageX;
        offsetY = e.pageY;
    }
    return [offsetX, offsetY, touchIsPen];
}
exports.getPageXY = getPageXY;
function getScale(pageContentContainer) {
    var matrix = window.getComputedStyle(pageContentContainer).transform;
    var matrixArray = matrix.replace("matrix(", "").split(",");
    var scaleX = parseFloat(matrixArray[0]); // convert from string to number
    return scaleX;
}
exports.getScale = getScale;
function getTouchOffset(e, touchPointIndex) {
    var rect = e.target.getBoundingClientRect();
    var ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0];
    var x = mousePositionRatioAdjustment(e.targetTouches[touchPointIndex].pageX - rect.left, ratio);
    var y = mousePositionRatioAdjustment(e.targetTouches[touchPointIndex].pageY - rect.top, ratio);
    return [x, y];
}
exports.getTouchOffset = getTouchOffset;
