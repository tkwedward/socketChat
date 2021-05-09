import * as io from 'socket.io-client';
import {mainController} from "./constructInitialCondition"
export var socket
import * as CommunicatorController from "./communicationFolder/communitcationController"
import * as Automerge from 'automerge'

socket = io.io()

socket.on("connect", ()=>{
    // emit to everybody
    socket.emit("message", "user connected")
    // socket.emit("initialDataRequest")
})

socket.on("serverSendSocketIdArray", data=>{
    // emit to everybody
    // console.log(1616, data)
    // socket.emit("initialDataRequest")
})

socket.on("message", (msg)=>{
    console.log(msg)
})


socket.on("saveDataToServer", data=>{
    console.log("receive save message from server")
    mainController.saveMainDoc(true)
})

socket.on("serverResponseToLoadMainDocRequest", data=>{
    mainController.loadMainDoc(data)
    mainController.buildInitialHTMLSkeleton()
    mainController.buildPageFromMainDoc()
})

function Decodeuint8arr(uint8array){
    return new TextDecoder("utf-8").decode(uint8array);
}
import * as TestFunction from "./testFolder/testHelperFunction"
socket.on("processInitialData", data=>{
    let convertedData = Decodeuint8arr(data)
    mainController.loadMainDoc(convertedData)
    mainController.buildInitialHTMLSkeleton()
    mainController.buildPageFromMainDoc()

    // TestFunction.testFunction(mainController)
})


// socket.on("serverSendSocketIdArray", data=>{
//     mainController.communitcationController = CommunicatorController.createCommunicationPanel(data)
// })

socket.on("socketConnectionUpdate", data=>{
    // mainController.communitcationController.update(data)
})

socket.on("serverSendChangeFileToClient", changeDataArray=>{
    if (changeDataArray.senderID != socket.id){
        console.log(616161, "socket, serverSendChangeFileToClient")
        mainController.mainDoc = Automerge.applyChanges(mainController.mainDoc, changeDataArray.changeData)
        mainController.previousDoc = mainController.mainDoc

        mainController.processChangeData(changeDataArray.changeData)
    }




})
