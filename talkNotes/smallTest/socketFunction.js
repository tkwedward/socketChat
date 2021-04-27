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
exports.socket = void 0;
var io = __importStar(require("socket.io-client"));
var constructInitialCondition_1 = require("./constructInitialCondition");
var Automerge = __importStar(require("automerge"));
exports.socket = io.io();
exports.socket.on("connect", function () {
    // emit to everybody
    exports.socket.emit("message", "user connected");
    // socket.emit("initialDataRequest")
});
exports.socket.on("message", function (msg) {
    console.log(msg);
});
exports.socket.on("askRootUserForInitialData", function (data) {
    // sender: server ask the root user to get the initial data
    // action: root user will save the automerge document and then send back to the server the required initial data
    // why are there two calls for the save funciton?
    data.initialData = constructInitialCondition_1.mainController.saveMainDoc(false);
    exports.socket.emit("sendInitialDataToServer", data);
});
exports.socket.on("saveDataToServer", function (data) {
    console.log("receive save message from server");
    console.log(data);
    constructInitialCondition_1.mainController.saveMainDoc(true);
});
exports.socket.on("serverResponseToLoadMainDocRequest", function (data) {
    constructInitialCondition_1.mainController.loadMainDoc(data);
    constructInitialCondition_1.mainController.buildInitialHTMLSkeleton();
    constructInitialCondition_1.mainController.buildPageFromMainDoc();
});
exports.socket.on("processInitialData", function (data) {
    if (data.initialData) {
        constructInitialCondition_1.mainController.loadMainDoc(data.initialData);
        constructInitialCondition_1.mainController.buildInitialHTMLSkeleton();
        constructInitialCondition_1.mainController.buildPageFromMainDoc();
    }
    else {
        exports.socket.emit("loadMainDoc");
    }
});
exports.socket.on("serverInitiatesSynchronization", function () {
    // send back change data to the server
    var changes = Automerge.getChanges(constructInitialCondition_1.mainController.previousDoc, constructInitialCondition_1.mainController.mainDoc);
    constructInitialCondition_1.mainController.previousDoc = constructInitialCondition_1.mainController.mainDoc;
    exports.socket.emit("clientSendChangesToServer", { "changeData": changes });
});
exports.socket.on("deliverSynchronizeDataFromServer", function (changeDataArray) {
    console.log(changeDataArray);
    var changeToBeProcessedArray = new Set();
    changeDataArray.forEach(function (change) {
        var senderID = change.id;
        if (senderID != exports.socket.id) {
            constructInitialCondition_1.mainController.mainDoc = Automerge.applyChanges(constructInitialCondition_1.mainController.mainDoc, change.changeData);
            change.changeData.forEach(function (p) {
                changeToBeProcessedArray.add(p.message);
            });
        }
    });
    constructInitialCondition_1.mainController.previousDoc = constructInitialCondition_1.mainController.mainDoc;
    constructInitialCondition_1.mainController.processChangeData(changeToBeProcessedArray);
    // let newChangeToBeProcessedArray = Array.from(changeToBeProcessedArray).map(p=>JSON.parse(p))
    // let changes = Automerge.getChanges(mainController.previousDoc, mainController.mainDoc)
    // console.log(52, changes)
});
