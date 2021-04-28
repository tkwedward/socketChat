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
exports.ToolBoxClass = void 0;
var GreatNoteSvgDataClass = __importStar(require("./GreatNoteSVGDataClass"));
var constructInitialCondition_1 = require("./constructInitialCondition");
var ToolboxEventFunction_1 = require("./ToolboxFolder/ToolboxEventFunction");
var ToolBoxClass = /** @class */ (function () {
    function ToolBoxClass() {
    }
    ToolBoxClass.prototype.createToolboxHtmlObject = function () {
        var self = this;
        var toolBoxContainer = document.createElement("div");
        toolBoxContainer.classList.add("toolBoxHtml");
        toolBoxContainer.style.height = "80px";
        toolBoxContainer.style.background = "silver";
        // toolBoxContainer.style.width = "90vw"
        toolBoxContainer.style.width = "90%";
        toolBoxContainer.style.margin = "0 auto";
        toolBoxContainer.style.display = "grid";
        toolBoxContainer.style.gridTemplateColumns = "4fr 3fr";
        // toolBoxHtmlObject.style.width = "90%"
        toolBoxContainer.itemArray = [];
        var toolBoxSelectionHtmlObject = document.createElement("div");
        var toolBoxOptionHtmlObject = document.createElement("div");
        toolBoxOptionHtmlObject.classList.add("toolBoxOption");
        toolBoxOptionHtmlObject.style.height = "80px";
        toolBoxOptionHtmlObject.style.background = "lightBlue";
        toolBoxContainer.selectionHTMLObject = toolBoxSelectionHtmlObject;
        toolBoxContainer.optionHTMLObject = toolBoxOptionHtmlObject;
        toolBoxContainer.appendChild(toolBoxSelectionHtmlObject);
        // toolBoxContainer.appendChild(toolBoxOptionHtmlObject)
        return toolBoxContainer;
    };
    ToolBoxClass.prototype.createToolBoxItem = function (name, toolBoxContainer) {
        var toolBoxItem = document.createElement("div");
        // the html style part
        toolBoxItem.style.display = "inline-block";
        toolBoxItem.classList.add("toolBoxItem");
        toolBoxItem.innerText = name[0];
        toolBoxItem.style.background = "gold";
        // toolBoxItem.style.display = "flex"
        toolBoxItem.style.margin = "10px 5px";
        toolBoxItem.style["align-items"] = "center";
        toolBoxItem.style["justify-content"] = "center";
        var squreLength = "40px";
        toolBoxItem.style.width = squreLength;
        toolBoxItem.style.height = squreLength;
        // internaal variable part
        toolBoxItem.status = false;
        toolBoxItem.resetButton = function () {
            toolBoxItem.status = false;
        };
        toolBoxItem._parent = toolBoxContainer.selectionHTMLObject;
        toolBoxContainer.itemArray.push(toolBoxItem);
        toolBoxContainer.selectionHTMLObject.appendChild(toolBoxItem);
        toolBoxItem.addEventListener(toolBoxItem.eventName, toolBoxItem.eventFunction);
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createNewPolyLineItemButton = function (toolBoxHtmlObject) {
        var _this = this;
        var self = this;
        var toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject);
        toolBoxItem.eventName = "touchstart";
        // toolBoxItem.eventName = "mousedown"
        // take place when mouse down
        console.log("use new tool box function");
        toolBoxItem.eventFunction = function (e) {
            console.log(121, constructInitialCondition_1.mainController.attributeControllerMapping.polylineController);
            ToolboxEventFunction_1.polylineMouseDownFunction(e, _this.targetPage, constructInitialCondition_1.mainController.attributeControllerMapping.polylineController, "touchmove", "touchend");
            // polylineMouseDownFunction(e, this.targetPage, mainController.attributeControllerMapping.polylineController, "mousemove", "mouseup")
        };
        toolBoxItem.addEventListener("click", function () {
            console.log("polyline item button is activated");
            self.activateButtonFunction(toolBoxItem);
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.createEraserItemButton = function (toolBoxHtmlObject) {
        var _this = this;
        var self = this;
        var toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject);
        toolBoxItem.eventName = "mousedown";
        toolBoxItem.eventFunction = function () {
            var cx = event["offsetX"] + "px";
            var cy = event["offsetY"] + "px";
            var r = "10px";
            var eraser = GreatNoteSvgDataClass.GNSvgCircle({ name: "123", arrayID: constructInitialCondition_1.mainController.mainDocArray["bookmark"], insertPosition: false, dataPointer: false, saveToDatabase: false });
            eraser.style["cx"] = cx;
            eraser.style["cy"] = cy;
            eraser.style["r"] = r;
            function updateEraserPosition(e) {
                cx = event["offsetX"] + "px";
                cy = event["offsetY"] + "px";
                eraser.style["cx"] = cx;
                eraser.style["cy"] = cy;
            }
            _this.targetPage.addEventListener("mousemove", updateEraserPosition);
            _this.targetPage.addEventListener("mouseup", function (e) {
                _this.targetPage.removeEventListener("mousemove", updateEraserPosition);
                eraser.remove();
            });
            _this.targetPage.addEventListener("mouseout", function (e) {
                // this.targetPage.removeEventListener("mousemove", updateEraserPosition)
                console.log("You are out of the boundary");
            });
            // self.targetPage.svgController
            self.targetPage.appendChild(eraser);
            // eraser.appendTo(self.targetPage)
            // this.targetPage.appendChild(eraser.node)
        };
        toolBoxItem.addEventListener("click", function () {
            console.log("eraser button is activated");
            self.activateButtonFunction(toolBoxItem);
        });
        return toolBoxItem;
    };
    ToolBoxClass.prototype.activateButtonFunction = function (toolBoxItem) {
        if (this.currentActiveButton) {
            console.log("clear the toolbox button status");
            this.currentActiveButton.style.background = "gold";
            this.targetPage.removeEventListener(this.currentActiveEventName, this.currentActiveEventFunction);
        }
        toolBoxItem.style.background = "red";
        this.currentActiveButton = toolBoxItem;
        this.currentActiveEventName = toolBoxItem.eventName;
        this.currentActiveEventFunction = toolBoxItem.eventFunction;
        // this.activateToolboxItem(toolBoxItem)
        console.log(this.targetPage, this.currentActiveEventName, this.currentActiveEventFunction);
        this.targetPage.addEventListener(this.currentActiveEventName, this.currentActiveEventFunction);
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
