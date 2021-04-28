import {mainController} from "./constructInitialCondition"
//@auto-fold here
export interface GNObjectInterface {
    controlledObject?:any
    controllerEvent?:any

    GNType: string // the GN type???
    specialGNType?: string
    _name: string // a name to describe the object

    // these two are used for extracting data and create dataObject
    _dataStructure?: string[] // the data properties that you want to extract from the object
    _styleStructure?: string[] // the style that you want to extract from the object
    stylesheet?: {} // stylesheet

    _identity?: {
      "accessPointer": string,
      "dataPointer": string,
      "linkArray": string
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
    initializeHTMLObjectFromData(objectData:any)
    generateGNObjectThroughGNType(_GNType: string, createDataObject: CreateGreatNoteObjectInterface)

    /** to save data from the database and extract data*/
    save()
    load(data:any)
    processUpdateData()

    // relate to DB
    addToDatabase(arrayID, insertPosition?:number|boolean, dataPointer?)
    GNdelete()
}


function createDummyData(){
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "specialGNType": "",
        "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
        "_classList": [],
        "stylesheet": {}
    }
}

// GNInputFieldInterface
//@auto-fold here
export interface GNInputFieldInterface extends GNObjectInterface, HTMLInputElement {
    _parent?:any
    _identity?: any
}


export interface CreateGreatNoteObjectInterface {
    name:string,
    specialCreationMessage?: string
    arrayID?: string,
    insertPosition?: number|boolean,
    dataPointer?: string|boolean,
    saveToDatabase?: boolean=true,
    injectedData?: any
}

//@auto-fold here
export function GNInputField(createData: CreateGreatNoteObjectInterface) : GNInputFieldInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage} = createData

    let _object = <GNInputFieldInterface> document.createElement("input");

    _object.GNType = GNInputField.name
    _object._name = name
    _object._dataStructure = ["value"]
    _object._styleStructure = []

    // functions
    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = _object.GNType

        if (_object._identity) dataObject["_identity"] = _object._identity

        _object._dataStructure.forEach(p=>{
          dataObject["data"][p] = _object[p]
        })

        // stylesheet data
        _object._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = _object["style"][p]
        })

        return dataObject
    }

    _object.extract = () => _object.createDataObject()


    _object.loadFromData = (data)=>_object.value = data.value

    //@auto-fold here
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage)

    // if the object is assigned to the database, then this  addEventListener is to monitor the change
    // define what is the update action

    // let eventStatus = {t0: 0, t1: 0, run: true}
    // _object.addEventListener("input", (e)=>{
    //     eventStatus.t0 = eventStatus.t1
    //     eventStatus.t1 = e.timeStamp
    //
    //     if ( eventStatus.t1 - eventStatus.t0 > 100){
    //         if (_object._identity.accessPointer!="") _object.saveHTMLObjectToDatabase()
    //         if (_object.processUpdateData) _object.processUpdateData()
    //     }
    // })//addEventListener

    return _object
} // GNInputField

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
export function GNButton(_name:string, statusList: string[], arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true):GNButtonInterface{
    let _object = <GNButtonInterface> document.createElement("button");

    _object._name = _name
    _object.GNType = GNButton.name
    _object.statusList = statusList
    _object._dataStructure = ["innerText"]
    _object._styleStructure = []
    _object.innerHTML = statusList[0]


    // functions
    _object.loadFromData = (data) => { _object.innerHTML = data }

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = _object.GNType


        if (_object._identity) dataObject["_identity"] = _object._identity

        _object._dataStructure.forEach(p=>{
          dataObject["data"][p] = _object[p]
        })

        // stylesheet data
        _object._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = _object["style"][p]
        })

        return dataObject
    }


    _object.extract = () => _object.createDataObject()
    _object.addClickEvent = function(clickFunction){
        _object.addEventListener("click", (e)=>{
            clickFunction(_object)
        })
    }
    // a user define array

    _object.addEventListener("click", ()=>{
      let currentIndex = _object.statusList.indexOf(_object.innerText)
      let nextIndex = (currentIndex + 1) % _object.statusList.length
      _object.innerText = _object.statusList[nextIndex]
      _object.saveHTMLObjectToDatabase()
      _object.updateLinkObject()
    })

    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer)
    // _object.editEvent("input")

    return _object
}

//@auto-fold here
export interface GNContainerDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any
    _identity?: any
    childrenList?: {string:GNObjectInterface}|{}
    applyStyle(data)
    loadFromData(data)
    extract(): any
    appendElements(...any)
    getAccessPointer():string
    linkTo(_object)

}

//@auto-fold here

export function GNContainerDiv(createData: CreateGreatNoteObjectInterface) : GNContainerDivInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage} = createData
    let _object = <GNContainerDivInterface> document.createElement("div");
    _object.childrenList = {}

    _object.GNType = GNContainerDiv.name
    _object._dataStructure = ["innerHTML"]
    _object._styleStructure = ["background", "width", "height"]

    // functions
    _object.appendElements = function(...childrenArray){
          childrenArray.forEach(p=>{
              _object.appendChild(p)
              _object.childrenList[p._name] = p
              p._parent = _object
          })
    }

    _object.loadFromData = (data) => {
        _object._dataStructure.forEach(key=>{
            _object[key] = data[key]
        })
    }

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        dataObject["GNType"] = _object.GNType
        if (_object._identity) dataObject["_identity"] = _object._identity

        // data structure
        _object._dataStructure.forEach(p=>{
          dataObject["data"][p] = _object[p]
        })

        dataObject["_classList"] = Array.from(_object.classList)

        // stylesheet data
        _object._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = _object["style"][p]
        })

        return dataObject
    }

    _object.applyStyle = function (styleObject){
        Object.entries(styleObject).forEach(([key, value], _)=>{
            _object[key] = value
        })
        _object.saveHTMLObjectToDatabase()//
    }


    _object.extract = () => _object.createDataObject()

    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage)


    // add events
    let eventStatus = {t0: 0, t1: 0, run: true}
    _object.addEventListener("input", (e)=>{
        eventStatus.t0 = eventStatus.t1
        eventStatus.t1 = e.timeStamp

        if ( eventStatus.t1 - eventStatus.t0 > 100){
            if (_object._identity.accessPointer!="") _object.saveHTMLObjectToDatabase()
            if (_object.processUpdateData) _object.processUpdateData()
        }
    })//addEventListener

    return _object
}

// GNEditableDivInterface
//@auto-fold here
export interface GNEditableDivInterface extends GNContainerDivInterface {
    _parent?: any
}

let testArray = []

//@auto-fold here
export function GNEditableDiv(_name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> GNContainerDiv(_name, arrayID, insertPosition, dataPointer, saveToDatabase)
    _object.contentEditable = "true"

    _object._name = _name
    _object.GNType = GNEditableDiv.name
    _object._dataStructure = ["innerHTML"]
    _object._styleStructure = ["background", "width"]

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = _object.GNType
        if (_object._identity) dataObject["_identity"] = _object._identity

        _object._dataStructure.forEach(p=>{
          dataObject["data"][p] = _object[p]
        })

        // stylesheet data
        _object._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = _object["style"][p]
        })

        return dataObject
    }


    _object.extract = () => {
      let _dummyData = _object.createDataObject()
      return _dummyData
    }


    _object.loadFromData = (data) => {
        _object._dataStructure.forEach(key=>{
            _object[key] = data[key]
        })
    }


    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    return _object
}

//@auto-fold here
export interface GNImageInterface extends GNObjectInterface, HTMLImageElement {
    _name:string
}// GNImageInterface

//@auto-fold here
export function GNImage(_name, imgsrc):GNImageInterface{
    let _object = <GNImageInterface> document.createElement("img");

    _object._name = _name
    _object.src = imgsrc
    _object.GNType = GNImage.name
    _object.style.width = "60%"
    _object._dataStructure = ["src"]
    _object._styleStructure = ["width", "height"]

    _object.loadFromData = (data) => {data}

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // identity
        dataObject["GNType"] = _object.GNType
        if (_object._identity) dataObject["_identity"] = _object._identity

        // data structure
        _object._dataStructure.forEach(p=>{
          dataObject["data"][p] = _object[p]
        })

        // stylesheet data
        _object._styleStructure.forEach(p=>{
          dataObject["stylesheet"][p] = _object["style"][p]
        })

        return dataObject
    }

    _object.extract = () => _object.createDataObject()

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
} // GNImage

//@auto-fold here
interface GNImageDataStructure {
  name: string
  src: string
}

//@auto-fold here
export interface GNDropdownListInterface extends GNObjectInterface, HTMLSelectElement{

}

//@auto-fold here
export function GNDropdownList(_name:string, selectList: string[],arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true) : GNDropdownListInterface {
    let _object = <GNDropdownListInterface> document.createElement("select")

    selectList.forEach(p=>{
        let option = document.createElement("option")
        option.value = p
        option.innerText = p
        _object.appendChild(option)
    })

    _object._name = _name
    _object.GNType = GNDropdownList.name
    _object._dataStructure = ["value"]

    _object.extract = () => {
      let _dummyData = _object.createDataObject()
      return _dummyData
    }

    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    return _object
}


//@auto-fold here
export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {

}

export function GNTemplate(_name:string, _parent?:any) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> document.createElement("div");

    // internal properties
    _object._name = _name
    _object.GNType = GNImage.name

    // functions
    _object.extract = () => 123

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
}

//@auto-fold here
interface superGNObjectInterface {
    /** To link to other objects */
    saveHTMLObjectToDatabase()
    linkTo(_object)
}




//@auto-fold here
export function superGNObject(_object, saveToDatabase:boolean, arrayID:string, insertPosition:number|boolean, dataPointer:string|boolean, specialCreationMessage?:string){
    _object = <superGNObjectInterface>_object
    /** important function to extract data from individual elements*/


    // when the data is first created, add it to the database
    _object.addToDatabase = function(arrayID, insertPosition?:number|boolean, dataPointer?:string, specialCreationMessage?: string){
        mainController.addData(arrayID, _object, insertPosition, dataPointer, specialCreationMessage)
        _object.setAttribute("accessPointer", _object.getAccessPointer())
    }


    _object.saveHTMLObjectToDatabase = function(){
        mainController.saveHTMLObjectToDatabase(_object)
    }

    /** to apply stylesheet to an element */
    _object.updateLinkObject = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()
        let masterObject = mainController.getObjectById(dataPointer)
        let linkArray = masterObject._identity.linkArray
        let dataObject = _object.extract()["data"]

        linkArray.forEach(p=>{
            let targetHTML = document.querySelector(`*[accesspointer='${p}']`)

            if (p!= accessPointer){
                targetHTML?.loadFromData(dataObject)
            } else {
                // _object.saveHTMLObjectToDatabase()
            }
        })
    }

    _object.initializeHTMLObjectFromData = function(data: any){
        _object.setAttribute("accessPointer", data._identity.accessPointer)
        _object._identity = data._identity
        _object.GNType = data.GNType
    }

    _object.processUpdateData  = function(){
        let objectData = _object.reloadDataFromDatabase()
        _object.updateLinkObject()
    }

    _object.reloadDataFromDatabase = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()

        let dataPointerObject = mainController.getObjectById(dataPointer)

        _object.loadFromData(dataPointerObject.data)

        if (dataPointer!= accessPointer){
            let accessPointerObject= mainController.getObjectById(accessPointer)
            _object.applyStyle(accessPointerObject.stylesheet)
        } else {
            _object.applyStyle(dataPointerObject.stylesheet)
        }
        return dataPointerObject
    }


    _object.appendTo = function(_parent:HTMLElement){
        _object._parent = _parent
        _parent.appendChild(_object)
    }

    _object.generateGNObjectThroughGNType = function(_GNType:string, createDataObject: CreateGreatNoteObjectInterface){
        return mainController.createGNObjectThroughName(_GNType, createDataObject)
    }

    // ========================================
    // =======   for database acces    ========
    // ========================================

    _object.getDataPointer = function(){
        return _object._identity.dataPointer
    }

    _object.setDataPointer = function(dataPointer){
        _object._identity.dataPointer = dataPointer
    }

    _object.getAccessPointer = function(){
        return _object._identity.accessPointer
    }

    _object.setAccessPointer = function(accessPointer){
        _object._identity.accessPointer = accessPointer
    }

    _object.getLinkArray = function(){
        let objectInDatabase = mainController.getObjectById(_object.getAccessPointer())
        return objectInDatabase._identity.linkArray
    }


    // ========================================
    // =======   database operations   ========
    // ========================================

    _object.GNdelete = function (){
        // mainController
        _object.getLinkArray().forEach(p=>{
            let target = document.querySelector(`*[accessPointer='${p}']`)
            target?.remove()
        })
    }


    _object.getDataFromDataBase = function(){
        return mainController.getObjectById(_object.getDataPointer())
    }

    if (saveToDatabase){
        _object.addToDatabase(arrayID, insertPosition, dataPointer, specialCreationMessage)
        // _object.editEvent(editEvent)
    }


}
