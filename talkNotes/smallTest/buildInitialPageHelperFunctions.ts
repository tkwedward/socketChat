import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteSvgDataClass"
import * as ToolBoxModel from "./ToolBoxModel"
// import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
import * as pageViewHelperFunction from "./pageViewHelperFunction"
import {MainControllerInterface} from "./constructInitialCondition"

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
        GNSvgRect: GreatNoteSvgDataClass.GNSvgRect
    }

    let currentStatus = mainController.pageCurrentStatus
    let pageFullArray = mainController.mainDoc["array"][0]["array"]
    let pageOverviewArray = mainController.mainDoc["array"][1]["array"]

    console.log("pageFullArray", pageFullArray)
    let fullPageModeDiv = document.querySelector(".fullPageModeDiv")
    let overviewModeDiv = document.querySelector(".overviewModeDiv")

    for (let i = 0; i< pageFullArray.length; i++){
        let [newPage, smallView] = pageViewHelperFunction.createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase)
        console.log(37, pageFullArray[i], newPage)
        mainController.renderDataToHTML(pageFullArray[i], newPage)

        // console.log(pageFullArray[i])
        pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv)
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
          let currentPage = mainController.pageCurrentStatus.currentPage
          let newInputField = GreatNoteDataClass.GNInputField({name: "", arrayID: currentPage.getAccessPointer(), insertPosition: false, dataPointer: false, saveToDatabase: true})
          newInputField.appendTo(currentPage)
      })

      let addSvgDivButton = document.createElement("button")
      addSvgDivButton.innerText = "addSvg"
      addSvgDivButton.addEventListener("click", function(){
          let currentPage = mainController.pageCurrentStatus.currentPage

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

      // layerController
      let layerControllerTemplate = document.querySelector("#layerControllerTemplate")
      let layerControllerHTMLObject = layerControllerTemplate.content.cloneNode(true);
      let addDivLayerButton = layerControllerHTMLObject.querySelector(".addDivLayerButton")
      addDivLayerButton.addEventListener("click", function(){
          let currentPage = mainController.pageCurrentStatus.currentPage
          console.log("add a new div layer")
          let divLayer = GreatNoteDataClass.GNContainerDiv({name:"", arrayID: currentPage.getAccessPointer(), saveToDatabase: true})
          divLayer.applyStyle({width: "100%", height: "100%", background:"blue", "position": "absolute", "left": "0px", "right": "0px"})
          divLayer.classList.add("divLayer")
          divLayer.appendTo(currentPage)

      })
      let addSvgLayerButton = layerControllerHTMLObject.querySelector(".addSvgLayerButton")
      addSvgLayerButton.addEventListener("click", function(){
          console.log("add a new svg layer")
          let currentPage = mainController.pageCurrentStatus.currentPage
          let svgLayer = GreatNoteSvgDataClass.GNSvg({name:"", arrayID: currentPage.getAccessPointer(), saveToDatabase: true})
          console.log(mainController.toolBox.registerSvg)
          mainController.toolBox.registerSvg(svgLayer)

          svgLayer.applyStyle({width: "100%", height: "100%", background:"gold", position: "absolute", left: "0px", top: "0px"})
          mainController.saveHTMLObjectToDatabase(svgLayer)
          console.log(svgLayer)
          svgLayer.classList.add("svgLayer")
          svgLayer.appendTo(currentPage)
      })





      pageControllerSubPanelContent.append(toolBoxHtmlObject, polylineItemButton, editorController, layerControllerHTMLObject)



      //===================== bookmarkSubPanel ==================//
      /** add new div, new svg*/

      // page controller
      // To create a page Controller to navigate previous and nex page
      pageViewHelperFunction.pageController(currentStatus, bookmarkSubPanelContent)

      let createNewDivButton = pageViewHelperFunction.functionButtonCreater(
        "new Div", pageViewHelperFunction.createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageContentContainer)
      )

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


      bookmarkSubPanelContent.append(createNewDivButton, switchViewModeButton, saveButton, objectIDGetter, objectIDGetterSubmit)

      // commentSubPanel
      let commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false)



      panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel)

}
