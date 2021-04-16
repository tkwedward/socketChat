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
exports.MainController = exports.MainDocArrayEnum = void 0;
var Automerge = __importStar(require("automerge"));
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
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
            console.log(GreatNoteDataClass);
            var htmlObject = GreatNoteDataClass.GNInputField("dummy");
            // let htmlObject = document.createElement("div")
            this.addData(this.baseArrayID, htmlObject, false, false, true);
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
    MainController.prototype.addData = function (arrayID, htmlObject, insertPosition, dataPointer, attachToRoot) {
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
        // step 2 update the identityProperties of the object
        var arrayToBeAttachedTo;
        if (attachToRoot) {
            arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID);
        }
        else {
            arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"];
        }
        var objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[insertPosition]);
        var accessPointer = arrayToBeAttachedTo[insertPosition][objectSymbolArray[1]];
        // create new object dataa
        var objectData = htmlObject.extract();
        objectData.identity.accessPointer = accessPointer;
        objectData.identity.dataPointer = accessPointer;
        if (dataPointer) {
            objectData.identity.dataPointer = dataPointer;
        }
        htmlObject._identity = objectData.identity;
        // console.log(1234, htmlObject._identity)
        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            // add the data to the object
            var objectInDatabase = Automerge.getObjectById(doc, accessPointer);
            Object.entries(objectData).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                objectInDatabase[key] = value;
            });
        });
        return [htmlObject, accessPointer];
    }; // addData
    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    MainController.prototype.updateData = function (_object, dataPointerType) {
        var _this = this;
        if (dataPointerType === void 0) { dataPointerType = true; }
        var htmlObjectData = _object.extract();
        var accessPointer = htmlObjectData["identity"]["accessPointer"];
        var dataPointer = htmlObjectData["identity"]["dataPointer"];
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            var dataPointerObject = Automerge.getObjectById(doc, dataPointer);
            Object.entries(htmlObjectData["data"])
                .forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                dataPointerObject["data"][key] = value;
            });
            var accessPointerObject = Automerge.getObjectById(_this.mainDoc, dataPointer);
            Object.entries(htmlObjectData["styleList"])
                .forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                dataPointerObject["styleList"][key] = value;
            });
        });
    };
    MainController.prototype.createDummyData = function (data) {
        if (data === void 0) { data = {}; }
        var _dummyData = {
            "data": data,
            "array": [],
            "identity": { "dataPointer": "", "accessPointer": "" },
            "stylesheet": {}
        };
        var htmlObject = document.createElement("div");
        htmlObject.style.width = "300px";
        htmlObject.style.height = "200px";
        return _dummyData;
    };
    MainController.prototype.saveHTMLObjectToDatabase = function (htmlObject) {
        var data = htmlObject.extract()["identity"]["dataPointer"];
    };
    MainController.prototype.save = function () {
        return Automerge.save(this.mainDoc);
    };
    return MainController;
}());
exports.MainController = MainController;
