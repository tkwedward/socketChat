import SVG from "svg.js";

export interface GNObjectInterface {
    controlledObject?:any
    controllerEvent?:any

    GNType: string // the GN type???
    GNSpecialCreationMessage: any
    specialGNType?: string
    _name: string // a name to describe the object
    _classNameList: string[]
    // these two are used for extracting data and create dataObject
    _dataStructure?: string[] // the data properties that you want to extract from the object
    _styleStructure?: string[] // the style that you want to extract from the object
    stylesheet?: {} // stylesheet

    _identity?: {
      "accessPointer": string,
      "dataPointer": string,
      "linkArray": string[]
    } // the identity of the object

    loadFromData?(data)
    extract?():any
    processUpdateData(data:any)
    createDataObject(GNObjectInterface?):any
    appendTo(_parent:HTMLElement)
    applyStyle(any)
    appendElements(...any)


    // extra functions
    getDataPointer():string
    getAccessPointer():string
    setDataPointer():string
    setAccessPointer():string
    getDataFromDataBase():any
    editEvent(eventName:string)
    updateLinkObject()

    getLinkArray():any
    reloadDataFromDatabase()
    saveHTMLObjectToDatabase()
    deleteFromDataBase()
    initializeHTMLObjectFromData(objectData:any)
    generateGNObjectThroughGNType(_GNType: string, createDataObject: CreateGreatNoteObjectInterface)

    /** to save data from the database and extract data*/
    save()
    load(data:any)
    processUpdateData()

    // relate to DB
    addToDatabase(arrayID, insertPosition?:number|boolean, dataPointer?)
    deleteFromDatabase()
}

// GNInputFieldInterface
//@auto-fold here
export interface GNInputFieldInterface extends GNObjectInterface, HTMLInputElement {
    _parent?:any
    _identity?: any
}


//@auto-fold here
export interface GNDropdownListInterface extends GNObjectInterface, HTMLSelectElement{

}


export interface CreateGreatNoteObjectInterface {
    name:string,
    specialCreationMessage?: string
    arrayID?: string,
    insertPosition?: number|boolean,
    dataPointer?: string|boolean,
    saveToDatabase?: boolean,
    injectedData?: any
    imgsrc?: string
    contentEditable?: boolean
    statusList?: string[]
    _classNameList?: string[]
}

// GNButtonInterface
//@auto-fold here
export interface GNButtonInterface extends HTMLButtonElement, GNObjectInterface {
    _parent?: any
    _identity: any
    status: any
    statusList: string[]
    addClickEvent(clickFunction)
    clickEvent(e)
    event(e)
}


//@auto-fold here
export interface GNContainerDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any
    _identity?: any
    childrenList?: {string:GNObjectInterface}|{}
    applyStyle(data, saveToDatabase?: boolean)
    loadFromData(data)
    extract(): any
    appendElements(...any)
    getAccessPointer():string
    linkTo(_object)
}


//@auto-fold here
export interface GNImageContainerInterface extends GNObjectInterface, HTMLDivElement {
    _name:string
    imageWidthToHeightRatio: number
    addCaption()
    setImageSize(imageData:{width?: number, height?:number})
    setMovable()
}// GNImageInterface

//@auto-fold here
export interface GNImageDataStructure {
  name: string
  src: string
}

//@auto-fold here
export interface superGNObjectInterface {
    /** To link to other objects */
    saveHTMLObjectToDatabase()
    linkTo(_object)
}



// GNInputFieldInterface
//@auto-fold here
export interface GNSvgContainerInterface extends SVG.LinkedHTMLElement, GNObjectInterface{
    _parent?:any
    GNType: string
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



export interface GNSvgObjectInterface {
  _parent?:any
    GNType?: string
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
export interface GNSvgRectInterface extends GNSvgObjectInterface, SVG.Rect {
    applyStyle(attrList:GNSvgRectData)
}

export interface GNSvgRectData {
    x: number|string
    y: number|string
    width: number|string
    height: number|string
    fill: string
}


//@auto-fold here
export interface GNSvgCircleInterface extends GNSvgObjectInterface, SVG.LinkedHTMLElement {
    svgController: SVG.Doc
    _parent?:any
    GNType: string
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


export interface GNSvgLineInterface extends GNSvgObjectInterface, SVG.Line {
    applyStyle(attrList:GNSvgLineData)
}

//@auto-fold here
export interface GNSvgLineData {
    points?: [number, number, number, number]
    attribute?: {"stroke"?: string, "width"?: number}
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
    attribute?: {"stroke"?: string, "width"?: number, "fill"?:string, "stroke-width"?: string}
    stroke?: string
    "stroke-width": string
    fill :string
}


export interface GNSvgImageInterface extends GNSvgObjectInterface, SVG.Image {
    applyStyle(attrList:GNSvgImageInterface)
    setImgSrc(src:string)
}

//@auto-fold here
export interface GNSvgImageDataInterface{
    points?: number[]
    attribute?: {"stroke"?: string, "width"?: number, "fill"?:string}

}
