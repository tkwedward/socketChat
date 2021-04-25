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


    let fullPageModeDiv = document.querySelector(".fullPageModeDiv")
    let overviewModeDiv = document.querySelector(".overviewModeDiv")


    for (let i = 0; i< pageFullArray.length; i++){
        let [newPage, smallView] = pageViewHelperFunction.createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase)
        // console.log(pageFullArray[i])
        pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv)
    }

}


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

      // create subPanel
      let pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true)
      let pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent")
      let item1 = pageViewHelperFunction.createSubPanelItem("A")
      let item2 = pageViewHelperFunction.createSubPanelItem("B")
      let item3 = pageViewHelperFunction.createSubPanelItem("C")
      let item4 = pageViewHelperFunction.createSubPanelItem("D")
      // let item5 = pageViewHelperFunction.createSubPanelItem("E")
      // let item6 = pageViewHelperFunction.createSubPanelItem("F")
      // let item7 = pageViewHelperFunction.createSubPanelItem("G")
      // let item8 = pageViewHelperFunction.createSubPanelItem("H")

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

          let copiedObject = mainController.createGNObjectThroughName(nameOfGNtype, "", selectedObject.getAccessPointer(), false, false, false, false)

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


          let linkedObject = mainController.createGNObjectThroughName(nameOfGNtype, "", parentContainerObjectID, false, selectedObject.getAccessPointer(), true)
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
          let newInputField = GreatNoteDataClass.GNInputField("", currentPage.getAccessPointer(), false, false, true)
          newInputField.appendTo(currentPage)
          socket.emit("clientAskServerToInitiateSynchronization")
      })
      editorController.appendChild(addInputFieldButton)


      pageControllerSubPanelContent.append(item1, item2, item3, item4, editorController)



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
          // let saveData = mainController.saveMainDoc(true)
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
