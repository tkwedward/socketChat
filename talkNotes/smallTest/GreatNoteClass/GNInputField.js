"use strict";
exports.__esModule = true;
exports.GNInputField = void 0;
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
//@auto-fold here
function GNInputField(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage;
    var _object = document.createElement("input");
    _object.GNType = GNInputField.name;
    _object._name = name;
    _object._dataStructure = ["value"];
    _object._styleStructure = [];
    // functions
    _object.createDataObject = function () {
        var dataObject = GreateNoteObjectHelperFunction_1.createDummyData();
        // data structure
        dataObject["GNType"] = _object.GNType;
        dataObject["classList"] = Array.from(_object.classList);
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
    GreateNoteObjectHelperFunction_1.superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage);
    // if the object is assigned to the database, then this  addEventListener is to monitor the change
    // define what is the update action
    return _object;
} // GNInputField
exports.GNInputField = GNInputField;
