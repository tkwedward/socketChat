import {mainController} from "./constructInitialCondition"

export interface GNObjectInterface {
    loadFromData?(data)
    extract?():any
    controlledObject?:any
    controllerEvent?:any

    _type: string
    _name: string // a name to describe the object
    _styleList?: {}
    mainController:any


    // these two are used for extracting data and create dataObject
    _dataStructure?: string[]
    _styleStructure?: string[]

    _identity?: {
      "accessPointer": string,
      "dataPointer": string
    }

    applyStyle(any)
    createDataObject(GNObjectInterface?):any
    appendElements(...any)
    getDataPointer():string
    getAccessPointer():string
    getLinkArray():any
    reloadDataFromDatabase()
    saveHTMLObjectToDatabase()

    /** to save data from the database and extract data*/
    save()
    load(data:any)

    // relate to DB
    addToDatabase(arrayID, insertPosition?:number|boolean, dataPointer?)
}

function GNObject():GNObjectInterface{
    let _object = <GNObjectInterface> new Object()

    return _object
}

// GNInputFieldInterface
export interface GNInputFieldInterface extends GNObjectInterface, HTMLInputElement {
    _parent?:any
}

export function GNInputField(_name:string) : GNInputFieldInterface {
    let _object = <GNInputFieldInterface> document.createElement("input");

    _object._type = GNInputField.name
    _object._name = _name
    _object._dataStructure = ["value"]
    _object._styleStructure = []

    // functions
    _object.loadFromData = (data)=>{ _object.value = data }

    _object.extract = () => _object.createDataObject()

    _object.save = ()=>{
    }

    _object.addEventListener("input", (e)=>{
        let newData = _object.extract()
        // _object._parent.receiveDataFromChild(newData)
    })

    // add extra funcitons to the object
    superGNObject(_object)

    return _object
}

// GNButtonInterface
export interface GNButtonInterface extends HTMLButtonElement, GNObjectInterface {
    _parent?: any
    status: any
    statusList: string[]
    event(e)
}

export function GNButton(_name:string, statusList: string[], event:(any)=>void, _parent?:any):GNButtonInterface{
    let _object = <GNButtonInterface> document.createElement("button");

    _object._name = _name
    _object._type = GNButton.name
    _object.statusList = statusList
    _object._dataStructure = ["innerText"]
    _object.innerHTML = statusList[0]
    _object.event = event


    // functions
    _object.loadFromData = (data) => { _object.innerHTML = data }
    _object.extract = () => _object.createDataObject()

    // a user define array
    _object.addEventListener("click", _object.event)
    _object.addEventListener("click", ()=>{
      let newData = _object.extract()
      return newData
    })


    // add extra funcitons to the object
    superGNObject(_object)

    return _object
}

export interface GNContainerDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any
    childrenList?: {string:GNObjectInterface}|{}
    applyStyle(data)
    loadFromData(data)
    extract(): any
    appendElements(...any)
    getAccessPointer():string
    linkTo(_object)

}

export function GNContainerDiv(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string, _parent?:any):GNContainerDivInterface{
    let _object = <GNContainerDivInterface> document.createElement("div");
    _object.childrenList = {}

    _object._type = GNContainerDiv.name
    _object._dataStructure = ["innerHTML", "innerText"]
    _object._styleStructure = ["background", "width"]

    // functions
    _object.appendElements = function(...childrenArray){
          childrenArray.forEach(p=>{
              _object.appendChild(p)
              _object.childrenList[p._name] = p
              p._parent = _object
          })
    }

    _object.loadFromData = function (data){
        Object.values(_object.childrenList).forEach(p=>p.loadFromData(data[p._name]))
    }

    _object.extract = () => _object.createDataObject()

    // add extra funcitons to the object
    superGNObject(_object)
    _object.addToDatabase(arrayID, insertPosition, dataPointer)

    return _object
}

// GNEditableDivInterface
export interface GNEditableDivInterface extends   GNContainerDivInterface {
    _parent?: any
}

let testArray = []

export function GNEditableDiv(_name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string,  _parent?:any) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> GNContainerDiv(_name, arrayID, insertPosition, dataPointer, _parent)
    _object.contentEditable = "true"

    _object._name = _name
    _object._parent = _parent
    _object._type = GNEditableDiv.name
    _object._dataStructure = ["innerHTML"]

    _object.extract = () => {
      let _dummyData = _object.createDataObject()
      return _dummyData
    }


    // add extra funcitons to the object
    superGNObject(_object)
    _object.addToDatabase(arrayID, insertPosition, dataPointer)


    // event
    _object.addEventListener("input", (e)=>{
        _object.saveHTMLObjectToDatabase()

        let linkArrayInfo  = document.querySelector(".linkArrayInfo")
        linkArrayInfo.innerHTML = ""

        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()
        let masterObject = mainController.getObjectById(dataPointer)
        let linkArray = masterObject._identity.linkArray
        // let dataObject = masterObject.data
        let dataObject = _object.extract()["data"]
        // console.log(192, linkArray, dataObject)

        linkArray.forEach(p=>{
            linkArrayInfo.innerHTML += p + "</br>"
            let targetHTML = document.querySelector(`div[accesspointer='${p}']`)

            if (p!= accessPointer){
                targetHTML?.loadFromData(dataObject)
            }
        })
    })

    return _object
}

export interface GNImageInterface extends GNObjectInterface, HTMLImageElement {
    _name:string
}

export function GNImage(_name, imgsrc):GNImageInterface{
    let _object = <GNImageInterface> document.createElement("img");

    _object._name = _name
    _object.src = imgsrc
    _object._type = GNImage.name
    _object.style.width = "60%"
    _object._dataStructure = ["src"]
    _object._styleStructure = ["width", "height"]

    _object.loadFromData = (data) => {data}
    _object.extract = () => _object.createDataObject()

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
}


interface GNImageDataStructure {
  name: string
  src: string
}

export interface GNPageInterface extends GNContainerDivInterface {
    styleListArray: {}[]
    applyStyle(any?)
}

export function GNDivPage(_name:string, _parent?:any) : GNPageInterface {
    let _object = <GNPageInterface> GNContainerDiv();

    // internal properties
    _object._name = _name
    _object._type = GNImage.name
    _object.styleListArray = []
    _object.styleListArray[0] = {
        "height": "400px",
        "background": "lightgreen"
    }
    _object.styleListArray[1] = {
        "height": "50vh",
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr 1fr",
        "gridGap": "10px",
        "gridBorder": "1px black solid"
    }

    _object.appendElements = function(...childrenList){
        childrenList.forEach(p=>{
            let gridItem = document.createElement("div")
            gridItem.style.border = "1px black solid"
            gridItem.style.width = "100%"
            gridItem.style.height = "100%"
            gridItem.appendChild(p)
            _object.appendChild(gridItem)
            _object.childrenList[p._name] = p
            p._parent = _object
            p.classList.add(`page_item_${_object._name}_${p._type}`)
        })
    }

    /** apply the styleList to the HTMLObject */
    _object.applyStyle = function(stylechoice=0){
        Object.entries(_object.styleListArray[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
    }

    _object.extract = () => _object.createDataObject()

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    // do something before the object is returned
    _object.applyStyle(1)
    return _object
}

export interface GNDropdownListInterface extends GNObjectInterface{

}


export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {

}

export function GNTemplate(_name:string, _parent?:any) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> document.createElement("div");

    // internal properties
    _object._name = _name
    _object._type = GNImage.name

    // functions
    _object.extract = () => 123

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
}

interface superGNObjectInterface {
    /** To link to other objects */
    saveHTMLObjectToDatabase()
    linkTo(_object)
}



function superGNObject(_object){
    _object = <superGNObjectInterface>_object

    /** important function to extract data from individual elements*/
    _object.createDataObject = function(){
        let dataObject = {
            "data": {},
            "array": [],
            "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
            "stylesheet": {}
        }

        if (_object._identity){
            dataObject["_identity"] = _object._identity
        }

        if (_object._dataStructure){
            _object._dataStructure.forEach(property=> {
                 dataObject["data"][property] = _object[property]
            })
        }

        if (_object._stylesList){
            _object._stylesList.forEach(property=> dataObject["stylesheet"][property] = _object["style"][property])
        }

        return dataObject
    }

    // when the data is first created, add it to the database
    _object.addToDatabase = function(arrayID, insertPosition?:number|boolean, dataPointer?){
        mainController.addData(arrayID, _object, insertPosition, dataPointer)
        _object.setAttribute("accessPointer", _object.getAccessPointer())
    }

    _object.loadFromData = (data) => {
        _object._dataStructure.forEach(key=>{
            _object[key] = data[key]
        })
    }



    _object.saveHTMLObjectToDatabase = function(){
        mainController.saveHTMLObjectToDatabase(_object)
    }

    /** to apply stylesheet to an element */
    _object.applyStyle = function( styleList:{}|{}[], stylechoice?:any){
      if (stylechoice){
        Object.entries(styleList[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
      } else {
        Object.entries(styleList).forEach(([key, value], _)=>{_object.style[key] = value})
      }
    }

    _object.reloadDataFromDatabase = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()

        let dataPointerObject = mainController.getObjectById(dataPointer)
        _object.loadFromData(dataPointerObject.data)

        // if (dataPointer!= accessPointer){
        //     let accessPointerObject= mainController.getObjectById(accessPointer)
        //     _object.applyStyle(accessPointerObject._styleList)
        // } else {
        //     _object.applyStyle(dataPointerObject._styleList)
        // }
        // _object.applyStyle()
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

    _object.getDataFromDataBase = function(){
        return mainController.getObjectById(_object.getDataPointer())
    }
}
