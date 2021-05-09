"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.superGNObject = exports.createDummyData = void 0;
var constructInitialCondition_1 = require("../constructInitialCondition");
var ToolBoxEvents = __importStar(require("../EventFolder/attachToolBoxEventsToLayers"));
function createDummyData() {
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "specialGNType": "",
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
        "classList": [],
        "stylesheet": {}
    };
}
exports.createDummyData = createDummyData;
//@auto-fold here
function superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData, attachEventListener) {
    if (attachEventListener === void 0) { attachEventListener = true; }
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
                // _object.saveHTMLObjectToDatabase()
            }
        });
    };
    _object.initializeHTMLObjectFromData = function (data) {
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        _object._identity = data._identity;
        _object.GNType = data.GNType;
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
    };
    _object.processUpdateData = function () {
        var objectData = _object.reloadDataFromDatabase();
        _object.updateLinkObject();
    };
    _object.reloadDataFromDatabase = function () {
        var dataPointer = _object.getDataPointer();
        var accessPointer = _object.getAccessPointer();
        var dataPointerObject = constructInitialCondition_1.mainController.getObjectById(dataPointer);
        _object.loadFromData(dataPointerObject);
        //
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
    _object.generateGNObjectThroughGNType = function (_GNType, createDataObject) {
        return constructInitialCondition_1.mainController.createGNObjectThroughName(_GNType, createDataObject);
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
    _object.deleteFromDatabase = function () {
        // mainController
        constructInitialCondition_1.mainController.deleteFromDataBase(_object);
    };
    _object.getDataFromDataBase = function () {
        return constructInitialCondition_1.mainController.getObjectById(_object.getDataPointer());
    };
    if (attachEventListener) {
        attachEventListenerToLayer(constructInitialCondition_1.mainController, arrayID, _object, injectedData);
    }
    if (saveToDatabase) {
        _object.addToDatabase(arrayID, insertPosition, dataPointer, specialCreationMessage);
        // _object.editEvent(editEvent)
    }
}
exports.superGNObject = superGNObject;
function attachEventListenerToLayer(mainController, arrayID, _object, injectedData) {
    if (_object.GNType == "GNSvg") {
        ToolBoxEvents.attachEventListenerToSvgBoard(mainController, _object);
    }
    if (injectedData === null || injectedData === void 0 ? void 0 : injectedData.GNSpecialCreationMessage) {
        ToolBoxEvents.attachEventListenerToDivLayer(mainController, _object);
    }
}
