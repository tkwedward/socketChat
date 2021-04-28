import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteSvgDataClass"
import * as ToolBoxModel from "./ToolBoxModel"
// import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
import * as pageViewHelperFunction from "./pageViewHelperFunction"
import {MainControllerInterface} from "./constructInitialCondition"
import * as pageController from "./pageControllerFolder/pageController"
import * as LayerConroller from "./layerControllerFolder/layerController"
import * as GNCommentController from "./commentFolder/commentController"


export function buildInitialPage(mainController:MainControllerInterface, saveToDatabase=false){
    mainController.GNDataStructureMapping = {
        GNInputField: GreatNoteDataClass.GNInputField,
        GNContainerDiv: GreatNoteDataClass.GNContainerDiv,
        GNEditableDiv: GreatNoteDataClass.GNEditableDiv,
        GNImage: GreatNoteDataClass.GNImage,

        // svg
        GNSvg: GreatNoteSvgDataClass.GNSvg,
        GNSvgCircle: GreatNoteSvgDataClass.GNSvgCircle,
        GNSvgPolyLine: GreatNoteSvgDataClass.GNSvgPolyLine,
        GNSvgRect: GreatNoteSvgDataClass.GNSvgRect,
        GNComment: GNCommentController.GNComment
    }

    let pageController = mainController.pageController
    let pageFullArray = mainController.mainDoc["array"][0]["array"]
    let pageOverviewArray = mainController.mainDoc["array"][1]["array"]

    console.log("pageFullArray", pageFullArray)
    let fullPageModeDiv = <HTMLDivElement> document.querySelector(".fullPageModeDiv")
    let overviewModeDiv = <HTMLDivElement> document.querySelector(".overviewModeDiv")

    for (let i = 0; i< pageFullArray.length; i++){
        let [newPage, smallView] = pageViewHelperFunction.createNewPage(pageController, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase)
        mainController.renderDataToHTML(pageFullArray[i], newPage)

        // let commentContainer = CommentController.GNComment({name:"name", arrayID: newPage.getAccessPointer(), saveToDatabase:true})
        // commentContainer.appendTo(newPage)

        // console.log(pageFullArray[i])
        pageViewHelperFunction.insertNewPage(pageController, newPage, smallView, fullPageModeDiv, overviewModeDiv)
    }
}// buildInitialPage

export function buildInitialHTMLSkeleton(mainController: MainControllerInterface){
      let toolBoxController = new ToolBoxModel.ToolBoxClass()
      let pageArrayID = mainController.mainDocArray["mainArray_page"]
  // global htmlObjects
      let panelContainer = document.querySelector(".panelContainer")
      let pageContentContainer = document.querySelector(".pageContentContainer")
      panelContainer.style.zIndex = 100;

      let fullPageModeDiv = document.querySelector(".fullPageModeDiv")
      fullPageModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageFull"])
      let overviewModeDiv = document.querySelector(".overviewModeDiv")
      overviewModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageOverview"])

      let bookmarkSubPanel = pageViewHelperFunction.createSubPanel("bookmark", true)
      let bookmarkSubPanelContent = bookmarkSubPanel.querySelector(".subPanelContent")

      let currentStatus = mainController.pageCurrentStatus


      // toolBoxObject
      let toolBoxHtmlObject = mainController.toolBox.createToolboxHtmlObject()
      let polylineItemButton = mainController.toolBox.createNewPolyLineItemButton(toolBoxHtmlObject)
      let eraserItemButton = mainController.toolBox.createEraserItemButton(toolBoxHtmlObject)

      // create subPanel
      let pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true)
      let pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent")

      let editorControllerTemplate = document.querySelector("#editControllerTemplate")
      var editorController = editorControllerTemplate.content.cloneNode(true);

      let copyButton = editorController.querySelector(".copyButton")
      let linkButton = editorController.querySelector(".linkButton")
      let deleteButton = editorController.querySelector(".deleteButton")

      copyButton.addEventListener("click", function(){
          let selectedObject = mainController.pageCurrentStatus.selectedObject
          let nameOfGNtype = selectedObject._type
          let selectedObjectData = selectedObject.extract()
          selectedObjectData["data"]["cx"] += 100

          let copiedObject = mainController.createGNObjectThroughName(nameOfGNtype,
          {name: "", arrayID: "", insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: false})
          copiedObject.loadFromData(selectedObjectData)
          console.log(88, selectedObjectData, copiedObject)
          selectedObject.parentNode.appendChild(copiedObject)
      })

      linkButton.addEventListener("click", function(){
          let selectedObject = mainController.pageCurrentStatus.selectedObject
          let nameOfGNtype = selectedObject._type
          let selectedObjectData = selectedObject.extract()
          selectedObjectData["data"]["cx"] += 100
          //_name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true

          let parentContainerObjectID = selectedObject.parentNode.getAccessPointer()


          let linkedObject = mainController.createGNObjectThroughName(nameOfGNtype, {name: "", arrayID: parentContainerObjectID, insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: true})
          linkedObject.loadFromData(selectedObjectData)

          console.log(88, selectedObjectData, linkedObject)
          selectedObject.parentNode.appendChild(linkedObject)
      })

      deleteButton.addEventListener("click", function(){
          let selectedObject = mainController.pageCurrentStatus.selectedObject
          selectedObject?.GNdelete()
          selectedObject?.remove()
      })

      // javascript created buttons
      let addInputFieldButton = document.createElement("button")
      addInputFieldButton.innerText = "addInput"
      addInputFieldButton.addEventListener("click", function(){
          let currentPage = mainController.pageController.currentPage.fullPageHTMLObject
          let newInputField = GreatNoteDataClass.GNInputField({name: "", arrayID: currentPage.getAccessPointer(), insertPosition: false, dataPointer: false, saveToDatabase: true})
          newInputField.appendTo(currentPage)
      })

      let addSvgDivButton = document.createElement("button")
      addSvgDivButton.innerText = "addSvg"
      addSvgDivButton.addEventListener("click", function(){
          let currentPage = mainController.pageController.currentPage.fullPageHTMLObject

          let svgBoard = GreatNoteSvgDataClass.GNSvg({name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase:true})
          svgBoard.addEventListener("click", function(){
            mainController.toolBox.targetPage = svgBoard
          })

          svgBoard.appendToContainer(currentPage)
          // console.log(135, currentPage, currentPage.getAccessPointer())
      })

      let syncButton = document.createElement("button")
      syncButton.innerText = "sync"
      syncButton.addEventListener("click", function(){
          socket.emit("clientAskServerToInitiateSynchronization")
      })

      let showMainDocButton = document.createElement("button")
      showMainDocButton.innerText = "mainDoc"
      showMainDocButton.addEventListener("click", function(){
          console.log(153, mainController.mainDoc["array"][0]["array"], mainController)
      })

      let resetButton = document.createElement("button")
      resetButton.innerText = "resetButton"
      resetButton.addEventListener("click", function(){
          mainController.initalizeMainDoc()
          let saveData = mainController.saveMainDoc(true)
      })

      editorController.append(addInputFieldButton, addSvgDivButton, syncButton, showMainDocButton, resetButton)

      let layerControllerHTMLObject =  LayerConroller.createLayerController(mainController)

      pageControllerSubPanelContent.append(toolBoxHtmlObject, polylineItemButton, editorController, layerControllerHTMLObject)



      //===================== bookmarkSubPanel ==================//
      /** add new div, new svg*/

      // page controller
      // To create a page Controller to navigate previous and nex page
      pageController.pageControllerHTMLObject(mainController.pageController, bookmarkSubPanelContent)

      let createNewDivButton = pageViewHelperFunction.functionButtonCreater(
        "new Div", pageViewHelperFunction.createNewPageEvent(mainController.pageController, fullPageModeDiv, overviewModeDiv, pageContentContainer)
      )

      let deletePageButton = document.createElement("button")
      deletePageButton.innerHTML = "delete page"
      deletePageButton.addEventListener("click", function(){
          mainController.pageController.currentPage.remove()
      })

      let switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv)

      let saveButton = document.createElement("button")
      saveButton.innerHTML = "saveButton"
      saveButton.addEventListener("click", function(){
          let saveData = mainController.saveMainDoc(true)
      })


      let createNewSvg = pageViewHelperFunction.functionButtonCreater("new svg", function(e){

      })


      let objectIDGetter = document.createElement("input")
      let objectIDGetterSubmit = document.createElement("input")
      objectIDGetterSubmit.type = "submit"

      objectIDGetterSubmit.addEventListener("click", (e)=>{
          console.log(mainController.getObjectById(objectIDGetter.value), document.querySelector(`*[accessPointer='${objectIDGetter.value}']`))
      })


      bookmarkSubPanelContent.append(createNewDivButton,deletePageButton, switchViewModeButton, saveButton, objectIDGetter, objectIDGetterSubmit)

      // commentSubPanel
      let commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false)



      panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel)

}
