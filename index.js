const express = require("express");
const path = require("path")
const port = 3000
const talkNotes = require("./routes/talkNotes")


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



io.on("connection", socket=>{

    socket.on("message", data => {
        console.log(new Date());
        console.log(data);
        console.log(Array.from( io.sockets.sockets.keys()));
    })

    // begin: server receives request from a particular client to synchronize data among all the clients.
    // action: server sends request to all clients to give him all the changes. Wait for clients to send back all the changes and then send back the collection of changes to the clients.
    // message to ask all clients to send back changes


    socket.on("initialDataRequest", ()=>{
        let connectedUserList =  Array.from(io.sockets.sockets.keys())

        // if (connectedUserList.length > 1){
            let sender = connectedUserList[0]
            let receiver = socket.id
            console.log(`${receiver} wants to get initial Data`);
            console.log(`${sender} will send data to the new user ${socket.id}`);
            io.sockets.to(sender).emit("askRootUserForInitialData", { "receiver": receiver });
        // }
    })

    socket.on("sendInitialDataToServer", data=>{

        io.sockets.to(data.receiver).emit("processInitialData", data)
        // console.log(data);
    })

//     socket.on("disconnect", ()=>{
//       console.log("user disconnected");
//       io.emit("message", "user disconnected")
//     })

  socket.on("clientAskServerToInitiateSynchronization", ()=>{
    let changeList = []
    // a promise to get all the changes from all clients
    let clientsArray = Array.from(io.sockets.sockets.keys())
    let promiseArray = clientsArray.map((p=>{
      return new Promise(res=>{
        socket.on("clientSendChangesToServer", data =>{
          changeList.push({
            "changeData": data.changeData,
            "id": p,
            "origin_id": socket.id
          })
          res(true)
        })// event of clientSendChangesToServer
      })// promise
    }))// map
    Promise.all(promiseArray).then(p=>{
      // socket.off('clientSendChangesToServer');
      console.log(changeList);
        io.emit("deliverSynchronizeDataFromServer", changeList);
    })
    io.emit("serverInitiatesSynchronization")
  })

})

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
