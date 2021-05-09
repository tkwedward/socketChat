"use strict";
exports.__esModule = true;
exports.choiceController = exports.dropdownListController = exports.inputFieldAndDropdownListController = void 0;
// @auto-fold heres
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
    // to extract the input field and unit
    controllerContainer.extract = function () {
        return inputField.value + dropdownList.value;
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
} // dropdownListController
exports.dropdownListController = dropdownListController;
// @auto-fold here
function choiceController(attribute, choiceList, prototype) {
    var controllerContainer = document.createElement("div");
    controllerContainer.classList.add("choiceController");
    controllerContainer.classList.add(attribute + "Controller");
    choiceList.forEach(function (choiceValue) {
        var item = prototype.cloneNode(true);
        if (attribute == "fill") {
            item["style"]["background"] = choiceValue;
            item["style"]["opacity"] = "0.90";
        }
        else {
            // background, stroke can be the attribute in css
            item["style"][attribute] = choiceValue;
        }
        controllerContainer.appendChild(item);
        item.addEventListener("click", function (e) {
            var selectedColor = controllerContainer.querySelector("div .selectedColor");
            if (selectedColor)
                selectedColor.classList.remove("selectedColor");
            item.classList.add("selectedColor");
            // controllerContainer.updateObject(choiceValue)
        });
    });
    //
    controllerContainer.extract = function () {
        return controllerContainer.querySelector(".selectedColor")["style"]["background"];
    };
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
} // choiceController
exports.choiceController = choiceController;
