import {mainController} from "./constructInitialCondition"
//@auto-fold here
export interface GNObjectInterface {
    loadFromData?(data)
    extract?():any
    controlledObject?:any
    controllerEvent?:any

    _type: string
    _name: string // a name to describe the object

    // these two are used for extracting data and create dataObject
    _dataStructure?: string[]
    _styleStructure?: string[]
    stylesheet?: {}

    _identity?: {
      "accessPointer": string,
      "dataPointer": string,
      "linkArray": string
    }

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


interface createGNOBjectInterface {
    name:string,
    message: string
    arrayID?: string,
    insertPosition?: number|boolean,
    dataPointer?: string|boolean,
    saveToDatabase?: boolean=true
}

//@auto-fold here
export function GNInputField(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true) : GNInputFieldInterface {
// export function GNInputField(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true) : GNInputFieldInterface {
    let _object = <GNInputFieldInterface> document.createElement("input");

    _object._type = GNInputField.name
    _object._name = name
    _object._dataStructure = ["value"]
    _object._styleStructure = []

    // functions


    console.log("_86", _object._dataStructure)
    _object.createDataObject = function(){
        console.log("_87", _object._dataStructure)
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = _object._type
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


    _object.loadFromData = (data)=>{
      _object.value = data.value
    }

    //@auto-fold here

    console.log("_116, _dataStructure", _object._dataStructure)
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    console.log("_120, _dataStructure", _object._dataStructure)
    // if the object is assigned to the database, then this  addEventListener is to monitor the change
    // define what is the update action
    _object.addEventListener("input", (e)=>{
        console.log("_124, _dataStructure", _object._dataStructure)
        console.log(120, e.target.value, _object._identity)
        if (_object._identity.accessPointer!=""){

            let dataPointer = _object.getDataPointer()
            let accessPointer = _object.getAccessPointer()
            let masterObject = mainController.getObjectById(dataPointer)
            // let dataObject = _object.extract()
            // _object.saveHTMLObjectToDatabase()
            console.log(120, e.target.value, _object.createDataObject, _object._dataStructure)
            // console.log(120, e.target.value, dataObject, _object.extract)
        }
        if (_object.processUpdateData){
            _object.processUpdateData()
        }

    })//addEventListener


    return _object
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
export function GNButton(_name:string, statusList: string[], arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true):GNButtonInterface{
    console.log(86, "name", _name, "statusList: ",  statusList, "arrayID", arrayID, "insertPosition", insertPosition, "saveToDatabase: ", saveToDatabase)
    let _object = <GNButtonInterface> document.createElement("button");

    _object._name = _name
    _object._type = GNButton.name
    _object.statusList = statusList
    _object._dataStructure = ["innerText"]
    _object._styleStructure = []
    _object.innerHTML = statusList[0]


    // functions
    _object.loadFromData = (data) => { _object.innerHTML = data }

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = _object._type
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
export function GNContainerDiv(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true):GNContainerDivInterface{
    let _object = <GNContainerDivInterface> document.createElement("div");
    _object.childrenList = {}

    _object._type = GNContainerDiv.name
    _object.classList.add("GNContainerDiv")
    _object._dataStructure = ["innerText"]
    _object._styleStructure = ["background", "width"]

    // functions
    _object.appendElements = function(...childrenArray){
          childrenArray.forEach(p=>{
              _object.appendChild(p)
              _object.childrenList[p._name] = p
              p._parent = _object
          })
    }

    _object.loadFromData = (data) => {
        console.log(250, data)
        _object._dataStructure.forEach(key=>{
            console.log(216, key, _object[key], _object)
            _object[key] = data[key]
        })
    }

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        dataObject["GNType"] = _object._type
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
        // console.log(238, dataObject, _object)

        return dataObject
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
    _object._styleStructure = ["background", "width"]

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // data structure
        dataObject["GNType"] = _object._type
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
    _object._type = GNImage.name
    _object.style.width = "60%"
    _object._dataStructure = ["src"]
    _object._styleStructure = ["width", "height"]

    _object.loadFromData = (data) => {data}

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        // identity
        dataObject["GNType"] = _object._type
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
export function superGNObject(_object, saveToDatabase:boolean, arrayID:string, insertPosition:number|boolean, dataPointer:string|boolean, editEvent?:string){
    _object = <superGNObjectInterface>_object
    /** important function to extract data from individual elements*/


    // when the data is first created, add it to the database
    _object.addToDatabase = function(arrayID, insertPosition?:number|boolean, dataPointer?){
        mainController.addData(arrayID, _object, insertPosition, dataPointer)
        _object.setAttribute("accessPointer", _object.getAccessPointer())
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
                _object.saveHTMLObjectToDatabase()
            }
        })
    }

    _object.initializeHTMLObjectFromData = function(data: any){
        console.log(data)
        _object.setAttribute("accessPointer", data._identity.accessPointer)
        _object._identity = data._identity
        _object._type = data._type
        // console.log("_1523, _dataStructure", _object._dataStructure)
        // _object._dataStructure = data._dataStructure
        // _object._styleStructure = data._styleStructure
    }

    _object.processUpdateData  = function(){
        let objectData = _object.reloadDataFromDatabase()
        console.log("517, processUpdateData", objectData)
        _object.updateLinkObject()
        // console.log(_object.getDataFromDataBase())
    }

    _object.reloadDataFromDatabase = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()

        let dataPointerObject = mainController.getObjectById(dataPointer)

        // console.log(528, dataPointerObject.data)
        _object.loadFromData(dataPointerObject.data)

        console.log(540, dataPointerObject)
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
        console.log("603", _object, "is created and saved to database.")
        _object.addToDatabase(arrayID, insertPosition, dataPointer)
        // _object.editEvent(editEvent)
    }


}
