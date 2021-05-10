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
exports.socket.on("serverSendSocketIdArray", function (data) {
    // emit to everybody
    // console.log(1616, data)
    // socket.emit("initialDataRequest")
});
exports.socket.on("message", function (msg) {
    console.log(msg);
});
exports.socket.on("saveDataToServer", function (data) {
    constructInitialCondition_1.mainController.saveMainDoc(true);
});
exports.socket.on("serverResponseToLoadMainDocRequest", function (data) {
    constructInitialCondition_1.mainController.loadMainDoc(data);
    constructInitialCondition_1.mainController.buildInitialHTMLSkeleton();
    constructInitialCondition_1.mainController.buildPageFromMainDoc();
});
function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
}
exports.socket.on("processInitialData", function (data) {
    var convertedData = Decodeuint8arr(data);
    constructInitialCondition_1.mainController.loadMainDoc(convertedData);
    constructInitialCondition_1.mainController.buildInitialHTMLSkeleton();
    constructInitialCondition_1.mainController.buildPageFromMainDoc();
    // TestFunction.testFunction(mainController)
});
// socket.on("serverSendSocketIdArray", data=>{
//     mainController.communitcationController = CommunicatorController.createCommunicationPanel(data)
// })
exports.socket.on("socketConnectionUpdate", function (data) {
    // mainController.communitcationController.update(data)
});
exports.socket.on("serverSendChangeFileToClient", function (changeDataArray) {
    if (changeDataArray.senderID != exports.socket.id) {
        constructInitialCondition_1.mainController.mainDoc = Automerge.applyChanges(constructInitialCondition_1.mainController.mainDoc, changeDataArray.changeData);
        constructInitialCondition_1.mainController.previousDoc = constructInitialCondition_1.mainController.mainDoc;
        constructInitialCondition_1.mainController.processChangeData(changeDataArray.changeData);
    }
});
