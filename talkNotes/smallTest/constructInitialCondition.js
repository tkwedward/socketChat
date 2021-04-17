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
exports.mainController = exports.MainController = exports.MainDocArrayEnum = void 0;
var Automerge = __importStar(require("automerge"));
var socketFunction_1 = require("./socketFunction");
var MainDocArrayEnum;
(function (MainDocArrayEnum) {
    MainDocArrayEnum["page"] = "page";
    MainDocArrayEnum["bookmark"] = "bookmark";
    MainDocArrayEnum["panel"] = "panel";
    MainDocArrayEnum["pokemon"] = "pokemon";
})(MainDocArrayEnum = exports.MainDocArrayEnum || (exports.MainDocArrayEnum = {}));
var MainController = /** @class */ (function () {
    //@auto-fold here
    function MainController() {
        this.initializeRootArray();
        this.initalizeMainDoc();
        this.template = true;
        if (!this.template) {
            this.initializeHTMLBackground();
        }
        //
    }
    //@auto-fold here
    MainController.prototype.initializeRootArray = function () {
        this.mainDocArray = {};
        for (var arrayName in MainDocArrayEnum) {
            this.mainDocArray[arrayName] = "";
        }
        this.baseArrayID = "";
    };
    //@auto-fold here
    MainController.prototype.initializeHTMLBackground = function () {
        // to create a controller
        document.body.style.display = "grid";
        document.body.style.gridTemplateColumns = "1fr 3fr";
        var bookmarkArrayId = this.mainDocArray["bookmark"];
        var controllerStyleList = {
            "width": "95%",
            "height": "100vh",
            "border": "2px black solid",
            "margin": "20px auto"
        };
        var controller = document.createElement("div");
        controller.classList.add("controller");
        controller.innerHTML = "king";
        controller.style.width = "95%";
        controller.style.height = "100vh";
        controller.style.border = "2px black solid";
        controller.style.margin = "20px auto";
        document.body.appendChild(controller);
        var linkArrayInfo = document.createElement("div");
        linkArrayInfo.classList.add("linkArrayInfo");
        controller.appendChild(linkArrayInfo);
        var saveButton = document.createElement("button");
        saveButton.innerHTML = "save";
        saveButton.addEventListener("click", function (e) {
            var s = exports.mainController.saveMainDoc();
            socketFunction_1.socket.emit("saveMainDocToDisk", s);
        });
        var loadButton = document.createElement("button");
        loadButton.innerHTML = "load";
        loadButton.addEventListener("click", function (e) {
            socketFunction_1.socket.emit("loadMainDoc");
        });
        controller.appendChild(saveButton);
        controller.appendChild(loadButton);
        var contentContainer = document.createElement("div");
        contentContainer.classList.add("contentContainer");
        document.body.appendChild(contentContainer);
    };
    //@auto-fold here
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
            //@auto-fold here
            htmlObject.extract = function () {
                return {
                    "data": { "name": arrayName },
                    "array": [],
                    "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
                    "styleSheet": {},
                    "GNType": ""
                };
            };
            // let htmlObject = document.createEle ment("div")
            this_1.addData(this_1.baseArrayID, htmlObject);
        };
        var this_1 = this;
        for (var arrayName in MainDocArrayEnum) {
            _loop_1(arrayName);
        }
        //@auto-fold here
        Array.from(this.mainDoc["array"]).forEach(function (arrayObject) {
            var objectID = Automerge.getObjectId(arrayObject);
            _this.mainDocArray[arrayObject["data"]["name"]] = objectID;
        });
    }; // initalizeMainDoc
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    //@auto-fold here
    MainController.prototype.addData = function (arrayID, htmlObject, insertPosition, dataPointer) {
        var _this = this;
        // Step 1: register an accessPointer in the database
        htmlObject.mainController = this;
        //@auto-fold here
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            var arrayToBeAttachedTo = Automerge.getObjectById(doc, arrayID)["array"];
            if (!insertPosition)
                insertPosition = arrayToBeAttachedTo.length;
            arrayToBeAttachedTo.insertAt(insertPosition, {});
        });
        // step 2 update the identityProperties of the object
        var arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"];
        var objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[insertPosition]);
        var accessPointer = arrayToBeAttachedTo[insertPosition][objectSymbolArray[1]];
        // create new object data
        var objectData = htmlObject.extract();
        objectData._identity.accessPointer = accessPointer;
        objectData._identity.dataPointer = accessPointer;
        objectData._identity.linkArray.push(accessPointer);
        if (dataPointer) {
            objectData._identity.dataPointer = dataPointer;
        }
        // Step 3: put real data into the database
        //@auto-fold here
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            // add the data to the object
            var objectInDatabase = Automerge.getObjectById(doc, accessPointer);
            Object.entries(objectData).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                objectInDatabase[key] = value;
            });
            // update the masterobject if it is a link object
            if (dataPointer) {
                var masterObject = _this.getObjectById(dataPointer, doc);
                masterObject._identity.linkArray.push(accessPointer);
            }
        });
        htmlObject._identity = objectData._identity;
        return [htmlObject, accessPointer];
    }; // addData
    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    //@auto-fold here
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
            Object.entries(htmlObjectData["stylesheet"])
                .forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                dataPointerObject["stylesheet"][key] = value;
            });
        });
    };
    //@auto-fold here
    MainController.prototype.createDummyData = function (data) {
        if (data === void 0) { data = {}; }
        var _dummyData = {
            "data": data,
            "array": [],
            "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
            "stylesheet": {},
            "GNType": ""
        };
        var htmlObject = document.createElement("div");
        htmlObject.style.width = "300px";
        htmlObject.style.height = "200px";
        return _dummyData;
    };
    //@auto-fold here
    MainController.prototype.saveHTMLObjectToDatabase = function (htmlObject) {
        var newData = htmlObject.extract();
        var dataPointer = htmlObject.getDataPointer();
        var accessPointer = htmlObject.getAccessPointer();
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            var dataPointerObejct = Automerge.getObjectById(doc, dataPointer);
            var accessPointerObject = Automerge.getObjectById(doc, accessPointer);
            Object.entries(newData.data).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                dataPointerObejct["data"][key] = value;
            });
            if (accessPointer != dataPointer) {
                Object.entries(newData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    accessPointerObject["stylesheet"][key] = value;
                });
            }
            else {
                Object.entries(newData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    dataPointerObejct["stylesheet"][key] = value;
                });
            }
        });
    };
    //@auto-fold here
    MainController.prototype.getObjectById = function (objectID, doc) {
        if (doc === void 0) { doc = this.mainDoc; }
        var object = Automerge.getObjectById(doc, objectID);
        return object;
    };
    //@auto-fold here
    MainController.prototype.saveMainDoc = function () {
        return Automerge.save(this.mainDoc);
    };
    //@auto-fold here
    MainController.prototype.loadMainDoc = function (data) {
        var _this = this;
        this.mainDoc = Automerge.load(data);
        this.previousDoc = this.mainDoc;
        var contentContainer = document.querySelector(".contentContainer");
        var rootArray = this.mainDoc["array"];
        rootArray.forEach(function (mainArray) {
            mainArray["array"].forEach(function (elem) {
                _this.renderDataToHTML(elem, contentContainer);
            });
        });
    };
    MainController.prototype.renderDataToHTML = function (data, arrayHTMLObject) {
        var _this = this;
        var newHTMLObject = this.GNDataStructureMapping[data.GNType]("name", data._identity.accessPointer, false, data._identity.dataPointer);
        newHTMLObject.applyStyle(data.stylesheet);
        arrayHTMLObject.appendChild(newHTMLObject);
        data.array.forEach(function (_data) {
            _this.renderDataToHTML(_data, newHTMLObject);
        });
    };
    return MainController;
}());
exports.MainController = MainController;
exports.mainController = new MainController();
