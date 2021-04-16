import * as Automerge from 'automerge'
import {GNObjectInterface, GNImage, GNButton, GNDivPage, GNInputField, GNEditableDiv, GNContainerDiv, GNPageInterface}  from "./GreatNoteDataClass"


function testHTML1():HTMLInputElement{
    let _object = document.createElement("input")
    return _object

}

function testHTML2():HTMLDivElement{
    let _object = document.createElement("div")

    // augment function
    _object = augmentFunction(_object)
    return _object
}

function augmentFunction(object:any):any{
    object.save = function (){
        console.log(21, "from augmentFunction")
    }
    return object
}

let test2 = testHTML2()
test2.save()
console.log(test2)


let database = {
    "root": {
        "itemName": "rootNode",
        "array": [],
        "bookmarkArray": [],
        "itemIdentity": {
        },
        "itemStylesheet": {
            "background": "silver"
        }
    }
}

export enum MainDocArrayEnum {
    page = "page",
    bookmark = "bookmark",
    panel = "panel",
    pokemon = "pokemon"
}



export interface MainControllerInterface {
    mainDoc: any,

    // a maapping to link  root array and arraayID
    mainDocArray: any,
    // mainDocArrayIDMapping: any,
    baseArrayID: string,
    // getArrayID(MainDocArrayEnum):string
    initalizeMainDoc()

    addData(arrayID: string, htmlObject: GNObjectInterface|HTMLElement, insertPosition?:number|boolean, dataPointer?:string, attachToRoot?: boolean): [HTMLElement, string]

    createDummyData(name:string, age: number, sex: string):any

    /** the arrayID is for attaching to the array*/
    createGNItem(GNItem:any, arrayID?:string):GNObjectInterface

    updateData(_object:GNObjectInterface, dataPointerType:boolean)
    /** to save the document*/
    save(htmlObject:GNObjectInterface):string

    saveHTMLObjectToDatabase(htmlObject: GNObjectInterface)


}

export class MainController implements MainControllerInterface{
  mainDocArray: any;
  mainDoc: any;
  baseArrayID: string;

    constructor(){
        this.initializeRootArray()
        this.initalizeMainDoc()
    }

    initializeRootArray(){
      this.mainDocArray = {}
      for (let arrayName in MainDocArrayEnum) {
        console.log(this.mainDocArray, arrayName)
          this.mainDocArray[arrayName] = ""
      }

      this.baseArrayID = ""
    }

    initalizeMainDoc(){
        let initialArray = {"rootArray": []}

        this.mainDoc = Automerge.init()
        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            doc["rootArray"] = []
        })

        this.baseArrayID = Automerge.getObjectId(this.mainDoc["rootArray"])
        console.log(this.baseArrayID, this.mainDoc["rootArray"])

        for (let arrayName in MainDocArrayEnum) {
            let initialArrayData = {
                "data": {"name": arrayName},
                "array": [],
                "identity": {"dataPointer": "", "accessPointer": ""},
                "styleSheet": {}
            }

            let htmlObject = GNInputField("dummy")
            // let htmlObject = document.createEle ment("div")
            this.addData(this.baseArrayID, htmlObject, false, false, true)
        }

        console.log(this.mainDoc["rootArray"])

        Array.from(this.mainDoc["rootArray"]).forEach(arrayObject=>{
            console.log(arrayObject)
            let objectID = Automerge.getObjectId(arrayObject)
            this.mainDocArray[arrayObject["data"]["name"]] = objectID
        })
    }// initalizeMainDoc


    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    addData(arrayID, htmlObject:GNObjectInterface|any, insertPosition?:number|boolean, dataPointer?, attachToRoot:boolean=false):[any, string]{
      // Step 1: register an accessPointer in the database
        htmlObject.mainController = this

        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            // add the data to the object
            let arrayToBeAttachedTo
            if (attachToRoot) {
                arrayToBeAttachedTo =  Automerge.getObjectById(doc, arrayID)
            } else {
                arrayToBeAttachedTo =  Automerge.getObjectById(doc, arrayID)["array"]
            }

            if (!insertPosition) insertPosition = arrayToBeAttachedTo.length
            arrayToBeAttachedTo.insertAt(insertPosition, {})
        })

        // step 2 update the identityProperties of the object
        let arrayToBeAttachedTo
        if (attachToRoot) {
            arrayToBeAttachedTo =  Automerge.getObjectById(this.mainDoc, arrayID)
        } else {
            arrayToBeAttachedTo =  Automerge.getObjectById(this.mainDoc, arrayID)["array"]
        }
        let objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[<number>insertPosition])
        let accessPointer = arrayToBeAttachedTo[<number>insertPosition][objectSymbolArray[1]]


        // must have extract function

        // create new object dataa
        let objectData  = htmlObject.extract()
        objectData.identity.accessPointer = accessPointer
        objectData.identity.dataPointer = accessPointer
        if (dataPointer){
            objectData.identity.dataPointer = dataPointer
        }
        htmlObject._identity = objectData.identity
        // console.log(1234, htmlObject._identity)

        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            // add the data to the object
            let objectInDatabase = Automerge.getObjectById(doc, accessPointer)

            Object.entries(objectData).forEach(([key, value], _)=>{
                objectInDatabase[key] = value
            })
        })

        return [htmlObject, accessPointer]
    }// addData

    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    updateData(_object:GNObjectInterface, dataPointerType:boolean = true){
        let htmlObjectData = _object.extract()
        let accessPointer:string = htmlObjectData["identity"]["accessPointer"]
        let dataPointer:string = htmlObjectData["identity"]["dataPointer"]

        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            let dataPointerObject = Automerge.getObjectById(doc, dataPointer)
            Object.entries(htmlObjectData["data"])
                  .forEach(([key, value], _)=>{
                    dataPointerObject["data"][key] = value
            })

            let accessPointerObject = Automerge.getObjectById(this.mainDoc, dataPointer)
            Object.entries(htmlObjectData["styleList"])
                  .forEach(([key, value], _)=>{
                    dataPointerObject["styleList"][key] = value
            })
        })
    }

    createGNItem(GNtype:any, arrayID?:string):GNObjectInterface{
        let newGNObject = GNtype()
        newGNObject.mainController = this

        if (arrayID){
            this.addData(arrayID, newGNObject)
        }

        return newGNObject
    }



    createDummyData(data = {}): any{
        let _dummyData = {
            "data": data,
            "array": [],
            "identity": {"dataPointer": "", "accessPointer": ""},
            "stylesheet": {}
        }

        let htmlObject = document.createElement("div")
        htmlObject.style.width = "300px"
        htmlObject.style.height = "200px"
        return _dummyData
    }

    saveHTMLObjectToDatabase(htmlObject:GNObjectInterface){
        let data = htmlObject.extract()["identity"]["dataPointer"]

    }

    save():string{
      return Automerge.save(this.mainDoc)
    }
}
