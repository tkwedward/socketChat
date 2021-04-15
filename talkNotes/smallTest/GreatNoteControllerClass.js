"use strict";
exports.__esModule = true;
exports.GNTemplate = exports.GNImageController = exports.GNController = exports.GNControllerItem = void 0;
var GreatNoteDataClass_1 = require("./GreatNoteDataClass");
function GNControllerItem(controllerObject, eventType, controlledObject) {
    controllerObject.addEventListener(eventType, controllerObject.controllerEvent);
    controllerObject.controlledObject = controlledObject;
    return controllerObject;
}
exports.GNControllerItem = GNControllerItem;
function GNController(_name, _parent) {
    var _object = document.createElement("div");
    _object.classList.add(_name);
    // internal properties
    _object._name = _name;
    _object._type = GNController.name;
    _object._styleList = {
        "height": "150px",
        "background": "silver",
        "margin": "10px"
    };
    _object.appendElements = function () {
        var childrenList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childrenList[_i] = arguments[_i];
        }
        childrenList.forEach(function (p) {
            p._parent = _object;
            _object.appendChild(p);
        });
    };
    // functions
    _object.update = function (data) { data; };
    _object.extract = function () { return 123; };
    // events
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    // do something before return
    GreatNoteDataClass_1.applyStyleHelperFunction(_object, _object._styleList);
    return _object;
}
exports.GNController = GNController;
/** to create GNImageController*/
function GNImageController(_name, _parent) {
    var _object = GNController(_name);
    // internal properties
    _object._name = _name;
    _object._type = GNImageController.name;
    // functions
    _object.getControlledObject = function (target) {
        _object.controlledObject = target;
    };
    _object.update = function (data) { data; };
    _object.extract = function () { return 123; };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    /* part 2: controllers
        // a)  create width controller
        // b)  create height controller
        // c) create transparency controller
        // d) creatte rotation controller
    */
    // a)  create width controller
    var imgWidthInputController = GreatNoteDataClass_1.GNInputField("imgWidthController");
    imgWidthInputController.controllerEvent = function (e) {
        if (_object.controlledObject) {
            _object.controlledObject.style.width = imgWidthInputControllerItem.value + "px";
        }
        else {
            console.log("please select an item");
        }
    };
    var imgWidthInputControllerItem = GNControllerItem(imgWidthInputController, "input");
    // b)  create height controller
    // c) create transparency controller
    // d) creatte rotation controller
    // add item to the controller
    _object.appendElements(imgWidthInputControllerItem);
    return _object;
}
exports.GNImageController = GNImageController;
function GNTemplate(_name, _parent) {
    var _object = document.createElement("div");
    // internal properties
    _object._name = _name;
    _object._type = GNTemplate.name;
    // functions
    _object.update = function (data) { data; };
    _object.extract = function () { return 123; };
    _object.addEventListener("eventName", function (e) {
        // do something
    });
    return _object;
}
exports.GNTemplate = GNTemplate;
