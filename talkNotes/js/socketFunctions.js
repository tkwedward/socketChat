
const socket = io()

socket.on("connect", ()=>{
    // emit to everybody
    socket.emit("message", "user connected")
})
