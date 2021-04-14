import * as Automerge from 'automerge'
import * as DatabaseHelperFunction from "./databaseHelperFunction"

let f = Automerge.init()
f = Automerge.change(f, p=>{
   p["page"] = []
   p["bookmark"] = []
   p["page"].push([
     {"name": "page", "number": 123},
     {"name": "Queen", "number": 430},
   ])
   p["page"].push({"name": "Jack", "number": 430})
   p["page"].push({"name": "Rashida", "number":510})
   p["page"].push({"name": "Kotaro", "number": 250})
   p["page"].push({"friend": ["Dio", {"joan": "Chris"}]})

})

f = Automerge.change(f, doc=>{
   let temp1 = DatabaseHelperFunction.copyObject(doc["page"][1])
   let temp2 = DatabaseHelperFunction.copyObject(doc["page"][2])
   doc["page"][1] = temp2
   doc["page"][2] = temp1
})



function mainObject(f){
  return {"mainDoc": f, "arrayID": {
  }}
}


let mainController = mainObject(f)
window.mainController = mainController
export default mainController;

mainController["arrayID"]["page"] =  Automerge.getObjectId(mainController.mainDoc.page)
mainController["arrayID"]["bookmark"] =  Automerge.getObjectId(mainController.mainDoc.bookmark)

let s = document.createElement("div")
let dataS = {
  "name": "s",
  "identity":{}
}

let t = document.createElement("div")

let masterObjectSoul = {
    "identity": {
        "accessPointer": Automerge.getObjectId(mainController.mainDoc.page[1]),
        "dataPointer": Automerge.getObjectId(mainController.mainDoc.page[1])
    }
}

let masterObject = document.createElement("div")
masterObject.style.width = "50%";
masterObject.style.height = "200px";
masterObject.style.background = "grey"
masterObject.soul = masterObjectSoul


let createLinkObjectButton = document.createElement("button")
createLinkObjectButton.innerText = "createLinkObjectButton"
createLinkObjectButton.addEventListener("click", (e)=>{
    // createLinkObject(mainController["arrayID"]["bookmark"], masterObject.soul)
})
document.body.append(masterObject, createLinkObjectButton)


DatabaseHelperFunction.createNewItem(s, dataS, mainController["arrayID"]["page"])
console.log(mainController.mainDoc["page"])
