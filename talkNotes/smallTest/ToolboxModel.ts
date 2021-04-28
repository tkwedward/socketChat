import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteSVGDataClass"
import * as ControllerModel from "./dbtest"
import {mainController} from "./constructInitialCondition"

interface ToolBoxInterface extends HTMLDivElement{
    itemArray: any[]       // to mark the status of the button
    targetPage: any
    currentActiveButton: any
    currentActiveEventFunction: (event)=>void
    currentActiveEventName:string
    selectionHTMLObject: HTMLDivElement
    optionHTMLObject: HTMLDivElement
    activateToolboxItem(toolBoxItem)

    createToolBoxItem(name:string, toolBoxHtmlObject: HTMLDivElement):HTMLDivElement    // to create an item

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

export class ToolBoxClass implements ToolBoxInterface {
    itemArray: any[]       // to mark the status of the button
    targetPage: any
    currentActiveButton: any
    currentActiveEventFunction: (event)=>void
    currentActiveEventName:string
    selectionHTMLObject: HTMLDivElement
    optionHTMLObject: HTMLDivElement
    activateToolboxItem: any


    constructor(){

    }

    createToolboxHtmlObject(){
        let self = this
        let toolBoxContainer = <ToolBoxInterface>document.createElement("div")

        toolBoxContainer.classList.add("toolBoxHtml")
        toolBoxContainer.style.height = "80px"
        toolBoxContainer.style.background = "silver"
        // toolBoxContainer.style.width = "90vw"
        toolBoxContainer.style.width = "90%"
        toolBoxContainer.style.margin = "0 auto"
        toolBoxContainer.style.display = "grid"
        toolBoxContainer.style.gridTemplateColumns = "4fr 3fr"

        // toolBoxHtmlObject.style.width = "90%"
        toolBoxContainer.itemArray = []

        let toolBoxSelectionHtmlObject = document.createElement("div")

        let toolBoxOptionHtmlObject = document.createElement("div")
        toolBoxOptionHtmlObject.classList.add("toolBoxOption")
        toolBoxOptionHtmlObject.style.height = "80px"
        toolBoxOptionHtmlObject.style.background = "lightBlue"

        toolBoxContainer.selectionHTMLObject  = toolBoxSelectionHtmlObject
        toolBoxContainer.optionHTMLObject = toolBoxOptionHtmlObject


        toolBoxContainer.appendChild(toolBoxSelectionHtmlObject)
        // toolBoxContainer.appendChild(toolBoxOptionHtmlObject)
        return toolBoxContainer
    }

    createToolBoxItem(name, toolBoxContainer):ToolBoxItemInterface{
        let toolBoxItem = <ToolBoxItemInterface> document.createElement("div")
        // the html style part
        toolBoxItem.style.display = "inline-block"
        toolBoxItem.classList.add("toolBoxItem")
        toolBoxItem.innerText = name[0]
        toolBoxItem.style.background = "gold"
        // toolBoxItem.style.display = "flex"
        toolBoxItem.style.margin = "10px 5px"
        toolBoxItem.style["align-items"] = "center"
        toolBoxItem.style["justify-content"] = "center"
        let squreLength = "40px"
        toolBoxItem.style.width = squreLength
        toolBoxItem.style.height = squreLength

        // internaal variable part
        toolBoxItem.status = false

        toolBoxItem.resetButton = function(){
            toolBoxItem.status = false
        }

        toolBoxItem._parent = toolBoxContainer.selectionHTMLObject
        toolBoxContainer.itemArray.push(toolBoxItem)
        toolBoxContainer.selectionHTMLObject.appendChild(toolBoxItem)

        toolBoxItem.addEventListener(toolBoxItem.eventName, toolBoxItem.eventFunction)

        return toolBoxItem
    }

    createNewPolyLineItemButton(toolBoxHtmlObject){
        let self = this
        let toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject)

        toolBoxItem.eventName = "mousedown"

        // take place when mouse down
        toolBoxItem.eventFunction = ()=>{

            console.log("polyline item button is activated")
            let [strokeColor, strokeWidth]:[string, string] = mainController.attributeControllerMapping.polylineController.extract()

            let polyline = GreatNoteSvgDataClass.GNSvgPolyLine({name:"", arrayID: self.targetPage.getAccessPointer(), insertPosition:false, dataPointer:false, saveToDatabase:true, specialCreationMessage:"polylineCreated"})


            polyline.soul.plot([[event["offsetX"], event["offsetY"]]])
            polyline.appendTo(self.targetPage)
            polyline.applyStyle({"stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none"})

            let t1 = 0
            let t2 = 0

            function updatePolyLine(e){
                t2 = e.timeStamp
                t1 = t2
                let newPoint = polyline.soul.array().value
                newPoint.push([event["offsetX"], event["offsetY"]])
                polyline.soul.plot(newPoint)
            }

            self.targetPage.addEventListener("mousemove", updatePolyLine)

            function polylineMouseUpEvent(e){
                console.log(145, "save to database", new Date())
                polyline.saveHTMLObjectToDatabase())
                self.targetPage.removeEventListener("mousemove", updatePolyLine)
                self.targetPage.removeEventListener("mouseup", polylineMouseUpEvent)
            }
            self.targetPage.addEventListener("mouseup", polylineMouseUpEvent)
        }// eventFunction

        toolBoxItem.addEventListener("click", function(){
            console.log("polyline item button is activated")
            self.activateButtonFunction(toolBoxItem)
        })

        return toolBoxItem
    }


    createEraserItemButton(toolBoxHtmlObject){
        let self = this
        let toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject)

        toolBoxItem.eventName = "mousedown"

        toolBoxItem.eventFunction = ()=>{
            let cx = event["offsetX"] + "px"
            let cy = event["offsetY"] + "px"
            let r = "10px"
            let eraser = GreatNoteSvgDataClass.GNSvgCircle({name: "123", arrayID: mainController.mainDocArray["bookmark"], insertPosition: false, dataPointer: false, saveToDatabase: false})

            eraser.style["cx"] = cx
            eraser.style["cy"] = cy
            eraser.style["r"] = r

            function updateEraserPosition(e){
                cx = event["offsetX"] + "px"
                cy = event["offsetY"] + "px"
                eraser.style["cx"] = cx
                eraser.style["cy"] = cy
            }

            this.targetPage.addEventListener("mousemove", updateEraserPosition)

            this.targetPage.addEventListener("mouseup", (e)=>{
                this.targetPage.removeEventListener("mousemove", updateEraserPosition)
                eraser.remove()
            })

            this.targetPage.addEventListener("mouseout", (e)=>{
                // this.targetPage.removeEventListener("mousemove", updateEraserPosition)
                console.log("You are out of the boundary")
            })
            // self.targetPage.svgController
            self.targetPage.appendChild(eraser)

            // eraser.appendTo(self.targetPage)
            // this.targetPage.appendChild(eraser.node)
        }

        toolBoxItem.addEventListener("click", function(){
            console.log("eraser button is activated")
            self.activateButtonFunction(toolBoxItem)
        })


        return toolBoxItem
    }

    activateButtonFunction(toolBoxItem){
        if (this.currentActiveButton){
            console.log("clear the toolbox button status")
            this.currentActiveButton.style.background = "gold"
            this.targetPage.removeEventListener(this.currentActiveEventName, this.currentActiveEventFunction)
        }

        toolBoxItem.style.background = "red"
        this.currentActiveButton = toolBoxItem
        this.currentActiveEventName = toolBoxItem.eventName
        this.currentActiveEventFunction = toolBoxItem.eventFunction
        // this.activateToolboxItem(toolBoxItem)

        console.log(this.targetPage, this.currentActiveEventName, this.currentActiveEventFunction)
        this.targetPage.addEventListener(this.currentActiveEventName, this.currentActiveEventFunction)
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
