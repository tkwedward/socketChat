import * as Automerge from 'automerge'
import * as GreatNoteDataClass from "./GreatNoteDataClass"
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
    mainDocArray: any,
    // mainDocArrayIDMapping: any,
    baseArrayID: string,
    // getArrayID(MainDocArrayEnum):string
    initalizeMainDoc()

    addData(arrayID: string, htmlObject: GreatNoteDataClass.GNObjectInterface|HTMLElement, insertPosition?:number|boolean, dataPointer?:string, attachToRoot?: boolean): [HTMLElement, string]

    createDummyData(name:string, age: number, sex: string):any

    updateData(_object:GreatNoteDataClass.GNObjectInterface, dataPointerType:boolean)
    /** to save the document*/
    save(htmlObject:GreatNoteDataClass.GNObjectInterface):string

    saveHTMLObjectToDatabase(htmlObject:GreatNoteDataClass.GNObjectInterface)
}

export class MainController implements MainControllerInterface{
  mainDocArray: any;
  mainDoc: any;
  baseArrayID: string;

    constructor(){
        this.initializeRootArray()
        console.log(this.mainDocArray)
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

            console.log(GreatNoteDataClass)
            let htmlObject = GreatNoteDataClass.GNInputField("dummy")
            // let htmlObject = document.createElement("div")
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
    return: the HTMLObject related to, the accessID of the object in the database*/
    addData(arrayID, htmlObject:GreatNoteDataClass.GNObjectInterface, insertPosition?:number|boolean, dataPointer?, attachToRoot:boolean=false):[any, string]{
      // Step 1: register an accessPointer in the database
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
    updateData(_object:GreatNoteDataClass.GNObjectInterface, dataPointerType:boolean = true){
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

    saveHTMLObjectToDatabase(htmlObject:GreatNoteDataClass.GNObjectInterface){
        let data = htmlObject.extract()["identity"]["dataPointer"]

    }

    save():string{
      return Automerge.save(this.mainDoc)
    }
}
