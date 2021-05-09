const express = require("express")
const ejs = require("ejs")
let router = express.Router();
const { uuid } = require('uuidv4');


router.get("/", (req, res) => {
  res.render("automerge.ejs")
})

router.get("/board", (req, res) => {
  res.render("board.ejs")
})


router.get("/get/", (req, res) => {
  res.render("thingsGet.ejs")
})

router.post("/saveTalkNotes/", (req, res) => {
  let body = ""

  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', async () =>{
    console.log(body);
  })

  res.send("thingsGet.ejs")
})

router.post("/processImageBase64Format", (req, res) => {
  let body = ""

  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', ()=>{
      var base64Data = body.replace(/^data:image\/png;base64,/, "");
      console.log(base64Data)
      let link = uuid()
      let imageName = "talkNotes/noteImage/" + link + '.png'

      require("fs").writeFile(imageName, base64Data, 'base64', function(){
          res.end(JSON.stringify({"imgsrc": link}));
      });

  })
})

module.exports = router

//
// f = Automerge.init()
// f = Automerge.change(f, p=>{
//    p["king"] = [
//      {"name": "King", "number": 123},
//      {"name": "Queen", "number": 430},
//    ]
// })

// {"name": "Jack", "number": 430},
// {"name": "Rashida", "number":510}
// {"name": "Kotaro", "number": 250, "friend": ["Dio"]},


// problem: cannot reorder objects

// function convertBackToNormalObejct(ob){
//     if (typeof(ob)=="array" || typeof(ob)=="object"){
//         return
//     } else {
//         return oo
//     }
// }
