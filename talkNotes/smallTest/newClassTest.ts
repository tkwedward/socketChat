import * as Automerge from 'automerge'
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import * as GreatNoteControllerClass from "./GreatNoteControllerClass"

var inputField = GreatNoteDataClass.GNInputField("colorInputField");
inputField.value = 'Test';
inputField.update(123)
// document.body.appendChild(inputField);

// let inputField = new GreatNoteDataClass.GNInputField()

var div = GreatNoteDataClass.GNEditableDiv("nameField");
div.update('Testing Div');

// let inputField = new GreatNoteDataClass.GNInputField()
var button = GreatNoteDataClass.GNButton("saveButton", ["save", "unsave"], (e)=>{
    let currentIndex = button.statusList.indexOf(button.innerText)
    let nextIndex = (currentIndex + 1) % button.statusList.length
    button.innerHTML = button.statusList[nextIndex]
    console.log(nextIndex, button.statusList)
});

var img = GreatNoteDataClass.GNImage("testImage", "http://1.bp.blogspot.com/-nxUhwaWQceU/Vbne9scyheI/AAAAAAAABJk/KN8-02fIgoc/s1600/Pichu.full.1426629.jpg")
// imageController



let page = GreatNoteDataClass.GNDivPage("page1")

var divContainer = GreatNoteDataClass.GNContainerDiv();

let imageController = GreatNoteControllerClass.GNImageController("imageController")
let textController = GreatNoteControllerClass.GNTextController("textController")

// document.body.appendChild(divContainer);
// document.body.appendChild(page);
// document.body.append(imageController, textController);
// page.appendElements(div, img, inputField)

interface EventTarget{
  tagName?:string
  classList?:DOMTokenList
}

let currentSelectedObject
page.addEventListener("click", function(e){

  let isPageObject = false
  let className = e.target["classList"][0]
  if (className && className.startsWith("page_item_")){
      isPageObject = true
  }

  // to check if tthe selected object is the saame one or different one
  if (currentSelectedObject != e.target && isPageObject){
      switch (e.target["tagName"]){
          // case
      }

      if (className.includes(GreatNoteDataClass.GNImage.name)){
        // if an image is clicked
        imageController.getControlledObject(e.target)
        console.log("An image is selected.", imageController.controlledObject)
      }
      else if (className.includes(GreatNoteDataClass.GNEditableDiv.name)){
        // if it is GNEditableDiv
        textController.getControlledObject(e.target)
        console.log("An editable textfield is selected.", imageController.controlledObject)
      }

      currentSelectedObject = e.target
      console.log(currentSelectedObject._parent)
  }

})

let r1 = {
  "identity": "1002012",
  "data": "1230423",
  "fatt": [{}]
}

function createNode(name, ap, dp, color){
    let data_object = {
      "name": name,
      "array": [],
      "identity": {
        "accessPointer": ap,
        "dataPointer": dp
      },
      "stylesheet": {
        "background": color
      }
    }

    data_object.push = function(item){
      data_object["array"].push(item)
    }

    return data_object
}

let database = {
    "root": {
        "itemName": "rootNode",
        "pageArray": [],
        "bookmarkArray": [],
        "itemIdentity": {
          "accessPointer": 1,
          "dataPointer": 1,
          "parentPointer": 0
        },
        "itemStylesheet": {
            "background": "silver"
        }
    }
}


database.push = function(array, data){
  database[array].push(data)
}

function createInputField(name){
    let inputField = document.createElement("input")
    inputField.placeholder = name
    inputField.style.margin = "10px"
    // inputField.addEventListener("")
    controlPanel.append(inputField)
    return inputField

}


function createHTMLObject(data_object, parent){
   let node = document.createElement("div")
   node.parent = parent
   node.style.background =data_object.itemStylesheet.background
   node.style.width = "200px"
   node.style.height = "70px"
   node.style.padding = "20px"


   node.itemName = data_object.itemName
   node.itemIdentity = data_object.itemIdentity
   node.classList.add(`item_${node.itemIdentity.accessPointer}`)

   node.innerHTML = `arrayName:
     ${node.itemName}<br>accessPointer: ${node.itemIdentity.accessPointer}<br>dataPointer: ${node.itemIdentity.dataPointer}<br>parentPointer: ${node.parent.itemIdentity.parentPointer}`


   node.getData = function(){
      return data_object
   }

   node.addEventListener("click", function(){
      controlPannelTitle.innerHTML = "Append to " + node.itemName
      console.log("current node is " + node.itemName)
      controlPanel.currentNode = node
   })

   if (!parent){
      nodeContainer.append(node)
   } else {
      parent.append(node)
   }
   return node
}


document.body.style.display = "grid"
document.body.style.gridTemplateColumns = "4fr 1fr"

let controlPanel = document.createElement("div")
controlPanel.style.background = "pink"
controlPanel.style.height = "100vh"

let controlPannelTitle = document.createElement("div")
controlPannelTitle.innerHTML = "Title"
controlPannelTitle.style.fontSize = "20px"
controlPannelTitle.style.margin = "10px"
controlPannelTitle.style.display = "block"
controlPanel.currentNode = null
controlPanel.append(controlPannelTitle)

let nameInputField = createInputField("name")
let apInputField = createInputField("apInputField")
let dpInputField = createInputField("dpInputField")
let submitButton = document.createElement("input")

submitButton.style.margin = "10px"
submitButton.style.display = "block"
submitButton.type = "submit"

submitButton.addEventListener("click", function(){
    let nameValue = nameInputField.value
    let apValue = apInputField.value
    let dpValue= dpInputField.value

    let newData =
    controlPanel.currentNode
    console.log(nameValue, apValue, dpValue)


})

controlPanel.append(submitButton)

let getAccessChainOfNodeButton = document.createElement("button")
getAccessChainOfNodeButton.innerText = "getAccessChain"
getAccessChainOfNodeButton.style.margin = "10px"
getAccessChainOfNodeButton.addEventListener("click", function(){
    if (controlPanel.currentNode){
        let accessChain = getAccessChain(controlPanel.currentNode)
        console.log(179, accessChain)
    }
})
controlPanel.append(getAccessChainOfNodeButton)


let nodeContainer = document.createElement("div")
nodeContainer.style.background = "gold"
nodeContainer.style.height = "100vh"
nodeContainer.itemIdentity = {
      "accessPointer": 0,
      "dataPointer": 0,
      "parentPointer": null
}


// initialize thee dataa
document.body.append(nodeContainer, controlPanel)
let r = createHTMLObject(database["root"], nodeContainer)
r.style.position = "absolute"


// methods to access the database
function getItem(accessPointer){
  return document.querySelector(".item_" + accessPointer)
}

function getAccessChain(htmlNode, accessChain = []){
    console.log(htmlNode)
    accessChain.unshift(htmlNode.itemIdentity.accessPointer)
    console.log(accessChain)
    if (htmlNode.parent && htmlNode.parent.itemIdentity){
        return getAccessChain(htmlNode.parent, accessChain)
    } else {
        return accessChain
    }
}

window.getItem = getItem
// r.style.marginRight = "auto"
