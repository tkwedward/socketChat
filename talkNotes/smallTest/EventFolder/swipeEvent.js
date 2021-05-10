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
exports.swipeDetection = void 0;
var toolBoxHelperFunction_1 = require("../ToolboxFolder/toolBoxHelperFunction");
var PageViewHelperFunction = __importStar(require("../pageViewHelperFunction"));
function swipeDetection(mainController, pageContentContainer) {
    pageContentContainer.addEventListener("touchstart", function (e) {
        var _a, _b;
        var initialPointX, initialPointY;
        var finalPointX, finalPointY;
        var initialPointX2, initialPointY2, finalPointX2, finalPointY2;
        var touchIsFinger, touchIsFinger2;
        var doubleFinger = false;
        var deltaX, deltaX2;
        if (e.type == "touchstart") {
            _a = toolBoxHelperFunction_1.getTouchOffset(e, 0), initialPointX = _a[0], initialPointY = _a[1];
            touchIsFinger = e.targetTouches[0].radiusX > 10 ? true : false;
            if (e.targetTouches[1]) {
                _b = toolBoxHelperFunction_1.getTouchOffset(e, 1), initialPointX2 = _b[0], initialPointY2 = _b[1];
                touchIsFinger2 = e.targetTouches[1].radiusX > 10 ? true : false;
            }
            if (touchIsFinger && touchIsFinger2) {
                doubleFinger = true;
            }
        }
        var testInfo = document.querySelector(".testInfo");
        var initialPoint = { x1: initialPointX, y1: initialPointY, x2: initialPointX2, y2: initialPointY2 };
        testInfo["style"].width = "100%";
        if (!doubleFinger)
            return;
        e.preventDefault();
        var fullPageArray = document.querySelectorAll(".fullPage");
        var distance1, distance2, scale, deltaScale;
        var _c = [initialPointX, initialPointY, initialPointX2, initialPointY2], previousFinalPointX = _c[0], previousFinalPointY = _c[1], previousFinalPointX2 = _c[2], previousFinalPointY2 = _c[3];
        var newFinalPointsDistance, previousFinalPointsDistance;
        var scaleDirection = 1;
        var mouseMoveFunction = function (e) {
            // finalPointX =  e.targetTouches[0].pageX;
            // finalPointY =  e.targetTouches[0].pageY;
            // finalPointX2 =  e.targetTouches[1].pageX;
            // finalPointY2 =  e.targetTouches[1].pageY;
            var _a, _b, _c, _d;
            _a = toolBoxHelperFunction_1.getTouchOffset(e, 0), finalPointX = _a[0], finalPointY = _a[1];
            _b = toolBoxHelperFunction_1.getTouchOffset(e, 1), finalPointX2 = _b[0], finalPointY2 = _b[1];
            newFinalPointsDistance = toolBoxHelperFunction_1.calculateDistance(finalPointX, finalPointY, finalPointX2, finalPointY2);
            previousFinalPointsDistance = toolBoxHelperFunction_1.calculateDistance(previousFinalPointX, previousFinalPointY, previousFinalPointX2, previousFinalPointY2);
            _c = toolBoxHelperFunction_1.getTouchOffset(e, 0), previousFinalPointX = _c[0], previousFinalPointY = _c[1];
            _d = toolBoxHelperFunction_1.getTouchOffset(e, 1), previousFinalPointX2 = _d[0], previousFinalPointY2 = _d[1];
            distance1 = toolBoxHelperFunction_1.calculateDistance(initialPointX2, initialPointY2, finalPointX2, finalPointY2);
            distance2 = toolBoxHelperFunction_1.calculateDistance(initialPointX, initialPointY, finalPointX, finalPointY);
            scale = toolBoxHelperFunction_1.getScale(fullPageArray[0]);
            deltaScale = (distance1 + distance2) / 4000;
            scaleDirection = newFinalPointsDistance - previousFinalPointsDistance > 0 ? +1 : -1;
            testInfo.innerHTML = "distance_1 = " + distance1 + " <br>" + ("distance_2 = " + distance2 + " <br>") + ("totalDistance = " + (distance1 + distance2) + ", scale = " + scale + ", scale = " + (scale + scaleDirection * deltaScale) + ", direction = " + scaleDirection + ", finalX = " + finalPointX + ", finalY = " + finalPointY + ", finalX2 = " + finalPointX2 + ", finalY2 = " + finalPointY2 + ", width " + e.target.getBoundingClientRect().width);
            var pageWidth = e.target.getBoundingClientRect().width;
            // pageContentContainer["style"].transform = `scale(${scale + scaleDirection * deltaScale})`
            if (newFinalPointsDistance > 100) {
                Array.from(fullPageArray).forEach(function (p) {
                    if (pageWidth < 4000 && pageWidth > 600) {
                        p.style.transform = "scale(" + (scale + scaleDirection * deltaScale) + ")";
                    }
                    if (pageWidth > 4000)
                        p.style.transform = "scale(" + (scale + scaleDirection * deltaScale) * 0.95 + ")";
                    if (pageWidth < 600)
                        p.style.transform = "scale(" + (scale + scaleDirection * deltaScale) * 1.25 + ")";
                });
            } // newFinalPointsDistance > 100
            deltaX = finalPointX - initialPointX;
            deltaX2 = finalPointX2 - initialPointX2;
        };
        pageContentContainer.addEventListener("touchmove", mouseMoveFunction);
        // define the mouse move function
        var mouseUpFunction = function (e) {
            // remove the mouse move event
            fingerTurnPage(mainController, pageContentContainer, mouseMoveFunction, mouseUpFunction, deltaX, deltaX2, doubleFinger);
        }; // mouseUpFunction
        pageContentContainer.addEventListener("touchend", mouseUpFunction);
    });
} //swipeDetection//
exports.swipeDetection = swipeDetection;
function fingerPanPage(mainController, pageContentContainer, mouseMoveFunction, mouseUpFunction, initialPoint, finalPoint, doubleFinger) {
}
function fingerTurnPage(mainController, pageContentContainer, mouseMoveFunction, mouseUpFunction, deltaX, deltaX2, doubleFinger) {
    pageContentContainer.removeEventListener("touchmove", mouseMoveFunction);
    pageContentContainer.removeEventListener("touchend", mouseUpFunction);
    var addNewPageButton = document.querySelector(".addNewPage");
    var currentPage = mainController.pageController.currentPage;
    var pageMoveDirection = deltaX > 0 ? -1 : +1;
    var targetPageNumber = currentPage.pageNumber + pageMoveDirection;
    var turnPageBreakPoint = 300;
    if (!doubleFinger)
        return;
    if (Math.abs(deltaX) > turnPageBreakPoint || Math.abs(deltaX2) > turnPageBreakPoint) { // if larager than the page Break Point
        if (pageMoveDirection > 0) {
            if (currentPage.next.name == "endPage") {
                addNewPageButton.click();
                PageViewHelperFunction.shortNotice("newPage is added");
            }
            else { // not the end page
                mainController.pageController.goToPage(targetPageNumber);
                pageContentContainer.scrollTo(0, 0);
                // e.preventDefault()
            }
        } // if (pageMoveDirection > 0 ){
        if (pageMoveDirection < 0) {
            if (currentPage.previous.name == "startPage") {
                console.log("create a new page");
            }
            else { // not the end page
                console.log("go to the previous page");
                mainController.pageController.goToPage(targetPageNumber);
                pageContentContainer.scrollTo(0, 0);
                // e.preventDefault()
            }
        } // if (pageMoveDirection < 0)
    } // if (Math.abs(deltaX) > turnPageBreakPoint){
}
