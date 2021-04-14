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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createNewItem = exports.addOjectToArrayInDataBase = exports.copyObject = void 0;
var Automerge = __importStar(require("automerge"));
// declare var mainController: any;
var board_1 = __importDefault(require("./board"));
function copyObjectHelper(value) {
    // to copy the data in an object to a new object
    if (Array.isArray(value)) {
        var newArray = value.map(function (p) { return copyObjectHelper(p); });
        return newArray;
    }
    else if (value === Object(value)) {
        var newObject_1 = {};
        Object.entries(value).forEach(function (_a, index) {
            var _key = _a[0], _value = _a[1];
            newObject_1[_key] = copyObjectHelper(_value);
        });
        return newObject_1;
    }
    else {
        return value;
    }
}
function copyObject(targetObject) {
    // to copy the data in an object to a new object
    var new_oo = {};
    Object.entries(targetObject).forEach(function (_a, index) {
        var key = _a[0], value = _a[1];
        new_oo[key] = copyObjectHelper(value);
    });
    return new_oo;
}
exports.copyObject = copyObject;
// a helper function to add object to array
function addOjectToArrayInDataBase(mainDoc, containerID, objectData, insertPosition, masterDataPointer) {
    var array = Automerge.getObjectById(mainDoc, containerID);
    var objectSymbolArray = Object.getOwnPropertySymbols(array[insertPosition]);
    var elementID = array[insertPosition][objectSymbolArray[1]];
    objectData["identity"]["addressPointer"] = elementID;
    if (!masterDataPointer) {
        // do something if it is a link object
        objectData["identity"]["dataPointer"] = elementID;
    }
    else {
        objectData["identity"]["dataPointer"] = masterDataPointer;
    }
    mainDoc = Automerge.change(mainDoc, function (doc) {
        var array = Automerge.getObjectById(doc, containerID);
        array[insertPosition] = objectData;
        // insertPosition = array.length
    });
    return mainDoc;
}
exports.addOjectToArrayInDataBase = addOjectToArrayInDataBase;
// createNewItem
function createNewItem(s /*object*/, s_data /*objectData*/, containerID, insertPosition /*position want to insert*/, masterDataPointer) {
    if (insertPosition === void 0) { insertPosition = false; }
    if (masterDataPointer === void 0) { masterDataPointer = false; }
    console.log(s);
    // Step 1: put an empty object to get objectID
    board_1["default"].mainDoc = Automerge.change(board_1["default"].mainDoc, function (doc) {
        var array = Automerge.getObjectById(doc, containerID);
        if (!insertPosition) {
            array.push({});
            insertPosition = array.length - 1;
        }
        else {
            array.insertAt(insertPosition, {});
        }
    }); // 1st contact
    // Step 2: getElementID and then put it into the identity card
    // return the mainDoc
    board_1["default"].mainDoc = addOjectToArrayInDataBase(board_1["default"].mainDoc, containerID, s_data, insertPosition, masterDataPointer);
    // let array = Automerge.getObjectById(mainController.mainDoc, dataPointer)
    // Step 3: put data into the database
}
exports.createNewItem = createNewItem;
function createLinkObject(containerID, masterObject) {
    var linkObjectData = {
        "stylesheet": {},
        "identity": {
            "accessPointer": "",
            "dataPointer": masterObject.identity.dataPointer
        }
    };
    Automerge.change(board_1["default"].mainDoc, function (doc) {
        var container = Automerge.getObjectById(doc, containerID);
        container.push({});
    });
}
