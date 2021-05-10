"use strict";
exports.__esModule = true;
exports.mousePositionTrackFunction = exports.triggerTargetObjectMovingFunction = exports.getObjectOrigianlDataArray = exports.setTargetObject = exports.createMouseTrackingController = exports.mouseResizeFunction = exports.addPasteImageEvent = void 0;
var GNImageContainer_1 = require("./GreatNoteClass/GNImageContainer");
function addPasteImageEvent(mainController) {
    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items)); // might give you mime types
        var currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        var targetDiv = currentPage.querySelector(".divLayer");
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'processImageBase64Format', true);
                    xhr.onload = function () {
                        console.log("finish processing image");
                        console.log(this.responseText);
                        var responseImgSrc = JSON.parse(this.responseText).imgsrc.replace("talkNotes/", "");
                        var newImg = GNImageContainer_1.GNImageContainer({ "name": "", arrayID: targetDiv.getAccessPointer(), saveToDatabase: true, imgsrc: "/noteImage/" + responseImgSrc + ".png" });
                        targetDiv.appendChild(newImg);
                        newImg.setImageSize({ width: 500 });
                        newImg.setMovable();
                        newImg.saveHTMLObjectToDatabase();
                        targetDiv.appendChild(newImg);
                    };
                    xhr.send(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    };
}
exports.addPasteImageEvent = addPasteImageEvent;
console.log("clipboard event");
function mouseResizeFunction(item) {
    var eventName = "mousedown";
    var moveEventName = "mousemove";
    var attributeX = "left";
    var attributeY = "top";
    return function (e) {
        var startX = e["screenX"];
        var startY = e["screenY"];
        var objectInitialX = 0;
        var objectInitialY = 0;
        var initialLeftValue = parseInt(item.style[attributeX].replace("px", "")) || 0;
        var initialTopValue = parseInt(item.style[attributeY].replace("px", "")) || 0;
        var currentX;
        var currentY;
        var deltaX = 0;
        var deltaY = 0;
        var mousemoveFunction = function (e) {
            currentY = e.screenY;
            currentX = e.screenX;
            deltaX = currentX - startX;
            deltaY = currentY - startY;
            var newX = item.style[attributeX] = initialLeftValue + deltaX + "px";
            item.style[attributeY] = initialTopValue + deltaY + "px";
        };
        item.addEventListener("mousemove", mousemoveFunction, false);
        function endDragEvent(e) {
            Array.from(item.parentNode["children"]).forEach(function (p) {
                p["style"]["pointerEvents"] = "inherit";
            });
            var endX = e["screenX"];
            var endY = e["screenY"];
            item.removeEventListener("mousemove", mousemoveFunction);
        }
        item.addEventListener("mouseup", function (e) {
            endDragEvent(e);
        }, false);
        item.addEventListener("mouseout", function (e) {
            endDragEvent(e);
        }, false);
    };
}
exports.mouseResizeFunction = mouseResizeFunction;
function createMouseTrackingController(mouseInfoDiv, testFieldDiv) {
    console.log(mouseInfoDiv, testFieldDiv);
    var clientXYDiv = document.createElement("div");
    clientXYDiv.style.display = "grid";
    clientXYDiv.style.gridTemplateColumns = "1fr 2fr";
    var clientXYDivLabel = document.createElement("span");
    var clientXYDivData = document.createElement("span");
    clientXYDivLabel.innerText = "clientXY";
    clientXYDiv.appendChild(clientXYDivLabel);
    clientXYDiv.appendChild(clientXYDivData);
    var screenXYDiv = document.createElement("div");
    screenXYDiv.style.display = "grid";
    screenXYDiv.style.gridTemplateColumns = "1fr 2fr";
    var screenXYDivLabel = document.createElement("span");
    var screenXYDivData = document.createElement("span");
    screenXYDivLabel.innerText = "screenXY";
    screenXYDiv.appendChild(screenXYDivLabel);
    screenXYDiv.appendChild(screenXYDivData);
    var offsetXYDiv = document.createElement("div");
    offsetXYDiv.style.display = "grid";
    offsetXYDiv.style.gridTemplateColumns = "1fr 2fr";
    var offsetXYDivLabel = document.createElement("span");
    var offsetXYDivData = document.createElement("span");
    offsetXYDivLabel.innerText = "offsetXY";
    offsetXYDiv.appendChild(offsetXYDivLabel);
    offsetXYDiv.appendChild(offsetXYDivData);
    var pageXYDiv = document.createElement("div");
    pageXYDiv.style.display = "grid";
    pageXYDiv.style.gridTemplateColumns = "1fr 2fr";
    var pageXYDivLabel = document.createElement("span");
    var pageXYDivData = document.createElement("span");
    pageXYDivLabel.innerText = "pageXY";
    pageXYDiv.appendChild(pageXYDivLabel);
    pageXYDiv.appendChild(pageXYDivData);
    var deltaXYDiv = document.createElement("div");
    deltaXYDiv.style.display = "grid";
    deltaXYDiv.style.gridTemplateColumns = "1fr 2fr";
    var deltaXYDivLabel = document.createElement("span");
    var deltaXYDivData = document.createElement("span");
    deltaXYDivLabel.innerText = "deltaXY";
    deltaXYDiv.appendChild(deltaXYDivLabel);
    deltaXYDiv.appendChild(deltaXYDivData);
    var targetObjectXYDiv = document.createElement("div");
    targetObjectXYDiv.style.display = "grid";
    targetObjectXYDiv.style.gridTemplateColumns = "1fr 2fr";
    var targetObjectXYDivLabel = document.createElement("span");
    var targetObjectXYDivData = document.createElement("span");
    targetObjectXYDivLabel.innerText = "targetObjXY";
    targetObjectXYDiv.appendChild(targetObjectXYDivLabel);
    targetObjectXYDiv.appendChild(targetObjectXYDivData);
    mouseInfoDiv.append(clientXYDiv, screenXYDiv, offsetXYDiv, pageXYDiv, deltaXYDiv, targetObjectXYDiv);
    return [clientXYDivData, screenXYDivData, offsetXYDivData, pageXYDivData, deltaXYDivData, targetObjectXYDivData];
}
exports.createMouseTrackingController = createMouseTrackingController;
function setTargetObject(parentDiv, targetObjectArray) {
    parentDiv.targetObjectArray = targetObjectArray;
}
exports.setTargetObject = setTargetObject;
function getObjectOrigianlDataArray(p) {
    // to get data about the object's position and parent's dimension so that you can change the position and size of the object
    return {
        originalLeft: p.offsetLeft,
        originalTop: p.offsetTop,
        parentOriginalWidth: p.parentNode.offsetWidth,
        parentOriginalHeight: p.parentNode.offsetHeight
    };
}
exports.getObjectOrigianlDataArray = getObjectOrigianlDataArray;
function triggerTargetObjectMovingFunction(p, i, deltaX, deltaY, targetObjectOriginalDataArray) {
    // p = targetObject
    // i = index
    var newTargetObjectLeft = targetObjectOriginalDataArray[i]["originalLeft"] + deltaX + "px";
    var newTargetObjectTop = targetObjectOriginalDataArray[i]["originalTop"] + deltaY + "px";
    p.style.left = newTargetObjectLeft;
    p.style.top = newTargetObjectTop;
    if (p.specialMovingEvent) {
        p.specialMovingEvent(deltaX, deltaY, targetObjectOriginalDataArray[i]["parentOriginalWidth"], targetObjectOriginalDataArray[i]["parentOriginalHeight"]);
    }
} // triggerTargetObjectMovingFunction
exports.triggerTargetObjectMovingFunction = triggerTargetObjectMovingFunction;
function mousePositionTrackFunction(mouseInfoDiv, parentDiv) {
    var _a = createMouseTrackingController(mouseInfoDiv, parentDiv), clientXYDivData = _a[0], screenXYDivData = _a[1], offsetXYDivData = _a[2], pageXYDivData = _a[3], deltaXYDivData = _a[4], targetObjectXYDivData = _a[5];
    var originalX, originalY;
    var currentX, currentY;
    var deltaX, deltaY;
    var targetObjectOriginalDataArray = [];
    parentDiv.addEventListener("mousedown", function (e) {
        parentDiv.childNodes.forEach(function (p) {
            // p.style.pointerEvents = "none"
            if (p.classList.contains("selectedObject")) {
                // p.style.pointerEvents = "all"
            }
        });
        originalX = e.pageX;
        originalY = e.pageY;
        currentX = e.pageX;
        currentY = e.pageY;
        clientXYDivData.innerText = "(" + e.clientX + ", " + e.clientY + ")";
        screenXYDivData.innerText = "(" + e.screenX + ", " + e.screenY + ")";
        offsetXYDivData.innerText = "(" + e.offsetX + ", " + e.offsetY + ")";
        pageXYDivData.innerText = "(" + e.pageX + ", " + e.pageY + ")";
        deltaX = currentX - originalX;
        deltaY = currentY - originalY;
        deltaXYDivData.innerText = "(" + deltaX + ", " + deltaY + ")";
        // original position
        targetObjectOriginalDataArray = Array.from(parentDiv.childNodes).map(function (p) { return getObjectOrigianlDataArray(p); });
        var mousemoveFunction = function (e) {
            currentX = e.pageX;
            currentY = e.pageY;
            clientXYDivData.innerText = "(" + e.clientX + ", " + e.clientY + ")";
            screenXYDivData.innerText = "(" + e.screenX + ", " + e.screenY + ")";
            offsetXYDivData.innerText = "(" + e.offsetX + ", " + e.offsetY + ")";
            pageXYDivData.innerText = "(" + e.pageX + ", " + e.pageY + ")";
            deltaX = currentX - originalX;
            deltaY = currentY - originalY;
            parentDiv.childNodes.forEach(function (p, i) {
                if (p.classList.contains("selectedObject")) {
                    triggerTargetObjectMovingFunction(p, i, deltaX, deltaY, targetObjectOriginalDataArray);
                }
            });
            deltaXYDivData.innerText = "(" + deltaX + ", " + deltaY + ")";
        }; // mousemoveFunction
        parentDiv.addEventListener("mousemove", mousemoveFunction);
        var mouseupFunction = function (e) {
            parentDiv.removeEventListener("mousemove", mousemoveFunction);
            parentDiv.removeEventListener("mouseup", mouseupFunction);
            parentDiv.childNodes.forEach(function (p) { return p.style.pointerEvents = "all"; });
        };
        parentDiv.addEventListener("mouseup", mouseupFunction);
        parentDiv.addEventListener("mouseup2", mouseupFunction);
    });
}
exports.mousePositionTrackFunction = mousePositionTrackFunction;
