"use strict";
exports.__esModule = true;
exports.createSvgCircleControllerContainer = exports.createDivControllerContainer = exports.createPolylineController = void 0;
var basicControllerType_1 = require("./basicControllerType");
var attributeControllerHelperFunction_1 = require("./attributeControllerHelperFunction");
function createPolylineController() {
    var polylineControllerContainer = document.createElement("div");
    polylineControllerContainer.classList.add("polylineController");
    polylineControllerContainer.targetHTMLType = "polyline";
    // color controller
    var colorTemplate = document.createElement("div");
    colorTemplate.style.display = "inline-block";
    colorTemplate.style["width"] = "50px";
    colorTemplate.style["height"] = "50px";
    colorTemplate.style["margin"] = "10px";
    var polylineStrokeColorController = basicControllerType_1.choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorTemplate);
    polylineStrokeColorController.classList.add("polylineColorController");
    var polylineStrokeWidthController = attributeControllerHelperFunction_1.universalControllerCreater("widthController", {
        attributeName: "width",
        unitOptions: ["px", "vw", "%"],
        controllerType: basicControllerType_1.inputFieldAndDropdownListController
    });
    polylineStrokeWidthController.classList.add("polylineStrokeWidthController");
    polylineStrokeWidthController.querySelector("input").value = "2";
    polylineControllerContainer.controllerArray = [polylineStrokeColorController, polylineStrokeWidthController];
    polylineControllerContainer.append.apply(polylineControllerContainer, polylineControllerContainer.controllerArray);
    polylineControllerContainer.extract = function () {
        var strokeColor = polylineStrokeColorController.extract();
        var strokeWidth = polylineStrokeWidthController.extract();
        return [strokeColor, strokeWidth];
    };
    attributeControllerHelperFunction_1.superController(polylineControllerContainer);
    return polylineControllerContainer;
}
exports.createPolylineController = createPolylineController;
function createDivControllerContainer() {
    var divControllerContainer = document.createElement("div");
    divControllerContainer.classList.add("divController");
    divControllerContainer.targetHTMLType = "DIV";
    // color controller
    var colorSquare = document.createElement("div");
    colorSquare.style.display = "inline-block";
    colorSquare.style["width"] = "50px";
    colorSquare.style["height"] = "50px";
    colorSquare.style["margin"] = "10px";
    var backgroundColorController = basicControllerType_1.choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare);
    // width Controller
    var widthController = attributeControllerHelperFunction_1.universalControllerCreater("widthController", {
        attributeName: "width",
        unitOptions: ["px", "vw", "%"],
        controllerType: basicControllerType_1.inputFieldAndDropdownListController
    });
    var heightController = attributeControllerHelperFunction_1.universalControllerCreater("widthController", {
        attributeName: "height",
        unitOptions: ["px", "vw", "%"],
        controllerType: basicControllerType_1.inputFieldAndDropdownListController
    });
    var positionController = attributeControllerHelperFunction_1.universalControllerCreater("positionController", {
        attributeName: "position",
        selectionList: ["none", "relative", "absolute"],
        controllerType: basicControllerType_1.dropdownListController
    });
    divControllerContainer.controllerArray = [widthController, heightController, positionController, backgroundColorController];
    divControllerContainer.append.apply(divControllerContainer, divControllerContainer.controllerArray);
    this.superController(divControllerContainer);
    return divControllerContainer;
}
exports.createDivControllerContainer = createDivControllerContainer;
function createSvgCircleControllerContainer() {
    var svgCircleContainer = document.createElement("div");
    svgCircleContainer.classList.add("svgCircleContainer");
    svgCircleContainer.targetHTMLType = "circle";
    var radiusController = basicControllerType_1.inputFieldAndDropdownListController("r", ["px", "vw", "%"]);
    var circleCenterXController = attributeControllerHelperFunction_1.universalControllerCreater("cxController", {
        attributeName: "cx",
        unitOptions: ["px", "vw", "%"],
        controllerType: basicControllerType_1.inputFieldAndDropdownListController
    });
    var circleCenterYController = attributeControllerHelperFunction_1.universalControllerCreater("cyController", {
        attributeName: "cy",
        unitOptions: ["px", "vw", "%"],
        controllerType: basicControllerType_1.inputFieldAndDropdownListController
    });
    var colorSquare = document.createElement("div");
    colorSquare.style.display = "inline-block";
    colorSquare.style["width"] = "50px";
    colorSquare.style["height"] = "50px";
    colorSquare.style["margin"] = "10px";
    var fillController = basicControllerType_1.choiceController("fill", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare);
    svgCircleContainer.controllerArray = [radiusController, circleCenterXController, circleCenterYController, fillController];
    svgCircleContainer.append.apply(svgCircleContainer, svgCircleContainer.controllerArray);
    this.superController(svgCircleContainer);
    return svgCircleContainer;
} // createSvgCircleControllerContainer
exports.createSvgCircleControllerContainer = createSvgCircleControllerContainer;
