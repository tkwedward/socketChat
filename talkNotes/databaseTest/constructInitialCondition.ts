import * as Automerge from 'automerge'
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

interface SubmitDataStructure {
    data: any,
    array: any[],
    identity: {"dataPointer": string, "accessPointer": string},
    styleSheet: any
}



export interface MainControllerInterface {
    mainDoc: any,
    mainDocArray: any,
    // mainDocArrayIDMapping: any,
    baseArrayID: string,
    // getArrayID(MainDocArrayEnum):string
    initalizeMainDoc()
    addData(arrayID: string, objectData: SubmitDataStructure, htmlObject: HTMLElement, insertPosition?:number|boolean, dataPointer?:string, attachToRoot?: boolean): [HTMLElement, string]
    createDummyData(name:string, age: number, sex: string):any
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

            let htmlObject = document.createElement("div")
            this.addData(this.baseArrayID, initialArrayData, htmlObject, false, false, true)
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
    addData(arrayID, objectData, htmlObject, insertPosition:number|boolean, dataPointer, attachToRoot:boolean = false):[HTMLElement, string]{
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

        // step 2
        let arrayToBeAttachedTo
        if (attachToRoot) {
            arrayToBeAttachedTo =  Automerge.getObjectById(this.mainDoc, arrayID)
        } else {
            arrayToBeAttachedTo =  Automerge.getObjectById(this.mainDoc, arrayID)["array"]
        }
        let objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[<number>insertPosition])
        let accessPointer = arrayToBeAttachedTo[<number>insertPosition][objectSymbolArray[1]]

        objectData.identity.accessPointer = accessPointer
        objectData.identity.dataPointer = accessPointer
        if (dataPointer){
            objectData.identity.dataPointer = dataPointer
        }
        htmlObject.identity = objectData.identity
        console.log(1234, htmlObject.identity)
        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            // add the data to the object
            let objectInDatabase = Automerge.getObjectById(doc, accessPointer)

            Object.entries(objectData).forEach(([key, value], _)=>{
                objectInDatabase[key] = value
            })
        })

        return htmlObject, accessPointer
    }// addData

    createDummyData(name, age, sex){
        let _dummyData = {
            "data": {"name": name, "age": age, "sex": sex},
            "array": [],
            "identity": {"dataPointer": "", "accessPointer": ""},
            "stylesheet": {}
        }

        let htmlObject = document.createElement("div")
        htmlObject.style.width = "300px"
        htmlObject.style.height = "200px"
        return [_dummyData, htmlObject]
    }
}


export function MainControlle2r():MainControllerInterface{
    let _object = <MainControllerInterface> {}



    // initialize the databasae

    return _object
}
