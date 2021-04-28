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
exports.createNewPageEvent = exports.insertNewPage = exports.addEventToNewPage = exports.fillInSmallViewDataContent = exports.fillInNewPageDataContent = exports.createNewPage = exports.createSwitchViewModeButton = exports.functionButtonCreater = exports.createSubPanelItem = exports.createSubPanel = void 0;
var constructInitialCondition_1 = require("./constructInitialCondition");
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var pageController_1 = require("./pageControllerFolder/pageController");
// import {pageController, updatePageController, updatePageNumberInNewOrder, highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"
//@auto-fold here
function createSubPanel(name, first) {
    var subPanelTemplate = document.querySelector("#subPanelTemplate");
    var subPanel = document.importNode(subPanelTemplate.content, true);
    var subPanelNavbarTitle = subPanel.querySelector(".subPanelTitle");
    subPanelNavbarTitle.innerHTML = name + "SubPanel";
    var subPanelContent = subPanel.querySelector(".subPanelContent");
    subPanelContent.parentNode.classList.add(name + "SubPanel");
    if (first) {
        subPanelContent.setAttribute("status", "open");
    }
    else {
        subPanelContent.setAttribute("status", "close");
    }
    var subPanelSwitch = subPanel.querySelector(".subPanelSwitch");
    subPanelSwitch.addEventListener("click", function (event) {
        var newStatus = subPanelContent.getAttribute("status") == "open" ? "close" : "open";
        subPanelContent.setAttribute("status", newStatus);
    });
    return subPanel;
}
exports.createSubPanel = createSubPanel;
//@auto-fold here
function createSubPanelItem(name) {
    // to create subpanel and fill with subPanelItem
    var subPanelItem = document.createElement("div");
    subPanelItem.classList.add("subPanelItem", name + "SubPanelItem");
    subPanelItem.innerText = name[0];
    subPanelItem.addEventListener("click", function () {
        var subPanelArray = subPanelItem.parentNode.querySelectorAll(".subPanelItem");
        Array.from(subPanelArray).forEach(function (p) {
            p.setAttribute("status", "off");
        });
        subPanelItem.setAttribute("status", "on");
    });
    return subPanelItem;
}
exports.createSubPanelItem = createSubPanelItem;
//@auto-fold here
function functionButtonCreater(name, buttonFunction) {
    var functionButton = document.createElement("div");
    functionButton.innerHTML = name;
    functionButton.classList.add("functionButton");
    functionButton.addEventListener("click", buttonFunction);
    return functionButton;
}
exports.functionButtonCreater = functionButtonCreater;
function createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv) {
    var switchViewModeButton = document.createElement("button");
    switchViewModeButton.innerText = "pageMode";
    switchViewModeButton.setAttribute("mode", "pageMode");
    switchViewModeButton.addEventListener("click", function (e) {
        var mode = (switchViewModeButton.getAttribute("mode") == "overviewMode") ? "pageMode" : "overviewMode";
        switchViewModeButton.setAttribute("mode", mode);
        switchViewModeButton.innerText = mode;
        if (mode == "overviewMode") {
            fullPageModeDiv.setAttribute("status", "off");
            overviewModeDiv.setAttribute("status", "on");
            // pageViewHelperFunction.renderOverviewMode()
        }
        else {
            fullPageModeDiv.setAttribute("status", "on");
            overviewModeDiv.setAttribute("status", "off");
            // pageViewHelperFunction.renderFullPageMode()
        }
    });
    return switchViewModeButton;
}
exports.createSwitchViewModeButton = createSwitchViewModeButton;
function createNewPage(pageController, fullPageModeDiv, overviewModeDiv, fullPageData, overviewPageData, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var newPage = GreatNoteDataClass.GNContainerDiv({ name: "fullPage", arrayID: constructInitialCondition_1.mainController.mainDocArray["mainArray_pageFull"], insertPosition: false, dataPointer: false, saveToDatabase: saveToDatabase, specialCreationMessage: "createNewFullPageObject" });
    newPage.classList.add("divPage");
    newPage._dataStructure = ["innerText"];
    newPage._styleStructure = ["background", "width", "height"];
    var newPageAccesssPointer = saveToDatabase ? newPage.getAccessPointer() : false; // to avoid error when saveToDatabase is false and you cannot get the accessPointer of the new pagge
    var smallView = GreatNoteDataClass.GNContainerDiv({ name: "overviewPage", arrayID: constructInitialCondition_1.mainController.mainDocArray["mainArray_pageOverview"], insertPosition: false, dataPointer: newPageAccesssPointer, saveToDatabase: saveToDatabase, specialCreationMessage: "createNewOverviewPageObject" });
    smallView.classList.add("divPageSmall");
    smallView._dataStructure = ["innerText"];
    smallView._styleStructure = ["background", "width", "height"];
    smallView.style.background = "pink";
    smallView.style.width = pageController.overviewPageSize[0] + "px";
    smallView.style.height = pageController.overviewPageSize[1] + "px";
    // ==========================
    // add events to smallView
    // ==========================
    // smallViewDescription.innerText = `${pkmDatabase[dummyNumber].name}`
    // ==========================
    // add events to smallView
    // ==========================
    addEventToNewPage(pageController, newPage);
    clickEventOfSmallPage(pageController, smallView);
    // if saveToDatabase is false, then you do not need to save it
    if (saveToDatabase) {
        newPage.saveHTMLObjectToDatabase();
        smallView.saveHTMLObjectToDatabase();
    }
    if (fullPageData && overviewPageData) {
        fillInNewPageDataContent(newPage, fullPageData);
        fillInSmallViewDataContent(smallView, overviewPageData);
        // fillInDataContent(fullPageData, overviewPageData)
        // socket.emit("clientAskServerToInitiateSynchronization")
    }
    return [newPage, smallView];
}
exports.createNewPage = createNewPage;
function fillInNewPageDataContent(newPage, fullPageData) {
    newPage.initializeHTMLObjectFromData(fullPageData);
    console.log(227, fullPageData);
    newPage.innerText = fullPageData.data.innerText;
}
exports.fillInNewPageDataContent = fillInNewPageDataContent;
function fillInSmallViewDataContent(smallView, overviewPageData) {
    smallView.initializeHTMLObjectFromData(overviewPageData);
    var smallViewDescription = smallView.querySelector(".smallViewDescription");
    // smallViewDescription.innerText = overviewPageData.data.innerText
}
exports.fillInSmallViewDataContent = fillInSmallViewDataContent;
function addEventToNewPage(pageController, newPage) {
    newPage.addEventListener("click", function (e) {
        if (newPage.contains(e.target)) {
            if (pageController.selectedObject)
                pageController.selectedObject.classList.remove("selectedObject");
            pageController.selectedObject = e.target;
            e.target.classList.add("selectedObject");
        }
    });
}
exports.addEventToNewPage = addEventToNewPage;
function insertNewPage(pageController, newFullPage, newSmallView, fullPageModeDiv, overviewModeDiv) {
    pageController.addPage(newFullPage, newSmallView);
    // ==========================
    // appending new pages to the fullPageModeDiv and overviewModeDiv
    //==========================
    // newFullPage.setAttribute("pageNumber", newPageNumber)
    fullPageModeDiv.append(newFullPage);
    // newSmallView.setAttribute("pageNumber", newPageNumber)
    overviewModeDiv.append(newSmallView);
    // highlight and update the pageNumberInput
    var pageNumberInput = document.querySelector(".pageNumberInput");
    pageNumberInput.value = pageController.currentPage.pageNumber;
    // highlightCurrentPageInOverviewMode(newSmallView, pageController)
}
exports.insertNewPage = insertNewPage;
//@auto-fold here
function createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageDummyContent, htmlObject) {
    // when click the new page button, a new page is created.
    // add new page fullPageMode
    var clickEventAction = function () {
        var _a = createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv), newPage = _a[0], smallView = _a[1];
        insertNewPage(currentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
    };
    return clickEventAction;
}
exports.createNewPageEvent = createNewPageEvent;
function clickEventOfSmallPage(currentStatus, smallPage) {
    // click
    smallPage.addEventListener("click", function () {
        var clickedPageNumber = smallPage.getAttribute("pageNumber");
        // the next page is the clicked page + 1
        currentStatus.newPageNumber = parseInt(clickedPageNumber) + 1;
        pageController_1.highlightCurrentPageInOverviewMode(smallPage, clickedPageNumber, currentStatus);
        for (var i = 1; i < currentStatus.pageArrayFullPage.length; i++) {
            if (i < clickedPageNumber) {
                // pages before the clicked page
                currentStatus.pageArrayFullPage[i].style.left = "-100vw";
            }
            else if (i == clickedPageNumber) {
                currentStatus.pageArrayFullPage[i].style.left = "0";
            }
            else {
                currentStatus.pageArrayFullPage[i].style.left = "+100vw";
            }
        }
        // updatePageController(currentStatus, clickedPageNumber)
    });
}
// extract and create data object do not directly save object to the database.
// What is saved to the database is controlled by the saveHTMLOBjectTODatabase function in the mainController file
