import * as io from 'socket.io-client';
import {mainController} from "./constructInitialCondition"
export var socket
socket = io.io()


socket.on("connect", ()=>{
    // emit to everybody
    socket.emit("message", "user connected")
    socket.emit("initialDataRequest")
})

socket.on("message", (msg)=>{
    console.log(msg)
})

socket.on("askRootUserForInitialData", data=>{
  // sender: server ask the root user to get the initial data
  // action: root user will save the automerge document and then send back to the server the required initial data
  data.initialData = mainController.saveMainDoc()
  socket.emit("sendInitialDataToServer", data)
})


socket.on("serverResponseToLoadMainDocRequest", data=>{
    mainController.loadMainDoc(data)
    console.log(mainController.mainDoc)

})

socket.on("processInitialData", data=>{
    // mainController.loadMainDoc(data.initialData)


})
