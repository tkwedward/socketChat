import * as io from 'socket.io-client';
const socket = io.io()

socket.on("connect", ()=>{
    // emit to everybody
    socket.emit("message", "user connected")
})
