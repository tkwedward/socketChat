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
var constructInitialCondition_1 = require("./constructInitialCondition");
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var socketFunction_1 = require("./socketFunction");
var GNDataStructureMapping;
constructInitialCondition_1.mainController.GNDataStructureMapping = {
    GNInputField: GreatNoteDataClass.GNInputField,
    GNContainerDiv: GreatNoteDataClass.GNContainerDiv,
    GNEditableDiv: GreatNoteDataClass.GNEditableDiv,
    GNImage: GreatNoteDataClass.GNImage,
    GNDivPage: GreatNoteDataClass.GNDivPage,
    GNButton: GreatNoteDataClass.GNButton
};
console.log(constructInitialCondition_1.mainController.GNDataStructureMapping);
// socket.emit("loadMainDoc")
// to create a controller
if (!constructInitialCondition_1.mainController.applyMainDocTemplate) {
    document.body.style.display = "grid";
    document.body.style.gridTemplateColumns = "1fr 3fr";
    var bookmarkArrayId = constructInitialCondition_1.mainController.mainDocArray["bookmark"];
    var controllerStyleList = {
        "width": "95%",
        "height": "100vh",
        "border": "2px black solid",
        "margin": "20px auto"
    };
    //
    var controller_1 = document.createElement("div");
    controller_1.classList.add("controller");
    controller_1.innerHTML = "king";
    controller_1.style.width = "95%";
    controller_1.style.height = "100vh";
    controller_1.style.border = "2px black solid";
    controller_1.style.margin = "20px auto";
    document.body.appendChild(controller_1);
    //
    var linkArrayInfo = document.createElement("div");
    linkArrayInfo.classList.add("linkArrayInfo");
    controller_1.appendChild(linkArrayInfo);
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "save";
    saveButton.addEventListener("click", function (e) {
        var s = constructInitialCondition_1.mainController.saveMainDoc();
        socketFunction_1.socket.emit("saveMainDocToDisk", s);
        console.log(constructInitialCondition_1.mainController.mainDoc);
    });
    var loadButton = document.createElement("button");
    loadButton.innerHTML = "load";
    loadButton.addEventListener("click", function (e) {
        socketFunction_1.socket.emit("loadMainDoc");
    });
    controller_1.appendChild(saveButton);
    controller_1.appendChild(loadButton);
    //
    var contentContainer = document.createElement("div");
    contentContainer.classList.add("contentContainer");
    document.body.appendChild(contentContainer);
    function addAccessPointerAndDataPointerDiv(htmlObject) {
        var containerInfo = document.createElement("div");
        containerInfo.innerHTML += "=========================<br>";
        var dpContainer = document.createElement("div");
        dpContainer.innerHTML += "DP:" + htmlObject.getDataPointer() + "<br>";
        dpContainer.addEventListener("click", function () {
            console.log(constructInitialCondition_1.mainController.getObjectById(htmlObject.getDataPointer()));
        });
        var apContainer = document.createElement("div");
        apContainer.innerHTML += "AP:" + htmlObject.getAccessPointer() + "<br>";
        apContainer.addEventListener("click", function () {
            console.log(constructInitialCondition_1.mainController.getObjectById(htmlObject.getAccessPointer()), htmlObject, htmlObject.stylesheet);
        });
        containerInfo.append(dpContainer, apContainer);
        controller_1.appendChild(containerInfo);
    }
    var bigFourContainer_1 = GreatNoteDataClass.GNContainerDiv("bigFourContainer", bookmarkArrayId);
    bigFourContainer_1.appendTo(contentContainer);
    var clickEvent_1 = function (_object) {
        var triggerEvent = new Event("changeStatusEvent");
        var currentIndex = _object.statusList.indexOf(_object.innerText);
        var nextIndex = (currentIndex + 1) % _object.statusList.length;
        _object.innerText = _object.statusList[nextIndex];
        console.log(98, _object, _object.statusList, currentIndex);
        _object.dispatchEvent(triggerEvent);
    };
    var selectObject_1 = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer_1.getAccessPointer());
    selectObject_1.addClickEvent(clickEvent_1);
    selectObject_1.appendTo(bigFourContainer_1);
    addAccessPointerAndDataPointerDiv(selectObject_1);
    function createHTMLObject() {
        var _object = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer_1.getAccessPointer(), false, selectObject_1.getDataPointer());
        _object.addClickEvent(clickEvent_1);
        _object.appendTo(bigFourContainer_1);
        addAccessPointerAndDataPointerDiv(_object);
    }
    var number = 20;
    for (var i = 0; i < number; i++) {
        createHTMLObject();
    }
}
// let firstContainer
// Object.entries(mainController.mainDocArray).forEach(([arrayName, accessPointer], index) => {
//     // let container =
//     // if ()
//     let containerEditable = GreatNoteDataClass.GNEditableDiv("editable", bigFourContainer.getAccessPointer(), false, firstContainer?.getDataPointer())
//
//     if (index==0){
//       firstContainer = containerEditable
//     }
//
//
//     let containerInfo = document.createElement("div")
//     containerInfo.innerHTML +=  "=========================<br>"
//     let dpContainer = document.createElement("div")
//
//     dpContainer.innerHTML += "DP:" + containerEditable.getDataPointer() + "<br>"
//     dpContainer.addEventListener("click", function(){
//         console.log(mainController.getObjectById(containerEditable.getDataPointer()))
//     })
//
//     let apContainer = document.createElement("div")
//     apContainer.innerHTML += "AP:" + containerEditable.getAccessPointer() + "<br>"
//     apContainer.addEventListener("click", function(){
//         console.log(mainController.getObjectById(containerEditable.getAccessPointer()), containerEditable, containerEditable.stylesheet)
//     })
//
//
//
//     containerInfo.append(dpContainer, apContainer)
//     controller.appendChild(containerInfo)
//
//
//     // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
//     let styleList = {
//         "width": "95%",
//         "height": "200px",
//         "border": "2px black solid",
//         "margin": "20px auto"
//     }
//     containerEditable.applyStyle(styleList)
//     console.log(containerEditable.stylesheet)
//
//     bigFourContainer.appendChild(containerEditable)
// });
