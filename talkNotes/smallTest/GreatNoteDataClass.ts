import {mainController} from "./constructInitialCondition"
//@auto-fold here
export interface GNObjectInterface {
    loadFromData?(data)
    extract?():any
    controlledObject?:any
    controllerEvent?:any

    _type: string
    _name: string // a name to describe the object
    stylesheet?: {}
    mainController:any


    // these two are used for extracting data and create dataObject
    _dataStructure?: string[]
    _styleStructure?: string[]

    _identity?: {
      "accessPointer": string,
      "dataPointer": string
    }

    appendTo(_parent:HTMLElement)
    applyStyle(any)
    createDataObject(GNObjectInterface?):any
    appendElements(...any)
    getDataPointer():string
    getAccessPointer():string
    setDataPointer():string
    setAccessPointer():string
    getDataFromDataBase():any
    editEvent(eventName:string)

    getLinkArray():any
    reloadDataFromDatabase()
    saveHTMLObjectToDatabase()

    /** to save data from the database and extract data*/
    save()
    load(data:any)

    // relate to DB
    addToDatabase(arrayID, insertPosition?:number|boolean, dataPointer?)
}

// GNInputFieldInterface
//@auto-fold here
export interface GNInputFieldInterface extends GNObjectInterface, HTMLInputElement {
    _parent?:any
}

//@auto-fold here
export function GNInputField(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true) : GNInputFieldInterface {
    let _object = <GNInputFieldInterface> document.createElement("input");

    _object._type = GNInputField.name
    _object._name = name
    _object._dataStructure = ["value"]
    _object._styleStructure = []

    // functions
    _object.loadFromData = (data)=>{ _object.value = data }

    _object.extract = () => _object.createDataObject()

    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    return _object
}

// GNButtonInterface
//@auto-fold here
export interface GNButtonInterface extends HTMLButtonElement, GNObjectInterface {
    _parent?: any
    status: any
    statusList: string[]
    event(e)
}
//@auto-fold here
export function GNButton(_name:string, statusList: string[],arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true):GNButtonInterface{
    let _object = <GNButtonInterface> document.createElement("button");

    _object._name = _name
    _object._type = GNButton.name
    _object.statusList = statusList
    _object._dataStructure = ["innerText"]
    _object.innerHTML = statusList[0]
    // _object.event = event

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
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer)
    // _object.editEvent("input")

    return _object
}

//@auto-fold here
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

//@auto-fold here
export function GNContainerDiv(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true):GNContainerDivInterface{
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
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer)

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
    _object._type = GNEditableDiv.name
    _object._dataStructure = ["innerHTML"]

    _object.extract = () => {
      let _dummyData = _object.createDataObject()
      return _dummyData
    }


    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    return _object
}

//@auto-fold here
export interface GNImageInterface extends GNObjectInterface, HTMLImageElement {
    _name:string
}

//@auto-fold here
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

//@auto-fold here
interface GNImageDataStructure {
  name: string
  src: string
}

//@auto-fold here
export interface GNPageInterface extends GNContainerDivInterface {
    stylesheetArray: {}[]
    applyStyle(any?)
}

//@auto-fold here
export function GNDivPage(_name:string, _parent?:any) : GNPageInterface {
    let _object = <GNPageInterface> GNContainerDiv();

    // internal properties
    _object._name = _name
    _object._type = GNImage.name
    _object.stylesheetArray = []
    _object.stylesheetArray[0] = {
        "height": "400px",
        "background": "lightgreen"
    }
    _object.stylesheetArray[1] = {
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

    /** apply the styleListArray to the HTMLObject */
    // _object.applyStyle = function(stylechoice=0){
    //     Object.entries(_object.stylesheetArray[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
    // }

    _object.extract = () => _object.createDataObject()

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    // do something before the object is returned
    _object.applyStyle(1)
    return _object
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
    _object._type = GNDropdownList.name
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
    _object._type = GNImage.name

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
function superGNObject(_object, saveToDatabase:boolean, arrayID:string, insertPosition:number|boolean, dataPointer:string|boolean, editEvent?:string){
    _object = <superGNObjectInterface>_object


    /** important function to extract data from individual elements*/
    _object.createDataObject = function(){
        let dataObject = {
            "data": {},
            "array": [],
            "GNType": "",
            "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
            "stylesheet": {}
        }


        dataObject["GNType"] = _object._type

        if (_object._identity){
            dataObject["_identity"] = _object._identity
        }

        if (_object._dataStructure){
            _object._dataStructure.forEach(property=> {
                 dataObject["data"][property] = _object[property]
            })
        }

        if (_object.stylesheet){
            Object.entries(_object.stylesheet).forEach(([key,_], i)=> dataObject["stylesheet"][key] = _object["style"][key])
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
    _object.applyStyle = function( stylesheet:{}|{}[], stylechoice?:any){
      if (stylechoice){
        Object.entries(stylesheet[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
        _object.stylesheet = stylesheet[stylechoice]
      }
      else {
        Object.entries(stylesheet).forEach(([key, value], _)=>{
            _object.style[key] = value
            _object.stylesheet = stylesheet
         })
      }
      _object.saveHTMLObjectToDatabase()
    }

    _object.editEvent = function(eventName:string){
        //@auto-fold here
        _object.addEventListener(eventName, (e)=>{
            _object.saveHTMLObjectToDatabase()

            let linkArrayInfo  = document.querySelector(".linkArrayInfo")
            linkArrayInfo.innerHTML = ""

            let dataPointer = _object.getDataPointer()
            let accessPointer = _object.getAccessPointer()
            let masterObject = mainController.getObjectById(dataPointer)
            let linkArray = masterObject._identity.linkArray
            let dataObject = _object.extract()["data"]

            linkArray.forEach(p=>{

                linkArrayInfo.innerHTML += p + "</br>"
                let targetHTML = document.querySelector(`*[accesspointer='${p}']`)

                if (p!= accessPointer){
                    targetHTML?.loadFromData(dataObject)
                }
            })
        })//addEventListener
    }




    _object.reloadDataFromDatabase = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()

        let dataPointerObject = mainController.getObjectById(dataPointer)
        _object.loadFromData(dataPointerObject.data)

        // if (dataPointer!= accessPointer){
        //     let accessPointerObject= mainController.getObjectById(accessPointer)
        //     _object.applyStyle(accessPointerObject.stylesheet)
        // } else {
        //     _object.applyStyle(dataPointerObject.stylesheet)
        // }
        // _object.applyStyle()
    }


    _object.appendTo = function(_parent:HTMLElement){
        _object._parent = _parent
        _parent.appendChild(_object)
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

    if (saveToDatabase){
        _object.addToDatabase(arrayID, insertPosition, dataPointer)
        _object.editEvent(editEvent)
    }


}
