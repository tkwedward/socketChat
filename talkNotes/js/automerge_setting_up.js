var dataArray
fetch("data/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dataArray = data
  })

const socket = io()

class Tab {
    static autoMergeBaseStructure = {
      "container": []
    }

    static dataStructure = {
      "cellContainer": [],
      "color": "Aliceblue"
    }

    constructor(parent, autoMergeContainerName, position){
      this.autoMergeContainerName = autoMergeContainerName
      this.parent = parent

      let container = getDocumentChain(this)
      this.objectID = container[position]
    }


    update(data){

    }
}

class Cell {
    static autoMergeBaseStructure = {
        "container": [],
        "color": "blue"
    }

    static dataStructure = {
        "annotationArray": [],
        "title": ""
    }

    constructor(objectID, containerName, parent){
        this.objectID = objectID
        this.containerName = containerName
        this.parent = parent
    }

    update(data){

    }
}

const OBJECT_ID = "objectId"
const OBJECT_CONFILCTS = "conflicts"
const OBJECT_OPTIONS = "options"
const OBJECT_CACHE = "cache"
const OBJECT_INBOUND = "inbound"
const OBJECT_STATE = "state"
const OBJECT_ELEMENT_IDS = "elemIDs"

const SYMBOLS_STRING = [OBJECT_CONFILCTS, OBJECT_ID, OBJECT_OPTIONS, OBJECT_CACHE, OBJECT_INBOUND, OBJECT_STATE]


class RootDocument{
    constructor(){
        this.doc = Automerge.from({cardsContainer: []})
        this.previousDoc = Automerge.init()
        this.parent = null
    }

    registerNewObjectInAutomergeDoc(objectName, data, objectClass, createInstance){
        // when an object (array / dict) are created, need to register the new array in the database and then get back the array ID from it.
        // e.g registerNewObjectInAutomergeDoc("cellArray", "123", Cell)

        this.doc = Automerge.change(this.doc, doc=>{
            // console.log(Cell.autoMergeBaseStructure);
            doc[objectName] = [objectName.dataStructure]
        })

        console.log(this.doc[objectName]);
        // get back the

        // create the new object and then put an instance into that new object array
        if (!this[objectName]){
            this[objectName] = {
              "objectID": this.doc[objectName][SYMBOLS_OBJECT[OBJECT_ID]],
              "container": []
            }
        }
        objectClass.container = this[objectName]["objectID"]

        // create a new instance
        // 1) use the base Structure to register an object in the automerge doc
        // 2) create the new instance and pass the object ID to it
        // 3) push it to the array -- rootDocument[objectName]


        let newInstance = new objectClass(objectName, this, position=0)
        // add this new instance into the
        this[objectName]["container"].push(newInstance)
    }

    // createClassInstance()

}

function searchElemIDFromIndex(elemContainer, index){
    let elemIdSymbol = Object.getOwnPropertySymbols(elemContainer)[2]
    let elemID = elemContainer[elemIdSymbol][index]
    return elemID
}

let rootDocument = new RootDocument()



let SYMBOLS_OBJECT = {}
Object.getOwnPropertySymbols(rootDocument.doc).forEach((p, i)=>{
    SYMBOLS_OBJECT[SYMBOLS_STRING[i]] = p
})

SYMBOLS_OBJECT[OBJECT_ELEMENT_IDS] = Object.getOwnPropertySymbols(rootDocument.doc.cardsContainer)[2]
