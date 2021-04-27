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
exports.processCreationDataHelper = exports.specialCreationMessageEnum = void 0;
var pageViewHelperFunction = __importStar(require("./pageViewHelperFunction"));
var specialCreationMessageEnum;
(function (specialCreationMessageEnum) {
    specialCreationMessageEnum["createNewFullPageObject"] = "createNewFullPageObject";
    specialCreationMessageEnum["createNewOverviewPageObject"] = "createNewOverviewPageObject";
})(specialCreationMessageEnum = exports.specialCreationMessageEnum || (exports.specialCreationMessageEnum = {}));
function processCreationDataHelper(mainController, creationData) {
    var specialCreationMessage = creationData.specialCreationMessage;
    var objectData = mainController.getObjectById(creationData.objectID);
    var newHTMLObject;
    console.log(12121212, creationData);
    if (specialCreationMessage == specialCreationMessageEnum.createNewFullPageObject || specialCreationMessage == specialCreationMessageEnum.createNewOverviewPageObject) { // do something special if there is spcial creation message
        mainController.pageCurrentStatus.pendingObject.newPageArray.push(creationData);
        // if there are two item in the array, then clear it and create a new object
        if (mainController.pageCurrentStatus.pendingObject.newPageArray.length == 4) {
            var newPageItemData = mainController.pageCurrentStatus.pendingObject.newPageArray[0];
            var newSmallViewItemData = mainController.pageCurrentStatus.pendingObject.newPageArray[1];
            var _newPageObjectData = mainController.getObjectById(newPageItemData.objectID);
            var _newSmallViewObjectData = mainController.getObjectById(newSmallViewItemData.objectID);
            var fullPageModeDiv = document.querySelector(".fullPageModeDiv");
            var overviewModeDiv = document.querySelector(".overviewModeDiv");
            var _a = pageViewHelperFunction.createNewPage(mainController.pageCurrentStatus, fullPageModeDiv, overviewModeDiv, _newPageObjectData, _newSmallViewObjectData, false), newPage = _a[0], smallView = _a[1];
            pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
            mainController.pageCurrentStatus.pendingObject.newPageArray = [];
        }
    }
    if (!creationData.specialCreationMessage) {
        newHTMLObject = mainController.createGNObjectThroughName(objectData.GNType, { name: "", arrayID: "", insertPosition: false, dataPointer: false, saveToDatabase: false });
        newHTMLObject.initializeHTMLObjectFromData(objectData);
        var parentHTMLObject = mainController.getHtmlObjectByID(creationData.parentHTMLObjectId);
        // console.log("action = create", creationData.objectID, parentHTMLObject, objectData, newHTMLObject)
        if (parentHTMLObject) {
            parentHTMLObject.appendChild(newHTMLObject);
        }
    }
}
exports.processCreationDataHelper = processCreationDataHelper;
