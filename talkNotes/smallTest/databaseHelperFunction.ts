import * as pageViewHelperFunction from "./pageViewHelperFunction"

export enum specialCreationMessageEnum{
    createNewFullPageObject = "createNewFullPageObject",
    createNewOverviewPageObject = "createNewOverviewPageObject"
}

export function processCreationDataHelper(mainController, creationData){
    let specialCreationMessage = creationData.specialCreationMessage
    let objectData = mainController.getObjectById(creationData.objectID)
    let newHTMLObject
    console.log(12121212, creationData)
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
      }

    if(!creationData.specialCreationMessage){
        newHTMLObject =  mainController.createGNObjectThroughName(objectData.GNType, {name:"", arrayID:"", insertPosition:false, dataPointer: false, saveToDatabase: false})

        newHTMLObject.initializeHTMLObjectFromData(objectData)
        let parentHTMLObject = mainController.getHtmlObjectByID(creationData.parentHTMLObjectId)
        // console.log("action = create", creationData.objectID, parentHTMLObject, objectData, newHTMLObject)

        if (parentHTMLObject){
          parentHTMLObject.appendChild(newHTMLObject)
        }
    }


}
