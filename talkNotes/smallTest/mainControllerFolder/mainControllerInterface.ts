import * as PageController from "../pageControllerFolder/pageController"
import {ToolBoxInterface} from "../ToolboxModel"
import {LayerControllerInterface} from "../layerControllerFolder/layerController"
import {GNObjectInterface, CreateGreatNoteObjectInterface}  from "../GreatNoteClass/GreatNoteObjectInterface"


export let mainArrayData = {
    "mainArray_pageFull": {
        arrayID: "", arrayHTMLObject: "fullPageModeDiv"
    },
    "mainArray_pageOverview": {
        arrayID: "", arrayHTMLObject: "overviewModeDiv"
    },
    "mainArray_bookmark": {
        arrayID: "", arrayHTMLObject: "pageContentContainer"
    },
    "mainArray_panel": {
        arrayID: "", arrayHTMLObject: "contentContainer"
    },
    "mainArray_pokemon": {
        arrayID: "", arrayHTMLObject: "contentContainer"
    }
}



//@auto-fold here
export interface communicationDataStructure{
    data: any
    array: any[]
    _identity: {"dataPointer": string, "accessPointer": string, linkArray: string[]}
    stylesheet: any
    GNType: string
}


export enum MainDocArrayEnum {
    mainArray_pageFull = "mainArray_pageFull",
    mainArray_pageOverview = "mainArray_pageOverview",
    mainArray_bookmark = "mainArray_bookmark",
    mainArray_panel = "mainArray_panel",
    mainArray_pokemon = "mainArray_pokemon"
}


//@auto-fold here
export interface MainControllerInterface {
    mainDoc: any
    previousDoc: any
    applyMainDocTemplate:boolean // **** can be deleted latter

    mainDocArray: any
    baseArrayID: string
    GNDataStructureMapping: any
    attributeControllerMapping: any
    pageCurrentStatus: any
    pageController: PageController.pageControllerInterface
    toolBox: ToolBoxInterface
    layerController: LayerControllerInterface
    selectedObjectArray: any[]

    // getArrayID(MainDocArrayEnum):string
    initializeRootArray()
    initalizeMainDoc()

    /** Functions related to save and update data in the database */
    addData(arrayID: string, htmlObject: GNObjectInterface|HTMLElement, insertPosition?:number|boolean, dataPointer?:string, specialMessage?: string): [HTMLElement, string]
    updateData(_object:GNObjectInterface, dataPointerType:boolean)
    createDummyData(name:string, age: number, sex: string):any
    saveHTMLObjectToDatabase(htmlObject: GNObjectInterface)
    deleteFromDataBase(htmlObject:GNObjectInterface)

    /** the arrayID is for attaching to the array*/
    getObjectById(objectID: string, doc?:any)
    getLinkArrayFromID(objectID):any
    getHtmlObjectByID(objectID:string)


    createGNObjectThroughName(objectName:string, createData: CreateGreatNoteObjectInterface)
    /** internode functions*/

    /**
    input: array in the mainDoc
    function: To render the data stored in the mainDoc to HTML Elements.*/
    buildInitialHTMLSkeleton()
    buildPageFromMainDoc()
    renderDataToHTML(data: any, arrayHTMLObject:HTMLElement|GNObjectInterface)
    /** To save the mainDoc as text file*/
    saveMainDoc(sendRequest:boolean)
    /** To load string into the mainDoc */
    loadMainDoc(data:string)
    getMainDocChange()
    getLoadDataFromSocket()
    processChangeData(changeDataArray:Set<string>)
}
