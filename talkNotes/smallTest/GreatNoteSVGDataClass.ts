import {mainController} from "./constructInitialCondition"
import SVG from "svg.js";
import {GNObjectInterface} from "./GreatNoteDataClass"
import * as GreatNoteDataClass from "./GreatNoteDataClass"


//@auto-fold here


// GNInputFieldInterface
//@auto-fold here
export interface GNSvgContainerInterface extends HTMLDivElement{
    _parent?:any
    _type?: string
    _name?: string
    _dataStructure?: string[]
    _styleStructure?: string[]
    svgController?: SVG.Doc
    svgNode: SVG.LinkedHTMLElement

    applyStyle(attrList: any)
    appendToContainer(parentDiv)
    createDataObject()

}


//@auto-fold here
export function GNSvg(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgContainerInterface {
    let svgDivContainer = <GNSvgContainerInterface> document.createElement("div")
    svgDivContainer.id = "testSvgDiv"

    svgDivContainer.appendToContainer = function(parent){
        parent.appendChild(svgDivContainer)
        let svgController = SVG(svgDivContainer)
        svgController.width("800px")
        svgController.height("300px")
        svgDivContainer.svgController = svgController
        svgDivContainer.svgNode = svgController.node
        svgController.node.style.background = "gold"

    }

    svgDivContainer.applyStyle = function(){

    }

    svgDivContainer.createDataObject = function(){
        let dataObject = {
            "data": {},
            "array": [],
            "GNType": "",
            "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
            "stylesheet": {}
        }
    }

    // svgObject.style.width = "70vw";
    // svgObject.style.height = "80vh";
    // svgObject.style.margin = "20px";
    // svgObject.style.background = "Aliceblue"
    // // let svgController:SVG.Doc = SVG(svgObject)
    //
    // svgObject._type = GNSvg.name
    // svgObject._name = name
    // svgObject._dataStructure = ["value"]
    // svgObject._styleStructure = []
    //
    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    //
    // svgObject.extract = () => svgObject.createDataObject()

    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)

    return svgDivContainer
}


export interface GNSvgObjectInterface {
  _parent?:any
    _type?: string
    _name?: string
    _dataStructure?: string[]
    _styleStructure?: string[]

    applyStyle(attrList: any)
    appendTo(parentSVGObject)
    appendToContainer(parentDiv)
    createDataObject()
    extract():any
    loadFromData(data: any)

}

//@auto-fold here
export interface GNSvgCircleInterface extends GNSvgObjectInterface, SVG.Circle {
    svgController: SVG.Doc
    _parent?:any
    _type: string
    _name: string
    _dataStructure: string[]
    _styleStructure: string[]
    applyStyle(attrList:GNSvgCircleData)
}

//@auto-fold here
export interface GNSvgCircleData {
    r: number
    cx?: number
    cy?: number
}

//@auto-fold here
export function GNSvgCircle(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgCircleInterface {
    let svgObject = <GNSvgCircleInterface> new SVG.Circle()
    console.log(119, svgObject)
    let html = document.createElement("div")
    svgObject.radius(75)
    svgObject.fill("red")

    svgObject._type = GNSvgCircle.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgCircleData){
        svgObject.attr(attrList)
    }

    svgObject.appendTo = function (parentSVGContainer){
      //self.targetPage.svgNode.appendChild(eraser.node)
        console.log(139, parentSVGContainer, svgObject)
        parentSVGContainer.svgNode.appendChild(svgObject.node)
    }

    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    // SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}

// ==============
//@ auto-fold

export interface GNSvgRectInterface extends GNSvgObjectInterface, SVG.Rect {
    applyStyle(attrList:GNSvgRectData)
}

//@auto-fold here
export interface GNSvgRectData {
    x: number|string
    y: number|string
    width: number|string
    height: number|string
    fill: string
}

//@auto-fold here
export function GNSvgRect(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgRectInterface {
    let svgObject = <GNSvgRectInterface> new SVG.Rect()
    svgObject._type = GNSvgRect.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgRectData){
        console.log(attrList)
        Object.entries(attrList).forEach(([key, value], _)=>{
            svgObject.node.style[key] = value

        })


    }

    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}

export interface GNSvgLineInterface extends GNSvgObjectInterface, SVG.Line {
    applyStyle(attrList:GNSvgLineData)
}

//@auto-fold here
export interface GNSvgLineData {
    points?: [number, number, number, number]
    attribute?: {"stroke"?: string, "width"?: number}
}

//@auto-fold here
export function GNSvgLine(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgLineInterface {
    let svgObject = <GNSvgLineInterface> new SVG.Line()
    svgObject._type = GNSvgLine.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgLineData){
        svgObject.plot(attrList["points"])
        svgObject.attr(attrList["attribute"])

    }

    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}



export interface GNSvgPolyLineInterface extends GNSvgObjectInterface, SVG.PolyLine {
    applyStyle(attrList:GNSvgPolyLineData)
}

//@auto-fold here
export interface GNSvgPolyLineData{
    points?: number[]
    attribute?: {"stroke"?: string, "width"?: number, "fill"?:string}
}

//@auto-fold here
export function GNSvgPolyLine(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgPolyLineInterface {

    let svgObject = <GNSvgPolyLineInterface> SVG(document.createElement("polyline")).polyline([0, 0, 0, 0])
    console.log(234, svgObject)

    svgObject._type = GNSvgPolyLine.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgPolyLineData){
        svgObject.plot(attrList["points"])
        svgObject.attr(attrList["attribute"])
    }

    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
} //GNSvgPolyLine


export interface GNSvgImageInterface extends GNSvgObjectInterface, SVG.Image {
    applyStyle(attrList:GNSvgImageInterface)
    setImgSrc(src:string)
}

//@auto-fold here
export interface GNSvgImageDataInterface{
    points?: number[]
    attribute?: {"stroke"?: string, "width"?: number, "fill"?:string}

}

//@auto-fold here
export function GNSvgImage(name:string, arrayID?: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgImageInterface {

    let svgObject = <GNSvgImageInterface> SVG(document.createElement("image")).image()

    svgObject.setImgSrc = function (src:string){
        svgObject.load(src)
    }

    svgObject._type = GNSvgImage.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgPolyLineData){
        svgObject.attr(attrList["attribute"])
    }

    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}


function SuperSVG(svgObject, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean){
    svgObject.appendTo = function (parentSVGContainer){
        svgObject.addTo(parentSVGContainer.svgController)
    }
    //
    // svgObject.applyStyle = function (attributeSheet){
    //
    // }
}
