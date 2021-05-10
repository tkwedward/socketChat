import {mainController} from "../constructInitialCondition"
import * as ToolBoxEvents from "../EventFolder/attachToolBoxEventsToLayers"
import {superGNObjectInterface, CreateGreatNoteObjectInterface} from "./GreatNoteObjectInterface"

export function createDummyData(){
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "specialGNType": "",
        "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
        "classList": [],
        "stylesheet": {}
    }
}


//@auto-fold here
export function superGNObject(_object, saveToDatabase:boolean, arrayID:string, insertPosition:number|boolean, dataPointer:string|boolean, specialCreationMessage?:string, injectedData?: any, attachEventListener=true){
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
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage
    }

    _object.processUpdateData  = function(){
        let objectData = _object.reloadDataFromDatabase()
        _object.updateLinkObject()
    }

    _object.reloadDataFromDatabase = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()



        let dataPointerObject = mainController.getObjectById(dataPointer)

        _object.loadFromData(dataPointerObject)
        //
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
    _object.deleteFromDatabase = function (){
        // mainController
        mainController.deleteFromDataBase(_object)
    }


    _object.getDataFromDataBase = function(){
        return mainController.getObjectById(_object.getDataPointer())
    }

    if (attachEventListener){
        attachEventListenerToLayer(mainController, arrayID, _object, injectedData)
    }


    if (saveToDatabase){
        _object.addToDatabase(arrayID, insertPosition, dataPointer, specialCreationMessage)
        // _object.editEvent(editEvent)
    }
}

function attachEventListenerToLayer(mainController, arrayID, _object, injectedData?:any){
    if (_object.GNType == "GNSvg"){
        ToolBoxEvents.attachEventListenerToSvgBoard(mainController, _object)
    }

    if (injectedData?.GNSpecialCreationMessage){
        ToolBoxEvents.attachEventListenerToDivLayer(mainController, _object)
    }

}
