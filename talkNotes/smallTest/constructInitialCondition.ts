import * as Automerge from 'automerge'
import * as buildInitialPageHelperFunctions from "./buildInitialPageHelperFunctions"
import {GNObjectInterface, CreateGreatNoteObjectInterface}  from "./GreatNoteClass/GreatNoteObjectInterface"
import {socket} from "./socketFunction"
import {ToolBoxInterface} from "./ToolboxModel"
import {changeEventGenerator, processCreationDataHelper,processNewChangeData} from "./databaseHelperFunction"
import {LayerControllerInterface} from "./layerControllerFolder/layerController"
import * as PageController from "./pageControllerFolder/pageController"
import * as Setting from "./settings"
import {communicationDataStructure, MainDocArrayEnum, MainControllerInterface, mainArrayData} from "./mainControllerFolder/mainControllerInterface"
import * as MainControllerHelperFunction from "./mainControllerFolder/mainControllerHelperFunction"


export class MainController implements MainControllerInterface{
  mainDocArray: any;
  mainDoc: any;
  baseArrayID: string;
  previousDoc: any;
  GNDataStructureMapping:any
  applyMainDocTemplate:boolean
  pageCurrentStatus: any
  toolBox: any
  pageController: PageController.pageControllerInterface
  selectedObjectArray: any[]
  attributeControllerMapping: any
  layerController: any

// *****************************
// *     A. Initialization     *
// *****************************
    //@auto-fold here
    constructor(){
        this.initializeRootArray()
        this.initalizeMainDoc()
        this.applyMainDocTemplate = false
        this.selectedObjectArray = []
        this.pageCurrentStatus = {
          "pendingObject": {// an array for collecting enough data before enough data is collected to create new objects
              "newPage": new Set(),
              "newPageArray": []
          },
          "fullPageSize": Setting.pageSizeInfo.fullPageSize,
          "overviewPageSize": Setting.pageSizeInfo.overviewPageSize
        }
        this.pageController = PageController.initializePageController(this)
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
            Object.entries(htmlObjectData["stylesheet"]).forEach(([key, value], _)=>{
                dataPointerObject["stylesheet"][key] = value
            })
        })
    }

    //@auto-fold here
    /** to initiate the data so that you can store the data to the db*/
    // **** can be deleted later
    createDummyData(data = {}): any{
        MainControllerHelperFunction.createDummyData(data)
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

        // console.log(Automerge.getChanges(this.previousDoc, this.mainDoc))
        this.sendChangeToServer()
    }// saveHTMLObjectToDatabase

    deleteFromDataBase(htmlObject:GNObjectInterface){
        if (htmlObject["parentNode"]){
          let accessPointer = htmlObject.getAccessPointer()
          let parentAccessPointer = htmlObject["parentNode"].getAttribute("accessPointer")
          // let parentAccessPointer = htmlObject.parentNode.getAccessPointer()


          let deleteMessage = {
              "action": "delete",
              "objectID": accessPointer,
              "parentHTMLObjectId": parentAccessPointer
          }

          this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(deleteMessage), doc=>{
            let parentObject = this.getObjectById(parentAccessPointer, doc)
            let targetObject = this.getObjectById(accessPointer, doc)

            let index =  parentObject["array"].indexOf(targetObject)
            if (index!=-1) parentObject["array"].deleteAt(index)
              // delete databaseObject
          })
          htmlObject.remove()
          this.sendChangeToServer()
        }
    } // deleteFromDataBase

    sendChangeToServer(){
      let changes = Automerge.getChanges(mainController.previousDoc, mainController.mainDoc)
      mainController.previousDoc = mainController.mainDoc
      console.log("56: the changes are: ", changes)
      socket.emit("clientSendChangesToServer", {"changeData": changes})
    }


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
        buildInitialPageHelperFunctions.buildInitialPage(this, false)
    } // 2. buildPageFromMainDoc

    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database, not array, but the object includes array property */
    renderDataToHTML(data:communicationDataStructure, arrayHTMLObject?){
        let newHTMLObject
        // cannot save any obeject to the data base here
        data["array"].forEach(p=>{
            if (p.GNType=="GNComment"){
              console.log(404, p.GNType)
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
                newHTMLObject =  this.GNDataStructureMapping[p.GNType]({name: "name", arrayID: arrayHTMLObject.getAccessPointer(),  saveToDatabase:false, injectedData: p})
                newHTMLObject._identity = p._identity

                let objectData =  newHTMLObject.getDataFromDataBase()



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


            if (p.GNType=="GNImageContainer"){
                newHTMLObject =  this.GNDataStructureMapping["GNImageContainer"]({name: "name", arrayID: arrayHTMLObject.getAccessPointer(),  saveToDatabase:false, imgsrc: p["data"]["src"]})

                newHTMLObject._identity = p._identity

                newHTMLObject.setImageSize({width:500})
                newHTMLObject.setMovable()
            }

            if (newHTMLObject){
                arrayHTMLObject.appendChild(newHTMLObject)
                newHTMLObject.setAttribute("accessPointer", p._identity.accessPointer)
                this.renderDataToHTML(p, newHTMLObject)
            }
        })
    }// 3. renderDataToHTML

    createGNObjectThroughName(objectName:string, createData: CreateGreatNoteObjectInterface){
        let {name, arrayID, insertPosition, dataPointer, saveToDatabase, injectedData} = createData
        return this.GNDataStructureMapping[objectName](createData)
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

    //@auto-fold here
    loadMainDoc(data){
      this.mainDoc = Automerge.load(data)
      this.previousDoc = this.mainDoc
      // to render the data ato HTML

      let rootArray = this.mainDoc["array"]
      console.log(rootArray, this.mainDoc)
      rootArray.forEach(mainArray=>{
          // update the ID of the mainArray
          let arrayName = mainArray["data"]["name"]
          let arrayID = mainArray["_identity"]["accessPointer"]
          this.mainDocArray[arrayName] = arrayID
      })
    }// loadMain



    processChangeData(changeDataArray){
    // processChangeData(changeDataArray:Set<string>){

        // console.log(507, changeDataArray)//
        let jsonfiedChangeDataArray = Array.from(changeDataArray).map(p=>JSON.parse(p["message"]))
        // console.log(509, jsonfiedChangeDataArray)
        // if (changeDataArray.length == 1){

        jsonfiedChangeDataArray.forEach(p=>{

            let changeData = p
            if (changeData.action=="create"){
                processCreationDataHelper(this, changeData)
            }// create

            if (changeData.action=="update"){
                let _object = document.querySelector(`*[accessPointer='${changeData.objectID}']`)
                if (_object){
                    let objectData = mainController.getObjectById(changeData.objectID)
                    console.log(520520, _object)
                    _object.reloadDataFromDatabase()
                }
            }  // update

            if (changeData.action=="delete"){
                let _object = document.querySelector(`*[accessPointer='${changeData.objectID}']`)
                _object.remove()
            }
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
// to create the attributeControllers
socket.emit("initialDataRequest") // processInitialData
