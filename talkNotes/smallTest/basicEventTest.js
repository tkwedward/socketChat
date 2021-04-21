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
var ToolBoxModel = __importStar(require("./ToolBoxModel"));
var pageViewHelperFunction = __importStar(require("./pageViewHelperFunction"));
var toolBoxController = new ToolBoxModel.ToolBoxClass();
// global htmlObjects
var panelContainer = document.querySelector(".panelContainer");
var pageContentContainer = document.querySelector(".pageContentContainer");
panelContainer.style.zIndex = 100;
var bookmarkSubPanel = pageViewHelperFunction.createSubPanel("bookmark", true);
var bookmarkSubPanelContent = bookmarkSubPanel.querySelector(".subPanelContent");
var fullPageModeDiv = pageContentContainer.querySelector(".fullPageModeDiv");
var overviewModeDiv = pageContentContainer.querySelector(".overviewModeDiv");
var currentStatus = {
    "newPageNumber": 1,
    "newPageDirection": 1,
    "currentPage": 0,
    "previousPage": 0,
    "nextPage": 0,
    "pageArrayFullPage": [0],
    "pageArraySmallView": [0],
    "fullPageSize": [0, 0],
    "overviewPageSize": [0, 0]
};
// create subPanel
var pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true);
var pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent");
var item1 = pageViewHelperFunction.createSubPanelItem("A");
var item2 = pageViewHelperFunction.createSubPanelItem("B");
var item3 = pageViewHelperFunction.createSubPanelItem("C");
var item4 = pageViewHelperFunction.createSubPanelItem("D");
var item5 = pageViewHelperFunction.createSubPanelItem("E");
var item6 = pageViewHelperFunction.createSubPanelItem("F");
var item7 = pageViewHelperFunction.createSubPanelItem("G");
var item8 = pageViewHelperFunction.createSubPanelItem("H");
pageControllerSubPanelContent.append(item1, item2, item3, item4, item5, item6, item7, item8);
//===================== bookmarkSubPanel ==================//
/** add new div, new svg*/
// page controller
// To create a page Controller to navigate previous and nex page
pageViewHelperFunction.pageController(currentStatus, bookmarkSubPanelContent);
var pageDummyContent = document.createElement("input");
pageDummyContent.classList.add("pageDummyContent");
pageDummyContent.style.margin = "0 auto";
var createNewDivButton = pageViewHelperFunction.functionButtonCreater("new Div", pageViewHelperFunction.createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer, pageDummyContent));
var switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv);
// pageViewHelperFunction.intializeFirstPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer)
// function switch overview with fullpage view
var createNewSvg = pageViewHelperFunction.functionButtonCreater("new svg", function (e) {
});
bookmarkSubPanelContent.append(pageDummyContent, createNewDivButton, createNewSvg, switchViewModeButton);
// commentSubPanel
var commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false);
panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel);
// initialize the first page
currentStatus.fullPageSize = [1187, 720];
currentStatus.overviewPageSize = [237.4, 144];
var _a = pageViewHelperFunction.createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer), newPage = _a[0], smallView = _a[1];
pageViewHelperFunction.insertNewPage(currentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
var pageOneFullHtml = fullPageModeDiv.querySelector(".divPage");
var pageOneOverviewHtml = overviewModeDiv.querySelector(".divPageSmall");
var fullPageToOverviewScale = 0.2;
