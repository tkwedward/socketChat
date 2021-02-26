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

// io.on("connection", socket=>{
//     socket.on("canvas-data", data=>{
//         console.log(data);
//         socket.broadcast.emit("canvas-data", data)
//     })
//
//     socket.on("newObject", data=>{
//       console.log(data);
//         // let the clients to create the new object
//         socket.broadcast.emit("newObject", data)
//     })
//
//
//     // if the server receive a message
//     socket.on("message", data => {
//           console.log(data);
//           io.emit("message", data)
//           // socket.emit("message", {name: "manny",
//           // "message": "hey how are you?"})
//     })
//
//     socket.on("disconnect", ()=>{
//       console.log("user disconnected");
//       io.emit("message", "user disconnected")
//     })
// })

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
