import * as pageViewHelperFunction from "./pageViewHelperFunction"
import {GNObjectInterface} from "./GreatNoteClass/GreatNoteDataClass"

export enum specialCreationMessageEnum{
    createNewFullPageObject = "createNewFullPageObject",
    createNewOverviewPageObject = "createNewOverviewPageObject"
}

export async function processCreationDataHelper(mainController, creationData){
    let specialCreationMessage =  creationData.specialCreationMessage

    let objectData = mainController.getObjectById(creationData.objectID)
    let newHTMLObject
    if (specialCreationMessage==specialCreationMessageEnum.createNewFullPageObject || specialCreationMessage==specialCreationMessageEnum.createNewOverviewPageObject){ // do something special if there is spcial creation message
        mainController.pageCurrentStatus.pendingObject.newPageArray.push(creationData)
        // if there are two item in the array, then clear it and create a new object
        if (mainController.pageCurrentStatus.pendingObject.newPageArray.length == 4){
            let newPageItemData = mainController.pageCurrentStatus.pendingObject.newPageArray[0]
            let newSmallViewItemData =  mainController.pageCurrentStatus.pendingObject.newPageArray[1]

            let _newPageObjectData = mainController.getObjectById(newPageItemData.objectID)
            let _newSmallViewObjectData = mainController.getObjectById(newSmallViewItemData.objectID)


            let fullPageModeDiv = <HTMLDivElement> document.querySelector(".fullPageModeDiv")
            let overviewModeDiv = <HTMLDivElement> document.querySelector(".overviewModeDiv")
            let [newPage, smallView] = pageViewHelperFunction.createNewPage(mainController.pageCurrentStatus, fullPageModeDiv, overviewModeDiv, _newPageObjectData, _newSmallViewObjectData, false)
            pageViewHelperFunction.insertNewPage(mainController.pageCurrentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv)

            mainController.pageCurrentStatus.pendingObject.newPageArray = []
        }

        return "finish process fullPage"
    } // if special Creation Message

    if(!creationData.specialCreationMessage){
        if (objectData && objectData.GNType){
            if (objectData.GNType == "GNImageContainer"){
                newHTMLObject =  mainController.createGNObjectThroughName(objectData.GNType, {name:"", arrayID:"", insertPosition:false, dataPointer: false, saveToDatabase: false, imgsrc: objectData["data"].src})
            } else {
                newHTMLObject =  mainController.createGNObjectThroughName(objectData.GNType, {name:"", arrayID:"", insertPosition:false, dataPointer: false, saveToDatabase: false})
            }


            console.log(newHTMLObject)

            newHTMLObject.initializeHTMLObjectFromData(objectData)
            let parentHTMLObject = mainController.getHtmlObjectByID(creationData.parentHTMLObjectId)
            // console.log("action = create", creationData.objectID, parentHTMLObject, objectData, newHTMLObject)

            if (parentHTMLObject){
              parentHTMLObject.appendChild(newHTMLObject)
            } // parentHTMLObject
        } // if (objectData
    } // if not specialCreationMessage
}


export function * changeEventGenerator(array){
  yield *array
}

export async function processNewChangeData(mainController, generator, awaitmessage=false){
    let generatorStatus = generator.next()
    if (!generatorStatus.done){
        // check if the generator item is the last one or not
        let changeData = generatorStatus.value
        let updateFinished


        if (changeData.action=="null"){
            processNewChangeData(mainController, generator, updateFinished)
        }

        if (changeData.action=="create"){
          console.log(changeData)
            updateFinished = await processCreationDataHelper(mainController, changeData)
            // console.log("71717171========THis is await finished message", updateFinished)
            // console.log("81 -------------- creation event is finisheed")
            processNewChangeData(mainController, generator, updateFinished)
        }// create

        if (changeData.action=="update"){
            // console.log("81 -------------- update event is processing")
            // console.log("82 here is the accessPointer: ", changeData.objectID)
            let _object =  document.querySelector(`*[accessPointer='${changeData.objectID}']`)
            console.log("83 The html object is  ", _object)
            console.log(457, _object, changeData.objectID)

            let objectData = mainController.getObjectById(changeData.objectID)

            if (_object){
                console.log(939393, _object)
                _object.reloadDataFromDatabase()
                updateFinished = await objectData
                // console.log("71717171========THis is await finished message", updateFinished)
                processNewChangeData(mainController, generator, updateFinished)
            } // when there is no object, then there will be problem, so need to use it to solve this problem
        }
    }




}
