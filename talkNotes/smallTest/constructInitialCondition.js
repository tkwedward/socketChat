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
var buildInitialPageHelperFunctions = __importStar(require("./buildInitialPageHelperFunctions"));
var socketFunction_1 = require("./socketFunction");
var MainDocArrayEnum;
(function (MainDocArrayEnum) {
    MainDocArrayEnum["mainArray_pageFull"] = "mainArray_pageFull";
    MainDocArrayEnum["mainArray_pageOverview"] = "mainArray_pageOverview";
    MainDocArrayEnum["mainArray_bookmark"] = "mainArray_bookmark";
    MainDocArrayEnum["mainArray_panel"] = "mainArray_panel";
    MainDocArrayEnum["mainArray_pokemon"] = "mainArray_pokemon";
})(MainDocArrayEnum = exports.MainDocArrayEnum || (exports.MainDocArrayEnum = {}));
var mainArrayData = {
    "mainArray_pageFull": {
        arrayID: "", arrayHTMLObject: "fullPageModeDiv"
    },
    "mainArray_pageOverview": {
        arrayID: "", arrayHTMLObject: "overviewModeDiv"
    },
    "mainArray_bookmark": {
        arrayID: "", arrayHTMLObject: "pageContentContainer"
    },
    "mainArray_panel": {
        arrayID: "", arrayHTMLObject: "contentContainer"
    },
    "mainArray_pokemon": {
        arrayID: "", arrayHTMLObject: "contentContainer"
    }
};
var MainController = /** @class */ (function () {
    //@auto-fold here
    function MainController() {
        this.initializeRootArray();
        this.initalizeMainDoc();
        this.applyMainDocTemplate = false;
        this.pageCurrentStatus = {
            "newPageNumber": 1,
            "newPageDirection": 1,
            "currentPage": 0,
            "previousPage": 0,
            "nextPage": 0,
            "pageArrayFullPage": [0],
            "pageArraySmallView": [0],
            "fullPageSize": [1187, 720],
            "overviewPageSize": [237.4, 144]
        };
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
                    "_classList": [],
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
        this.previousDoc = this.mainDoc;
    }; // initalizeMainDoc
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    //@auto-fold here
    MainController.prototype.addData = function (arrayID, htmlObject, insertPosition, dataPointer) {
        // Step 1: register an accessPointer in the database
        //@auto-fold here
        var _this = this;
        var initializeMessage = { "action": "null", "objectID": "" };
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(initializeMessage), function (doc) {
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
        console.log("an object is created in the database");
        var objectData = htmlObject.extract();
        objectData._identity.accessPointer = accessPointer;
        objectData._identity.dataPointer = accessPointer;
        objectData._identity.linkArray.push(accessPointer);
        if (dataPointer) {
            objectData._identity.dataPointer = dataPointer;
        }
        // Step 3: put real data into the database
        //@auto-fold here
        var createMessage = { "action": "create", "objectID": accessPointer, "parentHTMLObjectId": arrayID };
        console.log(202, "here is the create message", createMessage);
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(createMessage), function (doc) {
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
                var masterObjectHtmlElement = _this.getHtmlObjectByID(dataPointer);
                console.log(209, masterObjectHtmlElement);
                masterObjectHtmlElement === null || masterObjectHtmlElement === void 0 ? void 0 : masterObjectHtmlElement._identity.linkArray.push(accessPointer);
            }
        });
        htmlObject._identity = objectData._identity;
        return [htmlObject, accessPointer];
    }; // addData
    MainController.prototype.getHtmlObjectByID = function (objectID) {
        return document.querySelector("*[accessPointer='" + objectID + "']");
        document.querySelector("*[accessPointer='c705e759-caeb-4bb3-83ce-ddfe44270ad5']");
    };
    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    //@auto-fold here
    MainController.prototype.updateData = function (_object, dataPointerType) {
        var _this = this;
        if (dataPointerType === void 0) { dataPointerType = true; }
        var htmlObjectData = _object.extract();
        var accessPointer = _object.getAccessPointer();
        var dataPointer = _object.getDataPointer();
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
    /** to initiate the data so that you can store the data to the db*/
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
    /** when ever the htmlObject is updated, we fetch newData from thfe HTMLObjectt, and then go to the database and update the relevant data*/
    MainController.prototype.saveHTMLObjectToDatabase = function (htmlObject) {
        var newData = htmlObject.extract();
        var dataPointer = htmlObject.getDataPointer();
        var accessPointer = htmlObject.getAccessPointer();
        var message = JSON.stringify({ "action": "update", "objectID": accessPointer });
        this.mainDoc = Automerge.change(this.mainDoc, message, function (doc) {
            var dataPointerObejct = Automerge.getObjectById(doc, dataPointer);
            var accessPointerObject = Automerge.getObjectById(doc, accessPointer);
            // update the data
            Object.entries(newData.data).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                dataPointerObejct["data"][key] = value;
            });
            // update the stylesheet
            if (accessPointer != dataPointer) {
                // if it is a link object
                Object.entries(newData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    accessPointerObject["stylesheet"][key] = value;
                });
            }
            else {
                // if it is the main object
                Object.entries(newData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    dataPointerObejct["stylesheet"][key] = value;
                });
            }
        });
        socketFunction_1.socket.emit("clientAskServerToInitiateSynchronization");
    }; // saveHTMLObjectToDatabase
    //@auto-fold here
    MainController.prototype.getObjectById = function (objectID, doc) {
        if (doc === void 0) { doc = this.mainDoc; }
        var object = Automerge.getObjectById(doc, objectID);
        return object;
    };
    // @auto-fold here
    MainController.prototype.getMainDocChange = function () {
        var changes = Automerge.getChanges(this.previousDoc, this.mainDoc);
        return changes;
    };
    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database */
    MainController.prototype.renderDataToHTML = function (data, arrayHTMLObject) {
        var _this = this;
        if (!arrayHTMLObject) {
            // this is for looping the mainArray so that they can get the initial aattach div of the HTML doc
            // get the mainArray Object from mainArrayData
            data.forEach(function (p) {
                var mainArrayData_item = mainArrayData[p["data"]["name"]];
                // if not in the mainArrayData, just skill it
                if (mainArrayData_item) {
                    var initialHTMLObjectClassName = mainArrayData_item["arrayHTMLObject"];
                    var initialHTMLObject_1 = document.querySelector("." + initialHTMLObjectClassName);
                    // for each elem in the main array
                    p.array.forEach(function (elem) {
                        _this.renderDataToHTML(elem, initialHTMLObject_1);
                    });
                } // if mainArrayData_item
                // if (mainArrayData_item.startsWith("mainArray_")){
                // }
                // renderDataToHTML(p, )
            });
        }
        else {
            var newHTMLObject_1;
            if (data.GNType == "GNButton") {
                newHTMLObject_1 = this.GNDataStructureMapping["GNButton"]("name", ["yes", "no"], data._identity.accessPointer, false, data._identity.dataPointer);
            }
            else if (data.GNType == "GNSvg") {
                newHTMLObject_1 = this.GNDataStructureMapping[data.GNType]("name", data._identity.accessPointer, false, data._identity.dataPointer);
            }
            else {
                newHTMLObject_1 = this.GNDataStructureMapping[data.GNType]("name", data._identity.accessPointer, false, data._identity.dataPointer);
            }
            if (newHTMLObject_1.loadFromData)
                newHTMLObject_1.loadFromData(data);
            newHTMLObject_1.applyStyle(data.stylesheet);
            arrayHTMLObject.appendChild(newHTMLObject_1);
            data.array.forEach(function (_data) {
                _this.renderDataToHTML(_data, newHTMLObject_1);
            });
        }
    };
    //@auto-fold here
    MainController.prototype.saveMainDoc = function (sendRequest) {
        if (sendRequest === void 0) { sendRequest = false; }
        // console.log(388, "saveMainDoc", this.mainDoc)
        var saveData = Automerge.save(this.mainDoc);
        if (sendRequest) {
            socketFunction_1.socket.emit("saveMainDocToDisk", saveData);
            return saveData;
        }
        else {
            return saveData;
        }
    };
    MainController.prototype.getLinkArrayFromID = function (objectID) {
        return this.getObjectById(objectID)._identity.linkArray;
    };
    MainController.prototype.getLoadDataFromSocket = function () {
        var loadData = false;
        loadData = true;
        // this.buildInitialHTMLSkeleton()
        //
        // if (loadData){
        //     socket.emit("loadMainDoc", (response)=>{
        //         console.log(375, this.mainDoc )
        //         buildInitialPageHelperFunctions.buildInitialPage(this)
        //       })
        // }
    };
    MainController.prototype.buildInitialHTMLSkeleton = function () {
        buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(this);
    };
    MainController.prototype.buildPageFromMainDoc = function () {
        buildInitialPageHelperFunctions.buildInitialPage(this);
    };
    //@auto-fold here
    //@auto-fold here
    MainController.prototype.loadMainDoc = function (data) {
        var _this = this;
        this.mainDoc = Automerge.load(data);
        this.previousDoc = this.mainDoc;
        // to render the data ato HTML
        var rootArray = this.mainDoc["array"];
        rootArray.forEach(function (mainArray) {
            // update the ID of the mainArray
            var arrayName = mainArray["data"]["name"];
            var arrayID = mainArray["_identity"]["accessPointer"];
            _this.mainDocArray[arrayName] = arrayID;
        });
    }; // loadMain
    MainController.prototype.createGNObjectThroughName = function (objectName, name, arrayID, insertPosition, dataPointer, saveToDatabase) {
        if (saveToDatabase === void 0) { saveToDatabase = true; }
        console.log(this.GNDataStructureMapping);
        return this.GNDataStructureMapping[objectName](name, arrayID, insertPosition, dataPointer, saveToDatabase);
    };
    MainController.prototype.processChangeData = function (changeDataArray) {
        var _this = this;
        var jsonfiedChangeDataArray = Array.from(changeDataArray).map(function (p) { return JSON.parse(p); });
        console.log("429 the changgeDataArray is ", jsonfiedChangeDataArray);
        jsonfiedChangeDataArray.forEach(function (p) {
            var changeData = p;
            console.log("432, changeData", changeData);
            if (changeData.action == "create") {
                var objectData = _this.getObjectById(changeData.objectID);
                var newHTMLObject = document.querySelector("*[accessPointer='" + changeData.objectID + "']");
                if (!newHTMLObject) {
                    newHTMLObject = _this.createGNObjectThroughName(objectData.GNType, "", "", false, false, false);
                    newHTMLObject.initializeHTMLObjectFromData(objectData);
                    var parentHTMLObject = _this.getHtmlObjectByID(changeData.parentHTMLObjectId);
                    console.log("action = create", changeData.objectID, parentHTMLObject, objectData, newHTMLObject);
                    if (parentHTMLObject) {
                        parentHTMLObject.appendChild(newHTMLObject);
                    }
                    console.log(newHTMLObject, changeData.parentHTMLObjectId);
                }
            } // create
            if (changeData.action == "update") {
                var _object = document.querySelector("*[accessPointer='" + changeData.objectID + "']");
                console.log(_object);
                // let object = document.querySelector(`.divPage[pageNumber='4'] input`)
                var objectData = exports.mainController.getObjectById(changeData.objectID);
                _object.reloadDataFromDatabase();
                // object.processUpdateData()
            }
        });
    };
    return MainController;
}());
exports.MainController = MainController;
exports.mainController = new MainController();
// mainController.getLoadDataFromSocket()
socketFunction_1.socket.emit("initialDataRequest");
