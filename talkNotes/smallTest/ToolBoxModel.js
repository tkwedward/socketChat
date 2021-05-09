"use strict";
exports.__esModule = true;
exports.getAttributeController = exports.ToolBoxClass = void 0;
var ToolBoxClass = /** @class */ (function () {
    function ToolBoxClass() {
        //  check the item status
        this.toolBoxItemStatus = {
            currentActiveButton: "",
            polylineItemButton: {
                status: false,
                attributeController: "polylineController"
            },
            eraserItemButton: {
                status: false,
                attributeController: "eraserController"
            },
            selectionToolItemButton: {
                status: false,
                attributeController: "selectionTool"
            },
            addCommentItemButton: {
                status: false,
                attributeController: "addCommentController"
            },
            moveObjectInDivButton: {
                status: false,
                attributeController: "moveObjectInDivController"
            }
        };
    }
    ToolBoxClass.prototype.checkToolBoxItemStatus = function (itemName) {
        return this.toolBoxItemStatus[itemName]["status"];
    };
    ToolBoxClass.prototype.switchToolBoxItemStatus = function (itemName) {
        // turn off the attributeController and status of the buttom thaat is active
        var currentActiveButton = this.toolBoxItemStatus.currentActiveButton;
        if (currentActiveButton) {
            this.toolBoxItemStatus[currentActiveButton]["status"] = !this.toolBoxItemStatus[currentActiveButton]["status"];
            // turn off attributeControllerWant
            var attributeControllerWantToTurnedOff = getAttributeController(this.toolBoxItemStatus, currentActiveButton);
            if (attributeControllerWantToTurnedOff)
                attributeControllerWantToTurnedOff["style"].display = "none";
            console.log(858585858, attributeControllerWantToTurnedOff);
        }
        this.toolBoxItemStatus.currentActiveButton = itemName;
        this.toolBoxItemStatus[itemName]["status"] = !this.toolBoxItemStatus[itemName]["status"];
        // turn on attributeControllerWantToturn on
        var attributeControllerWantToTurnedOn = getAttributeController(this.toolBoxItemStatus, itemName);
        if (attributeControllerWantToTurnedOn)
            attributeControllerWantToTurnedOn["style"].display = "block";
        console.log(858585858, attributeControllerWantToTurnedOn);
    };
    ToolBoxClass.prototype.createToolboxHtmlObject = function () {
        var self = this;
        var toolBoxContainer = document.createElement("div");
        toolBoxContainer.classList.add("toolBoxHtml");
        this.itemArray = [];
        var toolBoxSelectionHtmlObject = document.createElement("div");
        toolBoxSelectionHtmlObject.classList.add("toolBoxSelectionHtmlObject");
        var toolBoxOptionHtmlObject = document.createElement("div");
        toolBoxOptionHtmlObject.classList.add("toolBoxOption");
        toolBoxContainer.selectionHTMLObject = toolBoxSelectionHtmlObject;
        toolBoxContainer.optionHTMLObject = toolBoxOptionHtmlObject;
        toolBoxContainer.appendChild(toolBoxSelectionHtmlObject);
        return toolBoxContainer;
    };
    ToolBoxClass.prototype.createToolBoxItem = function (name, toolBoxContainer) {
        var toolBoxItem = document.createElement("div");
        // the html style part
        toolBoxItem.classList.add("toolBoxItem", name);
        toolBoxItem.innerText = name[0];
        var squreLength = "40px";
        toolBoxItem.style.width = squreLength;
        toolBoxItem.style.height = squreLength;
        // internaal variable part
        toolBoxItem.status = false;
        toolBoxItem.resetButton = function () {
            toolBoxItem.status = false;
        };
        toolBoxItem._parent = toolBoxContainer.selectionHTMLObject;
        this.itemArray.push(toolBoxItem);
        toolBoxItem.addEventListener(toolBoxItem.eventName, toolBoxItem.eventFunction);
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createNewPolyLineItemButton = function (toolBoxHtmlObject) {
        var _this = this;
        var toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", function (e) {
            console.log("polyline item button is activated");
            _this.activateButtonFunction(toolBoxItem, "polylineItemButton");
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createSelectionToolItemButton = function (toolBoxHtmlObject) {
        var _this = this;
        var toolBoxItem = this.createToolBoxItem("SelectionTool", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", function (e) {
            console.log("Selection Tool item button is activated");
            _this.activateButtonFunction(toolBoxItem, "selectionToolItemButton");
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createEraserItemButton = function (toolBoxHtmlObject) {
        var _this = this;
        // let self = this
        var toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", function (e) {
            _this.activateButtonFunction(toolBoxItem, "eraserItemButton");
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createAddCommentButton = function (toolBoxHtmlObject) {
        var _this = this;
        var toolBoxItem = this.createToolBoxItem("AddComment", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", function (e) {
            _this.activateButtonFunction(toolBoxItem, "addCommentItemButton");
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createMoveObjectInDivButton = function (toolBoxHtmlObject) {
        var _this = this;
        var toolBoxItem = this.createToolBoxItem("MoveObjectInDiv", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", function (e) {
            _this.activateButtonFunction(toolBoxItem, "moveObjectInDivButton");
            console.log(_this.toolBoxItemStatus);
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.activateButtonFunction = function (toolBoxItem, itemName) {
        this.itemArray.forEach(function (p) {
            p.style.background = "gold";
        });
        this.switchToolBoxItemStatus(itemName);
        toolBoxItem.style.background = "red";
        this.currentActiveButton = toolBoxItem;
    };
    ToolBoxClass.prototype.registerSvg = function (svgLayer) {
        var self = this;
        console.log(226, "registerSvg, yoyoyo");
        svgLayer.addEventListener("click", function () {
            console.log("The svg is register to the toolbox");
            console.log("======================");
            self.targetPage = svgLayer;
        });
    };
    return ToolBoxClass;
}());
exports.ToolBoxClass = ToolBoxClass;
function getAttributeController(toolBoxItemStatus, itemName) {
    var attributeControllerClassName = toolBoxItemStatus[itemName]["attributeController"];
    return document.querySelector("." + attributeControllerClassName);
}
exports.getAttributeController = getAttributeController;
