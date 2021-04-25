import * as Automerge from 'automerge'
import * as buildInitialPageHelperFunctions from "./buildInitialPageHelperFunctions"
import {GNObjectInterface}  from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
export enum MainDocArrayEnum {
    mainArray_pageFull = "mainArray_pageFull",
    mainArray_pageOverview = "mainArray_pageOverview",
    mainArray_bookmark = "mainArray_bookmark",
    mainArray_panel = "mainArray_panel",
    mainArray_pokemon = "mainArray_pokemon"
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
    applyMainDocTemplate:boolean
    previousDoc: any
    mainDocArray: any
    baseArrayID: string
    GNDataStructureMapping: any
    pageCurrentStatus: any

    // getArrayID(MainDocArrayEnum):string
    initializeRootArray()
    initalizeMainDoc()

    /** Functions related to save and update data in the database */
    addData(arrayID: string, htmlObject: GNObjectInterface|HTMLElement, insertPosition?:number|boolean, dataPointer?:string, attachToRoot?: boolean): [HTMLElement, string]
    updateData(_object:GNObjectInterface, dataPointerType:boolean)
    createDummyData(name:string, age: number, sex: string):any
    saveHTMLObjectToDatabase(htmlObject: GNObjectInterface)
    // sendSaveMessageToSocket(saveFile:string)

    /** the arrayID is for attaching to the array*/
    getLinkArrayFromID(objectID):any
    getObjectById(objectID: string, doc?:any)
    getHtmlObjectByID(objectID:string)
    createGNObjectThroughName(objectName:string, name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean)
    /** internode functions*/

    /**
    input: array in the mainDoc
    function: To render the data stored in the mainDoc to HTML Elements.*/
    buildInitialHTMLSkeleton()
    buildPageFromMainDoc()
    renderDataToHTML(data: any, arrayHTMLObject:HTMLElement|GNObjectInterface)
    /** To save the mainDoc as text file*/
    saveMainDoc(sendRequest:boolean)
    /** To load string into the mainDoc */
    loadMainDoc(data:string)
    getMainDocChange()
    getLoadDataFromSocket()
    processChangeData(changeDataArray:Set<string>)
}


let mainArrayData = {
    "mainArray_pageFull": {
        arrayID: "", arrayHTMLObject: "fullPageModeDiv"
    },
    "mainArray_pageOverview": {
        arrayID: "", arrayHTMLObject: "overviewModeDiv"
    },
    "mainArray_bookmark": {
        arrayID: "", arrayHTMLObject: "pageContentContainer"
    },
    "mainArray_panel": {
        arrayID: "", arrayHTMLObject: "contentContainer"
    },
    "mainArray_pokemon": {
        arrayID: "", arrayHTMLObject: "contentContainer"
    }
}

export class MainController implements MainControllerInterface{
  mainDocArray: any;
  mainDoc: any;
  baseArrayID: string;
  previousDoc: any;
  GNDataStructureMapping:any
  applyMainDocTemplate:boolean
  pageCurrentStatus: any

    //@auto-fold here
    constructor(){
        this.initializeRootArray()
        this.initalizeMainDoc()
        this.applyMainDocTemplate = false
        this.pageCurrentStatus = {
          "newPageNumber": 1,
          "newPageDirection": 1,
          "currentPage": 0,
          "previousPage": 0,
          "nextPage": 0,
          "pageArrayFullPage": [0],
          "pageArraySmallView": [0],
          "fullPageSize": [1187, 720],
          "overviewPageSize": [237.4, 144]
        }
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
                    "_classList": [],
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

        this.previousDoc = this.mainDoc
    }// initalizeMainDoc


    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */

    //@auto-fold here
    addData(arrayID, htmlObject:GNObjectInterface|any, insertPosition?:number|boolean, dataPointer?):[any, string]{
      // Step 1: register an accessPointer in the database
        //@auto-fold here

        let initializeMessage = {"action": "null", "objectID": ""}
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(initializeMessage), doc=>{
            let arrayToBeAttachedTo =  Automerge.getObjectById(doc, arrayID)["array"]
            if (!insertPosition) insertPosition = arrayToBeAttachedTo.length
            arrayToBeAttachedTo.insertAt(insertPosition, {})
        })

        // step 2 update the identityProperties of the object
        let arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"]


        let objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[<number>insertPosition])
        let accessPointer = arrayToBeAttachedTo[<number>insertPosition][objectSymbolArray[1]]

        // create new object data
        console.log("an object is created in the database")
        let objectData  = htmlObject.extract()

        objectData._identity.accessPointer = accessPointer
        objectData._identity.dataPointer = accessPointer
        objectData._identity.linkArray.push(accessPointer)
        if (dataPointer){
            objectData._identity.dataPointer = dataPointer
        }

        // Step 3: put real data into the database
        //@auto-fold here
        let createMessage = {"action": "create", "objectID": accessPointer, "parentHTMLObjectId": arrayID}
        console.log(202, "here is the create message", createMessage)
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(createMessage), doc=>{
            // add the data to the object
            let objectInDatabase = Automerge.getObjectById(doc, accessPointer)
            Object.entries(objectData).forEach(([key, value], _)=>{
                objectInDatabase[key] = value
            })

            // update the masterobject if it is a link object
            if (dataPointer){
                let masterObject = this.getObjectById(dataPointer, doc)
                masterObject._identity.linkArray.push(accessPointer)

                let masterObjectHtmlElement = this.getHtmlObjectByID(dataPointer)
                console.log(209, masterObjectHtmlElement)
                masterObjectHtmlElement?._identity.linkArray.push(accessPointer)
            }
        })

        htmlObject._identity = objectData._identity

        return [htmlObject, accessPointer]
    }// addData

    getHtmlObjectByID(objectID:string){
        return document.querySelector(`*[accessPointer='${objectID}']`)
        document.querySelector(`*[accessPointer='c705e759-caeb-4bb3-83ce-ddfe44270ad5']`)
    }

    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    //@auto-fold here
    updateData(_object:GNObjectInterface, dataPointerType:boolean = true){
        let htmlObjectData = _object.extract()
        let accessPointer:string = _object.getAccessPointer()
        let dataPointer:string = _object.getDataPointer()

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
    /** to initiate the data so that you can store the data to the db*/
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
    /** when ever the htmlObject is updated, we fetch newData from thfe HTMLObjectt, and then go to the database and update the relevant data*/
    saveHTMLObjectToDatabase(htmlObject:GNObjectInterface){
        let newData = htmlObject.extract()
        let dataPointer = htmlObject.getDataPointer()
        let accessPointer = htmlObject.getAccessPointer()

        let message = JSON.stringify({"action": "update", "objectID": accessPointer})


        this.mainDoc = Automerge.change(this.mainDoc, message,doc=>{
            let dataPointerObejct = Automerge.getObjectById(doc, dataPointer)
            let accessPointerObject = Automerge.getObjectById(doc, accessPointer)

            // update the data
            Object.entries(newData.data).forEach(([key, value], _)=>{
                dataPointerObejct["data"][key] = value
            })


            // update the stylesheet
            if (accessPointer!=dataPointer){
                // if it is a link object
                Object.entries(newData.stylesheet).forEach(([key, value], _)=>{
                    accessPointerObject["stylesheet"][key] = value
                })
            } else {
                // if it is the main object
                Object.entries(newData.stylesheet).forEach(([key, value], _)=>{
                    dataPointerObejct["stylesheet"][key] = value
                })
            }
        })

        socket.emit("clientAskServerToInitiateSynchronization")
    }// saveHTMLObjectToDatabase

    //@auto-fold here
    getObjectById(objectID, doc=this.mainDoc){
        let object = Automerge.getObjectById(doc, objectID)
        return object
    }

    // @auto-fold here
    getMainDocChange(){
        let changes = Automerge.getChanges(this.previousDoc, this.mainDoc)
        return changes
    }

    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database */
    renderDataToHTML(data:communicationDataStructure, arrayHTMLObject?){
      if (!arrayHTMLObject){
        // this is for looping the mainArray so that they can get the initial aattach div of the HTML doc
        // get the mainArray Object from mainArrayData
          data.forEach(p=>{
              let mainArrayData_item = mainArrayData[p["data"]["name"]]

              // if not in the mainArrayData, just skill it
              if (mainArrayData_item){
                  let initialHTMLObjectClassName = mainArrayData_item["arrayHTMLObject"]
                  let initialHTMLObject = document.querySelector(`.${initialHTMLObjectClassName}`)
                  // for each elem in the main array
                  p.array.forEach(elem=>{
                      this.renderDataToHTML(elem, initialHTMLObject)
                  })
              }// if mainArrayData_item
              // if (mainArrayData_item.startsWith("mainArray_")){
              // }


              // renderDataToHTML(p, )
          })

      } else {
        let newHTMLObject

        if (data.GNType=="GNButton"){
            newHTMLObject = this.GNDataStructureMapping["GNButton"]("name", ["yes", "no"], data._identity.accessPointer, false, data._identity.dataPointer)
        } else if (data.GNType=="GNSvg"){
            newHTMLObject = this.GNDataStructureMapping[data.GNType]("name", data._identity.accessPointer, false, data._identity.dataPointer)

        } else {
            newHTMLObject = this.GNDataStructureMapping[data.GNType]("name", data._identity.accessPointer, false, data._identity.dataPointer)
        }

          if (newHTMLObject.loadFromData) newHTMLObject.loadFromData(data)
          newHTMLObject.applyStyle(data.stylesheet)
          arrayHTMLObject.appendChild(newHTMLObject)
          data.array.forEach(_data=>{
              this.renderDataToHTML(_data, newHTMLObject)
          })
      }
    }

    //@auto-fold here
    saveMainDoc(sendRequest:boolean=false){
      // console.log(388, "saveMainDoc", this.mainDoc)
      let saveData = Automerge.save(this.mainDoc)
      if (sendRequest){
        socket.emit("saveMainDocToDisk", saveData)
        return saveData
      } else {
        return saveData
      }

    }

    getLinkArrayFromID(objectID){
        return this.getObjectById(objectID)._identity.linkArray
    }

    getLoadDataFromSocket(){
        let loadData = false
        loadData = true
        // this.buildInitialHTMLSkeleton()
        //
        // if (loadData){
        //     socket.emit("loadMainDoc", (response)=>{
        //         console.log(375, this.mainDoc )
        //         buildInitialPageHelperFunctions.buildInitialPage(this)
        //       })
        // }
    }

    buildInitialHTMLSkeleton(){
        buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(this)
    }


    buildPageFromMainDoc(){
        buildInitialPageHelperFunctions.buildInitialPage(this)
    }


    //@auto-fold here
    //@auto-fold here
    loadMainDoc(data){
      this.mainDoc = Automerge.load(data)
      this.previousDoc = this.mainDoc
      // to render the data ato HTML

      let rootArray = this.mainDoc["array"]
      rootArray.forEach(mainArray=>{
          // update the ID of the mainArray
          let arrayName = mainArray["data"]["name"]
          let arrayID = mainArray["_identity"]["accessPointer"]
          this.mainDocArray[arrayName] = arrayID
      })
    }// loadMain

    createGNObjectThroughName(objectName:string, name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true){
        console.log(this.GNDataStructureMapping)
        return this.GNDataStructureMapping[objectName](name, arrayID, insertPosition, dataPointer, saveToDatabase)
    }

    processChangeData(changeDataArray:Set<string>){
        let jsonfiedChangeDataArray = Array.from(changeDataArray).map(p=>JSON.parse(p))
        console.log("429 the changgeDataArray is ", jsonfiedChangeDataArray)

        jsonfiedChangeDataArray.forEach(p=>{
            let changeData = p
            console.log("432, changeData",changeData)
            if (changeData.action=="create"){
                let objectData = this.getObjectById(changeData.objectID)

                let newHTMLObject = document.querySelector(`*[accessPointer='${changeData.objectID}']`)

                if (!newHTMLObject){
                    newHTMLObject = <GNObjectInterface> this.createGNObjectThroughName(objectData.GNType, "", "", false, false, false)
                    newHTMLObject.initializeHTMLObjectFromData(objectData)
                    let parentHTMLObject = this.getHtmlObjectByID(changeData.parentHTMLObjectId)
                    console.log("action = create", changeData.objectID, parentHTMLObject, objectData, newHTMLObject)

                    if (parentHTMLObject){
                      parentHTMLObject.appendChild(newHTMLObject)
                    }
                    console.log(newHTMLObject, changeData.parentHTMLObjectId)
                }
            }// create

            if (changeData.action=="update"){
                let _object = document.querySelector(`*[accessPointer='${changeData.objectID}']`)
                console.log(_object)
                // let object = document.querySelector(`.divPage[pageNumber='4'] input`)
                let objectData = mainController.getObjectById(changeData.objectID)

                _object.reloadDataFromDatabase()

                // object.processUpdateData()
            }
        })
    }

}


export var mainController:MainControllerInterface
mainController = new MainController()
// mainController.getLoadDataFromSocket()
socket.emit("initialDataRequest")
