"use strict";
exports.__esModule = true;
exports.choiceController = exports.dropdownListController = exports.inputFieldAndDropdownListController = exports.AttributeControllerClass = exports.controllerCreater = void 0;
//
var widthController;
var heightController;
var backgroundColorController;
var radiusController;
var circleCenterXController;
var circleCenterYController;
var fillController;
var allController = {
    divController: [widthController, heightController, backgroundColorController],
    svgCircleController: [radiusController, circleCenterXController, circleCenterYController, fillController]
};
function controllerCreater(name, controllerOptions) {
    var controllerContainer = document.createElement("div");
    controllerContainer.classList.add(name);
    controllerContainer.style.width = "90%";
    controllerContainer.style.minHeight = "200px";
    controllerContainer.style.border = "2px black solid";
    controllerContainer.style.margin = "20px auto";
    var controllerType = controllerOptions["controllerType"];
    var attributeName = controllerOptions["attributeName"];
    var unitOptions = controllerOptions["unitOptions"];
    var selectionList = controllerOptions["selectionList"];
    if (unitOptions)
        return controllerType(attributeName, unitOptions);
    if (selectionList)
        return controllerType(attributeName, selectionList);
}
exports.controllerCreater = controllerCreater;
var AttributeControllerClass = /** @class */ (function () {
    // @auto-fold here
    function AttributeControllerClass() {
        this.GNObjectControllerArray = [];
    }
    AttributeControllerClass.prototype.createDivControllerContainer = function () {
        var divControllerContainer = document.createElement("div");
        divControllerContainer.classList.add("divController");
        divControllerContainer.targetHTMLType = "DIV";
        // color controller
        var colorSquare = document.createElement("div");
        colorSquare.style.display = "inline-block";
        colorSquare.style["width"] = "50px";
        colorSquare.style["height"] = "50px";
        colorSquare.style["margin"] = "10px";
        var backgroundColorController = choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare);
        // width Controller
        var widthController = controllerCreater("widthController", {
            attributeName: "width",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        });
        var heightController = controllerCreater("widthController", {
            attributeName: "height",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        });
        var positionController = controllerCreater("positionController", {
            attributeName: "position",
            selectionList: ["none", "relative", "absolute"],
            controllerType: dropdownListController
        });
        divControllerContainer.controllerArray = [widthController, heightController, positionController, backgroundColorController];
        divControllerContainer.append.apply(divControllerContainer, divControllerContainer.controllerArray);
        this.superController(divControllerContainer);
        this.GNObjectControllerArray.push(divControllerContainer);
        return divControllerContainer;
    };
    AttributeControllerClass.prototype.createSvgCircleControllerContainer = function () {
        var svgCircleContainer = document.createElement("div");
        svgCircleContainer.classList.add("svgCircleContainer");
        svgCircleContainer.targetHTMLType = "circle";
        var radiusController = inputFieldAndDropdownListController("r", ["px", "vw", "%"]);
        var circleCenterXController = controllerCreater("cxController", {
            attributeName: "cx",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        });
        var circleCenterYController = controllerCreater("cyController", {
            attributeName: "cy",
            unitOptions: ["px", "vw", "%"],
            controllerType: inputFieldAndDropdownListController
        });
        var colorSquare = document.createElement("div");
        colorSquare.style.display = "inline-block";
        colorSquare.style["width"] = "50px";
        colorSquare.style["height"] = "50px";
        colorSquare.style["margin"] = "10px";
        var fillController = choiceController("fill", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare);
        svgCircleContainer.controllerArray = [radiusController, circleCenterXController, circleCenterYController, fillController];
        svgCircleContainer.append.apply(svgCircleContainer, svgCircleContainer.controllerArray);
        this.superController(svgCircleContainer);
        this.GNObjectControllerArray.push(svgCircleContainer);
        return svgCircleContainer;
    };
    AttributeControllerClass.prototype.superController = function (controllerContainer) {
        var self = this;
        controllerContainer.style.display = "none";
        controllerContainer.responseToHtmlType = function (htmlObject) {
            console.log(htmlObject.tagName, controllerContainer.targetHTMLType);
            if (htmlObject.tagName != controllerContainer.targetHTMLType) {
                console.log("none");
                controllerContainer.style.display = "none";
            }
            else {
                console.log("visible");
                controllerContainer.style.display = "block";
            }
        };
        controllerContainer.attachTo = function (htmlObject) {
            self.initializeContainerAndControllerEvent(htmlObject, controllerContainer.controllerArray);
        };
    };
    AttributeControllerClass.prototype.initializeContainerAndControllerEvent = function (htmlObject, controllerArray) {
        var _this = this;
        htmlObject.addEventListener("click", function (e) {
            _this.GNObjectControllerArray.forEach(function (p) { return p.responseToHtmlType(htmlObject); });
            console.log(177, _this.GNObjectControllerArray);
            e.stopPropagation();
            controllerArray.forEach(function (p) {
                p.clear();
                p.setControllerTarget(htmlObject);
            });
        }, false);
    };
    return AttributeControllerClass;
}());
exports.AttributeControllerClass = AttributeControllerClass;
// @auto-fold here
function inputFieldAndDropdownListController(attributeName, unitOptions) {
    var controllerContainer = document.createElement("div");
    controllerContainer.style.display = "grid";
    controllerContainer.style.gridTemplateColumns = "1fr 3fr 1fr";
    controllerContainer.classList.add(attributeName + "Controller");
    var title = document.createElement("span");
    title.innerText = attributeName;
    title.style.textAlign = "center";
    var inputField = document.createElement("input");
    var dropdownList = document.createElement("select");
    unitOptions.forEach(function (unit) {
        var option = document.createElement("option");
        option.value = unit;
        option.innerText = unit;
        dropdownList.appendChild(option);
    });
    dropdownList.addEventListener("change", function (e) { return controllerContainer.updateObject(); });
    inputField.addEventListener("input", function (e) { return controllerContainer.updateObject(); });
    // to update the value according to the controller values
    // @auto-fold her
    controllerContainer.updateObject = function () {
        if (controllerContainer.controllerTarget) {
            controllerContainer.controllerTarget.style[attributeName] = inputField.value + dropdownList.value;
        }
    };
    // functions
    controllerContainer.setControllerTarget = function (object) {
        controllerContainer.controllerTarget = object;
    };
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function () {
        controllerContainer.setControllerTarget(null);
    };
    controllerContainer.append(title, inputField, dropdownList);
    return controllerContainer;
} // inputFieldAndDropdownListController
exports.inputFieldAndDropdownListController = inputFieldAndDropdownListController;
// @auto-fold here
function dropdownListController(attributeName, selectionList) {
    var controllerContainer = document.createElement("div");
    var title = attributeName;
    var dropdownList = document.createElement("select");
    selectionList.forEach(function (unit) {
        var option = document.createElement("option");
        option.value = unit;
        option.innerText = unit;
        dropdownList.appendChild(option);
    });
    dropdownList.addEventListener("change", function (e) { return controllerContainer.updateObject(); });
    controllerContainer.updateObject = function () {
        if (controllerContainer.controllerTarget) {
            controllerContainer.controllerTarget.style[attributeName] = dropdownList.value;
        }
    };
    // functions
    controllerContainer.setControllerTarget = function (object) {
        controllerContainer.controllerTarget = object;
    };
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function () {
        controllerContainer.setControllerTarget(null);
    };
    controllerContainer.append(title, dropdownList);
    return controllerContainer;
}
exports.dropdownListController = dropdownListController;
// @auto-fold here
function choiceController(attribute, choiceList, prototype) {
    var controllerContainer = document.createElement("div");
    controllerContainer.style.display = "flex";
    controllerContainer.style["align-items"] = "center";
    controllerContainer.style["justify-content"] = "left";
    controllerContainer.style["flex-wrap"] = "wrap";
    controllerContainer.style.width = "300px";
    controllerContainer.style.minHeight = "150px";
    controllerContainer.classList.add(attribute + "Controller");
    choiceList.forEach(function (choiceValue) {
        var item = prototype.cloneNode(true);
        if (attribute == "fill") {
            item["style"]["background"] = choiceValue;
        }
        else {
            item["style"][attribute] = choiceValue;
        }
        controllerContainer.appendChild(item);
        item.addEventListener("click", function (e) {
            controllerContainer.updateObject(choiceValue);
        });
    });
    /** to update the value according to the controller values */
    controllerContainer.updateObject = function (itemValue) {
        if (controllerContainer.controllerTarget) {
            controllerContainer.controllerTarget.style[attribute] = itemValue;
        }
    };
    // functions
    controllerContainer.setControllerTarget = function (object) {
        controllerContainer.controllerTarget = object;
    };
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function () {
        controllerContainer.setControllerTarget(null);
    };
    return controllerContainer;
}
exports.choiceController = choiceController;
