const express = require("express")
const ejs = require("ejs")
let router = express.Router();


router.get("/", (req, res) => {
  res.render("automerge.ejs")
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

module.exports = router
