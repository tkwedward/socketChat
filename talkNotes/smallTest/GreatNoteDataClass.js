"use strict";
exports.__esModule = true;
exports.superGNObject = exports.GNTemplate = exports.GNDropdownList = exports.GNImage = exports.GNEditableDiv = exports.GNContainerDiv = exports.GNButton = exports.GNInputField = void 0;
var constructInitialCondition_1 = require("./constructInitialCondition");
function createDummyData() {
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
        "_classList": [],
        "stylesheet": {}
    };
}
//@auto-fold here
function GNInputField(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage;
    var _object = document.createElement("input");
    _object._type = GNInputField.name;
    _object._name = name;
    _object._dataStructure = ["value"];
    _object._styleStructure = [];
    // functions
    _object.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = _object._type;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        _object._dataStructure.forEach(function (p) {
            dataObject["data"][p] = _object[p];
        });
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = function () { return _object.createDataObject(); };
    _object.loadFromData = function (data) { return _object.value = data.value; };
    //@auto-fold here
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage);
    // if the object is assigned to the database, then this  addEventListener is to monitor the change
    // define what is the update action
    var eventStatus = { t0: 0, t1: 0, run: true };
    _object.addEventListener("input", function (e) {
        eventStatus.t0 = eventStatus.t1;
        eventStatus.t1 = e.timeStamp;
        console.log(eventStatus.t1 - eventStatus.t0, eventStatus.t1 - eventStatus.t0 > 100);
        if (eventStatus.t1 - eventStatus.t0 > 100) {
            if (_object._identity.accessPointer != "")
                _object.saveHTMLObjectToDatabase();
            if (_object.processUpdateData)
                _object.processUpdateData();
        }
    }); //addEventListener
    return _object;
} // GNInputField
exports.GNInputField = GNInputField;
//@auto-fold here
function GNButton(_name, statusList, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var _object = document.createElement("button");
    _object._name = _name;
    _object._type = GNButton.name;
    _object.statusList = statusList;
    _object._dataStructure = ["innerText"];
    _object._styleStructure = [];
    _object.innerHTML = statusList[0];
    // functions
    _object.loadFromData = function (data) { _object.innerHTML = data; };
    _object.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = _object._type;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        _object._dataStructure.forEach(function (p) {
            dataObject["data"][p] = _object[p];
        });
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = function () { return _object.createDataObject(); };
    _object.addClickEvent = function (clickFunction) {
        _object.addEventListener("click", function (e) {
            clickFunction(_object);
        });
    };
    // a user define array
    _object.addEventListener("click", function () {
        var currentIndex = _object.statusList.indexOf(_object.innerText);
        var nextIndex = (currentIndex + 1) % _object.statusList.length;
        _object.innerText = _object.statusList[nextIndex];
        _object.saveHTMLObjectToDatabase();
        _object.updateLinkObject();
    });
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer);
    // _object.editEvent("input")
    return _object;
}
exports.GNButton = GNButton;
//@auto-fold here
function GNContainerDiv(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage;
    var _object = document.createElement("div");
    _object.childrenList = {};
    _object._type = GNContainerDiv.name;
    _object._dataStructure = ["innerText"];
    _object._styleStructure = ["background", "width", "height"];
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
        _object._dataStructure.forEach(function (key) {
            console.log(216, key, _object[key], _object);
            _object[key] = data[key];
        });
    };
    _object.createDataObject = function () {
        var dataObject = createDummyData();
        dataObject["GNType"] = _object._type;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        // data structure
        _object._dataStructure.forEach(function (p) {
            dataObject["data"][p] = _object[p];
        });
        dataObject["_classList"] = Array.from(_object.classList);
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        // console.log(238, dataObject, _object)
        return dataObject;
    };
    _object.applyStyle = function (styleObject) {
        Object.entries(styleObject).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object[key] = value;
        });
        _object.saveHTMLObjectToDatabase();
    };
    _object.extract = function () { return _object.createDataObject(); };
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage);
    return _object;
}
exports.GNContainerDiv = GNContainerDiv;
var testArray = [];
//@auto-fold here
function GNEditableDiv(_name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var _object = GNContainerDiv(_name, arrayID, insertPosition, dataPointer, saveToDatabase);
    _object.contentEditable = "true";
    _object._name = _name;
    _object._type = GNEditableDiv.name;
    _object._dataStructure = ["innerHTML"];
    _object._styleStructure = ["background", "width"];
    _object.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = _object._type;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        _object._dataStructure.forEach(function (p) {
            dataObject["data"][p] = _object[p];
        });
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = function () {
        var _dummyData = _object.createDataObject();
        return _dummyData;
    };
    _object.loadFromData = function (data) {
        _object._dataStructure.forEach(function (key) {
            _object[key] = data[key];
        });
    };
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input");
    return _object;
}
exports.GNEditableDiv = GNEditableDiv;
//@auto-fold here
function GNImage(_name, imgsrc) {
    var _object = document.createElement("img");
    _object._name = _name;
    _object.src = imgsrc;
    _object._type = GNImage.name;
    _object.style.width = "60%";
    _object._dataStructure = ["src"];
    _object._styleStructure = ["width", "height"];
    _object.loadFromData = function (data) { data; };
    _object.createDataObject = function () {
        var dataObject = createDummyData();
        // identity
        dataObject["GNType"] = _object._type;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        // data structure
        _object._dataStructure.forEach(function (p) {
            dataObject["data"][p] = _object[p];
        });
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = function () { return _object.createDataObject(); };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    return _object;
} // GNImage
exports.GNImage = GNImage;
//@auto-fold here
function GNDropdownList(_name, selectList, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var _object = document.createElement("select");
    selectList.forEach(function (p) {
        var option = document.createElement("option");
        option.value = p;
        option.innerText = p;
        _object.appendChild(option);
    });
    _object._name = _name;
    _object._type = GNDropdownList.name;
    _object._dataStructure = ["value"];
    _object.extract = function () {
        var _dummyData = _object.createDataObject();
        return _dummyData;
    };
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input");
    return _object;
}
exports.GNDropdownList = GNDropdownList;
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
//@auto-fold here
function superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage) {
    _object = _object;
    /** important function to extract data from individual elements*/
    // when the data is first created, add it to the database
    _object.addToDatabase = function (arrayID, insertPosition, dataPointer, specialCreationMessage) {
        constructInitialCondition_1.mainController.addData(arrayID, _object, insertPosition, dataPointer, specialCreationMessage);
        _object.setAttribute("accessPointer", _object.getAccessPointer());
    };
    _object.saveHTMLObjectToDatabase = function () {
        constructInitialCondition_1.mainController.saveHTMLObjectToDatabase(_object);
    };
    /** to apply stylesheet to an element */
    _object.updateLinkObject = function () {
        var dataPointer = _object.getDataPointer();
        var accessPointer = _object.getAccessPointer();
        var masterObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
        var linkArray = masterObject._identity.linkArray;
        var dataObject = _object.extract()["data"];
        linkArray.forEach(function (p) {
            var targetHTML = document.querySelector("*[accesspointer='" + p + "']");
            if (p != accessPointer) {
                targetHTML === null || targetHTML === void 0 ? void 0 : targetHTML.loadFromData(dataObject);
            }
            else {
                _object.saveHTMLObjectToDatabase();
            }
        });
    };
    _object.initializeHTMLObjectFromData = function (data) {
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        _object._identity = data._identity;
        _object._type = data._type;
    };
    _object.processUpdateData = function () {
        var objectData = _object.reloadDataFromDatabase();
        _object.updateLinkObject();
    };
    _object.reloadDataFromDatabase = function () {
        var dataPointer = _object.getDataPointer();
        var accessPointer = _object.getAccessPointer();
        var dataPointerObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
        _object.loadFromData(dataPointerObject.data);
        if (dataPointer != accessPointer) {
            var accessPointerObject = constructInitialCondition_1.mainController.getObjectById(accessPointer);
            _object.applyStyle(accessPointerObject.stylesheet);
        }
        else {
            _object.applyStyle(dataPointerObject.stylesheet);
        }
        return dataPointerObject;
    };
    _object.appendTo = function (_parent) {
        _object._parent = _parent;
        _parent.appendChild(_object);
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
    // ========================================
    // =======   database operations   ========
    // ========================================
    _object.GNdelete = function () {
        // mainController
        _object.getLinkArray().forEach(function (p) {
            var target = document.querySelector("*[accessPointer='" + p + "']");
            target === null || target === void 0 ? void 0 : target.remove();
        });
    };
    _object.getDataFromDataBase = function () {
        return constructInitialCondition_1.mainController.getObjectById(_object.getDataPointer());
    };
    if (saveToDatabase) {
        _object.addToDatabase(arrayID, insertPosition, dataPointer, specialCreationMessage);
        // _object.editEvent(editEvent)
    }
}
exports.superGNObject = superGNObject;
