import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteSvgDataClass"
import * as ToolBoxModel from "./ToolBoxModel"
import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
import * as pageViewHelperFunction from "./pageViewHelperFunction"

let toolBoxController = new ToolBoxModel.ToolBoxClass()
let pageArrayID = mainController.mainDocArray["mainArray_page"]
// global htmlObjects
let panelContainer = document.querySelector(".panelContainer")
let pageContentContainer = document.querySelector(".pageContentContainer")
panelContainer.style.zIndex = 100;

// let fullPageModeDiv = GreatNoteDataClass.GNContainerDiv("fullPageModeDiv", pageArrayID)
// let overviewModeDiv = GreatNoteDataClass.GNContainerDiv("overviewModeDiv", pageArrayID)
let fullPageModeDiv = document.querySelector(".fullPageModeDiv")
let overviewModeDiv = document.querySelector(".overviewModeDiv")

let bookmarkSubPanel = pageViewHelperFunction.createSubPanel("bookmark", true)
let bookmarkSubPanelContent = bookmarkSubPanel.querySelector(".subPanelContent")

let currentStatus = {
  "newPageNumber": 1,
  "newPageDirection": 1,
  "htmlObject": GreatNoteDataClass.GNContainerDiv,
  "currentPage": 0,
  "previousPage": 0,
  "nextPage": 0,
  "pageArrayFullPage": [0],
  "pageArraySmallView": [0],
  "fullPageSize": [0, 0],
  "overviewPageSize": [0, 0]
}

// create subPanel
let pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true)
let pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent")
let item1 = pageViewHelperFunction.createSubPanelItem("A")
let item2 = pageViewHelperFunction.createSubPanelItem("B")
let item3 = pageViewHelperFunction.createSubPanelItem("C")
let item4 = pageViewHelperFunction.createSubPanelItem("D")
let item5 = pageViewHelperFunction.createSubPanelItem("E")
let item6 = pageViewHelperFunction.createSubPanelItem("F")
let item7 = pageViewHelperFunction.createSubPanelItem("G")
let item8 = pageViewHelperFunction.createSubPanelItem("H")
pageControllerSubPanelContent.append(item1, item2, item3, item4, item5, item6, item7, item8)

//===================== bookmarkSubPanel ==================//
/** add new div, new svg*/

// page controller
// To create a page Controller to navigate previous and nex page
pageViewHelperFunction.pageController(currentStatus, bookmarkSubPanelContent)


let pageDummyContent = document.createElement("input")
pageDummyContent.classList.add("pageDummyContent")
pageDummyContent.style.margin = "0 auto"
let createNewDivButton = pageViewHelperFunction.functionButtonCreater(
  "new Div", pageViewHelperFunction.createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer, pageDummyContent)
)
let switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv)

let saveButton = document.createElement("button")
saveButton.innerHTML = "saveButton"
saveButton.addEventListener("click", function(){
    let saveData = mainController.saveMainDoc(true)
})


let createNewSvg = pageViewHelperFunction.functionButtonCreater("new svg", function(e){

})

bookmarkSubPanelContent.append(pageDummyContent, createNewDivButton, switchViewModeButton, saveButton)

// commentSubPanel
let commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false)

panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel)


// initialize the first page
// currentStatus.fullPageSize = [1187, 720]
// currentStatus.overviewPageSize = [237.4, 144]

// let [newPage, smallView] = pageViewHelperFunction.createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer)
// pageViewHelperFunction.insertNewPage(currentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv)
//
//
// let pageOneFullHtml = fullPageModeDiv.querySelector(`.divPage`)
// let pageOneOverviewHtml = overviewModeDiv.querySelector(`.divPageSmall`)
// let fullPageToOverviewScale = 0.2
// mainController.getMainDocChange()
// let saveFile = mainController.saveMainDoc()
// mainController.sendSaveMessageToSocket(saveFile)
mainController.getLoadDataFromSocket()
// console.log("loadData", mainController.mainDoc)
