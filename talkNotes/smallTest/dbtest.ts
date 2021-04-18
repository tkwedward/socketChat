import * as GreatNoteSvgDataClass from "./GreatNoteSVGDataClass"
import * as GreatNoteDataClass from "./GreatNoteDataClass"

interface ControllerInterface extends HTMLDivElement{
    controllerTarget: HTMLElement
    setControllerTarget(target: HTMLElement)
    updateObject(item?:any)
    clear()
}


interface choiceControllerInterface extends ControllerInterface{
    updateObject(item)
}

interface dropdownListControllerInterface extends ControllerInterface{
    updateObject(item?:any)
}

//
let widthController
let heightController
let backgroundColorController

let radiusController
let circleCenterXController
let circleCenterYController
let fillController

let allController = {
    divController: [widthController, heightController, backgroundColorController],
    svgCircleController: [radiusController, circleCenterXController, circleCenterYController, fillController]

}

interface ControllerOptionInterface {
    attributeName:string
    controllerType: any
    prototype?: HTMLElement
}

interface LengthControllerOptionInterface extends ControllerOptionInterface{
    unitOptions: string[]
}

interface dropdownListControllerOptionInterface extends ControllerOptionInterface{
    selectionList: string[]
}

export function controllerCreater(name:string, controllerOptions: LengthControllerOptionInterface|dropdownListControllerOptionInterface){
    let controllerContainer = document.createElement("div")
    controllerContainer.classList.add(name)
    controllerContainer.style.width = "90%"
    controllerContainer.style.minHeight = "200px"
    controllerContainer.style.border = "2px black solid"
    controllerContainer.style.margin = "20px auto"

    let controllerType = controllerOptions["controllerType"]
    let attributeName = controllerOptions["attributeName"]
    let unitOptions = controllerOptions["unitOptions"]
    let selectionList = controllerOptions["selectionList"]

    if (unitOptions) return controllerType(attributeName, unitOptions)
    if (selectionList) return controllerType(attributeName, selectionList)
}


export class AttributeControllerClass {
    GNObjectControllerArray: any[]
    // @auto-fold here
    constructor(){
        this.GNObjectControllerArray = []
    }

    createDivControllerContainer():HTMLObjectControllerInterface{
        let divControllerContainer = <HTMLObjectControllerInterface> document.createElement("div")
        divControllerContainer.classList.add("divController")
        divControllerContainer.targetHTMLType = "DIV"


        // color controller
        let colorSquare = document.createElement("div")
        colorSquare.style.display = "inline-block"
        colorSquare.style["width"] = "50px"
        colorSquare.style["height"] = "50px"
        colorSquare.style["margin"] = "10px"
        let backgroundColorController = choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare)

        // width Controller
        let widthController = controllerCreater("widthController", {
            attributeName: "width",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        })

        let heightController = controllerCreater("widthController", {
            attributeName: "height",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        })

        let positionController = controllerCreater("positionController", {
            attributeName: "position",
            selectionList: ["none", "relative", "absolute"],
            controllerType: dropdownListController
        })


        divControllerContainer.controllerArray = [widthController, heightController, positionController, backgroundColorController]
        divControllerContainer.append(...divControllerContainer.controllerArray)

        this.superController(divControllerContainer)

        this.GNObjectControllerArray.push(divControllerContainer)
        return divControllerContainer
    }


     createSvgCircleControllerContainer():HTMLObjectControllerInterface{
        let svgCircleContainer = <HTMLObjectControllerInterface> document.createElement("div")

        svgCircleContainer.classList.add("svgCircleContainer")
        svgCircleContainer.targetHTMLType = "circle"

        let radiusController = inputFieldAndDropdownListController("r", ["px", "vw", "%"])

        let circleCenterXController = controllerCreater("cxController", {
            attributeName: "cx",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        })

        let circleCenterYController = controllerCreater("cyController", {
            attributeName: "cy",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        })

        let colorSquare = document.createElement("div")
        colorSquare.style.display = "inline-block"
        colorSquare.style["width"] = "50px"
        colorSquare.style["height"] = "50px"
        colorSquare.style["margin"] = "10px"

        let fillController = choiceController("fill", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare)

        svgCircleContainer.controllerArray = [radiusController, circleCenterXController, circleCenterYController, fillController]

        svgCircleContainer.append(...svgCircleContainer.controllerArray)
        this.superController(svgCircleContainer)

        this.GNObjectControllerArray.push(svgCircleContainer)
        return svgCircleContainer
    }

    superController(controllerContainer){
          let self = this

          controllerContainer.style.display = "none"

          controllerContainer.responseToHtmlType = function (htmlObject){
              console.log(htmlObject.tagName, controllerContainer.targetHTMLType)
              if (htmlObject.tagName != controllerContainer.targetHTMLType){
                  console.log("none")
                  controllerContainer.style.display = "none"
              } else {
                  console.log("visible")
                  controllerContainer.style.display = "block"
              }
          }

          controllerContainer.attachTo = function (htmlObject){
              self.initializeContainerAndControllerEvent(htmlObject, controllerContainer.controllerArray)
          }

    }


    initializeContainerAndControllerEvent( htmlObject:HTMLElement, controllerArray:any[]){
        htmlObject.addEventListener("click", (e)=>{
            this.GNObjectControllerArray.forEach(p=>p.responseToHtmlType(htmlObject))
            console.log(177, this.GNObjectControllerArray)
            e.stopPropagation()
            controllerArray.forEach(p=>{
                p.clear()
                p.setControllerTarget(htmlObject)
            })
        }, false)
    }

}





// @auto-fold here
export function inputFieldAndDropdownListController(attributeName, unitOptions){
    let controllerContainer = <ControllerInterface> document.createElement("div")
    controllerContainer.style.display = "grid"
    controllerContainer.style.gridTemplateColumns = "1fr 3fr 1fr"

    controllerContainer.classList.add(attributeName + "Controller")
    let title = document.createElement("span")
    title.innerText = attributeName
    title.style.textAlign = "center"

    let inputField = document.createElement("input")
    let dropdownList = document.createElement("select")

    unitOptions.forEach(unit=>{
        let option = document.createElement("option")
        option.value = unit
        option.innerText = unit
        dropdownList.appendChild(option)
    })

    dropdownList.addEventListener("change", (e)=> controllerContainer.updateObject())

    inputField.addEventListener("input", (e)=> controllerContainer.updateObject())

    // to update the value according to the controller values
    // @auto-fold her
    controllerContainer.updateObject = function (){
        if (controllerContainer.controllerTarget){
            controllerContainer.controllerTarget.style[attributeName] = inputField.value + dropdownList.value
        }
    }

    // functions
    controllerContainer.setControllerTarget = function (object){
        controllerContainer.controllerTarget = object
    }

    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function (){
        controllerContainer.setControllerTarget(null)
    }

    controllerContainer.append(title, inputField, dropdownList)

    return controllerContainer
}// inputFieldAndDropdownListController

// @auto-fold here
export function dropdownListController(attributeName:string, selectionList:string[]):dropdownListControllerInterface{
    let controllerContainer = <dropdownListControllerInterface> document.createElement("div")

    let title = attributeName
    let dropdownList = document.createElement("select")

    selectionList.forEach(unit=>{
        let option = document.createElement("option")
        option.value = unit
        option.innerText = unit
        dropdownList.appendChild(option)
    })

    dropdownList.addEventListener("change", (e)=> controllerContainer.updateObject())

    controllerContainer.updateObject = function (){
        if (controllerContainer.controllerTarget){
            controllerContainer.controllerTarget.style[attributeName] = dropdownList.value
        }
    }

    // functions
    controllerContainer.setControllerTarget = function (object){
        controllerContainer.controllerTarget = object
    }

    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function (){
        controllerContainer.setControllerTarget(null)
    }

    controllerContainer.append(title, dropdownList)


    return controllerContainer
}

// @auto-fold here
export function choiceController(attribute, choiceList, prototype:HTMLElement): choiceControllerInterface{
    let controllerContainer = <choiceControllerInterface> document.createElement("div")
    controllerContainer.style.display = "flex"
    controllerContainer.style["align-items"] = "center"
    controllerContainer.style["justify-content"] = "left"
    controllerContainer.style["flex-wrap"] = "wrap"
    controllerContainer.style.width = "300px"
    controllerContainer.style.minHeight = "150px"
    controllerContainer.classList.add(attribute + "Controller")

    choiceList.forEach(choiceValue=>{
        let item = prototype.cloneNode(true)

        if (attribute=="fill"){
            item["style"]["background"] = choiceValue
        } else {
            item["style"][attribute] = choiceValue
        }

        controllerContainer.appendChild(item)

        item.addEventListener("click", (e)=>{
            controllerContainer.updateObject(choiceValue)
        })
    })

    /** to update the value according to the controller values */
    controllerContainer.updateObject = function (itemValue){
        if (controllerContainer.controllerTarget){
            controllerContainer.controllerTarget.style[attribute] = itemValue
        }
    }

    // functions
    controllerContainer.setControllerTarget = function (object){
        controllerContainer.controllerTarget = object
    }
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function (){
        controllerContainer.setControllerTarget(null)
    }


    return controllerContainer
}

interface HTMLObjectControllerInterface extends HTMLDivElement{
    controllerArray: HTMLDivElement[]
    targetHTMLType: any
    attachTo(htmlObject)
    responseToHtmlType(htmlObject)
    append(controllerArray?:any)
}
