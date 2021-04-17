import * as Automerge from 'automerge'
import {GNObjectInterface}  from "./GreatNoteDataClass"
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
    updateData(_object:GNObjectInterface, dataPointerType:boolean)
    /** to save the document*/
    save(htmlObject:GNObjectInterface):string

    getObjectById(objectID: string, doc?:any)

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
          this.mainDocArray[arrayName] = ""
      }

      this.baseArrayID = ""
    }

    initalizeMainDoc(){
        let initialArray = {"rootArray": []}

        this.mainDoc = Automerge.init()
        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            doc["array"] = []
        })

        this.baseArrayID = Automerge.getObjectId(this.mainDoc)


        for (let arrayName in MainDocArrayEnum) {
            // create an object with extract function here so that you cdo not need to use GNInputFIeld here

            let htmlObject = {extract: function (){}}
            htmlObject.extract = function(){
                return  {
                    "data": {"name": arrayName},
                    "array": [],
                    "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
                    "styleSheet": {}
                }
            }

            // let htmlObject = document.createEle ment("div")
            this.addData(this.baseArrayID, htmlObject)

        }

        Array.from(this.mainDoc["array"]).forEach(arrayObject=>{
            let objectID = Automerge.getObjectId(arrayObject)
            this.mainDocArray[arrayObject["data"]["name"]] = objectID
        })
    }// initalizeMainDoc


    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    addData(arrayID, htmlObject:GNObjectInterface|any, insertPosition?:number|boolean, dataPointer?):[any, string]{
      // Step 1: register an accessPointer in the database
        htmlObject.mainController = this

        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            let arrayToBeAttachedTo =  Automerge.getObjectById(doc, arrayID)["array"]
            if (!insertPosition) insertPosition = arrayToBeAttachedTo.length
            arrayToBeAttachedTo.insertAt(insertPosition, {})
        })

        // step 2 update the identityProperties of the object
        let arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"]

        let objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[<number>insertPosition])
        let accessPointer = arrayToBeAttachedTo[<number>insertPosition][objectSymbolArray[1]]


        // create new object data
        let objectData  = htmlObject.extract()
        objectData._identity.accessPointer = accessPointer
        objectData._identity.dataPointer = accessPointer
        objectData._identity.linkArray.push(accessPointer)
        // console.log(119, objectData, dataPointer)
        if (dataPointer){
            objectData._identity.dataPointer = dataPointer
        }

        // console.log(1234, htmlObject._identity)

        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            // add the data to the object
            let objectInDatabase = Automerge.getObjectById(doc, accessPointer)

            Object.entries(objectData).forEach(([key, value], _)=>{
                objectInDatabase[key] = value
            })

            // update the masterobject if it is a link object
            if (dataPointer){
                let masterObject = this.getObjectById(dataPointer, doc)
                masterObject._identity.linkArray.push(accessPointer)
            }
        })

        htmlObject._identity = objectData._identity
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
        let newData = htmlObject.extract()
        let dataPointer = htmlObject.getDataPointer()

        this.mainDoc = Automerge.change(this.mainDoc , doc=>{
            let dataPointerObejct = Automerge.getObjectById(doc, dataPointer)

            Object.entries(newData.data).forEach(([key, value], _)=>{
                // console.log(193, key, value)
                dataPointerObejct[key] = value
            })
        })
    }

    getObjectById(objectID, doc=this.mainDoc){
        let object = Automerge.getObjectById(doc, objectID)
        return object
    }

    save():string{
      return Automerge.save(this.mainDoc)
    }
}
// import {mainController} from "./newClassTest"
// console.log(4, mainController)

export var mainController:MainControllerInterface
mainController = new MainController()
