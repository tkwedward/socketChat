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
exports.createLinkObject = exports.createNewItem = exports.addOjectToArrayInDataBase = exports.accessDataFromDatabase = exports.exchangeObjects = exports.traceObjectLocation = void 0;
var Automerge = __importStar(require("automerge"));
// declare var mainController: any;
var board_1 = __importDefault(require("./board"));
function getObjectbyId(id, doc) {
    if (doc === void 0) { doc = board_1["default"].mainDoc; }
    return Automerge.getObjectById(doc, id);
}
/** A function to trace the location of an object*/
function traceObjectLocation(leafID, doc) {
    // [0: Symbol(_conflicts), 1: Symbol(_objectId), 2: Symbol(_options), 3: Symbol(_cache), 4: Symbol(_inbound), 5: Symbol(_state)]
    if (doc === void 0) { doc = board_1["default"].mainDoc; }
    var symbolArray = Object.getOwnPropertySymbols(doc);
    var inboundSymbol = symbolArray[4];
    //
    //
    // console.log(9, getObjectbyId(leafID), mainController.mainDoc[inboundSymbol])
}
exports.traceObjectLocation = traceObjectLocation;
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
/** to copy an object stored in database to a normal object!*/
function copyObject(targetObject) {
    // to copy the data in an object to a new object
    var new_oo = {};
    Object.entries(targetObject).forEach(function (_a, index) {
        var key = _a[0], value = _a[1];
        new_oo[key] = copyObjectHelper(value);
    });
    return new_oo;
}
/** to exchnage the position of two items in an array*/
function exchangeObjects(objectID1, objectID2) {
    f = Automerge.change(f, function (doc) {
        var temp1 = copyObject(doc["page"][1]);
        var temp2 = copyObject(doc["page"][2]);
        doc["page"][1] = temp2;
        doc["page"][2] = temp1;
    });
}
exports.exchangeObjects = exchangeObjects;
/**
input: the object's ID that you waant to access
output: clean version of the data stored in the database.
*/
function accessDataFromDatabase(objectID) {
    var objectInDatabase = Automerge.getObjectById(board_1["default"].mainDoc, objectID);
    return copyObject(objectInDatabase);
}
exports.accessDataFromDatabase = accessDataFromDatabase;
/** a helper function to add object to array */
function addOjectToArrayInDataBase(mainDoc, containerID, objectData, insertPosition, masterDataPointer) {
    var array = Automerge.getObjectById(mainDoc, containerID);
    if (insertPosition == false) {
        insertPosition = array.length - 1;
    }
    else {
        insertPosition = insertPosition;
    }
    var objectSymbolArray = Object.getOwnPropertySymbols(array[insertPosition]);
    var elementID = array[insertPosition][objectSymbolArray[1]];
    objectData["identity"]["accessPointer"] = elementID;
    if (!masterDataPointer) {
        // if the object is a masterObject, then create a linkObjectArray and put itself into the array
        objectData["linkObjectArray"].push(elementID);
        objectData["identity"]["dataPointer"] = elementID;
    }
    else {
        // do something if it is a link object
        objectData["identity"]["dataPointer"] = masterDataPointer;
    }
    console.log(75, masterDataPointer, elementID, objectData);
    mainDoc = Automerge.change(mainDoc, function (doc) {
        var array = Automerge.getObjectById(doc, containerID);
        Object.entries(objectData).forEach(function (_a, index) {
            var key = _a[0], value = _a[1];
            array[insertPosition][key] = value;
        });
        array[insertPosition] = objectData;
        // insertPosition = array.length
    });
    return [mainDoc, elementID];
}
exports.addOjectToArrayInDataBase = addOjectToArrayInDataBase;
// createNewItem
function createNewItem(htmlObject /*object*/, s_data /*objectData*/, containerID, insertPosition /*position want to insert*/, masterDataPointer) {
    var _a;
    if (insertPosition === void 0) { insertPosition = false; }
    if (masterDataPointer === void 0) { masterDataPointer = false; }
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
    // Step 2: getElementID and then put it into thse identity card
    // return the mainDoc
    var elementID;
    _a = addOjectToArrayInDataBase(board_1["default"].mainDoc, containerID, s_data, insertPosition, masterDataPointer), board_1["default"].mainDoc = _a[0], elementID = _a[1];
    // the function can differentiate the difference between a link object and a master object
    htmlObject.setAttribute("accessPointer", elementID);
    htmlObject.soul.identity = s_data.identity;
    return htmlObject;
}
exports.createNewItem = createNewItem;
/** This function is to create a link object and relate it with the master object
Step 1: Add empty linkObjectData into the database
Step 2: add the link object to the masterObject's linkObjectArray
*/
function createLinkObject(linkObject, containerID, masterObjectSoul) {
    var linkObjectData = {
        "stylesheet": {},
        "identity": {
            "accessPointer": "",
            "dataPointer": masterObjectSoul.identity.dataPointer
        }
    };
    linkObject = createNewItem(linkObject, linkObjectData, containerID, false, masterObjectSoul.identity.dataPointer);
    var linkObjectAccessPointer = linkObjectData["identity"]["accessPointer"];
    // add the linkObject to masterObject's linkObjectArray
    var masterObjectData = getObjectbyId(masterObjectSoul.identity.dataPointer);
    // if not in the linkObjectArray, then add it into the array
    if (!masterObjectData.linkObjectArray.find(function (p) { return p == linkObjectAccessPointer; })) {
        board_1["default"].mainDoc = Automerge.change(board_1["default"].mainDoc, function (doc) {
            var masterObjectData = getObjectbyId(masterObjectSoul.identity.dataPointer, doc);
            masterObjectData.linkObjectArray.push(linkObjectAccessPointer);
        });
    }
    return linkObject;
}
exports.createLinkObject = createLinkObject;
