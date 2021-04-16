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
function testHTML1() {
    var _object = document.createElement("input");
    return _object;
}
function testHTML2() {
    var _object = document.createElement("div");
    // augment function
    _object = augmentFunction(_object);
    return _object;
}
function augmentFunction(object) {
    object.save = function () {
        console.log(21, "from augmentFunction");
    };
    return object;
}
var test2 = testHTML2();
test2.save();
console.log(test2);
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
        this.initalizeMainDoc();
    }
    MainController.prototype.initializeRootArray = function () {
        this.mainDocArray = {};
        for (var arrayName in MainDocArrayEnum) {
            this.mainDocArray[arrayName] = "";
        }
        this.baseArrayID = "";
    };
    MainController.prototype.initalizeMainDoc = function () {
        var _this = this;
        var initialArray = { "rootArray": [] };
        this.mainDoc = Automerge.init();
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            doc["array"] = [];
        });
        this.baseArrayID = Automerge.getObjectId(this.mainDoc);
        var _loop_1 = function (arrayName) {
            // create an object with extract function here so that you cdo not need to use GNInputFIeld here
            var htmlObject = { extract: function () { } };
            htmlObject.extract = function () {
                return {
                    "data": { "name": arrayName },
                    "array": [],
                    "identity": { "dataPointer": "", "accessPointer": "" },
                    "styleSheet": {}
                };
            };
            // let htmlObject = document.createEle ment("div")
            this_1.addData(this_1.baseArrayID, htmlObject);
        };
        var this_1 = this;
        for (var arrayName in MainDocArrayEnum) {
            _loop_1(arrayName);
        }
        Array.from(this.mainDoc["array"]).forEach(function (arrayObject) {
            var objectID = Automerge.getObjectId(arrayObject);
            _this.mainDocArray[arrayObject["data"]["name"]] = objectID;
        });
    }; // initalizeMainDoc
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    MainController.prototype.addData = function (arrayID, htmlObject, insertPosition, dataPointer) {
        var _this = this;
        // Step 1: register an accessPointer in the database
        htmlObject.mainController = this;
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            // add the data to the object
            console.log(_this.mainDoc);
            var arrayToBeAttachedTo = Automerge.getObjectById(doc, arrayID)["array"];
            console.log(doc, arrayID);
            if (!insertPosition)
                insertPosition = arrayToBeAttachedTo.length;
            arrayToBeAttachedTo.insertAt(insertPosition, {});
        });
        // step 2 update the identityProperties of the object
        var arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"];
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
    MainController.prototype.createGNItem = function (GNtype, arrayID) {
        var newGNObject = GNtype();
        newGNObject.mainController = this;
        if (arrayID) {
            this.addData(arrayID, newGNObject);
        }
        return newGNObject;
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
