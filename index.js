const express = require("express");
const path = require("path")
const port = 3000
const talkNotes = require("./routes/talkNotes")
const fs = require("fs")

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

socketArray = []

// io.on("connection", socket=>{
//     socketArray.push(socket)
//     socket.on("message", data=>{
//       console.log(new Date());
//       console.log(data);
//       console.log(socket.id);
//     })
//
//     socket.on("_clientAskServerToInitiateSynchronization", ()=>{
//       console.log("server received a call from " + socket.id + " to initiate synchronization");
//
//       let allChanges = []
//
//       let promiseArray = socketArray.map(_s=>{
//           return new Promise(res=>{
//             _s.once("_clientSendChangesToServer", data=>{
//               console.log("======================")
//               console.log("received change data from " + _s.id)
//               allChanges.push(data)
//               res(true)
//             })
//           })// promise
//       })// map
//
//       Promise.all(promiseArray).then(p=>{
//         console.log(allChanges);
//         io.emit("_deliverSynchronizeDataFromServer", allChanges)
//       })
//       io.emit("_serverInitiatesSynchronization")
//     })
//
//
//
//     socket.on("disconnect", ()=>{
//       console.log(socket.id + " disconnected");
//       console.log(socketArray.map(p=>p.id));
//       socketArray = socketArray.filter(s=>s.id!=socket.id)
//       console.log(socketArray.map(p=>p.id));
//
//     })
// })

io.on("connection", socket=>{
    socketArray.push(socket)
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

  socket.on("disconnect", ()=>{
    console.log("user disconnected");
    console.log(socketArray.map(_s=>_s.id));
    io.emit("message", "user disconnected")
  })

  socket.on("clientAskServerToInitiateSynchronization", ()=>{
    let changeList = []
    let promiseArray = []
    let connectedUserList =  Array.from(io.sockets.sockets.keys())

    // to update the socket list so that the disconnected socket will not block the promise chain
    socketArray = socketArray.filter(_s=>connectedUserList.includes(_s.id))
    // console.log(socketArray.map(_s=>_s.id));

    // to create an array of promises so that after getting all changes from clients, the server will send the changes to the clients
    socketArray.forEach(_s=>{
        let promise =  new Promise(res=>{
          _s.once("clientSendChangesToServer", data =>{
            changeList.push({
              "changeData": data.changeData,
              "id": _s.id
            })
            res(true)
          })// event of clientSendChangesToServer
        })// promise
        promiseArray.push(promise)
  })// forEach
    // console.log(connectedUserList);
    // console.log(socketArray.map(_s=>_s.id));

    // send the combined changes to all the clients
    Promise.all(promiseArray).then(p=>{
      // socket.off('clientSendChangesToServer');
      // console.log(changeList);
        io.emit("deliverSynchronizeDataFromServer", changeList);
    })

    // to ask all the clients to send data to the server
    io.emit("serverInitiatesSynchronization")
  })// clientAskServerToInitiateSynchronization


  socket.on("saveMainDocToDisk",async data => {
      let jsonFileLocation = path.join(__dirname, "./talkNotes/data/automergeData.txt")
      await fs.writeFileSync(jsonFileLocation, data);
      await socket.emit("message", "save success")
  }) // saveMainDocToDisk

  socket.on("loadMainDoc",async () => {
      let jsonFileLocation = path.join(__dirname, "./talkNotes/data/automergeData.txt")
      let data = await fs.readFileSync(jsonFileLocation, 'utf8');
      socket.emit("serverResponseToLoadMainDocRequest", data)

  }) // saveMainDocToDisk
})

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
