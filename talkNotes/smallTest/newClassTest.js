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
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var GreatNoteControllerClass = __importStar(require("./GreatNoteControllerClass"));
var inputField = GreatNoteDataClass.GNInputField("colorInputField");
inputField.value = 'Test';
inputField.update(123);
// document.body.appendChild(inputField);
// let inputField = new GreatNoteDataClass.GNInputField()
var div = GreatNoteDataClass.GNEditableDiv("nameField");
div.update('Testing Div');
// let inputField = new GreatNoteDataClass.GNInputField()
var button = GreatNoteDataClass.GNButton("saveButton", ["save", "unsave"], function (e) {
    var currentIndex = button.statusList.indexOf(button.innerText);
    var nextIndex = (currentIndex + 1) % button.statusList.length;
    button.innerHTML = button.statusList[nextIndex];
    console.log(nextIndex, button.statusList);
});
var img = GreatNoteDataClass.GNImage("testImage", "http://1.bp.blogspot.com/-nxUhwaWQceU/Vbne9scyheI/AAAAAAAABJk/KN8-02fIgoc/s1600/Pichu.full.1426629.jpg");
// imageController
var page = GreatNoteDataClass.GNDivPage("page1");
var divContainer = GreatNoteDataClass.GNContainerDiv();
var controllerTest = GreatNoteControllerClass.GNImageController("testController");
// document.body.appendChild(divContainer);
document.body.appendChild(page);
document.body.appendChild(controllerTest);
page.appendElements(div, img, inputField);
var currentSelectedObject;
document.addEventListener("click", function (e) {
    // console.log(e)
    // to check if tthe selected object is the saame one or different one
    if (currentSelectedObject != e.target) {
        if (e.target["tagName"] == "IMG") {
            // if an image is clicked
            controllerTest.getControlledObject(e.target);
            console.log("An image is selected.", controllerTest.controlledObject);
        }
        currentSelectedObject = e.target;
    }
});
