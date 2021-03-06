"use strict";
exports.__esModule = true;
exports.GNContainerDiv = void 0;
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
//@auto-fold here
function GNContainerDiv(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage, injectedData = createData.injectedData, contentEditable = createData.contentEditable, _classNameList = createData._classNameList;
    var _object = document.createElement("div");
    _object.childrenList = {};
    _object.GNType = GNContainerDiv.name;
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = ["textContent"];
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"];
    // add classname
    _object._classNameList = _classNameList;
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(function (p) {
        _object.classList.add(p);
    });
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
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
        _object.specialGNType = data.specialGNType;
        if (data._classNameList)
            data._classNameList.forEach(function (p) { return _object.classList.add(p); });
        _object._identity = data._identity;
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        if (contentEditable) {
            _object["textContent"] = data["data"]["textContent"];
        }
    };
    _object.extract = function () { return _object.createDataObject(); };
    _object.createDataObject = function () {
        var dataObject = GreateNoteObjectHelperFunction_1.createDummyData();
        dataObject["GNType"] = _object.GNType;
        dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage;
        dataObject["specialGNType"] = _object.specialGNType || "";
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        dataObject["_classNameList"] = Array.from(_object.classList);
        // data structure
        if (contentEditable) {
            dataObject["data"]["textContent"] = _object["textContent"];
        }
        // stylesheet data
        _object._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = _object.style[p];
        });
        return dataObject;
    };
    _object.applyStyle = function (styleObject, saveToDatabase) {
        if (saveToDatabase === void 0) { saveToDatabase = true; }
        Object.entries(styleObject).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            _object["style"][key] = value;
        });
        if (saveToDatabase)
            _object.saveHTMLObjectToDatabase();
    };
    // add extra funcitons to the object
    GreateNoteObjectHelperFunction_1.superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData);
    if (injectedData) {
        _object.loadFromData(injectedData);
        _object.applyStyle(injectedData.stylesheet, false); //
    }
    // add events
    var eventStatus = { t0: 0, t1: 0, run: true };
    _object.addEventListener("input", function (e) {
        e.stopPropagation();
        eventStatus.t0 = eventStatus.t1;
        eventStatus.t1 = e.timeStamp;
        if (eventStatus.t1 - eventStatus.t0 > 100) {
            console.log(9595959, _object.textContent);
            // let target = e["target"]
            if (_object._identity.accessPointer != "")
                _object.saveHTMLObjectToDatabase();
            console.log(_object.extract());
            if (_object.processUpdateData)
                _object.processUpdateData();
        }
    }, false); //addEventListener
    return _object;
}
exports.GNContainerDiv = GNContainerDiv;
