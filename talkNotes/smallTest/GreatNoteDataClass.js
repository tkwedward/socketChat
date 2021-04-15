"use strict";
exports.__esModule = true;
exports.GNTemplate = exports.GNDivPage = exports.GNImage = exports.GNContainerDiv = exports.GNEditableDiv = exports.GNButton = exports.GNInputField = exports.applyStyleHelperFunction = void 0;
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
function GNInputField(_name) {
    var _object = document.createElement("input");
    _object._type = GNInputField.name;
    console.log(_object._type);
    _object._name = _name;
    _object.update = function (data) { _object.value = data; };
    _object.extract = function () { return _object.value; };
    _object.addEventListener("input", function (e) {
        _object._parent.extract();
    });
    return _object;
}
exports.GNInputField = GNInputField;
function GNButton(_name, statusList, event, _parent) {
    var _object = document.createElement("button");
    _object._name = _name;
    _object._type = GNButton.name;
    _object.statusList = statusList;
    _object.innerHTML = statusList[0];
    _object.event = event;
    _object.update = function (data) { _object.innerHTML = data; };
    _object.extract = function () { return _object.innerHTML; };
    _object.addEventListener("click", _object.event);
    return _object;
}
exports.GNButton = GNButton;
function GNEditableDiv(_name, _parent) {
    var _object = document.createElement("div");
    _object.contentEditable = "true";
    _object._name = _name;
    _object._parent = _parent;
    _object._type = GNEditableDiv.name;
    _object.update = function (data) { _object.innerHTML = data; };
    _object.extract = function () { return _object.innerHTML; };
    _object.addEventListener("input", function (e) {
        _object._parent.extract();
    });
    return _object;
}
exports.GNEditableDiv = GNEditableDiv;
function GNContainerDiv(_parent) {
    var _object = document.createElement("div");
    _object.childrenList = {};
    _object._type = GNContainerDiv.name;
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
    _object.extract = function () {
        var dataObject = {};
        Object.entries(_object.childrenList).forEach(function (_a, index) {
            var key = _a[0], value = _a[1];
            // let _value = <GNObjectInterface>value
            dataObject[key] = value.extract();
        });
        _object.style.background = dataObject["colorInputField"];
        console.log(dataObject);
    };
    return _object;
}
exports.GNContainerDiv = GNContainerDiv;
function GNImage(_name, imgsrc) {
    var _object = document.createElement("img");
    _object._name = _name;
    _object.src = imgsrc;
    _object._type = GNImage.name;
    _object.style.width = "60%";
    _object.update = function (data) { data; };
    _object.extract = function () { return 123; };
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
    _object.styleList = [];
    _object.styleList[0] = {
        "height": "400px",
        "background": "lightgreen"
    };
    _object.styleList[1] = {
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
        });
        console.log(Object.entries(_object.childrenList));
    };
    /** apply the styleList to the HTMLObject */
    _object.applyStyle = function (stylechoice) {
        Object.entries(_object.styleList[stylechoice]).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object.style[key] = value;
        });
    };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    // do something before the object is returned
    _object.applyStyle(1);
    console.log(_object);
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
document.addEventListener("click", function (e) {
    console.log(e.target);
});
