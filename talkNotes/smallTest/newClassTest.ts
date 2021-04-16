import * as Automerge from 'automerge'
import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import * as GreatNoteControllerClass from "./GreatNoteControllerClass"
import {MainDocArrayEnum}  from "./constructInitialCondition"


// export var mainController:DatabaseCode.MainControllerInterface
// mainController = new DatabaseCode.MainController()


var dataArray
fetch("../data/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dataArray = data
})
console.log(24, GreatNoteDataClass)

function createPokemonContainer(){
    let chosenPKM = dataArray[Math.random()*dataArray.length]
    let pkmImgSrc = chosenPKM.image
    let pkmName = chosenPKM.name
    let pkmType = chosenPKM.type
    let pkmNumber = chosenPKM.number

    let pkmContainer = GreatNoteDataClass.GNContainerDiv()

    let pkmNameContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer)
    pkmNameContainer.innerHTML = pkmName

    let pkmTypeContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer)
    pkmTypeContainer.innerHTML = pkmType

    let pkmNumberContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer)
    pkmNumberContainer.innerHTML = pkmNumber
    let pkmImage = GreatNoteDataClass.GNImage("image", pkmImgSrc)

    pkmContainer.appendElements(pkmNameContainer, pkmTypeContainer, pkmNumberContainer)
}

// to create a controller
document.body.style.display = "grid"
document.body.style.gridTemplateColumns = "1fr 3fr"

let controller = GreatNoteDataClass.GNContainerDiv()
let controllerStyleList = {
    "width": "95%",
    "height": "100vh",
    "border": "2px black solid",
    "margin": "20px auto"
}
controller.innerHTML = "king"
controller.applyStyle(controllerStyleList)
document.body.appendChild(controller)


let bookmarkArrayId = mainController.mainDocArray["bookmark"]
let masterObjectPointer


let bigFourContainer = GreatNoteDataClass.GNEditableDiv("bigFourContainer")
document.body.appendChild(bigFourContainer)
Object.entries(mainController.mainDocArray).forEach(([arrayName, accessPointer], index) => {
    // let container =
    //

    let container = GreatNoteDataClass.GNEditableDiv("editable")
    container.addToDatabase(bookmarkArrayId, false, masterObjectPointer)

    if (index == 0){
        masterObjectPointer = container.getDataPointer()
    }


    // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
    let styleList = {
        "width": "95%",
        "height": "200px",
        "border": "2px black solid",
        "margin": "20px auto"
    }
    container.applyStyle(styleList)

    bigFourContainer.appendChild(container)

});


//
//
// // ========================================= //
// // var inputField = GreatNoteDataClass.GNInputField("colorInputField");
// // inputField.value = 'Test';
// // inputField.update(123)
// // document.body.appendChild(inputField);
//
// // let inputField = new GreatNoteDataClass.GNInputField()
//
// // var div = GreatNoteDataClass.GNEditableDiv("nameField");
// // div.update('Testing Div');
// //
// // // let inputField = new GreatNoteDataClass.GNInputField()
// // var button = GreatNoteDataClass.GNButton("saveButton", ["save", "unsave"], (e)=>{
// //     let currentIndex = button.statusList.indexOf(button.innerText)
// //     let nextIndex = (currentIndex + 1) % button.statusList.length
// //     button.innerHTML = button.statusList[nextIndex]
// //     console.log(nextIndex, button.statusList)
// // });
//
//
//
// //
// // let bookmarkArrayId = mainController.mainDocArray[MainDocArrayEnum.bookmark]
// //
// // let imgData:GNImageDataStructure = {"name": "testImage", "src": "http://1.bp.blogspot.com/-nxUhwaWQceU/Vbne9scyheI/AAAAAAAABJk/KN8-02fIgoc/s1600/Pichu.full.1426629.jpg"}
// // let dummyData = mainController.createDummyData(imgData)
// // var img = GreatNoteDataClass.GNImage(imgData.name, imgData.src)
// // mainController.addData(bookmarkArrayId, dummyData, img)
// // console.log(43, mainController, img._identity)
// // // imageController
// //
// // let imgData2:GNImageDataStructure = {"name": "testImage2", "src": "http://1.bp.blogspot.com/-nxUhwaWQceU/Vbne9scyheI/AAAAAAAABJk/KN8-02fIgoc/s1600/Pichu.full.1426629.jpg"}
// // dummyData = mainController.createDummyData(imgData2)
// // var img2 = GreatNoteDataClass.GNImage(imgData.name, imgData.src)
// //
// //
// // for (let i = 0; i < 1000; i++){
// //   mainController.addData(bookmarkArrayId, dummyData, img)
// //
// // }
// //
// // let saveData = mainController.save()
// // console.log(52, saveData)
// //
// // let page = GreatNoteDataClass.GNDivPage("page1")
// //
// // var divContainer = GreatNoteDataClass.GNContainerDiv();
// //
// // let imageController = GreatNoteControllerClass.GNImageController("imageController")
// // let textController = GreatNoteControllerClass.GNTextController("textController")
// //
// // document.body.appendChild(divContainer);
// // document.body.appendChild(page);
// // document.body.append(imageController, textController);
// // page.appendElements(div, img, inputField)
// //
// // interface EventTarget{
// //   tagName?:string
// //   classList?:DOMTokenList
// // }
// //
// // let currentSelectedObject
// // page.addEventListener("click", function(e){
// //
// //   let isPageObject = false
// //   let className = e.target["classList"][0]
// //   if (className && className.startsWith("page_item_")){
// //       isPageObject = true
// //   }
// //
// //   // to check if tthe selected object is the saame one or different one
// //   if (currentSelectedObject != e.target && isPageObject){
// //       switch (e.target["tagName"]){
// //           // case
// //       }
// //
// //       if (className.includes(GreatNoteDataClass.GNImage.name)){
// //         // if an image is clicked
// //         imageController.getControlledObject(e.target)
// //         console.log("An image is selected.", imageController.controlledObject)
// //       }
// //       else if (className.includes(GreatNoteDataClass.GNEditableDiv.name)){
// //         // if it is GNEditableDiv
// //         textController.getControlledObject(e.target)
// //         console.log("An editable textfield is selected.", imageController.controlledObject)
// //       }
// //
// //       currentSelectedObject = e.target
// //       console.log(currentSelectedObject._parent)
// //   }
// //
// // })
