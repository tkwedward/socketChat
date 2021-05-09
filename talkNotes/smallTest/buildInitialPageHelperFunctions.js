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
exports.attachEvents = exports.buildInitialPage = exports.buildInitialHTMLSkeleton = exports.buildPageController = exports.buildToolBoxHtmlObject = exports.buildPageControllerButtonArray = exports.getDivFromHTML = void 0;
var ClipboardEvent = __importStar(require("./clipboardEvents"));
var GreatNoteSvgDataClass = __importStar(require("./GreatNoteClass/GreatNoteSvgDataClass"));
var GreatNoteDataClass = __importStar(require("./GreatNoteClass/GreatNoteDataClass"));
var socketFunction_1 = require("./socketFunction");
var GNCommentController = __importStar(require("./commentFolder/commentController"));
var LayerConroller = __importStar(require("./layerControllerFolder/layerController"));
var pageController = __importStar(require("./pageControllerFolder/pageController"));
var pageViewHelperFunction = __importStar(require("./pageViewHelperFunction"));
var InitializeAttributeControllerFunction = __importStar(require("./attributeControllerFolder/initializeAttributeControllers"));
var SwipeEventController = __importStar(require("./EventFolder/swipeEvent"));
var TestHelper = __importStar(require("./testFolder/testHelperFunction"));
var WindowController = __importStar(require("./EventFolder/specialWindowObject"));
function getDivFromHTML(mainController) {
    var pageArrayID = mainController.mainDocArray["mainArray_page"];
    // global htmlObjects
    var panelContainer = document.querySelector(".panelContainer");
    var pageContentContainer = document.querySelector(".pageContentContainer");
    panelContainer.style.zIndex = 100;
    var fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    fullPageModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageFull"]);
    var overviewModeDiv = document.querySelector(".overviewModeDiv");
    overviewModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageOverview"]);
    overviewModeDiv.setAttribute("status", "off");
    var bookmarkSubPanel = pageViewHelperFunction.createSubPanel("bookmark", true);
    var bookmarkSubPanelContent = bookmarkSubPanel.querySelector(".subPanelContent");
    return { pageArrayID: pageArrayID, panelContainer: panelContainer, pageContentContainer: pageContentContainer, fullPageModeDiv: fullPageModeDiv, overviewModeDiv: overviewModeDiv, bookmarkSubPanel: bookmarkSubPanel, bookmarkSubPanelContent: bookmarkSubPanelContent };
}
exports.getDivFromHTML = getDivFromHTML;
function buildPageControllerButtonArray(mainController) {
    // create subPanel
    var pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true);
    var pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent");
    var testValuePanel = document.createElement("div");
    testValuePanel.classList.add("testValuePanel");
    pageControllerSubPanelContent.appendChild(testValuePanel);
    var editorControllerTemplate = document.querySelector("#editControllerTemplate");
    var editorController = editorControllerTemplate.content.cloneNode(true);
    console.log(484848, editorController);
    // attribute controller
    var attributePanel = editorController.querySelector(".attributePanel");
    InitializeAttributeControllerFunction.initializeMainControllerAttributeControllerMapping(mainController);
    Object.values(mainController.attributeControllerMapping).forEach(function (p) {
        attributePanel.appendChild(p);
    });
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
        selectedObject.parentNode.appendChild(linkedObject);
    });
    deleteButton.addEventListener("click", function () {
        var selectedObject = document.querySelector(".selectedObject");
        selectedObject.deleteFromDatabase();
        // selectedObject?.remove()
    });
    var testFieldButton = document.createElement("button");
    testFieldButton.innerText = "testFieldButton";
    testFieldButton.addEventListener("click", function () {
        var testFieldDiv = document.querySelector(".testField");
        if (testFieldDiv.classList.contains("open")) {
            testFieldDiv.classList.remove("open");
        }
        else {
            testFieldDiv.classList.add("open");
        }
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
    });
    var objectIDGetter = document.createElement("input");
    var objectIDGetterSubmit = document.createElement("input");
    objectIDGetterSubmit.type = "submit";
    objectIDGetter.style.border = "3px solid gold";
    objectIDGetterSubmit.style.background = "gold";
    objectIDGetterSubmit.addEventListener("click", function (e) {
        console.log(mainController.getObjectById(objectIDGetter.value), document.querySelector("*[accessPointer='" + objectIDGetter.value + "']"));
    });
    editorController.append(objectIDGetter, objectIDGetterSubmit, testFieldButton, showMainDocButton, resetButton);
    // toolBoxObject
    var toolBoxHtmlObject = buildToolBoxHtmlObject(mainController);
    pageControllerSubPanelContent.append(toolBoxHtmlObject, editorController);
    return { pageControllerSubPanel: pageControllerSubPanel, pageControllerSubPanelContent: pageControllerSubPanelContent, testFieldButton: testFieldButton, copyButton: copyButton, linkButton: linkButton, deleteButton: deleteButton, showMainDocButton: showMainDocButton, resetButton: resetButton };
}
exports.buildPageControllerButtonArray = buildPageControllerButtonArray;
function buildToolBoxHtmlObject(mainController) {
    var toolBoxHtmlObject = mainController.toolBox.createToolboxHtmlObject();
    var eraserItemButton = mainController.toolBox.createEraserItemButton(toolBoxHtmlObject);
    var polylineItemButton = mainController.toolBox.createNewPolyLineItemButton(toolBoxHtmlObject);
    var selectionToolItemButton = mainController.toolBox.createSelectionToolItemButton(toolBoxHtmlObject);
    var addCommentItemButton = mainController.toolBox.createAddCommentButton(toolBoxHtmlObject);
    var moveObjectInDivButton = mainController.toolBox.createMoveObjectInDivButton(toolBoxHtmlObject);
    toolBoxHtmlObject.append(eraserItemButton, polylineItemButton, selectionToolItemButton, addCommentItemButton, moveObjectInDivButton);
    return toolBoxHtmlObject;
}
exports.buildToolBoxHtmlObject = buildToolBoxHtmlObject;
function buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer) {
    // page controller
    // To create a page Controller to navigate previous and nex page
    pageController.pageControllerHTMLObject(mainController.pageController, bookmarkSubPanelContent);
    var createNewDivButton = pageViewHelperFunction.functionButtonCreater("new Div", pageViewHelperFunction.createNewPageEvent(mainController.pageController, fullPageModeDiv, overviewModeDiv, pageContentContainer));
    var deletePageButton = document.createElement("button");
    deletePageButton.innerHTML = "delete page";
    deletePageButton.addEventListener("click", function () {
        var currentPageNumber = mainController.pageController.currentPage.pageNumber;
        mainController.pageController.deletePage(currentPageNumber);
        mainController.pageController.currentPage.fullPageHTMLObject.deleteFromDatabase();
        mainController.pageController.goToPage(currentPageNumber - 1);
        mainController.pageController.updatePageNumber(mainController.pageController.currentPage);
    });
    var switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv);
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "saveButton";
    saveButton.addEventListener("click", function () {
        var saveData = mainController.saveMainDoc(true);
        socketFunction_1.socket.emit("saveNotebookUsingClientData", saveData);
    });
    var layerControllerHTMLObject = LayerConroller.createLayerController(mainController);
    bookmarkSubPanelContent.append(createNewDivButton, deletePageButton, switchViewModeButton, layerControllerHTMLObject, saveButton);
}
exports.buildPageController = buildPageController;
function buildInitialHTMLSkeleton(mainController) {
    var currentStatus = mainController.pageCurrentStatus;
    var _a = getDivFromHTML(mainController), pageArrayID = _a.pageArrayID, panelContainer = _a.panelContainer, pageContentContainer = _a.pageContentContainer, fullPageModeDiv = _a.fullPageModeDiv, overviewModeDiv = _a.overviewModeDiv, bookmarkSubPanel = _a.bookmarkSubPanel, bookmarkSubPanelContent = _a.bookmarkSubPanelContent;
    var _b = buildPageControllerButtonArray(mainController), pageControllerSubPanel = _b.pageControllerSubPanel, pageControllerSubPanelContent = _b.pageControllerSubPanelContent, testFieldButton = _b.testFieldButton, copyButton = _b.copyButton, linkButton = _b.linkButton, deleteButton = _b.deleteButton, showMainDocButton = _b.showMainDocButton, resetButton = _b.resetButton;
    //===================== bookmarkSubPanel ==================//
    buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer);
    // commentSubPanel
    var commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false);
    // add events: initalizeWindowObject, addPasteImageEvent, swipeDetection
    attachEvents(mainController, pageContentContainer);
    socketFunction_1.socket.emit("clientAskServerForSocketData");
    panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel);
} // buildInitialHTMLSkeleton
exports.buildInitialHTMLSkeleton = buildInitialHTMLSkeleton;
function buildInitialPage(mainController, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = false; }
    mainController.GNDataStructureMapping = {
        GNInputField: GreatNoteDataClass.GNInputField,
        GNContainerDiv: GreatNoteDataClass.GNContainerDiv,
        GNImageContainer: GreatNoteDataClass.GNImageContainer,
        // svg
        GNSvg: GreatNoteSvgDataClass.GNSvg,
        GNSvgCircle: GreatNoteSvgDataClass.GNSvgCircle,
        GNSvgPolyLine: GreatNoteSvgDataClass.GNSvgPolyLine,
        GNSvgRect: GreatNoteSvgDataClass.GNSvgRect,
        GNComment: GNCommentController.GNComment
    };
    var pageController = mainController.pageController;
    var pageFullArray = mainController.mainDoc["array"][0]["array"];
    var pageOverviewArray = mainController.mainDoc["array"][1]["array"];
    var fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    var overviewModeDiv = document.querySelector(".overviewModeDiv");
    for (var i = 0; i < pageFullArray.length; i++) {
        var _a = pageViewHelperFunction.createNewPage(pageController, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase), newPage = _a[0], smallView = _a[1];
        mainController.renderDataToHTML(pageFullArray[i], newPage);
        // let commentContainer = CommentController.GNComment({name:"name", arrayID: newPage.getAccessPointer(), saveToDatabase:true})
        pageViewHelperFunction.insertNewPage(pageController, newPage, smallView, fullPageModeDiv, overviewModeDiv);
    }
    mainController.layerController.renderCurrentPageLayer();
    TestHelper.testFunction(mainController);
} // buildInitialPage
exports.buildInitialPage = buildInitialPage;
function attachEvents(mainController, pageContentContainer) {
    WindowController.initalizeWindowObject();
    // clipboard event
    ClipboardEvent.addPasteImageEvent(mainController);
    // to add swipe, panning events to the pageContentContainer
    SwipeEventController.swipeDetection(mainController, pageContentContainer);
}
exports.attachEvents = attachEvents;
