"use strict";
exports.__esModule = true;
exports.GNDropdownList = void 0;
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
//@auto-fold here
function GNDropdownList(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage, injectedData = createData.injectedData, statusList = createData.statusList;
    var _object = document.createElement("select");
    statusList.forEach(function (p) {
        var option = document.createElement("option");
        option.value = p;
        option.innerText = p;
        _object.appendChild(option);
    });
    _object._name = name;
    _object.GNType = GNDropdownList.name;
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = ["value"];
    _object._styleStructure = [];
    _object.extract = function () { return _object.createDataObject(); };
    _object.createDataObject = function () {
        var dataObject = GreateNoteObjectHelperFunction_1.createDummyData();
        dataObject["GNType"] = _object.GNType;
        dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage || "";
        dataObject["specialGNType"] = _object.specialGNType || "";
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        dataObject["classList"] = Array.from(_object.classList);
        // data structure
        dataObject["data"]["value"] = _object["value"];
        // stylesheet data
        return dataObject;
    };
    _object.loadFromData = function (data) {
        console.log(454545, data);
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
        _object.specialGNType = data.specialGNTyp;
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        _object._identity = data._identity;
        if (data.classList)
            data.classList.forEach(function (p) { return _object.classList.add(p); });
        _object["value"] = data["data"]["value"];
    };
    _object.applyStyle = function (styleObject, saveToDatabase) {
        if (saveToDatabase === void 0) { saveToDatabase = true; }
    };
    // add extra funcitons to the object
    GreateNoteObjectHelperFunction_1.superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input");
    _object.addEventListener("change", function (e) {
        e.stopPropagation();
        if (_object._identity.accessPointer != "")
            _object.saveHTMLObjectToDatabase();
        console.log(666, _object.extract());
        if (_object.processUpdateData)
            _object.processUpdateData();
    }, false); //addEventListener
    return _object;
}
exports.GNDropdownList = GNDropdownList;
