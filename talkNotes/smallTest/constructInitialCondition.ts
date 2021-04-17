import * as Automerge from 'automerge'
import {GNObjectInterface}  from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
export enum MainDocArrayEnum {
    page = "page",
    bookmark = "bookmark",
    panel = "panel",
    pokemon = "pokemon"
}

//@auto-fold here
export interface communicationDataStructure{
    data: any
    array: any[]
    _identity: {"dataPointer": string, "accessPointer": string, linkArray: string[]}
    stylesheet: any
    GNType: string
}


//@auto-fold here
export interface MainControllerInterface {
    mainDoc: any
    previousDoc: any
    mainDocArray: any
    baseArrayID: string
    GNDataStructureMapping: any

    // getArrayID(MainDocArrayEnum):string
    initializeRootArray()

    initalizeMainDoc()
    initializeHTMLBackground()

    /** Functions related to save and update data in the database */
    addData(arrayID: string, htmlObject: GNObjectInterface|HTMLElement, insertPosition?:number|boolean, dataPointer?:string, attachToRoot?: boolean): [HTMLElement, string]
    updateData(_object:GNObjectInterface, dataPointerType:boolean)
    createDummyData(name:string, age: number, sex: string):any
    saveHTMLObjectToDatabase(htmlObject: GNObjectInterface)

    /** the arrayID is for attaching to the array*/
    getObjectById(objectID: string, doc?:any)

    /** internode functions*/
    renderDataToHTML(data: any, arrayHTMLObject:HTMLElement|GNObjectInterface)
    saveMainDoc()
    loadMainDoc(data:string)

}



export class MainController implements MainControllerInterface{
  mainDocArray: any;
  mainDoc: any;
  baseArrayID: string;
  previousDoc: any;
  GNDataStructureMapping:any
  template:boolean

    //@auto-fold here
    constructor(){
        this.initializeRootArray()
        this.initalizeMainDoc()
        this.template = true
        if (!this.template){
            this.initializeHTMLBackground()
        }
        //
    }

    //@auto-fold here
    initializeRootArray(){
      this.mainDocArray = {}
      for (let arrayName in MainDocArrayEnum) {
          this.mainDocArray[arrayName] = ""
      }

      this.baseArrayID = ""
    }

    //@auto-fold here
    initializeHTMLBackground(){

      // to create a controller
      document.body.style.display = "grid"
      document.body.style.gridTemplateColumns = "1fr 3fr"

      let bookmarkArrayId = this.mainDocArray["bookmark"]

      let controllerStyleList = {
          "width": "95%",
          "height": "100vh",
          "border": "2px black solid",
          "margin": "20px auto"
      }


      let controller = document.createElement("div")
      controller.classList.add("controller")
      controller.innerHTML = "king"
      controller.style.width = "95%"
      controller.style.height = "100vh"
      controller.style.border = "2px black solid"
      controller.style.margin = "20px auto"
      document.body.appendChild(controller)

      let linkArrayInfo = document.createElement("div")
      linkArrayInfo.classList.add("linkArrayInfo")
      controller.appendChild(linkArrayInfo)

      let saveButton = document.createElement("button")
      saveButton.innerHTML = "save"
      saveButton.addEventListener("click", (e)=>{
          let s = mainController.saveMainDoc()
          socket.emit("saveMainDocToDisk", s)
      })
      let loadButton = document.createElement("button")
      loadButton.innerHTML = "load"
      loadButton.addEventListener("click", (e)=>{
          socket.emit("loadMainDoc")
      })
      controller.appendChild(saveButton)
      controller.appendChild(loadButton)

      let contentContainer = document.createElement("div")
      contentContainer.classList.add("contentContainer")
      document.body.appendChild(contentContainer)
    }

    //@auto-fold here
    initalizeMainDoc(){
        let initialArray = { "rootArray": []}

        this.mainDoc = Automerge.init()
        this.mainDoc = Automerge.change(this.mainDoc, doc=>{
            doc["array"] = []
        })

        this.baseArrayID = Automerge.getObjectId(this.mainDoc)


        for (let arrayName in MainDocArrayEnum) {
            // create an object with extract function here so that you cdo not need to use GNInputFIeld here

            let htmlObject = {extract: function (){}}
            //@auto-fold here
            htmlObject.extract = function(){
                return  {
                    "data": {"name": arrayName},
                    "array": [],
                    "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
                    "styleSheet": {},
                    "GNType": ""
                }
            }

            // let htmlObject = document.createEle ment("div")
            this.addData(this.baseArrayID, htmlObject)

        }

        //@auto-fold here
        Array.from(this.mainDoc["array"]).forEach(arrayObject=>{
            let objectID = Automerge.getObjectId(arrayObject)
            this.mainDocArray[arrayObject["data"]["name"]] = objectID
        })
    }// initalizeMainDoc


    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */

    //@auto-fold here
    addData(arrayID, htmlObject:GNObjectInterface|any, insertPosition?:number|boolean, dataPointer?):[any, string]{
      // Step 1: register an accessPointer in the database
        htmlObject.mainController = this

        //@auto-fold here
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
        if (dataPointer){
            objectData._identity.dataPointer = dataPointer
        }

        // Step 3: put real data into the database
        //@auto-fold here
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
    //@auto-fold here
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
            Object.entries(htmlObjectData["stylesheet"])
                  .forEach(([key, value], _)=>{
                    dataPointerObject["stylesheet"][key] = value
            })
        })
    }

    //@auto-fold here
    createDummyData(data = {}): any{
        let _dummyData:communicationDataStructure = {
            "data": data,
            "array": [],
            "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
            "stylesheet": {},
            "GNType": ""
        }

        let htmlObject = document.createElement("div")
        htmlObject.style.width = "300px"
        htmlObject.style.height = "200px"
        return _dummyData
    }

    //@auto-fold here
    saveHTMLObjectToDatabase(htmlObject:GNObjectInterface){
        let newData = htmlObject.extract()
        let dataPointer = htmlObject.getDataPointer()
        let accessPointer = htmlObject.getAccessPointer()

        this.mainDoc = Automerge.change(this.mainDoc , doc=>{
            let dataPointerObejct = Automerge.getObjectById(doc, dataPointer)
            let accessPointerObject = Automerge.getObjectById(doc, accessPointer)

            Object.entries(newData.data).forEach(([key, value], _)=>{
                dataPointerObejct["data"][key] = value
            })


            if (accessPointer!=dataPointer){
                Object.entries(newData.stylesheet).forEach(([key, value], _)=>{
                    accessPointerObject["stylesheet"][key] = value
                })
            } else {
                Object.entries(newData.stylesheet).forEach(([key, value], _)=>{
                    dataPointerObejct["stylesheet"][key] = value
                })
            }
        })

    }

    //@auto-fold here
    getObjectById(objectID, doc=this.mainDoc){
        let object = Automerge.getObjectById(doc, objectID)
        return object
    }

    //@auto-fold here
    saveMainDoc(){
      return Automerge.save(this.mainDoc)
    }

    //@auto-fold here
    loadMainDoc(data){
      this.mainDoc = Automerge.load(data)
      this.previousDoc = this.mainDoc
      let contentContainer = document.querySelector(".contentContainer")

      let rootArray = this.mainDoc["array"]
      rootArray.forEach(mainArray=>{
          mainArray["array"].forEach(elem=>{
              this.renderDataToHTML(elem, contentContainer)
          })
      })
    }

    renderDataToHTML(data:communicationDataStructure, arrayHTMLObject){
        let newHTMLObject = this.GNDataStructureMapping[data.GNType]("name", data._identity.accessPointer, false, data._identity.dataPointer)

        newHTMLObject.applyStyle(data.stylesheet)

        arrayHTMLObject.appendChild(newHTMLObject)
        data.array.forEach(_data=>{
            this.renderDataToHTML(_data, newHTMLObject)
        })


    }
}

export var mainController:MainControllerInterface
mainController = new MainController()
