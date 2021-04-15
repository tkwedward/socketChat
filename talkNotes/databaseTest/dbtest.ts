import {MainDocArrayEnum}  from "./constructInitialCondition"
import * as DatabaseCode from "./constructInitialCondition"


let mainController = new DatabaseCode.MainController()

// let bookmarkArrayId = mainController.mainDocArray[MainDocArrayEnum.bookmark]
//
// let [data1, node1] = mainController.createDummyData("Rashida", 29, "F")
// let [data2, node2] = mainController.createDummyData("Mike", 39, "M")
// let [data3, node3] = mainController.createDummyData("Chess", 12, "L")
// let [data4, node4] = mainController.createDummyData("Cook", 39, "M")

// let htmlObject1
// mainController.addData(bookmarkArrayId, data1, node1)
console.log(mainController.mainDoc)

//
// database.push = function(array, data){
//   database[array].push(data)
// }
//
// function createInputField(name){
//     let inputField = document.createElement("input")
//     inputField.placeholder = name
//     inputField.style.margin = "10px"
//     // inputField.addEventListener("")
//     controlPanel.append(inputField)
//     return inputField
//
// }
//
//
// function createHTMLObject(data_object, parent){
//    let node = document.createElement("div")
//    node.parent = parent
//    node.style.background =data_object.itemStylesheet.background
//    node.style.width = "200px"
//    node.style.height = "70px"
//    node.style.padding = "20px"
//
//
//    node.itemName = data_object.itemName
//    node.itemIdentity = data_object.itemIdentity
//    node.classList.add(`item_${node.itemIdentity.accessPointer}`)
//
//    node.innerHTML = `arrayName:
//      ${node.itemName}<br>accessPointer: ${node.itemIdentity.accessPointer}<br>dataPointer: ${node.itemIdentity.dataPointer}<br>parentPointer: ${node.parent.itemIdentity.parentPointer}`
//
//
//    node.getData = function(){
//       return data_object
//    }
//
//    node.addEventListener("click", function(){
//       controlPannelTitle.innerHTML = "Append to " + node.itemName
//       console.log("current node is " + node.itemName)
//       controlPanel.currentNode = node
//    })
//
//    if (!parent){
//       nodeContainer.append(node)
//    } else {
//       parent.append(node)
//    }
//    return node
// }
//
//
// document.body.style.display = "grid"
// document.body.style.gridTemplateColumns = "4fr 1fr"
//
// let controlPanel = document.createElement("div")
// controlPanel.style.background = "pink"
// controlPanel.style.height = "100vh"
//
// let controlPannelTitle = document.createElement("div")
// controlPannelTitle.innerHTML = "Title"
// controlPannelTitle.style.fontSize = "20px"
// controlPannelTitle.style.margin = "10px"
// controlPannelTitle.style.display = "block"
// controlPanel.currentNode = null
// controlPanel.append(controlPannelTitle)
//
// let nameInputField = createInputField("name")
// let apInputField = createInputField("apInputField")
// let dpInputField = createInputField("dpInputField")
// let submitButton = document.createElement("input")
//
// submitButton.style.margin = "10px"
// submitButton.style.display = "block"
// submitButton.type = "submit"
//
// submitButton.addEventListener("click", function(){
//     let nameValue = nameInputField.value
//     let apValue = apInputField.value
//     let dpValue= dpInputField.value
//
//     let newData =
//     controlPanel.currentNode
//     console.log(nameValue, apValue, dpValue)
//
//
// })
//
// controlPanel.append(submitButton)
//
// let getAccessChainOfNodeButton = document.createElement("button")
// getAccessChainOfNodeButton.innerText = "getAccessChain"
// getAccessChainOfNodeButton.style.margin = "10px"
// getAccessChainOfNodeButton.addEventListener("click", function(){
//     if (controlPanel.currentNode){
//         let accessChain = getAccessChain(controlPanel.currentNode)
//         console.log(179, accessChain)
//     }
// })
// controlPanel.append(getAccessChainOfNodeButton)
//
//
// let nodeContainer = document.createElement("div")
// nodeContainer.style.background = "gold"
// nodeContainer.style.height = "100vh"
// nodeContainer.itemIdentity = {
//       "accessPointer": 0,
//       "dataPointer": 0,
//       "parentPointer": null
// }
//
//
// // initialize thee dataa
// document.body.append(nodeContainer, controlPanel)
// let r = createHTMLObject(database["root"], nodeContainer)
// r.style.position = "absolute"
//
//
// // methods to access the database
// function getItem(accessPointer){
//   return document.querySelector(".item_" + accessPointer)
// }
//
// function getAccessChain(htmlNode, accessChain = []){
//     console.log(htmlNode)
//     accessChain.unshift(htmlNode.itemIdentity.accessPointer)
//     console.log(accessChain)
//     if (htmlNode.parent && htmlNode.parent.itemIdentity){
//         return getAccessChain(htmlNode.parent, accessChain)
//     } else {
//         return accessChain
//     }
// }
//
// window.getItem = getItem
// // r.style.marginRight = "auto"
