const express = require("express");
const path = require("path")
const port = 3000
const talkNotes = require("./routes/talkNotes")
const fs = require("fs")
const Automerge = require("automerge")
const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", [path.join(__dirname, "./public"), path.join(__dirname, "./talkNotes/templates")])

app.use(express.static(path.join(__dirname, "./public")))
app.use(express.static(path.join(__dirname, "./talkNotes")))
app.use("/talkNotes", talkNotes)

const server = require("http").Server(app);
const io = require("socket.io")(server)


app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/public/index.html")
})

app.get("/board", (req, res)=>{
  res.sendFile(__dirname + "/public/board.html")
})

app.get("/svgBoard", (req, res)=>{
  res.sendFile(__dirname + "/public/svgBoard.html")
})

app.get("/editor", (req, res)=>{
  res.sendFile(__dirname + "/public/editor.html")
})

// socketArray = []

let mainDoc = Automerge.init()
let jsonFileLocation = path.join(__dirname, "./talkNotes/data/automergeData.txt")
let data = fs.readFileSync(jsonFileLocation)
mainDoc = Automerge.load(data)

io.on("connection", socket=>{
    // socketArray.push(socket)

    socket.broadcast.emit('socketConnectionUpdate', {
      action: "connect", targetSocketId: socket.id
    });


    socket.on("message", data => {
        console.log(new Date());
        console.log(Array.from( io.sockets.sockets.keys()));
    })

    socket.on("clientAskServerForSocketData", data => {
      let socketData = {
          "yourSocketId": socket.id,
          "socketArray": Array.from( io.sockets.sockets.keys())
      }

      socket.emit("serverSendSocketIdArray", socketData)
    })

    // setInterval(function(){
    //   io.sockets.to(socketArray[0].id).emit("saveDataToServer", "periodical save")
    // }, 30000)
    // begin: server receives request from a particular client to synchronize data among all the clients.
    // action: server sends request to all clients to give him all the changes. Wait for clients to send back all the changes and then send back the collection of changes to the clients.
    // message to ask all clients to send back changes

  socket.on("initialDataRequest", ()=>{
      let mainDocCopy = fs.readFileSync(jsonFileLocation)

      socket.emit("processInitialData", mainDocCopy)
  })


  socket.on("disconnect", ()=>{
    console.log("user disconnected");
    io.emit("message", "user disconnected")
    socket.broadcast.emit('socketConnectionUpdate', {
      action: "disconnect", targetSocketId: socket.id
    });
  })

  socket.on("clientSendChangesToServer",async  data=>{
      mainDoc = Automerge.applyChanges(mainDoc, data.changeData)
      let saveData = Automerge.save(mainDoc)


      console.log(91, data)
      data["senderID"] = socket.id
      await fs.writeFileSync(jsonFileLocation, saveData);
      console.log("finish Saving")
      io.emit("message", "finish saving")
      io.emit("serverSendChangeFileToClient", data)
  })


  socket.on("resetNoteBook", saveData=>{
    console.log("resetNotebook")
     fs.writeFileSync(jsonFileLocation, saveData);
  })

  socket.on("saveNotebookUsingClientData",async data => {
    console.log(data)
    Automerge.load(data)
      await fs.writeFileSync(jsonFileLocation, data);
  }) // saveMainDocToDisk
})

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
