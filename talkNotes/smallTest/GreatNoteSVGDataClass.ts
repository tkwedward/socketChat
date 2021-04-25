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
export interface GNSvgContainerInterface extends SVG.LinkedHTMLElement, GreatNoteDataClass.GNObjectInterface{
    _parent?:any
    _type: string
    _name: string
    _identity: any
    _dataStructure?: string[]
    _styleStructure?: string[]
    svgController?: SVG.Doc
    svgNode: SVG.LinkedHTMLElement

    applyStyle(attrList: any)
    appendToContainer(parentDiv)
    createDataObject()
    extract()

}


//@auto-fold here
export function GNSvg(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgContainerInterface {
    let svgDivContainer =  document.createElement("div")
    svgDivContainer.id = "testSvgDiv"


    let svgController = SVG(svgDivContainer)
    svgController.width("800px")
    svgController.height("300px")

    let svgBoard = <GNSvgContainerInterface> svgController.node
    svgBoard.svgController = svgController
    svgBoard.style.background = "gold"
    svgBoard._type = GNSvg.name
    svgBoard._name = name
    svgBoard._dataStructure = ["innerHTML"]
    svgBoard._styleStructure = []

    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    svgBoard.appendToContainer = function(parent){
        parent.appendChild(svgDivContainer)
    }

    svgBoard.applyStyle = function(){

    }

    svgBoard.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = svgBoard._type
        if (svgBoard._identity) dataObject["_identity"] = svgBoard._identity

        svgBoard._dataStructure.forEach(p=>{
          dataObject["data"][p] = svgBoard[p]
        })

        // stylesheet data
        svgBoard._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = svgBoard["style"][p]
        })

        return dataObject
    }

    //
    svgBoard.extract = () => svgBoard.createDataObject()

    // add extra funcitons to the object
    GreatNoteDataClass.superGNObject(svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer)
    console.log(900, svgBoard._identity)
    return svgBoard
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
    svgObject.loadFromData = (_GNData)=>{
        console.log(145, "the data is updated", _GNData)
        svgObject.style.cx = parseInt(_GNData["data"]["cx"]) + 200
        svgObject.style.cy = parseInt(_GNData["data"]["cy"])
        svgObject.style.r  = parseInt(_GNData["data"]["r"])
    }


    svgObject.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = svgObject._type
        if (svgObject._identity) dataObject["_identity"] = svgObject._identity


        dataObject["data"]["cx"] = svgObject.style.cx
        dataObject["data"]["cy"] = svgObject.style.cy
        dataObject["data"]["r"] = svgObject.style.r
        console.log(159, dataObject["data"])

        // stylesheet data
        svgObject._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = svgObject["style"][p]
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
    saveHTMLObjectToDatabase()
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
    svgObject._styleStructure = ["stroke", "stroke-width", "fill"]

    // functions
    svgObject.loadFromData = (data)=>{
      // svgObject.soul.plot([[0, 0], [10, 100]])
      console.log(300, data["data"]["points"])
      svgObject.soul.plot(data["data"]["points"])

      console.log(303, svgObject.applyStyle, data["stylesheet"])
      svgObject.applyStyle(data["stylesheet"])
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
          console.log(320, p, svgObject["style"][p])
          dataObject["stylesheet"][p] = svgObject["style"][p]
        })

        return dataObject
    }


    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgPolyLineData){
      svgObject._styleStructure.forEach(p=>{
          if (p=="fill"){
              svgObject["style"]["fill"] = attrList["fill"] || "none"
          } else {
              svgObject["style"][p] = attrList[p]
          }
      })


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
}
