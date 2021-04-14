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

/** to copy an object stored in database to a normal object!*/
function copyObject(targetObject){
  // to copy the data in an object to a new object
  let new_oo = {}
  Object.entries(targetObject).forEach(([key, value], index)=>{
     new_oo[key] = copyObjectHelper(value)
  })
  return new_oo
}

/** to exchnage the position of two items in an array*/
export function exchangeObjects(objectID1, objectID2){

  f = Automerge.change(f, doc=>{
     let temp1 = copyObject(doc["page"][1])
     let temp2 = copyObject(doc["page"][2])
     doc["page"][1] = temp2
     doc["page"][2] = temp1
  })
}

/**
input: the object's ID that you waant to access
output: clean version of the data stored in the database.
*/
export function accessDataFromDatabase(objectID:string){
    let objectInDatabase = Automerge.getObjectById(mainController.mainDoc, objectID)
    return copyObject(objectInDatabase)
}

/** a helper function to add object to array */
export function addOjectToArrayInDataBase(mainDoc, containerID:string, objectData:any, insertPosition:boolean|number, masterDataPointer:string|boolean){
    let array = Automerge.getObjectById(mainDoc, containerID)

    if (insertPosition==false){
      insertPosition = <number>array.length - 1
    } else {
      insertPosition = <number>insertPosition
    }

    let objectSymbolArray = Object.getOwnPropertySymbols(array[insertPosition])

    let elementID = array[insertPosition][objectSymbolArray[1]]
    objectData["identity"]["accessPointer"] = elementID

    if (!masterDataPointer){
      // do something if it is a link object
      objectData["identity"]["dataPointer"] = elementID
    } else {
      // if the object is a masterObject, then create a linkObjectArray and put itself into the array
      // objectData["linkObjectArray"].push(masterDataPointer)
      objectData["identity"]["dataPointer"] = masterDataPointer
    }

    console.log(75, masterDataPointer, elementID)

    mainDoc = Automerge.change(mainDoc, doc=>{
      let array = Automerge.getObjectById(doc, containerID)
      Object.entries(objectData).forEach(([key, value], index)=>{
        array[<number>insertPosition][key] = value
      })

      array[<number>insertPosition] = objectData
      // insertPosition = array.length
    })

    return [mainDoc, elementID]
}

// createNewItem
export function createNewItem(htmlObject:HTMLElement/*object*/, s_data/*objectData*/, containerID:string, insertPosition:boolean|number = false /*position want to insert*/, masterDataPointer:string|boolean = false):HTMLElement{
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

  // Step 2: getElementID and then put it into thse identity card

  // return the mainDoc
  let elementID: string
  [mainController.mainDoc, elementID] =
 addOjectToArrayInDataBase(mainController.mainDoc, containerID, s_data, insertPosition, masterDataPointer)

   // the function can differentiate the difference between a link object and a master object
  htmlObject.soul.identity = s_data.identity
  return htmlObject
}

export function createLinkObject(linkObject:HTMLElement, containerID: string, masterObjectSoul:any):HTMLElement{
    let linkObjectData = {
        "stylesheet": {},
        "identity": {
            "accessPointer": "",
            "dataPointer": masterObjectSoul.identity.dataPointer
        }
    }
    linkObject = createNewItem(linkObject, linkObjectData, containerID, false, masterObjectSoul.identity.dataPointer)
    let linkObjectAccessPointer = linkObjectData["identity"]["accessPointer"]
    // add the linkObject to masterObject's linkObjectArray

    mainController.mainDoc = Automerge.change(mainController.mainDoc, doc=>{
        let masterObjectData = Automerge.getObjectById(doc, masterObjectSoul.identity.dataPointer)
        masterObjectData.linkObjectArray.push(linkObjectAccessPointer)
    })

    return linkObject
}
