"use strict";
exports.__esModule = true;
exports.GNDropdownList = void 0;
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
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
    _object.GNType = GNDropdownList.name;
    _object._dataStructure = ["value"];
    _object.extract = function () {
        var _dummyData = _object.createDataObject();
        return _dummyData;
    };
    // add extra funcitons to the object
    GreateNoteObjectHelperFunction_1.superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input");
    return _object;
}
exports.GNDropdownList = GNDropdownList;
