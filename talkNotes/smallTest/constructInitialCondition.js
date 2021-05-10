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
exports.mainController = exports.MainController = void 0;
var Automerge = __importStar(require("automerge"));
var buildInitialPageHelperFunctions = __importStar(require("./buildInitialPageHelperFunctions"));
var socketFunction_1 = require("./socketFunction");
var databaseHelperFunction_1 = require("./databaseHelperFunction");
var PageController = __importStar(require("./pageControllerFolder/pageController"));
var Setting = __importStar(require("./settings"));
var mainControllerInterface_1 = require("./mainControllerFolder/mainControllerInterface");
var MainControllerHelperFunction = __importStar(require("./mainControllerFolder/mainControllerHelperFunction"));
var MainController = /** @class */ (function () {
    // *****************************
    // *     A. Initialization     *
    // *****************************
    //@auto-fold here
    function MainController() {
        this.initializeRootArray();
        this.initalizeMainDoc();
        this.applyMainDocTemplate = false;
        this.selectedObjectArray = [];
        this.pageCurrentStatus = {
            "pendingObject": {
                "newPage": new Set(),
                "newPageArray": []
            },
            "fullPageSize": Setting.pageSizeInfo.fullPageSize,
            "overviewPageSize": Setting.pageSizeInfo.overviewPageSize
        };
        this.pageController = PageController.initializePageController(this);
    }
    //@auto-fold here
    MainController.prototype.initializeRootArray = function () {
        this.mainDocArray = {};
        for (var arrayName in mainControllerInterface_1.MainDocArrayEnum) {
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
                    "GNType": "",
                    "specialGNType": ""
                };
            };
            // let htmlObject = document.createEle ment("div")
            this_1.addData(this_1.baseArrayID, htmlObject);
        };
        var this_1 = this;
        for (var arrayName in mainControllerInterface_1.MainDocArrayEnum) {
            _loop_1(arrayName);
        }
        //@auto-fold here
        Array.from(this.mainDoc["array"]).forEach(function (arrayObject) {
            var objectID = Automerge.getObjectId(arrayObject);
            _this.mainDocArray[arrayObject["data"]["name"]] = objectID;
        });
        this.previousDoc = this.mainDoc;
    }; // initalizeMainDoc
    // ******************************************
    // *     B. Modify data in the database     *
    // ******************************************
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    //@auto-fold here
    MainController.prototype.addData = function (arrayID, htmlObject, insertPosition, dataPointer, specialCreationMessage) {
        var _this = this;
        // Step 1: register an accessPointer in the database
        //@auto-fold here
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
        var objectData = htmlObject.extract();
        objectData._identity.accessPointer = accessPointer;
        objectData._identity.dataPointer = accessPointer;
        objectData._identity.linkArray.push(accessPointer);
        if (dataPointer) {
            objectData._identity.dataPointer = dataPointer;
        }
        // Step 3: put real data into the database
        //@auto-fold here
        var createMessage = { "action": "create", "objectID": accessPointer, "parentHTMLObjectId": arrayID, "specialCreationMessage": specialCreationMessage };
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
                masterObjectHtmlElement === null || masterObjectHtmlElement === void 0 ? void 0 : masterObjectHtmlElement._identity.linkArray.push(accessPointer); // **** this line may be deleted because we do not need to access the linkArray of the master object
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
            Object.entries(htmlObjectData["stylesheet"]).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                dataPointerObject["stylesheet"][key] = value;
            });
        });
    };
    //@auto-fold here
    /** to initiate the data so that you can store the data to the db*/
    // **** can be deleted later
    MainController.prototype.createDummyData = function (data) {
        if (data === void 0) { data = {}; }
        MainControllerHelperFunction.createDummyData(data);
    };
    //@auto-fold here
    /** when ever the htmlObject is updated, we fetch newData from thfe HTMLObjectt, and then go to the database and update the relevant data*/
    MainController.prototype.saveHTMLObjectToDatabase = function (htmlObject) {
        var newData = htmlObject.extract();
        var dataPointer = htmlObject.getDataPointer();
        var accessPointer = htmlObject.getAccessPointer();
        // console.log(2022020202, newData, htmlObject)
        var message = JSON.stringify({ "action": "update", "objectID": accessPointer });
        this.mainDoc = Automerge.change(this.mainDoc, message, function (doc) {
            var dataPointerObejct = Automerge.getObjectById(doc, dataPointer);
            var accessPointerObject = Automerge.getObjectById(doc, accessPointer);
            // update the data
            Object.entries(newData.data).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                // console.log(211211, key, value)
                dataPointerObejct["data"][key] = value;
            });
            if (newData._classNameList)
                dataPointerObejct["_classNameList"] = newData._classNameList;
            // update the stylesheet
            if (accessPointer != dataPointer) {
                // if it is a link object
                Object.entries(newData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    // console.log(211211, key, value)
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
        // console.log(Automerge.getChanges(this.previousDoc, this.mainDoc))
        this.sendChangeToServer();
    }; // saveHTMLObjectToDatabase
    MainController.prototype.deleteFromDataBase = function (htmlObject) {
        var _this = this;
        if (htmlObject["parentNode"]) {
            var accessPointer_1 = htmlObject.getAccessPointer();
            var parentAccessPointer_1 = htmlObject["parentNode"].getAttribute("accessPointer");
            // let parentAccessPointer = htmlObject.parentNode.getAccessPointer()
            var deleteMessage = {
                "action": "delete",
                "objectID": accessPointer_1,
                "parentHTMLObjectId": parentAccessPointer_1
            };
            this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(deleteMessage), function (doc) {
                var parentObject = _this.getObjectById(parentAccessPointer_1, doc);
                var targetObject = _this.getObjectById(accessPointer_1, doc);
                var index = parentObject["array"].indexOf(targetObject);
                if (index != -1)
                    parentObject["array"].deleteAt(index);
                // delete databaseObject
            });
            htmlObject.remove();
            this.sendChangeToServer();
        }
    }; // deleteFromDataBase
    MainController.prototype.sendChangeToServer = function () {
        var changes = Automerge.getChanges(exports.mainController.previousDoc, exports.mainController.mainDoc);
        exports.mainController.previousDoc = exports.mainController.mainDoc;
        // console.log("56: the changes are: ", changes)
        socketFunction_1.socket.emit("clientSendChangesToServer", { "changeData": changes });
    };
    // ******************************************
    // *     C. Access data in the database     *
    // ******************************************
    //@auto-fold here
    MainController.prototype.getObjectById = function (objectID, doc) {
        if (doc === void 0) { doc = this.mainDoc; }
        return Automerge.getObjectById(doc, objectID);
    };
    //@auto-fold here
    MainController.prototype.getLinkArrayFromID = function (objectID) {
        return this.getObjectById(objectID)._identity.linkArray;
    };
    //@auto-fold here
    MainController.prototype.getHtmlObjectByID = function (objectID) {
        return document.querySelector("*[accessPointer='" + objectID + "']");
    };
    // @auto-fold here
    MainController.prototype.getMainDocChange = function () {
        return Automerge.getChanges(this.previousDoc, this.mainDoc);
    };
    // **********************************
    // *     E. Build up the page       *
    // **********************************
    MainController.prototype.buildInitialHTMLSkeleton = function () {
        buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(this);
    }; // buildInitialHTMLSkeleton
    MainController.prototype.buildPageFromMainDoc = function () {
        buildInitialPageHelperFunctions.buildInitialPage(this, false);
    }; // 2. buildPageFromMainDoc
    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database, not array, but the object includes array property */
    MainController.prototype.renderDataToHTML = function (data, arrayHTMLObject) {
        var _this = this;
        var newHTMLObject;
        // cannot save any obeject to the data base here
        data["array"].forEach(function (p) {
            if (p.GNType == "GNComment") {
                // console.log(404, p.GNType)
                newHTMLObject = _this.createGNObjectThroughName("GNComment", { name: "", injectedData: p });
                arrayHTMLObject.appendChild(newHTMLObject);
                return;
            }
            if (p.GNType == "GNSvg") {
                // cannot save any obeject to the data base here because this will create an infinity loop and will append new obejct forever
                newHTMLObject = _this.GNDataStructureMapping[p.GNType]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false });
                newHTMLObject._identity = p._identity;
                var objectData = newHTMLObject.getDataFromDataBase();
                newHTMLObject.applyStyle(objectData.stylesheet);
                newHTMLObject.addEventListener("click", function () {
                    exports.mainController.toolBox.targetPage = newHTMLObject;
                });
            }
            if (p.GNType == "GNContainerDiv") {
                newHTMLObject = _this.GNDataStructureMapping[p.GNType]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, injectedData: p, contentEditable: false });
                newHTMLObject._identity = p._identity;
                var objectData = newHTMLObject.getDataFromDataBase();
            }
            if (p.GNType == "GNSvgPolyLine") {
                newHTMLObject = _this.GNDataStructureMapping[p.GNType]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false });
                newHTMLObject._identity = p._identity;
                //
                var newPolylineData = newHTMLObject.getDataFromDataBase();
                newHTMLObject.loadFromData(newPolylineData);
                var stylesheet = newPolylineData["stylesheet"];
                newHTMLObject.applyStyle({ "stroke": stylesheet["stroke"], "stroke-width": stylesheet["stroke-width"], "fill": stylesheet["fill"] });
            }
            if (p.GNType == "GNImageContainer") {
                newHTMLObject = _this.GNDataStructureMapping["GNImageContainer"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, imgsrc: p["data"]["src"] });
                newHTMLObject._identity = p._identity;
                newHTMLObject.loadFromData(p);
                newHTMLObject.setImageSize({ width: 500 });
                newHTMLObject.setMovable();
            }
            if (newHTMLObject) {
                arrayHTMLObject.appendChild(newHTMLObject);
                newHTMLObject.setAttribute("accessPointer", p._identity.accessPointer);
                _this.renderDataToHTML(p, newHTMLObject);
            }
        });
    }; // 3. renderDataToHTML
    MainController.prototype.createGNObjectThroughName = function (objectName, createData) {
        var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, injectedData = createData.injectedData;
        return this.GNDataStructureMapping[objectName](createData);
    }; // 4. createGNObjectThroughName
    //@auto-fold here
    MainController.prototype.saveMainDoc = function (sendRequest) {
        if (sendRequest === void 0) { sendRequest = false; }
        var saveData = Automerge.save(this.mainDoc);
        if (sendRequest) {
            socketFunction_1.socket.emit("saveMainDocToDisk", saveData);
            return saveData;
        }
        else {
            return saveData;
        }
    };
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
    MainController.prototype.processChangeData = function (changeDataArray) {
        var _this = this;
        // processChangeData(changeDataArray:Set<string>){
        var jsonfiedChangeDataArray = Array.from(changeDataArray).map(function (p) { return JSON.parse(p["message"]); });
        // console.log(509, jsonfiedChangeDataArray)
        // if (changeDataArray.length == 1){
        jsonfiedChangeDataArray.forEach(function (p) {
            // console.log(414, p)
            var changeData = p;
            if (changeData.action == "create") {
                databaseHelperFunction_1.processCreationDataHelper(_this, changeData);
            } // create
            if (changeData.action == "update") {
                var _object = document.querySelector("*[accessPointer='" + changeData.objectID + "']");
                // console.log(422422, _object, changeData.objectID)
                if (_object) {
                    var objectData = exports.mainController.getObjectById(changeData.objectID);
                    // console.log(520520, _object)
                    _object.reloadDataFromDatabase();
                }
            } // update
            if (changeData.action == "delete") {
                var _object = document.querySelector("*[accessPointer='" + changeData.objectID + "']");
                _object.remove();
            }
        }); // aaforEach
    };
    return MainController;
}());
exports.MainController = MainController;
exports.mainController = new MainController();
//
// to create toolbox
//
var ToolBoxModel = __importStar(require("./ToolboxModel"));
exports.mainController.toolBox = new ToolBoxModel.ToolBoxClass();
// to create the attributeControllers
socketFunction_1.socket.emit("initialDataRequest"); // processInitialData
