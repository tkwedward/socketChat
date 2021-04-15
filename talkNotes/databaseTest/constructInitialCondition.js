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
exports.MainControlle2r = exports.MainController = exports.MainDocArrayEnum = void 0;
var Automerge = __importStar(require("automerge"));
var database = {
    "root": {
        "itemName": "rootNode",
        "array": [],
        "bookmarkArray": [],
        "itemIdentity": {},
        "itemStylesheet": {
            "background": "silver"
        }
    }
};
var MainDocArrayEnum;
(function (MainDocArrayEnum) {
    MainDocArrayEnum["page"] = "page";
    MainDocArrayEnum["bookmark"] = "bookmark";
    MainDocArrayEnum["panel"] = "panel";
    MainDocArrayEnum["pokemon"] = "pokemon";
})(MainDocArrayEnum = exports.MainDocArrayEnum || (exports.MainDocArrayEnum = {}));
var MainController = /** @class */ (function () {
    function MainController() {
        this.initializeRootArray();
        console.log(this.mainDocArray);
        this.initalizeMainDoc();
    }
    MainController.prototype.initializeRootArray = function () {
        this.mainDocArray = {};
        for (var arrayName in MainDocArrayEnum) {
            console.log(this.mainDocArray, arrayName);
            this.mainDocArray[arrayName] = "";
        }
        this.baseArrayID = "";
    };
    MainController.prototype.initalizeMainDoc = function () {
        var _this = this;
        var initialArray = { "rootArray": [] };
        this.mainDoc = Automerge.init();
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            doc["rootArray"] = [];
        });
        this.baseArrayID = Automerge.getObjectId(this.mainDoc["rootArray"]);
        console.log(this.baseArrayID, this.mainDoc["rootArray"]);
        for (var arrayName in MainDocArrayEnum) {
            var initialArrayData = {
                "data": { "name": arrayName },
                "array": [],
                "identity": { "dataPointer": "", "accessPointer": "" },
                "styleSheet": {}
            };
            var htmlObject = document.createElement("div");
            this.addData(this.baseArrayID, initialArrayData, htmlObject, false, false, true);
        }
        console.log(this.mainDoc["rootArray"]);
        Array.from(this.mainDoc["rootArray"]).forEach(function (arrayObject) {
            console.log(arrayObject);
            var objectID = Automerge.getObjectId(arrayObject);
            _this.mainDocArray[arrayObject["data"]["name"]] = objectID;
        });
    }; // initalizeMainDoc
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database*/
    MainController.prototype.addData = function (arrayID, objectData, htmlObject, insertPosition, dataPointer, attachToRoot) {
        if (attachToRoot === void 0) { attachToRoot = false; }
        // Step 1: register an accessPointer in the database
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            // add the data to the object
            var arrayToBeAttachedTo;
            if (attachToRoot) {
                arrayToBeAttachedTo = Automerge.getObjectById(doc, arrayID);
            }
            else {
                arrayToBeAttachedTo = Automerge.getObjectById(doc, arrayID)["array"];
            }
            if (!insertPosition)
                insertPosition = arrayToBeAttachedTo.length;
            arrayToBeAttachedTo.insertAt(insertPosition, {});
        });
        // step 2
        var arrayToBeAttachedTo;
        if (attachToRoot) {
            arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID);
        }
        else {
            arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"];
        }
        var objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[insertPosition]);
        var accessPointer = arrayToBeAttachedTo[insertPosition][objectSymbolArray[1]];
        objectData.identity.accessPointer = accessPointer;
        objectData.identity.dataPointer = accessPointer;
        if (dataPointer) {
            objectData.identity.dataPointer = dataPointer;
        }
        htmlObject.identity = objectData.identity;
        console.log(1234, htmlObject.identity);
        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            // add the data to the object
            var objectInDatabase = Automerge.getObjectById(doc, accessPointer);
            Object.entries(objectData).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                objectInDatabase[key] = value;
            });
        });
        return htmlObject, accessPointer;
    }; // addData
    MainController.prototype.createDummyData = function (name, age, sex) {
        var _dummyData = {
            "data": { "name": name, "age": age, "sex": sex },
            "array": [],
            "identity": { "dataPointer": "", "accessPointer": "" },
            "stylesheet": {}
        };
        var htmlObject = document.createElement("div");
        htmlObject.style.width = "300px";
        htmlObject.style.height = "200px";
        return [_dummyData, htmlObject];
    };
    return MainController;
}());
exports.MainController = MainController;
function MainControlle2r() {
    var _object = {};
    // initialize the databasae
    return _object;
}
exports.MainControlle2r = MainControlle2r;
