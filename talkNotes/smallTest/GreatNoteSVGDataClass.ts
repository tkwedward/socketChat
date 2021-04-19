import {mainController} from "./constructInitialCondition"
import SVG from "svg.js";
import {GNObjectInterface} from "./GreatNoteDataClass"
import * as GreatNoteDataClass from "./GreatNoteDataClass"


function createDummyData(){
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
        "stylesheet": {}
    }
}
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
    svgDivContainer._type = GNSvg.name
    svgDivContainer._name = name
    svgDivContainer._dataStructure = ["innerHTML"]
    svgDivContainer._styleStructure = []

    let svgBoard
    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    svgDivContainer.appendToContainer = function(parent){
        parent.appendChild(svgDivContainer)
        let svgController = SVG(svgDivContainer)
        svgController.width("800px")
        svgController.height("300px")
        svgDivContainer.svgController = svgController
        svgDivContainer.svgNode = svgController.node
        console.log(57, svgDivContainer.svgNode)
        svgController.node.style.background = "gold"
    }

    svgDivContainer.applyStyle = function(){

    }

    svgDivContainer.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = svgDivContainer._type
        if (svgDivContainer._identity) dataObject["_identity"] = svgDivContainer._identity

        svgDivContainer._dataStructure.forEach(p=>{
          dataObject["data"][p] = svgDivContainer[p]
        })

        // stylesheet data
        svgDivContainer._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = svgDivContainer["style"][p]
        })

        return dataObject
    }

    //
    svgDivContainer.extract = () => svgDivContainer.createDataObject()

    // add extra funcitons to the object
    GreatNoteDataClass.superGNObject(svgDivContainer, saveToDatabase, arrayID, insertPosition, dataPointer)

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
export interface GNSvgCircleInterface extends GNSvgObjectInterface, SVG.LinkedHTMLElement {
    svgController: SVG.Doc
    _parent?:any
    _type: string
    _name: string
    _dataStructure: string[]
    _styleStructure: string[]
    soul: any
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
    let svgObjectSoul = new SVG.Circle()
    console.log(119, svgObjectSoul)
    svgObjectSoul.radius(75)
    svgObjectSoul.fill("red")
    let svgObject = <GNSvgCircleInterface> svgObjectSoul.node
    svgObject.soul = svgObjectSoul
    svgObject._type = GNSvgCircle.name
    svgObject._name = name
    svgObject._dataStructure = ["cx", "cy", "r"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }


    svgObject.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = svgDivContainer._type
        if (svgDivContainer._identity) dataObject["_identity"] = _object._identity

        svgDivContainer._dataStructure.forEach(p=>{
          dataObject["data"][p] = svgDivContainer[p]
        })

        // stylesheet data
        svgDivContainer._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = svgDivContainer["style"][p]
        })

        return dataObject
    }

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
    console.log(146, GreatNoteDataClass.superGNObject)
    GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
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



export interface GNSvgPolyLineInterface extends GNSvgObjectInterface, SVG.LinkedHTMLElement {
    _identity: {"accessPointer":string, "dataPointer": string, "linkArray": string[]}
    soul: any
    applyStyle(attrList:GNSvgPolyLineData)

}

//@auto-fold here
export interface GNSvgPolyLineData{

    points?: number[]
    attribute?: {"stroke"?: string, "width"?: number, "fill"?:string}
}

//@auto-fold here
export function GNSvgPolyLine(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgPolyLineInterface {

    let svgObjectSoul = <SVG.PolyLine> SVG(document.createElement("polyline")).polyline([0, 0, 0, 0])


    let svgObject = <GNSvgPolyLineInterface> svgObjectSoul.node
    svgObject.soul = svgObjectSoul

    svgObject._type = GNSvgPolyLine.name
    svgObject._name = name
    svgObject._dataStructure = ["points"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{
      svgObject.soul.plot(data["points"])
    }

    svgObject.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = svgObject._type
        if (svgObject._identity) dataObject["_identity"] = svgObject._identity
        console.log(302, svgObject.soul.array().value)
        svgObject._dataStructure.forEach(p=>{
          dataObject["data"][p] = svgObject.soul.array().value.toString()
        })

        // stylesheet data
        svgObject._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = svgObject["style"][p]
        })

        return dataObject
    }


    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgPolyLineData){
        svgObject.soul.plot(attrList["points"])
        svgObject.soul.attr(attrList["attribute"])
    }

    // to share same data function
    GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    // add extra funcitons to the object

    console.log(234, svgObject)
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
      console.log(317, parentSVGContainer)
        console.log(318, svgObject)
        svgObject.soul.addTo(parentSVGContainer.svgController)
    }
    //
    // svgObject.applyStyle = function (attributeSheet){
    //
    // }
}
