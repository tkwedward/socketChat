"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.mainController = void 0;
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var DatabaseCode = __importStar(require("./constructInitialCondition"));
exports.mainController = new DatabaseCode.MainController();
var dataArray;
fetch("../data/pokemon.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    dataArray = data;
});
function createPokemonContainer() {
    var chosenPKM = dataArray[Math.random() * dataArray.length];
    var pkmImgSrc = chosenPKM.image;
    var pkmName = chosenPKM.name;
    var pkmType = chosenPKM.type;
    var pkmNumber = chosenPKM.number;
    var pkmContainer = GreatNoteDataClass.GNContainerDiv();
    var pkmNameContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer);
    pkmNameContainer.innerHTML = pkmName;
    var pkmTypeContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer);
    pkmTypeContainer.innerHTML = pkmType;
    var pkmNumberContainer = GreatNoteDataClass.GNContainerDiv(pkmContainer);
    pkmNumberContainer.innerHTML = pkmNumber;
    var pkmImage = GreatNoteDataClass.GNImage("image", pkmImgSrc);
    pkmContainer.appendElements(pkmNameContainer, pkmTypeContainer, pkmNumberContainer);
}
// basic cell test
// to create a controller
document.body.style.display = "grid";
document.body.style.gridTemplateColumns = "1fr 3fr";
var controller = GreatNoteDataClass.GNContainerDiv();
var controllerStyleList = {
    "width": "95%",
    "height": "100vh",
    "border": "2px black solid",
    "margin": "20px auto"
};
controller.innerHTML = "king";
controller.applyStyle(controllerStyleList);
document.body.appendChild(controller);
var bigFourContainer = GreatNoteDataClass.GNContainerDiv("bigFourContainer");
document.body.appendChild(bigFourContainer);
Object.entries(exports.mainController.mainDocArray).forEach(function (_a, _) {
    var arrayName = _a[0], accessPointer = _a[1];
    var container = GreatNoteDataClass.GNEditableDiv(arrayName);
    var styleList = {
        "width": "95%",
        "height": "200px",
        "border": "2px black solid",
        "margin": "20px auto"
    };
    container.applyStyle(styleList);
    bigFourContainer.appendChild(container);
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
