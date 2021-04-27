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
var pageController = __importStar(require("./pageControllerFolder/pageController"));
var LayerConroller = __importStar(require("./layerControllerFolder/layerController"));
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
    console.log("pageFullArray", pageFullArray);
    var fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    var overviewModeDiv = document.querySelector(".overviewModeDiv");
    for (var i = 0; i < pageFullArray.length; i++) {
        var _a = pageViewHelperFunction.createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase), newPage = _a[0], smallView = _a[1];
        console.log(37, pageFullArray[i], newPage);
        mainController.renderDataToHTML(pageFullArray[i], newPage);
        // console.log(pageFullArray[i])
        pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
    }
} // buildInitialPage
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
    // toolBoxObject
    var toolBoxHtmlObject = mainController.toolBox.createToolboxHtmlObject();
    var polylineItemButton = mainController.toolBox.createNewPolyLineItemButton(toolBoxHtmlObject);
    var eraserItemButton = mainController.toolBox.createEraserItemButton(toolBoxHtmlObject);
    // create subPanel
    var pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true);
    var pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent");
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
        var copiedObject = mainController.createGNObjectThroughName(nameOfGNtype, { name: "", arrayID: "", insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: false });
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
        var linkedObject = mainController.createGNObjectThroughName(nameOfGNtype, { name: "", arrayID: parentContainerObjectID, insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: true });
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
        var newInputField = GreatNoteDataClass.GNInputField({ name: "", arrayID: currentPage.getAccessPointer(), insertPosition: false, dataPointer: false, saveToDatabase: true });
        newInputField.appendTo(currentPage);
    });
    var addSvgDivButton = document.createElement("button");
    addSvgDivButton.innerText = "addSvg";
    addSvgDivButton.addEventListener("click", function () {
        var currentPage = mainController.pageCurrentStatus.currentPage;
        var svgBoard = GreatNoteSvgDataClass.GNSvg({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true });
        svgBoard.addEventListener("click", function () {
            mainController.toolBox.targetPage = svgBoard;
        });
        svgBoard.appendToContainer(currentPage);
        // console.log(135, currentPage, currentPage.getAccessPointer())
    });
    var syncButton = document.createElement("button");
    syncButton.innerText = "sync";
    syncButton.addEventListener("click", function () {
        socketFunction_1.socket.emit("clientAskServerToInitiateSynchronization");
    });
    var showMainDocButton = document.createElement("button");
    showMainDocButton.innerText = "mainDoc";
    showMainDocButton.addEventListener("click", function () {
        console.log(153, mainController.mainDoc["array"][0]["array"], mainController);
    });
    var resetButton = document.createElement("button");
    resetButton.innerText = "resetButton";
    resetButton.addEventListener("click", function () {
        mainController.initalizeMainDoc();
        var saveData = mainController.saveMainDoc(true);
    });
    editorController.append(addInputFieldButton, addSvgDivButton, syncButton, showMainDocButton, resetButton);
    var layerControllerHTMLObject = LayerConroller.createLayerController(mainController);
    pageControllerSubPanelContent.append(toolBoxHtmlObject, polylineItemButton, editorController, layerControllerHTMLObject);
    //===================== bookmarkSubPanel ==================//
    /** add new div, new svg*/
    // page controller
    // To create a page Controller to navigate previous and nex page
    pageController.pageController(currentStatus, bookmarkSubPanelContent);
    var createNewDivButton = pageViewHelperFunction.functionButtonCreater("new Div", pageViewHelperFunction.createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer));
    var switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv);
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "saveButton";
    saveButton.addEventListener("click", function () {
        var saveData = mainController.saveMainDoc(true);
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
