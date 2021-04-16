/// <reference path="newClassTest.ts" />

import * as Automerge from 'automerge'

/** to apply stylesheet to an element */
export function applyStyleHelperFunction(_object, styleList:{}|{}[], stylechoice?:any){
  if (stylechoice){
    Object.entries(styleList[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
  } else {
    Object.entries(styleList).forEach(([key, value], _)=>{_object.style[key] = value})
  }
}

/** important function to extract data from individual elements*/
function createDataObject(_object){
    let dataObject = {
        "data": {},
        "array": [],
        "identity": {"dataPointer": "", "accessPointer": ""},
        "stylesheet": {}
    }

    if (_object._identity){
        dataObject["identity"] = _object._identity
    }

    if (_object._dataStructure){
        _object._dataStructure.forEach(property=> {
             dataObject["data"][property] = _object[property]
             console.log(dataObject["data"][property])
        })
    }

    if (_object._stylesList){
        _object._stylesList.forEach(property=> dataObject["stylesheet"][property] = _object["style"][property])
    }

    return dataObject
}




export interface GNObjectInterface {
    update?(data)
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
    /** to save data from the database and extract data*/
    save()
    load(data:any)
}

function GNObject():GNObjectInterface{
    let _object = <GNObjectInterface> new Object()

    return _object
}

interface HTMLElement {
    applyStyle?()
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
    _object.update = (data)=>{ _object.value = data }

    _object.extract = () => createDataObject(_object)

    _object.save = ()=>{
    }

    _object.addEventListener("input", (e)=>{
        let newData = _object.extract()
        // _object._parent.receiveDataFromChild(newData)
    })

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
    _object.update = (data) => { _object.innerHTML = data }
    _object.extract = () => createDataObject(_object)

    // a user define array
    _object.addEventListener("click", _object.event)
    _object.addEventListener("click", ()=>{
      let newData = _object.extract()
      return newData
    })


    return _object
}



export interface GNContainerDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any
    childrenList?: {string:GNObjectInterface}|{}
    applyStyle(data)
    update(data)
    extract(): any
    appendElements(...any)
}


export function GNContainerDiv(_parent?):GNContainerDivInterface{
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
          console.log(Object.entries(_object.childrenList))
    }

    _object.update = function (data){
        Object.values(_object.childrenList).forEach(p=>p.update(data[p._name]))
    }

    _object.extract = () => createDataObject(_object)

    _object.applyStyle = function(styleList){
          applyStyleHelperFunction(_object, styleList)
    }

    return _object
}

// GNEditableDivInterface
export interface GNEditableDivInterface extends   GNContainerDivInterface {
    _parent?: any
}

export function GNEditableDiv(_name:string, _parent?:any) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> GNContainerDiv()
    _object.contentEditable = "true"

    _object._name = _name
    _object._parent = _parent
    _object._type = GNEditableDiv.name
    _object._dataStructure = ["innerHTML"]

    _object.update = (data) => {_object.innerHTML = data}

    _object.extract = () => {
      let _dummyData = createDataObject(_object)
      return _dummyData
    }

    _object.addEventListener("input", (e)=>{
        console.log(_object.mainController)
        // _object.mainController.getObjectById(_object.identity.accessPointer)
        // mainController.updateData(_object)
        // console.log(Automerge.getObjectById(mainController.mainDoc, _object._identity.dataPointer))
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

    _object.update = (data) => {data}
    _object.extract = () => createDataObject(_object)

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
        console.log(Object.entries(_object.childrenList))
    }

    /** apply the styleList to the HTMLObject */
    _object.applyStyle = function(stylechoice=0){
        Object.entries(_object.styleListArray[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
    }

    _object.extract = () => createDataObject(_object)

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
    _object.update = (data) => {data}
    _object.extract = () => 123

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
}
