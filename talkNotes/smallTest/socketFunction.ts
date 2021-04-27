import * as io from 'socket.io-client';
import {mainController} from "./constructInitialCondition"
export var socket
import * as Automerge from 'automerge'

socket = io.io()

socket.on("connect", ()=>{
    // emit to everybody
    socket.emit("message", "user connected")
    // socket.emit("initialDataRequest")
})

socket.on("message", (msg)=>{
    console.log(msg)
})

socket.on("askRootUserForInitialData", data=>{
  // sender: server ask the root user to get the initial data
  // action: root user will save the automerge document and then send back to the server the required initial data
  // why are there two calls for the save funciton?
  data.initialData = mainController.saveMainDoc(false)
  socket.emit("sendInitialDataToServer", data)
})


socket.on("saveDataToServer", data=>{
    console.log("receive save message from server")
    console.log(data)
    mainController.saveMainDoc(true)
})

socket.on("serverResponseToLoadMainDocRequest", data=>{
    mainController.loadMainDoc(data)
    mainController.buildInitialHTMLSkeleton()
    mainController.buildPageFromMainDoc()

})

socket.on("processInitialData", data=>{
    if (data.initialData){
        mainController.loadMainDoc(data.initialData)
        mainController.buildInitialHTMLSkeleton()
        mainController.buildPageFromMainDoc()
    } else {
        socket.emit("loadMainDoc")
    }

})


socket.on("serverInitiatesSynchronization", ()=>{
    // send back change data to the server
    let changes = Automerge.getChanges(mainController.previousDoc, mainController.mainDoc)
    mainController.previousDoc = mainController.mainDoc

    socket.emit("clientSendChangesToServer", {"changeData": changes})
})

socket.on("deliverSynchronizeDataFromServer", changeDataArray=>{
    console.log(changeDataArray)
    let changeToBeProcessedArray = new Set()
    changeDataArray.forEach(change=>{
        let senderID = change.id
        if (senderID != socket.id){
            mainController.mainDoc = Automerge.applyChanges(mainController.mainDoc, change.changeData)
            change.changeData.forEach(p=>{
                changeToBeProcessedArray.add(p.message)
            })
        }
    })
    mainController.previousDoc = mainController.mainDoc
    mainController.processChangeData(changeToBeProcessedArray)
    // let newChangeToBeProcessedArray = Array.from(changeToBeProcessedArray).map(p=>JSON.parse(p))
    // let changes = Automerge.getChanges(mainController.previousDoc, mainController.mainDoc)
    // console.log(52, changes)




})
