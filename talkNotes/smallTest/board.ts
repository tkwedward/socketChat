import * as Automerge from 'automerge'
import * as DatabaseHelperFunction from "./databaseHelperFunction"

let f = Automerge.init()
f = Automerge.change(f, doc=>{
   doc["page"] = []
   doc["bookmark"] = []
   // doc["page"].push([
   //   {"name": "page", "number": 123},
   //   {"name": "Queen", "number": 430},
   // ])
   doc["page"].push({"name": "Jack", "number": 430})
   doc["page"].push({"name": "Rashida", "number":510})
   doc["page"].push({"name": "Kotaro", "number": 250})
   doc["page"].push({"friend": ["Dio", {"joan": "Chris"}]})

})


interface MainController{
  mainDoc: any,
  arrayID: {
    "page"?: string,
    "bookmark"?: string
  }
}

class MainController {
    constructor(){
        this.mainDoc = Automerge.init()
        this.mainDoc = Automerge.change(f, doc=>{
          doc["page"] = []
          doc["bookmark"] = []
          // doc["page"].push([
          //   {"name": "page", "number": 123},
          //   {"name": "Queen", "number": 430},
          // ])
          doc["page"].push({"name": "Jack", "number": 430})
          doc["page"].push({"name": "Rashida", "number":510})
          doc["page"].push({"name": "Kotaro", "number": 250})
          doc["page"].push({"friend": ["Dio", {"joan": "Chris"}]})

       })

       this.arrayID = {
         "page": Automerge.getObjectId(this.mainDoc.page),
         "bookmark": Automerge.getObjectId(this.mainDoc.bookmark)
       }
       console.log(this.mainDoc)
    }
}

let mainController = new MainController()
export default mainController;


interface HTMLElementSoul {
  "identity": {
    "accessPointer"?:string,
    "dataPointer"?:string
  }
}

let masterObjectSoul:HTMLElementSoul = {
    "identity": {
        "accessPointer": Automerge.getObjectId(mainController.mainDoc.page[1]),
        "dataPointer": Automerge.getObjectId(mainController.mainDoc.page[1])
    }
}

function applyCSS(htmlObject, stylesheet){
    Object.entries(stylesheet).forEach(([key, value], index)=>{
        htmlObject.style[key] = value
    })
}

interface MasterObjectDataInterface {
  "name": string,
  "identity": object,
  "linkObjectArray": any,
  "stylesheet": object
}

let masterObjectData:MasterObjectDataInterface = {
  "name": "s",
  "identity":{},
  "linkObjectArray": [],
  "stylesheet": {
    "width": "50%",
    "height": "200px",
    "background": "grey",
    "margin": "5px"
  }
}

/** a color input */
function colorControllerCreater(controlledObject){
  let colorArray = ["red", "blue", "green"]

  let colorInput = document.createElement("select")
  colorArray.forEach(p=>{
      let option = document.createElement("option")
      option.value = p
      option.innerHTML = p
      colorInput.append(option)
  })

  colorInput.addEventListener("change", e=>{
      controlledObject.style.background = colorInput.value

      // access the linkObjectArray
      let masterObjectID = controlledObject.soul.identity.dataPointer
      let masterObjectData = Automerge.getObjectById(mainController.mainDoc, masterObjectID)
      let linkObjectArray = masterObjectData["linkObjectArray"]
      let stylesheet = masterObjectData["stylesheet"]
      stylesheet.background = colorInput.value

      linkObjectArray.forEach(p=>{

        let targetObject:HTMLElement = document.querySelector(`*[accessPointer='${p}']`)

        if (targetObject){
            Object.entries(stylesheet).forEach(([key, value], index)=>{
                console.log(115, targetObject, targetObject.style[key])
                targetObject.style[key] = value
            })
        }


      })
      // controlledObject
  })

  return colorInput
}

let masterObject = document.createElement("div")
applyCSS(masterObject, masterObjectData["stylesheet"])
masterObject.soul = masterObjectSoul
DatabaseHelperFunction.createNewItem(masterObject, masterObjectData, mainController["arrayID"]["page"])
let masterObejctContainer = document.createElement("div")
masterObejctContainer.style.display = "grid"
masterObejctContainer.style.gridTemplateColumns = "1fr 1fr"


let controllerContainer = document.createElement("div")
let colorInput = colorControllerCreater(masterObject)
controllerContainer.append(colorInput)
masterObejctContainer.append(masterObject)
masterObejctContainer.append(controllerContainer)



let linkObjectSoul:HTMLElementSoul = {
    "identity": {
    }
}

let createLinkObjectButton = document.createElement("button")
createLinkObjectButton.innerText = "createLinkObjectButton"
createLinkObjectButton.addEventListener("click", (e)=>{
    let linkObject = document.createElement("div")
    linkObject.classList.add("linkObject")
    linkObject.soul = linkObjectSoul


    DatabaseHelperFunction.createLinkObject(linkObject, mainController["arrayID"]["bookmark"], masterObject.soul)
    // [_, mainController.mainDoc] = DatabaseHelperFunction.createLinkObject(linkObject, mainController["arrayID"]["bookmark"], masterObject.soul)
    let masterObjectData = DatabaseHelperFunction.accessDataFromDatabase(masterObject.soul.identity.dataPointer)

    Object.entries(masterObjectData["stylesheet"]).forEach(([key, value], index)=>linkObject.style[key] = value)
    console.log(masterObjectData)


    // create a container to hold the data
    let linkObjectContainer = document.createElement("div")
    linkObjectContainer.style.display = "grid"
    linkObjectContainer.style.gridTemplateColumns = "1fr 1fr"

    let controllerContainer = document.createElement("div")
    let colorInput = colorControllerCreater(linkObject)
    controllerContainer.append(colorInput)
    linkObjectContainer.append(linkObject, controllerContainer)
    document.body.append(linkObjectContainer)
})

// document.body.append(masterObejctContainer, createLinkObjectButton)
