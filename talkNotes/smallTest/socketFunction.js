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
exports.socket = io.io();
exports.socket.on("connect", function () {
    // emit to everybody
    exports.socket.emit("message", "user connected");
    exports.socket.emit("initialDataRequest");
});
exports.socket.on("message", function (msg) {
    console.log(msg);
});
exports.socket.on("askRootUserForInitialData", function (data) {
    // sender: server ask the root user to get the initial data
    // action: root user will save the automerge document and then send back to the server the required initial data
    data.initialData = constructInitialCondition_1.mainController.saveMainDoc();
    exports.socket.emit("sendInitialDataToServer", data);
});
exports.socket.on("serverResponseToLoadMainDocRequest", function (data) {
    constructInitialCondition_1.mainController.loadMainDoc(data);
    console.log(constructInitialCondition_1.mainController.mainDoc);
});
exports.socket.on("processInitialData", function (data) {
    // mainController.loadMainDoc(data.initialData)
});
