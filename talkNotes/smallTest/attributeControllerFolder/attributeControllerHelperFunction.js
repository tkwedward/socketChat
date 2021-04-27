"use strict";
exports.__esModule = true;
exports.universalControllerCreater = exports.superController = exports.initializeContainerAndControllerEvent = void 0;
var basicControllerType_1 = require("./basicControllerType");
// when the input htmlObject is click, then it will loop all the attribute controllers in the controller array. Check if the controller's type is consistent with the input htmlobject's tagname. If they are consistent, then the controllers will be shown, otherwise, they will be hide.
// clear the controllers target and then set their newtarget to be the new htmlObject
function initializeContainerAndControllerEvent(htmlObject, controllerArray) {
    var _this = this;
    htmlObject.addEventListener("click", function (e) {
        _this.GNObjectControllerArray.forEach(function (p) { return p.responseToHtmlType(htmlObject); });
        console.log(177, _this.GNObjectControllerArray);
        // e.stopPropagation()
        controllerArray.forEach(function (p) {
            p.clear();
            p.setControllerTarget(htmlObject);
        });
    }, false);
} // initializeContainerAndControllerEvent
exports.initializeContainerAndControllerEvent = initializeContainerAndControllerEvent;
function superController(controllerContainer) {
    // to add some function and common properties to an controller object
    // controllerContainer.style.display = "none"
    //** if the controller's targetHTMLType is not equal to the input htmlObject's tagname, then will hide the controller, but if they are the same, then the
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
    //** ??? don't understand
    controllerContainer.attachTo = function (htmlObject) {
        initializeContainerAndControllerEvent(htmlObject, controllerContainer.controllerArray);
    };
} // superController
exports.superController = superController;
//** to create the type of controller according to the controller type
// e.g. for
function universalControllerCreater(name, controllerOptions) {
    var controllerContainer = document.createElement("div");
    controllerContainer.classList.add(name);
    controllerContainer.style.width = "90%";
    controllerContainer.style.minHeight = "200px";
    controllerContainer.style.border = "2px black solid";
    controllerContainer.style.margin = "20px auto";
    var attributeName = controllerOptions["attributeName"];
    var unitOptions = controllerOptions["unitOptions"];
    var selectionList = controllerOptions["selectionList"];
    if (unitOptions)
        return basicControllerType_1.inputFieldAndDropdownListController(attributeName, unitOptions);
    if (selectionList)
        return basicControllerType_1.dropdownListController(attributeName, selectionList);
}
exports.universalControllerCreater = universalControllerCreater;
