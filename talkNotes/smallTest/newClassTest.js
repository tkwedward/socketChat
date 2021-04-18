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
var GreatNoteSvgDataClass = __importStar(require("./GreatNoteSvgDataClass"));
var socketFunction_1 = require("./socketFunction");
var ControllerModel = __importStar(require("./dbtest"));
var ToolBoxModel = __importStar(require("./GNSvgObjectDataStructure"));
var divTest = false;
var inputFieldTest = false;
var buttonTest = false;
var svgElementTest = false;
var toolBoxTest = true;
var bigFourContainer;
var contentContainer;
var attributeController;
var metaDataController;
var widthController;
var fillController;
//@auto-fold here
constructInitialCondition_1.mainController.GNDataStructureMapping = {
    GNInputField: GreatNoteDataClass.GNInputField,
    GNContainerDiv: GreatNoteDataClass.GNContainerDiv,
    GNEditableDiv: GreatNoteDataClass.GNEditableDiv,
    GNImage: GreatNoteDataClass.GNImage,
    GNDivPage: GreatNoteDataClass.GNDivPage
};
document.body.style.display = "grid";
document.body.style.gridTemplateColumns = "1fr 3fr";
var bookmarkArrayId = constructInitialCondition_1.mainController.mainDocArray["bookmark"];
//@auto-fold here
var controllerStyleList = {
    "width": "95%",
    "height": "100vh",
    "border": "2px black solid",
    "margin": "20px auto"
};
//
var controller = document.createElement("div");
controller.classList.add("controller");
controller.innerHTML = "king";
controller.style.width = "95%";
controller.style.height = "100vh";
controller.style.margin = "20px auto";
document.body.appendChild(controller);
//@auto-fold here
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
    controller.appendChild(containerInfo);
}
//@auto-fold here
if (!constructInitialCondition_1.mainController.applyMainDocTemplate) {
    var linkArrayInfo = document.createElement("div");
    linkArrayInfo.classList.add("linkArrayInfo");
    controller.appendChild(linkArrayInfo);
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
    controller.appendChild(saveButton);
    controller.appendChild(loadButton);
    //
    contentContainer = document.createElement("div");
    contentContainer.classList.add("contentContainer");
    contentContainer.style.background = "silver";
    // contentContainer.addEventListener("click", (e)=>{
    //     console.log(e)
    // })
    contentContainer.addEventListener("mousedown", function (e) {
        console.log(e);
    });
    document.body.appendChild(contentContainer);
    attributeController = document.createElement("div");
    attributeController.classList.add("attributeController");
    attributeController.style.width = "90%";
    attributeController.style.minHeight = "200px";
    attributeController.style.border = "2px black solid";
    attributeController.style.margin = "20px auto";
    var attributeControllerBar = document.createElement("div");
    attributeControllerBar.style.height = "35px";
    attributeControllerBar.style.marginBottom = "10px";
    attributeControllerBar.style.background = "yellow";
    attributeController.append(attributeControllerBar);
    metaDataController = document.createElement("div");
    metaDataController.classList.add("metaDataController");
    metaDataController.style.width = "90%";
    metaDataController.style.minHeight = "200px";
    metaDataController.style.border = "2px black solid";
    metaDataController.style.margin = "20px auto";
    var metaDataControllerBar = document.createElement("div");
    metaDataControllerBar.style.height = "35px";
    metaDataControllerBar.style.marginBottom = "10px";
    metaDataControllerBar.style.background = "yellow";
    metaDataController.appendChild(metaDataControllerBar);
    controller.append(attributeController, metaDataController);
    bigFourContainer = GreatNoteDataClass.GNContainerDiv("bigFourContainer", bookmarkArrayId);
    bigFourContainer.appendTo(contentContainer);
}
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && toolBoxTest) {
    attributeController;
}
var attributeControllerObject = new ControllerModel.AttributeControllerClass();
var mouseClickTest = true;
//@auto-fold here
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && mouseClickTest) {
    // choice controller
    var divControllerContainer = attributeControllerObject.createDivControllerContainer();
    var svgCircleContainer = attributeControllerObject.createSvgCircleControllerContainer();
    // append controller
    attributeController.append(divControllerContainer, svgCircleContainer);
    // ================ div ================//
    var div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.background = "blue";
    contentContainer.append(div);
    divControllerContainer.attachTo(div);
    // ============== svg ============== //
    var svg = GreatNoteSvgDataClass.GNSvg("svg", "", false, false, false);
    svg.appendToContainer(contentContainer);
    // ============== svgCircle ============ //
    var svgCircle = GreatNoteSvgDataClass.GNSvgCircle("", "", false, false, false);
    svgCircle.appendTo(svg);
    svgCircleContainer.attachTo(svgCircle.node);
    console.log(svgCircleContainer.targetHTMLType);
}
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && toolBoxTest) {
    var toolBoxModel = new ToolBoxModel.ToolBoxClass();
    var toolBoxHtmlObject = toolBoxModel.createToolboxHtmlObject();
    attributeController.parentNode.insertBefore(toolBoxHtmlObject, attributeController);
    toolBoxHtmlObject.createToolBoxItem("Apple");
    toolBoxHtmlObject.createToolBoxItem("Boy");
    toolBoxHtmlObject.createToolBoxItem("Rashida");
}
// =============================  svgElementTest
////@auto-fold here
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && svgElementTest) {
    var svgObject = GreatNoteSvgDataClass.GNSvg("bigFourContainer", bookmarkArrayId);
    // let svgObject2 = GreatNoteSvgDataClass.GNSvg("bigFourContainer", bookmarkArrayId)
    svgObject.appendToContainer(contentContainer);
    var svgCircleElement = GreatNoteSvgDataClass.GNSvgCircle("bigFourContainer", bookmarkArrayId);
    svgCircleElement.applyStyle({ "r": 5, "cx": 200, "cy": 200 });
    svgCircleElement.appendTo(svgObject);
    var svgRectElement = GreatNoteSvgDataClass.GNSvgRect("bigFourContainer", bookmarkArrayId);
    svgRectElement.applyStyle({ "x": 500, "y": 100, "width": 100, "height": 400, "fill": "silver" });
    svgRectElement.appendTo(svgObject);
    // let svgLineElement = GreatNoteSvgDataClass.GNSvgLine("bigFourContainer", bookmarkArrayId)
    // svgLineElement.applyStyle(
    //   {"points": [20, 20, 100, 400],
    //   "attribute":{"stroke": "blue", "width":1 }})
    // svgLineElement.appendTo(svgObject)
    var svgPolyLineElement = GreatNoteSvgDataClass.GNSvgPolyLine("bigFourContainer", bookmarkArrayId);
    svgPolyLineElement.applyStyle({ "points": [10, 10, 50, 100, 40, 60, 90, 100],
        "attribute": { "stroke": "blue", "width": 1, "fill": "none" } });
    console.log(svgPolyLineElement);
    svgPolyLineElement.appendTo(svgObject);
    var svgImageElement = GreatNoteSvgDataClass.GNSvgImage("bigFourContainer", bookmarkArrayId);
    svgImageElement.setImgSrc("https://multi-canvas-art.com/wp-content/uploads/2019/12/Raichu-Pikachu-and-Pichu-1.jpg");
    console.log(131, svgImageElement);
    svgImageElement.appendTo(svgObject);
    svgImageElement.width("300px");
    svgImageElement.height("200px");
    // svgObject.createSVGObject()
    // contentContainer.append(svgObject)
    //
    // let circle = GreatNoteSvgDataClass.GNSvgCircle("circle", bookmarkArrayId)
    // circle.appendTo(svgObject)
}
// =============================  inputFieldTest
////@auto-fold here
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && inputFieldTest) {
    var inpuField1_1 = GreatNoteDataClass.GNInputField("inputField1", bigFourContainer.getAccessPointer());
    inpuField1_1.appendTo(bigFourContainer);
    addAccessPointerAndDataPointerDiv(inpuField1_1);
    function createInputField() {
        var inpuField2 = GreatNoteDataClass.GNInputField("inputField1", bigFourContainer.getAccessPointer(), false, inpuField1_1.getDataPointer());
        inpuField2.appendTo(bigFourContainer);
        addAccessPointerAndDataPointerDiv(inpuField2);
    }
    var number = 20;
    for (var i = 0; i < number; i++) {
        createInputField();
    }
}
// =============================  button Test
////@auto-fold here
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && buttonTest) {
    console.log(1289);
    var clickEvent_1 = function (_object) {
        var triggerEvent = new Event("changeStatusEvent");
        var currentIndex = _object.statusList.indexOf(_object.innerText);
        var nextIndex = (currentIndex + 1) % _object.statusList.length;
        _object.innerText = _object.statusList[nextIndex];
        console.log(98, _object, _object.statusList, currentIndex);
        _object.dispatchEvent(triggerEvent);
    };
    var selectObject_1 = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer.getAccessPointer());
    selectObject_1.addClickEvent(clickEvent_1);
    selectObject_1.appendTo(bigFourContainer);
    addAccessPointerAndDataPointerDiv(selectObject_1);
    function createHTMLObject() {
        var _object = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer.getAccessPointer(), false, selectObject_1.getDataPointer());
        _object.addClickEvent(clickEvent_1);
        _object.appendTo(bigFourContainer);
        addAccessPointerAndDataPointerDiv(_object);
    }
    var number = 20;
    for (var i = 0; i < number; i++) {
        createHTMLObject();
    }
}
////@auto-fold here
if (!constructInitialCondition_1.mainController.applyMainDocTemplate && divTest) {
    var firstContainer_1;
    Object.entries(constructInitialCondition_1.mainController.mainDocArray).forEach(function (_a, index) {
        var arrayName = _a[0], accessPointer = _a[1];
        // let container =
        // if ()
        var containerEditable = GreatNoteDataClass.GNEditableDiv("editable", bigFourContainer.getAccessPointer(), false, firstContainer_1 === null || firstContainer_1 === void 0 ? void 0 : firstContainer_1.getDataPointer());
        if (index == 0) {
            firstContainer_1 = containerEditable;
        }
        var containerInfo = document.createElement("div");
        containerInfo.innerHTML += "=========================<br>";
        var dpContainer = document.createElement("div");
        dpContainer.innerHTML += "DP:" + containerEditable.getDataPointer() + "<br>";
        dpContainer.addEventListener("click", function () {
            console.log(constructInitialCondition_1.mainController.getObjectById(containerEditable.getDataPointer()));
        });
        var apContainer = document.createElement("div");
        apContainer.innerHTML += "AP:" + containerEditable.getAccessPointer() + "<br>";
        apContainer.addEventListener("click", function () {
            console.log(constructInitialCondition_1.mainController.getObjectById(containerEditable.getAccessPointer()), containerEditable, containerEditable.stylesheet);
        });
        containerInfo.append(dpContainer, apContainer);
        controller.appendChild(containerInfo);
        // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
        var styleList = {
            "width": "95%",
            "height": "200px",
            "border": "2px black solid",
            "margin": "20px auto"
        };
        containerEditable.applyStyle(styleList);
        console.log(containerEditable.stylesheet);
        bigFourContainer.appendChild(containerEditable);
    });
}
