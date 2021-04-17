"use strict";
exports.__esModule = true;
exports.GNTemplate = exports.GNDivPage = exports.GNImage = exports.GNEditableDiv = exports.GNContainerDiv = exports.GNButton = exports.GNInputField = void 0;
var constructInitialCondition_1 = require("./constructInitialCondition");
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
    _object.loadFromData = function (data) { _object.value = data; };
    _object.extract = function () { return _object.createDataObject(); };
    _object.save = function () {
    };
    _object.addEventListener("input", function (e) {
        var newData = _object.extract();
        // _object._parent.receiveDataFromChild(newData)
    });
    // add extra funcitons to the object
    superGNObject(_object);
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
    _object.loadFromData = function (data) { _object.innerHTML = data; };
    _object.extract = function () { return _object.createDataObject(); };
    // a user define array
    _object.addEventListener("click", _object.event);
    _object.addEventListener("click", function () {
        var newData = _object.extract();
        return newData;
    });
    // add extra funcitons to the object
    superGNObject(_object);
    return _object;
}
exports.GNButton = GNButton;
function GNContainerDiv(name, arrayID, insertPosition, dataPointer, _parent) {
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
    };
    _object.loadFromData = function (data) {
        Object.values(_object.childrenList).forEach(function (p) { return p.loadFromData(data[p._name]); });
    };
    _object.extract = function () { return _object.createDataObject(); };
    // add extra funcitons to the object
    superGNObject(_object);
    _object.addToDatabase(arrayID, insertPosition, dataPointer);
    return _object;
}
exports.GNContainerDiv = GNContainerDiv;
var testArray = [];
function GNEditableDiv(_name, arrayID, insertPosition, dataPointer, _parent) {
    var _object = GNContainerDiv(_name, arrayID, insertPosition, dataPointer, _parent);
    _object.contentEditable = "true";
    _object._name = _name;
    _object._parent = _parent;
    _object._type = GNEditableDiv.name;
    _object._dataStructure = ["innerHTML"];
    _object.extract = function () {
        var _dummyData = _object.createDataObject();
        return _dummyData;
    };
    // add extra funcitons to the object
    superGNObject(_object);
    _object.addToDatabase(arrayID, insertPosition, dataPointer);
    // event
    _object.addEventListener("input", function (e) {
        _object.saveHTMLObjectToDatabase();
        var linkArrayInfo = document.querySelector(".linkArrayInfo");
        linkArrayInfo.innerHTML = "";
        var dataPointer = _object.getDataPointer();
        var accessPointer = _object.getAccessPointer();
        var masterObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
        var linkArray = masterObject._identity.linkArray;
        // let dataObject = masterObject.data
        var dataObject = _object.extract()["data"];
        // console.log(192, linkArray, dataObject)
        linkArray.forEach(function (p) {
            linkArrayInfo.innerHTML += p + "</br>";
            var targetHTML = document.querySelector("div[accesspointer='" + p + "']");
            if (p != accessPointer) {
                targetHTML === null || targetHTML === void 0 ? void 0 : targetHTML.loadFromData(dataObject);
            }
        });
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
    _object.loadFromData = function (data) { data; };
    _object.extract = function () { return _object.createDataObject(); };
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
    };
    /** apply the styleList to the HTMLObject */
    _object.applyStyle = function (stylechoice) {
        if (stylechoice === void 0) { stylechoice = 0; }
        Object.entries(_object.styleListArray[stylechoice]).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object.style[key] = value;
        });
    };
    _object.extract = function () { return _object.createDataObject(); };
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
    _object.extract = function () { return 123; };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    return _object;
}
exports.GNTemplate = GNTemplate;
function superGNObject(_object) {
    _object = _object;
    /** important function to extract data from individual elements*/
    _object.createDataObject = function () {
        var dataObject = {
            "data": {},
            "array": [],
            "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
            "stylesheet": {}
        };
        if (_object._identity) {
            dataObject["_identity"] = _object._identity;
        }
        if (_object._dataStructure) {
            _object._dataStructure.forEach(function (property) {
                dataObject["data"][property] = _object[property];
            });
        }
        if (_object._stylesList) {
            _object._stylesList.forEach(function (property) { return dataObject["stylesheet"][property] = _object["style"][property]; });
        }
        return dataObject;
    };
    // when the data is first created, add it to the database
    _object.addToDatabase = function (arrayID, insertPosition, dataPointer) {
        constructInitialCondition_1.mainController.addData(arrayID, _object, insertPosition, dataPointer);
        _object.setAttribute("accessPointer", _object.getAccessPointer());
    };
    _object.loadFromData = function (data) {
        _object._dataStructure.forEach(function (key) {
            _object[key] = data[key];
        });
    };
    _object.saveHTMLObjectToDatabase = function () {
        constructInitialCondition_1.mainController.saveHTMLObjectToDatabase(_object);
    };
    /** to apply stylesheet to an element */
    _object.applyStyle = function (styleList, stylechoice) {
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
    };
    _object.reloadDataFromDatabase = function () {
        var dataPointer = _object.getDataPointer();
        var accessPointer = _object.getAccessPointer();
        var dataPointerObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
        _object.loadFromData(dataPointerObject.data);
        // if (dataPointer!= accessPointer){
        //     let accessPointerObject= mainController.getObjectById(accessPointer)
        //     _object.applyStyle(accessPointerObject._styleList)
        // } else {
        //     _object.applyStyle(dataPointerObject._styleList)
        // }
        // _object.applyStyle()
    };
    // ========================================
    // =======   for database acces    ========
    // ========================================
    _object.getDataPointer = function () {
        return _object._identity.dataPointer;
    };
    _object.setDataPointer = function (dataPointer) {
        _object._identity.dataPointer = dataPointer;
    };
    _object.getAccessPointer = function () {
        return _object._identity.accessPointer;
    };
    _object.setAccessPointer = function (accessPointer) {
        _object._identity.accessPointer = accessPointer;
    };
    _object.getLinkArray = function () {
        var objectInDatabase = constructInitialCondition_1.mainController.getObjectById(_object.getAccessPointer());
        return objectInDatabase._identity.linkArray;
    };
    _object.getDataFromDataBase = function () {
        return constructInitialCondition_1.mainController.getObjectById(_object.getDataPointer());
    };
}
