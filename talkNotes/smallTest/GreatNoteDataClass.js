"use strict";
/// <reference path="newClassTest.ts" />
exports.__esModule = true;
exports.GNTemplate = exports.GNDivPage = exports.GNImage = exports.GNEditableDiv = exports.GNContainerDiv = exports.GNButton = exports.GNInputField = exports.applyStyleHelperFunction = void 0;
/** to apply stylesheet to an element */
function applyStyleHelperFunction(_object, styleList, stylechoice) {
    if (stylechoice) {
        Object.entries(styleList[stylechoice]).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object.style[key] = value;
        });
    }
    else {
        Object.entries(styleList).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object.style[key] = value;
        });
    }
}
exports.applyStyleHelperFunction = applyStyleHelperFunction;
function createDataObject(_object) {
    var dataObject = {
        "data": {},
        "array": [],
        "identity": { "dataPointer": "", "accessPointer": "" },
        "stylesheet": {}
    };
    if (_object._identity) {
        dataObject["identity"] = _object._identity;
    }
    if (_object._dataStructure) {
        _object._dataStructure.forEach(function (property) {
            dataObject["data"][property] = _object[property];
            console.log(dataObject["data"][property]);
        });
    }
    if (_object._stylesList) {
        _object._stylesList.forEach(function (property) { return dataObject["stylesheet"][property] = _object["style"][property]; });
    }
    return dataObject;
}
function GNObject() {
    var _object = new Object();
    return _object;
}
function GNInputField(_name) {
    var _object = document.createElement("input");
    _object._type = GNInputField.name;
    _object._name = _name;
    _object._dataStructure = ["value"];
    _object._styleStructure = [];
    // functions
    _object.update = function (data) { _object.value = data; };
    _object.extract = function () { return createDataObject(_object); };
    _object.save = function () {
    };
    _object.addEventListener("input", function (e) {
        var newData = _object.extract();
        // _object._parent.receiveDataFromChild(newData)
    });
    return _object;
}
exports.GNInputField = GNInputField;
function GNButton(_name, statusList, event, _parent) {
    var _object = document.createElement("button");
    _object._name = _name;
    _object._type = GNButton.name;
    _object.statusList = statusList;
    _object._dataStructure = ["innerText"];
    _object.innerHTML = statusList[0];
    _object.event = event;
    // functions
    _object.update = function (data) { _object.innerHTML = data; };
    _object.extract = function () { return createDataObject(_object); };
    // a user define array
    _object.addEventListener("click", _object.event);
    _object.addEventListener("click", function () {
        var newData = _object.extract();
        return newData;
    });
    return _object;
}
exports.GNButton = GNButton;
function GNContainerDiv(_parent) {
    var _object = document.createElement("div");
    _object.childrenList = {};
    _object._type = GNContainerDiv.name;
    _object._dataStructure = ["innerHTML", "innerText"];
    _object._styleStructure = ["background", "width"];
    // functions
    _object.appendElements = function () {
        var childrenArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childrenArray[_i] = arguments[_i];
        }
        childrenArray.forEach(function (p) {
            _object.appendChild(p);
            _object.childrenList[p._name] = p;
            p._parent = _object;
        });
        console.log(Object.entries(_object.childrenList));
    };
    _object.update = function (data) {
        Object.values(_object.childrenList).forEach(function (p) { return p.update(data[p._name]); });
    };
    _object.extract = function () { return createDataObject(_object); };
    _object.applyStyle = function (styleList) {
        applyStyleHelperFunction(_object, styleList);
    };
    return _object;
}
exports.GNContainerDiv = GNContainerDiv;
function GNEditableDiv(_name, _parent) {
    var _object = GNContainerDiv();
    _object.contentEditable = "true";
    _object._name = _name;
    _object._parent = _parent;
    _object._type = GNEditableDiv.name;
    _object._dataStructure = ["innerHTML"];
    _object.update = function (data) { _object.innerHTML = data; };
    _object.extract = function () {
        var _dummyData = createDataObject(_object);
        return _dummyData;
    };
    _object.addEventListener("input", function (e) {
        // mainController.updateData(_object)
        // console.log(Automerge.getObjectById(mainController.mainDoc, _object._identity.dataPointer))
    });
    return _object;
}
exports.GNEditableDiv = GNEditableDiv;
function GNImage(_name, imgsrc) {
    var _object = document.createElement("img");
    _object._name = _name;
    _object.src = imgsrc;
    _object._type = GNImage.name;
    _object.style.width = "60%";
    _object._dataStructure = ["src"];
    _object._styleStructure = ["width", "height"];
    _object.update = function (data) { data; };
    _object.extract = function () { return createDataObject(_object); };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    return _object;
}
exports.GNImage = GNImage;
function GNDivPage(_name, _parent) {
    var _object = GNContainerDiv();
    // internal properties
    _object._name = _name;
    _object._type = GNImage.name;
    _object.styleListArray = [];
    _object.styleListArray[0] = {
        "height": "400px",
        "background": "lightgreen"
    };
    _object.styleListArray[1] = {
        "height": "50vh",
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr 1fr",
        "gridGap": "10px",
        "gridBorder": "1px black solid"
    };
    _object.appendElements = function () {
        var childrenList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childrenList[_i] = arguments[_i];
        }
        childrenList.forEach(function (p) {
            var gridItem = document.createElement("div");
            gridItem.style.border = "1px black solid";
            gridItem.style.width = "100%";
            gridItem.style.height = "100%";
            gridItem.appendChild(p);
            _object.appendChild(gridItem);
            _object.childrenList[p._name] = p;
            p._parent = _object;
            p.classList.add("page_item_" + _object._name + "_" + p._type);
        });
        console.log(Object.entries(_object.childrenList));
    };
    /** apply the styleList to the HTMLObject */
    _object.applyStyle = function (stylechoice) {
        if (stylechoice === void 0) { stylechoice = 0; }
        Object.entries(_object.styleListArray[stylechoice]).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object.style[key] = value;
        });
    };
    _object.extract = function () { return createDataObject(_object); };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    // do something before the object is returned
    _object.applyStyle(1);
    return _object;
}
exports.GNDivPage = GNDivPage;
function GNTemplate(_name, _parent) {
    var _object = document.createElement("div");
    // internal properties
    _object._name = _name;
    _object._type = GNImage.name;
    // functions
    _object.update = function (data) { data; };
    _object.extract = function () { return 123; };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    return _object;
}
exports.GNTemplate = GNTemplate;
