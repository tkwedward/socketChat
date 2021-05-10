"use strict";
exports.__esModule = true;
exports.GNImageContainer = void 0;
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
//@auto-fold here
function GNImageContainer(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage, imgsrc = createData.imgsrc, _classNameList = createData._classNameList;
    var _object = document.createElement("div");
    _object.draggable = false;
    _object._name = name;
    _object.GNType = GNImageContainer.name;
    _object._dataStructure = ["src"];
    _object._styleStructure = ["width", "height", "left", "top", "position"];
    _object._classNameList = _classNameList || [];
    if (_classNameList) {
        _classNameList.forEach(function (p) { return _object.classList.add(p); });
    }
    var image = document.createElement("img");
    image.src = imgsrc;
    image.style.width = "100%";
    image.draggable = false;
    image.onload = function () {
        _object.imageWidthToHeightRatio = image.width / image.height;
    };
    _object.appendChild(image);
    _object.loadFromData = function (data) {
        Object.entries(data.stylesheet).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object.style[key] = value;
        });
    };
    _object.setMovable = function () {
        var eventName = "mousedown";
        var moveEventName = "mousemove";
        var attributeX = "left";
        var attributeY = "top";
        _object.style.position = "absolute";
        _object.addEventListener("mousedown", function (e) {
            var startX = e["screenX"];
            var startY = e["screenY"];
            var objectInitialX = 0;
            var objectInitialY = 0;
            var initialLeftValue = parseInt(_object.style[attributeX].replace("px", "")) || 0;
            var initialTopValue = parseInt(_object.style[attributeY].replace("px", "")) || 0;
            var currentX;
            var currentY;
            var deltaX = 0;
            var deltaY = 0;
            var mousemoveFunction = function (e) {
                currentY = e.screenY;
                currentX = e.screenX;
                deltaX = currentX - startX;
                deltaY = currentY - startY;
                var newX = _object.style[attributeX] = initialLeftValue + deltaX + "px";
                _object.style[attributeY] = initialTopValue + deltaY + "px";
            };
            _object.addEventListener("mousemove", mousemoveFunction, false);
            function endDragEvent(e) {
                Array.from(_object.parentNode["children"]).forEach(function (p) {
                    p["style"]["pointerEvents"] = "inherit";
                });
                var endX = e["screenX"];
                var endY = e["screenY"];
                _object.removeEventListener("mousemove", mousemoveFunction);
            }
            _object.addEventListener("mouseup", function (e) {
                endDragEvent(e);
                _object.saveHTMLObjectToDatabase();
            }, false);
            _object.addEventListener("mouseout", function (e) {
                endDragEvent(e);
            }, false);
        });
    };
    _object.createDataObject = function () {
        var dataObject = GreateNoteObjectHelperFunction_1.createDummyData();
        // identity
        dataObject["GNType"] = _object.GNType;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        // data
        dataObject["data"]["src"] = imgsrc;
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = function () { return _object.createDataObject(); };
    // image special function
    _object.addCaption = function () {
        // do something
    };
    _object.setImageSize = function (sizeData) {
        var width = sizeData.width, height = sizeData.height;
        if (!height)
            height = width * 1 / _object.imageWidthToHeightRatio;
        if (!width)
            width = height * _object.imageWidthToHeightRatio;
        _object.style.width = width + "px";
        _object.style.height = height + "px";
    };
    GreateNoteObjectHelperFunction_1.superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage);
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    return _object;
} // GNImage
exports.GNImageContainer = GNImageContainer;
