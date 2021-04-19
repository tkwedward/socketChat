"use strict";
exports.__esModule = true;
exports.superGNObject = exports.GNTemplate = exports.GNDropdownList = exports.GNDivPage = exports.GNImage = exports.GNEditableDiv = exports.GNContainerDiv = exports.GNButton = exports.GNInputField = void 0;
var constructInitialCondition_1 = require("./constructInitialCondition");
function createDummyData() {
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
        "stylesheet": {}
    };
}
//@auto-fold here
function GNInputField(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var _object = document.createElement("input");
    _object._type = GNInputField.name;
    _object._name = name;
    _object._dataStructure = ["value"];
    _object._styleStructure = [];
    // functions
    _object.loadFromData = function (data) { _object.value = data; };
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
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input");
    return _object;
}
exports.GNInputField = GNInputField;
//@auto-fold here
function GNButton(_name, statusList, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    console.log(86, "name", _name, "statusList: ", statusList, "arrayID", arrayID, "insertPosition", insertPosition, "saveToDatabase: ", saveToDatabase);
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
function GNContainerDiv(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
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
    _object.createDataObject = function () {
        var dataObject = createDummyData();
        dataObject["GNType"] = _object._type;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        // data structure
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = function () { return _object.createDataObject(); };
    console.log(155, _object, saveToDatabase, arrayID, insertPosition, dataPointer);
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer);
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
}
exports.GNImage = GNImage;
//@auto-fold here
function GNDivPage(_name, _parent) {
    var _object = GNContainerDiv();
    // internal properties
    _object._name = _name;
    _object._type = GNImage.name;
    _object.stylesheetArray = [];
    _object.stylesheetArray[0] = {
        "height": "400px",
        "background": "lightgreen"
    };
    _object.stylesheetArray[1] = {
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
    /** apply the styleListArray to the HTMLObject */
    // _object.applyStyle = function(stylechoice=0){
    //     Object.entries(_object.stylesheetArray[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
    // }
    _object.extract = function () { return _object.createDataObject(); };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    // do something before the object is returned
    _object.applyStyle(1);
    return _object;
}
exports.GNDivPage = GNDivPage;
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
function superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, editEvent) {
    _object = _object;
    console.log(345, _object);
    /** important function to extract data from individual elements*/
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
    _object.applyStyle = function (stylesheet, stylechoice) {
        if (stylechoice) {
            Object.entries(stylesheet[stylechoice]).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                _object.style[key] = value;
            });
            _object.stylesheet = stylesheet[stylechoice];
        }
        else {
            Object.entries(stylesheet).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                _object.style[key] = value;
                _object.stylesheet = stylesheet;
            });
        }
        _object.saveHTMLObjectToDatabase();
    };
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
        });
    };
    _object.editEvent = function (eventName) {
        //@auto-fold here
        _object.addEventListener(eventName, function (e) {
            _object.saveHTMLObjectToDatabase();
            var dataPointer = _object.getDataPointer();
            var accessPointer = _object.getAccessPointer();
            var masterObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
            var linkArray = masterObject._identity.linkArray;
            var dataObject = _object.extract()["data"];
            var linkArrayInfo = document.querySelector(".linkArrayInfo");
            linkArrayInfo.innerHTML = "";
            linkArray.forEach(function (p) {
                linkArrayInfo.innerHTML += p + "</br>";
                var targetHTML = document.querySelector("*[accesspointer='" + p + "']");
                if (p != accessPointer) {
                    targetHTML === null || targetHTML === void 0 ? void 0 : targetHTML.loadFromData(dataObject);
                }
            }); // linkArray for
        }); //addEventListener
    };
    _object.reloadDataFromDatabase = function () {
        var dataPointer = _object.getDataPointer();
        var accessPointer = _object.getAccessPointer();
        var dataPointerObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
        _object.loadFromData(dataPointerObject.data);
        // if (dataPointer!= accessPointer){
        //     let accessPointerObject= mainController.getObjectById(accessPointer)
        //     _object.applyStyle(accessPointerObject.stylesheet)
        // } else {
        //     _object.applyStyle(dataPointerObject.stylesheet)
        // }
        // _object.applyStyle()
    };
    _object.appendTo = function (_parent) {
        _object._parent = _parent;
        _parent.appendChild(_object);
    };
    // ========================================
    // =======   for database acces    ========
    // ========================================
    _object.getDataPointer = function () {
        console.log(476, _object._identity);
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
    if (saveToDatabase) {
        console.log(503, _object, saveToDatabase);
        _object.addToDatabase(arrayID, insertPosition, dataPointer);
        _object.editEvent(editEvent);
    }
}
exports.superGNObject = superGNObject;
