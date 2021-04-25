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
exports.buildInitialHTMLSkeleton = exports.buildInitialPage = void 0;
var GreatNoteSvgDataClass = __importStar(require("./GreatNoteSvgDataClass"));
var ToolBoxModel = __importStar(require("./ToolBoxModel"));
// import {mainController} from "./constructInitialCondition"
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var socketFunction_1 = require("./socketFunction");
var pageViewHelperFunction = __importStar(require("./pageViewHelperFunction"));
function buildInitialPage(mainController, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = false; }
    mainController.GNDataStructureMapping = {
        GNInputField: GreatNoteDataClass.GNInputField,
        GNContainerDiv: GreatNoteDataClass.GNContainerDiv,
        GNEditableDiv: GreatNoteDataClass.GNEditableDiv,
        GNImage: GreatNoteDataClass.GNImage,
        // svg
        GNSvg: GreatNoteSvgDataClass.GNSvg,
        GNSvgCircle: GreatNoteSvgDataClass.GNSvgCircle,
        GNSvgPolyLine: GreatNoteSvgDataClass.GNSvgPolyLine,
        GNSvgRect: GreatNoteSvgDataClass.GNSvgRect
    };
    var currentStatus = mainController.pageCurrentStatus;
    var pageFullArray = mainController.mainDoc["array"][0]["array"];
    var pageOverviewArray = mainController.mainDoc["array"][1]["array"];
    var fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    var overviewModeDiv = document.querySelector(".overviewModeDiv");
    for (var i = 0; i < pageFullArray.length; i++) {
        var _a = pageViewHelperFunction.createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase), newPage = _a[0], smallView = _a[1];
        // console.log(pageFullArray[i])
        pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
    }
}
exports.buildInitialPage = buildInitialPage;
function buildInitialHTMLSkeleton(mainController) {
    var toolBoxController = new ToolBoxModel.ToolBoxClass();
    var pageArrayID = mainController.mainDocArray["mainArray_page"];
    // global htmlObjects
    var panelContainer = document.querySelector(".panelContainer");
    var pageContentContainer = document.querySelector(".pageContentContainer");
    panelContainer.style.zIndex = 100;
    var fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    fullPageModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageFull"]);
    var overviewModeDiv = document.querySelector(".overviewModeDiv");
    overviewModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageOverview"]);
    var bookmarkSubPanel = pageViewHelperFunction.createSubPanel("bookmark", true);
    var bookmarkSubPanelContent = bookmarkSubPanel.querySelector(".subPanelContent");
    var currentStatus = mainController.pageCurrentStatus;
    // create subPanel
    var pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true);
    var pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent");
    var item1 = pageViewHelperFunction.createSubPanelItem("A");
    var item2 = pageViewHelperFunction.createSubPanelItem("B");
    var item3 = pageViewHelperFunction.createSubPanelItem("C");
    var item4 = pageViewHelperFunction.createSubPanelItem("D");
    // let item5 = pageViewHelperFunction.createSubPanelItem("E")
    // let item6 = pageViewHelperFunction.createSubPanelItem("F")
    // let item7 = pageViewHelperFunction.createSubPanelItem("G")
    // let item8 = pageViewHelperFunction.createSubPanelItem("H")
    var editorControllerTemplate = document.querySelector("#editControllerTemplate");
    var editorController = editorControllerTemplate.content.cloneNode(true);
    var copyButton = editorController.querySelector(".copyButton");
    var linkButton = editorController.querySelector(".linkButton");
    var deleteButton = editorController.querySelector(".deleteButton");
    copyButton.addEventListener("click", function () {
        var selectedObject = mainController.pageCurrentStatus.selectedObject;
        var nameOfGNtype = selectedObject._type;
        var selectedObjectData = selectedObject.extract();
        selectedObjectData["data"]["cx"] += 100;
        var copiedObject = mainController.createGNObjectThroughName(nameOfGNtype, "", selectedObject.getAccessPointer(), false, false, false, false);
        copiedObject.loadFromData(selectedObjectData);
        console.log(88, selectedObjectData, copiedObject);
        selectedObject.parentNode.appendChild(copiedObject);
    });
    linkButton.addEventListener("click", function () {
        var selectedObject = mainController.pageCurrentStatus.selectedObject;
        var nameOfGNtype = selectedObject._type;
        var selectedObjectData = selectedObject.extract();
        selectedObjectData["data"]["cx"] += 100;
        //_name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true
        var parentContainerObjectID = selectedObject.parentNode.getAccessPointer();
        var linkedObject = mainController.createGNObjectThroughName(nameOfGNtype, "", parentContainerObjectID, false, selectedObject.getAccessPointer(), true);
        linkedObject.loadFromData(selectedObjectData);
        console.log(88, selectedObjectData, linkedObject);
        selectedObject.parentNode.appendChild(linkedObject);
    });
    deleteButton.addEventListener("click", function () {
        var selectedObject = mainController.pageCurrentStatus.selectedObject;
        selectedObject === null || selectedObject === void 0 ? void 0 : selectedObject.GNdelete();
        selectedObject === null || selectedObject === void 0 ? void 0 : selectedObject.remove();
    });
    // javascript created buttons
    var addInputFieldButton = document.createElement("button");
    addInputFieldButton.innerText = "addInput";
    addInputFieldButton.addEventListener("click", function () {
        var currentPage = mainController.pageCurrentStatus.currentPage;
        var newInputField = GreatNoteDataClass.GNInputField("", currentPage.getAccessPointer(), false, false, true);
        newInputField.appendTo(currentPage);
        socketFunction_1.socket.emit("clientAskServerToInitiateSynchronization");
    });
    editorController.appendChild(addInputFieldButton);
    pageControllerSubPanelContent.append(item1, item2, item3, item4, editorController);
    //===================== bookmarkSubPanel ==================//
    /** add new div, new svg*/
    // page controller
    // To create a page Controller to navigate previous and nex page
    pageViewHelperFunction.pageController(currentStatus, bookmarkSubPanelContent);
    var createNewDivButton = pageViewHelperFunction.functionButtonCreater("new Div", pageViewHelperFunction.createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer));
    var switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv);
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "saveButton";
    saveButton.addEventListener("click", function () {
        // let saveData = mainController.saveMainDoc(true)
    });
    var createNewSvg = pageViewHelperFunction.functionButtonCreater("new svg", function (e) {
    });
    var objectIDGetter = document.createElement("input");
    var objectIDGetterSubmit = document.createElement("input");
    objectIDGetterSubmit.type = "submit";
    objectIDGetterSubmit.addEventListener("click", function (e) {
        console.log(mainController.getObjectById(objectIDGetter.value), document.querySelector("*[accessPointer='" + objectIDGetter.value + "']"));
    });
    bookmarkSubPanelContent.append(createNewDivButton, switchViewModeButton, saveButton, objectIDGetter, objectIDGetterSubmit);
    // commentSubPanel
    var commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false);
    panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel);
}
exports.buildInitialHTMLSkeleton = buildInitialHTMLSkeleton;
