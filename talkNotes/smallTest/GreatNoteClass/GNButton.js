"use strict";
exports.__esModule = true;
exports.GNButton = void 0;
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
//@auto-fold here
function GNButton(_name, statusList, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var _object = document.createElement("button");
    _object._name = _name;
    _object.GNType = GNButton.name;
    _object.statusList = statusList;
    _object._dataStructure = ["innerText"];
    _object._styleStructure = [];
    _object.innerHTML = statusList[0];
    // functions
    _object.loadFromData = function (data) { _object.innerHTML = data; };
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
    GreateNoteObjectHelperFunction_1.superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer);
    // _object.editEvent("input")
    return _object;
}
exports.GNButton = GNButton;
