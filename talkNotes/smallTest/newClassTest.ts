import * as Automerge from 'automerge'
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import * as GreatNoteControllerClass from "./GreatNoteControllerClass"

var inputField = GreatNoteDataClass.GNInputField("colorInputField");
inputField.value = 'Test';
inputField.update(123)
// document.body.appendChild(inputField);

// let inputField = new GreatNoteDataClass.GNInputField()

var div = GreatNoteDataClass.GNEditableDiv("nameField");
div.update('Testing Div');

// let inputField = new GreatNoteDataClass.GNInputField()
var button = GreatNoteDataClass.GNButton("saveButton", ["save", "unsave"], (e)=>{
    let currentIndex = button.statusList.indexOf(button.innerText)
    let nextIndex = (currentIndex + 1) % button.statusList.length
    button.innerHTML = button.statusList[nextIndex]
    console.log(nextIndex, button.statusList)
});

var img = GreatNoteDataClass.GNImage("testImage", "http://1.bp.blogspot.com/-nxUhwaWQceU/Vbne9scyheI/AAAAAAAABJk/KN8-02fIgoc/s1600/Pichu.full.1426629.jpg")
// imageController



let page = GreatNoteDataClass.GNDivPage("page1")

var divContainer = GreatNoteDataClass.GNContainerDiv();

let controllerTest = GreatNoteControllerClass.GNImageController("testController")

// document.body.appendChild(divContainer);
document.body.appendChild(page);
document.body.appendChild(controllerTest);
page.appendElements(div, img, inputField)

interface EventTarget{
  tagName?:string
}

let currentSelectedObject
document.addEventListener("click", function(e){
  // console.log(e)
  // to check if tthe selected object is the saame one or different one
  if (currentSelectedObject != e.target){

      if (e.target["tagName"] == "IMG"){
        // if an image is clicked
        controllerTest.getControlledObject(e.target)
        console.log("An image is selected.", controllerTest.controlledObject)
      }

      currentSelectedObject = e.target
  }

})
