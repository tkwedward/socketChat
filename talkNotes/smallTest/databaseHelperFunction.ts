import * as Automerge from 'automerge'
// declare var mainController: any;
import mainController from "./board"

function copyObjectHelper(value){
  // to copy the data in an object to a new object
    if (Array.isArray(value)){
      let newArray = value.map(p=>copyObjectHelper(p))
      return newArray
    } else if (value === Object(value)){
      let newObject = {}
      Object.entries(value).forEach(([_key, _value], index)=>{
        newObject[_key] = copyObjectHelper(_value)
      })
      return newObject
    } else {
      return value
    }
}

export function copyObject(targetObject){
  // to copy the data in an object to a new object
  let new_oo = {}
  Object.entries(targetObject).forEach(([key, value], index)=>{
     new_oo[key] = copyObjectHelper(value)
  })
  return new_oo
}

// a helper function to add object to array
export function addOjectToArrayInDataBase(mainDoc, containerID, objectData, insertPosition, masterDataPointer){
    let array = Automerge.getObjectById(mainDoc, containerID)

    let objectSymbolArray = Object.getOwnPropertySymbols(array[insertPosition])
    let elementID = array[insertPosition][objectSymbolArray[1]]
    objectData["identity"]["addressPointer"] = elementID

    if (!masterDataPointer){
      // do something if it is a link object
      objectData["identity"]["dataPointer"] = elementID
    } else {
      objectData["identity"]["dataPointer"] = masterDataPointer
    }

    mainDoc = Automerge.change(mainDoc, doc=>{
      let array = Automerge.getObjectById(doc, containerID)
      array[insertPosition] = objectData
      // insertPosition = array.length
    })

    return mainDoc
}

// createNewItem
export function createNewItem(s/*object*/, s_data/*objectData*/, containerID, insertPosition:boolean|number = false /*position want to insert*/, masterDataPointer = false){
  console.log(s)
  // Step 1: put an empty object to get objectID
  mainController.mainDoc = Automerge.change(mainController.mainDoc, doc=>{
      let array = Automerge.getObjectById(doc, containerID)
     if (!insertPosition){
       array.push({})
       insertPosition = array.length - 1
     } else {
       array.insertAt(insertPosition, {})
     }
  }) // 1st contact

  // Step 2: getElementID and then put it into the identity card
  // return the mainDoc
  mainController.mainDoc = addOjectToArrayInDataBase(mainController.mainDoc, containerID, s_data, insertPosition, masterDataPointer)

  // let array = Automerge.getObjectById(mainController.mainDoc, dataPointer)

  // Step 3: put data into the database

}

function createLinkObject(containerID, masterObject){

  let linkObjectData = {
      "stylesheet": {},
      "identity": {
          "accessPointer": "",
          "dataPointer": masterObject.identity.dataPointer
      }
  }


  Automerge.change(mainController.mainDoc, doc=>{
      let container = Automerge.getObjectById(doc, containerID)
      container.push({})
  })


}
