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
// export var mainController:DatabaseCode.MainControllerInterface
// mainController = new DatabaseCode.MainController()
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
// to create a controller
document.body.style.display = "grid";
document.body.style.gridTemplateColumns = "1fr 3fr";
var bookmarkArrayId = constructInitialCondition_1.mainController.mainDocArray["bookmark"];
var controller = GreatNoteDataClass.GNContainerDiv("controller", bookmarkArrayId);
var controllerStyleList = {
    "width": "95%",
    "height": "100vh",
    "border": "2px black solid",
    "margin": "20px auto"
};
controller.innerHTML = "king";
controller.applyStyle(controllerStyleList);
document.body.appendChild(controller);
var linkArrayInfo = document.createElement("div");
linkArrayInfo.classList.add("linkArrayInfo");
controller.appendChild(linkArrayInfo);
var firstContainer;
var bigFourContainer = GreatNoteDataClass.GNContainerDiv("bigFourContainer", bookmarkArrayId);
console.log(63, bigFourContainer.getAccessPointer);
document.body.appendChild(bigFourContainer);
Object.entries(constructInitialCondition_1.mainController.mainDocArray).forEach(function (_a, index) {
    var arrayName = _a[0], accessPointer = _a[1];
    // let container =
    console.log(74, firstContainer === null || firstContainer === void 0 ? void 0 : firstContainer.getDataPointer());
    // if ()
    var containerEditable = GreatNoteDataClass.GNEditableDiv("editable", bigFourContainer.getAccessPointer(), false, firstContainer === null || firstContainer === void 0 ? void 0 : firstContainer.getDataPointer());
    if (index == 0) {
        firstContainer = containerEditable;
    }
    var containerInfo = document.createElement("div");
    containerInfo.innerHTML += "=========================<br>";
    containerInfo.innerHTML += "DP:" + containerEditable.getDataPointer() + "<br>";
    containerInfo.innerHTML += "AP:" + containerEditable.getAccessPointer() + "<br>";
    controller.appendChild(containerInfo);
    // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
    var styleList = {
        "width": "95%",
        "height": "200px",
        "border": "2px black solid",
        "margin": "20px auto"
    };
    containerEditable.applyStyle(styleList);
    bigFourContainer.appendChild(containerEditable);
});
