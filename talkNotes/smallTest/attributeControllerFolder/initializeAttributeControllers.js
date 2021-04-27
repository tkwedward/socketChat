"use strict";
exports.__esModule = true;
exports.initializeMainControllerAttributeControllerMapping = void 0;
var highLevelController_1 = require("./highLevelController");
//** to initialize the main controller attribute controller mapping so that other objects can access tthe attribute controllers through the mainController
function initializeMainControllerAttributeControllerMapping(mainController) {
    var polylineController = highLevelController_1.createPolylineController();
    mainController.attributeControllerMapping = {
        polylineController: polylineController
    };
}
exports.initializeMainControllerAttributeControllerMapping = initializeMainControllerAttributeControllerMapping;
