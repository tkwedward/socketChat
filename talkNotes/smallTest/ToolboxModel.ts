import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSVGDataClass"
import {mainController} from "./constructInitialCondition"
import {polylineMouseDownFunction, polylineMouseMoveFunction, polylineMouseUpFunction} from "./ToolboxFolder/ToolboxEventFunction"
import * as EraserFunction from "./ToolboxFolder/eraserFunction"

export interface ToolBoxInterface extends HTMLDivElement{
    itemArray: any[]       // to mark the status of the button
    targetPage: any
    currentActiveButton: any
    toolBoxItemStatus: any
    currentActiveEventFunction: (event)=>void
    currentActiveEventName:string
    selectionHTMLObject: HTMLDivElement
    optionHTMLObject: HTMLDivElement
    activateToolboxItem(toolBoxItem)

    createToolBoxItem(name:string, toolBoxHtmlObject: HTMLDivElement):HTMLDivElement    // to create an item

    checkToolBoxItemStatus(itemName):boolean
    switchToolBoxItemStatus(itemName:string)

    registerSvg(svgLayer)
}


export interface ToolBoxItemInterface extends HTMLDivElement{
    status: boolean       // to mark the stats of the button
    _parent: any          // to indicate the parent of the item
    eventFunction: any
    eventName: string
    activate()
    deactivate()
    resetButton()         // to reset the button when other buttons aare clked
}

interface ToolBoxItemStatusInterface {
    currentActiveButton: string
    polylineItemButton: {status: boolean, attributeController: string}
    eraserItemButton: {status: boolean, attributeController: string}
    selectionToolItemButton: {status: boolean, attributeController: string}
    addCommentItemButton: {status: boolean, attributeController: string}
    moveObjectInDivButton: {status: boolean, attributeController: string}
}


export class ToolBoxClass implements ToolBoxInterface {
    itemArray: any[]       // to mark the status of the button
    targetPage: any
    currentActiveButton: any
    currentActiveEventFunction: (event)=>void
    currentActiveEventName:string
    selectionHTMLObject: HTMLDivElement
    optionHTMLObject: HTMLDivElement
    activateToolboxItem: any
    //  check the item status
    toolBoxItemStatus: ToolBoxItemStatusInterface= {
        currentActiveButton: "",
        polylineItemButton: {
            status: false,
            attributeController: "polylineController"
        },
        eraserItemButton: {
            status: false,
            attributeController: "eraserController"
        },
        selectionToolItemButton: {
            status: false,
            attributeController: "selectionTool"
        },
        addCommentItemButton: {
            status: false,
            attributeController: "addCommentController"
        },
        moveObjectInDivButton: {
            status: false,
            attributeController: "moveObjectInDivController"
        }
    }


    checkToolBoxItemStatus(itemName){
        return this.toolBoxItemStatus[itemName]["status"]
    }

    switchToolBoxItemStatus(itemName){
      // turn off the attributeController and status of the buttom thaat is active
      let currentActiveButton = this.toolBoxItemStatus.currentActiveButton
        if (currentActiveButton){
            this.toolBoxItemStatus[currentActiveButton]["status"] = !this.toolBoxItemStatus[currentActiveButton]["status"]

            // turn off attributeControllerWant
            let attributeControllerWantToTurnedOff = getAttributeController(this.toolBoxItemStatus, currentActiveButton)
            if (attributeControllerWantToTurnedOff) attributeControllerWantToTurnedOff["style"].display = "none"
            console.log(858585858, attributeControllerWantToTurnedOff)
        }

        this.toolBoxItemStatus.currentActiveButton = itemName
        this.toolBoxItemStatus[itemName]["status"] = !this.toolBoxItemStatus[itemName]["status"]

        // turn on attributeControllerWantToturn on
        let attributeControllerWantToTurnedOn =  getAttributeController(this.toolBoxItemStatus, itemName)
        if (attributeControllerWantToTurnedOn) attributeControllerWantToTurnedOn["style"].display = "block"
        console.log(858585858, attributeControllerWantToTurnedOn)
    }

    createToolboxHtmlObject(){
        let self = this
        let toolBoxContainer = <ToolBoxInterface>document.createElement("div")

        toolBoxContainer.classList.add("toolBoxHtml")
        this.itemArray = []

        let toolBoxSelectionHtmlObject = document.createElement("div")
        toolBoxSelectionHtmlObject.classList.add("toolBoxSelectionHtmlObject")

        let toolBoxOptionHtmlObject = document.createElement("div")
        toolBoxOptionHtmlObject.classList.add("toolBoxOption")

        toolBoxContainer.selectionHTMLObject  = toolBoxSelectionHtmlObject
        toolBoxContainer.optionHTMLObject = toolBoxOptionHtmlObject


        toolBoxContainer.appendChild(toolBoxSelectionHtmlObject)
        return toolBoxContainer
    }

    createToolBoxItem(name, toolBoxContainer):ToolBoxItemInterface{
        let toolBoxItem = <ToolBoxItemInterface> document.createElement("div")
        // the html style part
        toolBoxItem.classList.add("toolBoxItem", name)
        toolBoxItem.innerText = name[0]

        let squreLength = "40px"
        toolBoxItem.style.width = squreLength
        toolBoxItem.style.height = squreLength

        // internaal variable part
        toolBoxItem.status = false

        toolBoxItem.resetButton = function(){
            toolBoxItem.status = false
        }

        toolBoxItem._parent = toolBoxContainer.selectionHTMLObject
        this.itemArray.push(toolBoxItem)


        toolBoxItem.addEventListener(toolBoxItem.eventName, toolBoxItem.eventFunction)

        return toolBoxItem
    }

    createNewPolyLineItemButton(toolBoxHtmlObject){
        let toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject)

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("polyline item button is activated")
            this.activateButtonFunction(toolBoxItem, "polylineItemButton")
        })

        return toolBoxItem
    }

    createSelectionToolItemButton(toolBoxHtmlObject){
        let toolBoxItem = this.createToolBoxItem("SelectionTool", toolBoxHtmlObject)

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("Selection Tool item button is activated")
            this.activateButtonFunction(toolBoxItem, "selectionToolItemButton")
        })

        return toolBoxItem
    }


    createEraserItemButton(toolBoxHtmlObject){
        // let self = this
        let toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject)

        toolBoxItem.addEventListener("click", e=>{
            this.activateButtonFunction(toolBoxItem, "eraserItemButton")
        })

        return toolBoxItem
    }

    createAddCommentButton(toolBoxHtmlObject){
        let toolBoxItem = this.createToolBoxItem("AddComment", toolBoxHtmlObject)

        toolBoxItem.addEventListener("click", e=>{
            this.activateButtonFunction(toolBoxItem, "addCommentItemButton")
        })

        return toolBoxItem
    }


    createMoveObjectInDivButton(toolBoxHtmlObject){
      let toolBoxItem = this.createToolBoxItem("MoveObjectInDiv", toolBoxHtmlObject)

      toolBoxItem.addEventListener("click", e=>{
          this.activateButtonFunction(toolBoxItem, "moveObjectInDivButton")
          console.log(this.toolBoxItemStatus)
      })

      return toolBoxItem
    }

    activateButtonFunction(toolBoxItem, itemName:string){
        this.itemArray.forEach(p=>{
          p.style.background = "gold"
        })

        this.switchToolBoxItemStatus(itemName)

        toolBoxItem.style.background = "red"
        this.currentActiveButton = toolBoxItem
    }


    registerSvg(svgLayer){
      let self = this
      console.log(226, "registerSvg, yoyoyo")
        svgLayer.addEventListener("click", function(){
            console.log("The svg is register to the toolbox")
            console.log("======================")
            self.targetPage = svgLayer
        })
    }

}

export function getAttributeController(toolBoxItemStatus, itemName){
    let attributeControllerClassName = toolBoxItemStatus[itemName]["attributeController"]
    return document.querySelector(`.${attributeControllerClassName}`)
}
