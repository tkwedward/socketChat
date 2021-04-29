import * as Automerge from 'automerge'
import * as buildInitialPageHelperFunctions from "./buildInitialPageHelperFunctions"
import {GNObjectInterface, CreateGreatNoteObjectInterface}  from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
import {ToolBoxInterface} from "./ToolboxModel"
import {changeEventGenerator, processCreationDataHelper,processNewChangeData} from "./databaseHelperFunction"
import * as InitializeAttributeControllerFunction from "./attributeControllerFolder/initializeAttributeControllers"
import * as PageController from "./pageControllerFolder/pageController"

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
    previousDoc: any
    applyMainDocTemplate:boolean // **** can be deleted latter

    mainDocArray: any
    baseArrayID: string
    GNDataStructureMapping: any
    attributeControllerMapping: any
    pageCurrentStatus: any
    pageController: any
    toolBox: ToolBoxInterface

    // getArrayID(MainDocArrayEnum):string
    initializeRootArray()
    initalizeMainDoc()

    /** Functions related to save and update data in the database */
    addData(arrayID: string, htmlObject: GNObjectInterface|HTMLElement, insertPosition?:number|boolean, dataPointer?:string, specialMessage?: string): [HTMLElement, string]
    updateData(_object:GNObjectInterface, dataPointerType:boolean)
    createDummyData(name:string, age: number, sex: string):any
    saveHTMLObjectToDatabase(htmlObject: GNObjectInterface)

    /** the arrayID is for attaching to the array*/
    getObjectById(objectID: string, doc?:any)
    getLinkArrayFromID(objectID):any
    getHtmlObjectByID(objectID:string)



    createGNObjectThroughName(objectName:string, createData: CreateGreatNoteObjectInterface)
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
  toolBox: any
  pageController: any


// *****************************
// *     A. Initialization     *
// *****************************
    //@auto-fold here
    constructor(){
        this.initializeRootArray()
        this.initalizeMainDoc()
        this.applyMainDocTemplate = false
        this.pageCurrentStatus = {
          "pendingObject": {// an array for collecting enough data before enough data is collected to create new objects
              "newPage": new Set(),
              "newPageArray": []
          },
          "fullPageSize": [1187, 720],
          "overviewPageSize": [237.4, 144]
        }
        this.pageController = PageController.initializePageController()
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
                    "GNType": "",
                    "specialGNType": ""
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




// ******************************************
// *     B. Modify data in the database     *
// ******************************************
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    //@auto-fold here
    addData(arrayID, htmlObject:GNObjectInterface|any, insertPosition?:number|boolean, dataPointer?, specialCreationMessage?: string):[any, string]{
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
        let objectData  = htmlObject.extract()

        objectData._identity.accessPointer = accessPointer
        objectData._identity.dataPointer = accessPointer
        objectData._identity.linkArray.push(accessPointer)
        if (dataPointer){
            objectData._identity.dataPointer = dataPointer
        }

        // Step 3: put real data into the database
        //@auto-fold here
        let createMessage = {"action": "create", "objectID": accessPointer, "parentHTMLObjectId": arrayID, "specialCreationMessage": specialCreationMessage}

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
                masterObjectHtmlElement?._identity.linkArray.push(accessPointer) // **** this line may be deleted because we do not need to access the linkArray of the master object
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
    // **** can be deleted later
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

        // console.log(322, "ask server to InitiateSynchronizatioj", new Date(), message)
        socket.emit("clientAskServerToInitiateSynchronization")
    }// saveHTMLObjectToDatabase


// ******************************************
// *     C. Access data in the database     *
// ******************************************
    //@auto-fold here
    getObjectById(objectID, doc=this.mainDoc){
        return Automerge.getObjectById(doc, objectID)
    }

    //@auto-fold here
    getLinkArrayFromID(objectID){
        return this.getObjectById(objectID)._identity.linkArray
    }

    //@auto-fold here
    getHtmlObjectByID(objectID:string){
        return document.querySelector(`*[accessPointer='${objectID}']`)
    }

    // @auto-fold here
    getMainDocChange(){
        return Automerge.getChanges(this.previousDoc, this.mainDoc)
    }

// **********************************
// *     E. Build up the page       *
// **********************************
    buildInitialHTMLSkeleton(){
        buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(this)
    } // buildInitialHTMLSkeleton


    buildPageFromMainDoc(){
        buildInitialPageHelperFunctions.buildInitialPage(this)
    } // 2. buildPageFromMainDoc

    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database, not array, but the object includes array property */
    renderDataToHTML(data:communicationDataStructure, arrayHTMLObject?){
        let newHTMLObject
        // cannot save any obeject to the data base here
        data["array"].forEach(p=>{
            if (p.GNType=="GNComment"){
              console.log("123, see a _commentContainer")
              newHTMLObject = this.createGNObjectThroughName("GNComment", {name: "", injectedData: p})
              arrayHTMLObject.appendChild(newHTMLObject)

              return
            }


            if (p.GNType=="GNSvg"){
              // cannot save any obeject to the data base here because this will create an infinity loop and will append new obejct forever
                newHTMLObject = this.GNDataStructureMapping[p.GNType]({name: "name", arrayID: arrayHTMLObject.getAccessPointer() , saveToDatabase:false})
                newHTMLObject._identity = p._identity

                let objectData =  newHTMLObject.getDataFromDataBase()

                newHTMLObject.applyStyle(objectData.stylesheet)

                newHTMLObject.addEventListener("click", function(){
                    mainController.toolBox.targetPage = newHTMLObject
                })
            }

            if (p.GNType=="GNContainerDiv"){
                newHTMLObject =  this.GNDataStructureMapping[p.GNType]({name: "name", arrayID: arrayHTMLObject.getAccessPointer(),  saveToDatabase:false})
                newHTMLObject._identity = p._identity

                let objectData =  newHTMLObject.getDataFromDataBase()

                newHTMLObject.applyStyle(objectData.stylesheet)
            }

            if (p.GNType=="GNSvgPolyLine"){
                newHTMLObject =  this.GNDataStructureMapping[p.GNType]({name: "name", arrayID: arrayHTMLObject.getAccessPointer(),  saveToDatabase:false})
                newHTMLObject._identity = p._identity
                //
                let newPolylineData = newHTMLObject.getDataFromDataBase()

                newHTMLObject.loadFromData(newPolylineData["data"])

                let stylesheet = newPolylineData["stylesheet"]
                newHTMLObject.applyStyle({"stroke": stylesheet["stroke"], "stroke-width": stylesheet["stroke-width"], "fill": stylesheet["fill"]})
            }

            if (newHTMLObject){
                arrayHTMLObject.appendChild(newHTMLObject)
                newHTMLObject.setAttribute("accessPointer", p._identity.accessPointer)
                this.renderDataToHTML(p, newHTMLObject)
            }
        })
    }// 3. renderDataToHTML

    createGNObjectThroughName(objectName:string, createData: CreateGreatNoteObjectInterface){
        let {name, arrayID, insertPosition, dataPointer, saveToDatabase} = createData
        return this.GNDataStructureMapping[objectName](name, arrayID, insertPosition, dataPointer, saveToDatabase)
    } // 4. createGNObjectThroughName


    //@auto-fold here
    saveMainDoc(sendRequest:boolean=false){
      let saveData = Automerge.save(this.mainDoc)
      if (sendRequest){
        socket.emit("saveMainDocToDisk", saveData)
        return saveData
      } else {
        return saveData
      }

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



    processChangeData(changeDataArray:Set<string>){
        let jsonfiedChangeDataArray = Array.from(changeDataArray).map(p=>JSON.parse(p))
        console.log("476----", jsonfiedChangeDataArray)

        if (jsonfiedChangeDataArray.length == 1){
            document.querySelector(".logField").style.background = "red"
            console.log(1234, "========= fuck fuck fuck fuck fuck , ther is only one lenght")
        }

        jsonfiedChangeDataArray.forEach(p=>{

            let changeData = p
            if (changeData.action=="create"){
                processCreationDataHelper(this, changeData)
                console.log("4853, processing change", p)
                console.log(this.getHtmlObjectByID(p.objectID))
                console.log(this.getHtmlObjectByID(p.parentHTMLObjectId))
            }// create

            if (changeData.action=="update"){
                let _object = document.querySelector(`*[accessPointer='${changeData.objectID}']`)
                // console.log(457, _object, changeData.objectID)
                if (_object){
                    let objectData = mainController.getObjectById(changeData.objectID)

                    _object.reloadDataFromDatabase()
                }
            }  // update
        })// aaforEach
    }

}


export var mainController:MainControllerInterface
mainController = new MainController()

//
// to create toolbox
//
import * as ToolBoxModel from "./ToolboxModel"
mainController.toolBox = new ToolBoxModel.ToolBoxClass()

//
// to create the attributeControllers
//
let panelContainer = document.querySelector(".panelContainer")
InitializeAttributeControllerFunction.initializeMainControllerAttributeControllerMapping(mainController)
Object.values(mainController.attributeControllerMapping).forEach(p=>{
    panelContainer.appendChild(<HTMLDivElement>p)
})

//
// mainController.getLoadDataFromSocket()
//
socket.emit("initialDataRequest")
// buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(mainController)
// buildInitialPageHelperFunctions.buildInitialPage()
