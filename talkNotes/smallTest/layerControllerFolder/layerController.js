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
exports.buildLayerContentFunction = exports.showCurrentPageButtonFunction = exports.createLayerController = exports.switchStatus = void 0;
var GreatNoteDataClass = __importStar(require("../GreatNoteClass/GreatNoteDataClass"));
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteClass/GreatNoteSvgDataClass"));
var layerRowTemplate = document.querySelector("#layerRowTemplate");
function switchStatus(item) {
    var currentStatus = item.getAttribute("status");
    var newStatus = currentStatus == "on" ? "off" : "on";
    item.setAttribute("status", newStatus);
    return newStatus;
}
exports.switchStatus = switchStatus;
// ** make the layer controller panel so that you can add new div / new svg layer
function createLayerController(mainController) {
    // layerController HTML part
    var layerControllerTemplate = document.querySelector("#layerControllerTemplate");
    var layerControllerHTMLObject = layerControllerTemplate["content"].cloneNode(true);
    var layerView = layerControllerHTMLObject.querySelector(".layerView");
    var addDivLayerButton = layerControllerHTMLObject.querySelector(".addDivLayerButton");
    addDivLayerButton.addEventListener("click", function (e) {
        layerControllerHTMLObject.addDivLayer(e);
    }, { detail: { "run": 12345 } });
    var addSvgLayerButton = layerControllerHTMLObject.querySelector(".addSvgLayerButton");
    addSvgLayerButton.addEventListener("click", function (e) {
        layerControllerHTMLObject.addSvgLayer(e);
    }); // addSvgLayerButton.addEventListener
    var showCurrentPageButton = layerControllerHTMLObject.querySelector(".showCurrentPageButton");
    showCurrentPageButton.addEventListener("click", function () {
        showCurrentPageButtonFunction(mainController, layerView);
    });
    //
    // layerControllerHTMLObject functions
    //
    layerControllerHTMLObject.renderCurrentPageLayer = function () {
        showCurrentPageButtonFunction(mainController, layerView);
    };
    layerControllerHTMLObject.addDivLayer = function (e) {
        var currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        var divLayer = GreatNoteDataClass.GNContainerDiv({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true, specialCreationMessage: "divLayer" });
        divLayer.applyStyle({ width: "100%", height: "100%", background: "lightblue", "position": "absolute", "left": "0px", "top": "0px" });
        mainController.saveHTMLObjectToDatabase(divLayer);
        divLayer.classList.add("divLayer");
        divLayer.appendTo(currentPage);
        layerControllerHTMLObject.renderCurrentPageLayer();
    };
    layerControllerHTMLObject.addSvgLayer = function (e) {
        var currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        var svgLayer = GreatNoteSvgDataClass.GNSvg({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true });
        mainController.toolBox.registerSvg(svgLayer);
        svgLayer.applyStyle({ width: "100%", height: "100%", background: "gold", position: "absolute", left: "0px", top: "0px" });
        mainController.saveHTMLObjectToDatabase(svgLayer);
        svgLayer.classList.add("svgLayer");
        svgLayer.appendTo(currentPage);
        layerControllerHTMLObject.renderCurrentPageLayer();
    };
    mainController.layerController = layerControllerHTMLObject;
    return layerControllerHTMLObject;
}
exports.createLayerController = createLayerController;
function showCurrentPageButtonFunction(mainController, layerView) {
    layerView.innerHTML = "";
    var currentPageData = mainController.pageController.currentPage.fullPageHTMLObject.getDataFromDataBase();
    var layerObject = buildLayerContentFunction(mainController, currentPageData, layerView);
    layerView.appendChild(layerObject);
    // layerObject.querySelector("span").style.background = "white"
}
exports.showCurrentPageButtonFunction = showCurrentPageButtonFunction;
//** aa funciton to build a list of items in a page so that tthey can be shown in the layer panel for switch on and off and lock the layer
function buildLayerContentFunction(mainController, currentPageData, layerView, layerLevel) {
    if (layerLevel === void 0) { layerLevel = 0; }
    // first create an item object that conatin the information of the layerLeevel and pageAccessPointer
    // pageAccessPointer is used for finding the related HTML obejct show that you can manipulate them
    var item = document.createElement("div");
    item.classList.add("layerLevel");
    var itemRow = layerRowTemplate.content.cloneNode(true)
        .querySelector(".layerRow");
    itemRow.setAttribute("layerLevel", layerLevel.toString());
    var itemViewSwitch = itemRow.querySelector(".viewSwitch");
    var itemRowName = itemRow.querySelector(".viewName");
    var itemExpandSwitch = itemRow.querySelector(".expandSwitch");
    item.appendChild(itemRow);
    item.setAttribute("layerLevel", layerLevel.toString());
    if (layerLevel == 0)
        itemRow.style.display = "none";
    if (layerLevel > 1)
        item.setAttribute("status", "off");
    for (var i = 0; i < layerLevel; i++) {
        itemRowName.innerText += "-";
    }
    itemRowName.innerText += currentPageData.GNType;
    addItemRowFunction(layerView, itemRow);
    // add click event to the item object to change the style of the related html objec tin that page
    item.setAttribute("pageAccessPointer", currentPageData._identity.accessPointer);
    // the event on the three buttons
    itemViewSwitch.addEventListener("click", function (e) {
        e.stopPropagation();
        var relatedHTMLObject = document.querySelector("*[accessPointer='" + currentPageData._identity.accessPointer + "']");
        mainController.toolBox.targetPage = relatedHTMLObject;
        // to test if the style is visible or not
        relatedHTMLObject.style.visibility = (relatedHTMLObject.style.visibility == "hidden") ? "inherit" : "hidden";
        switchStatus(itemViewSwitch);
    });
    itemExpandSwitch.addEventListener("click", function (e) {
        e.stopPropagation();
        var newStatus = switchStatus(itemExpandSwitch);
        var targetItem = Array.from(item.querySelectorAll(".layerLevel[layerlevel='" + layerLevel + "']"));
        targetItem.forEach(function (p) { return p.setAttribute("status", newStatus); });
    });
    itemRowName.addEventListener("click", function (e) {
        e.stopPropagation();
        var selectedRow = layerView.querySelector(".selectedRow");
        if (selectedRow)
            selectedRow.classList.remove("selectedRow");
        itemRow.classList.add("selectedRow");
    });
    // to
    layerLevel += 1;
    if (currentPageData.array.length > 0) {
        currentPageData.array.forEach(function (p) {
            item.appendChild(buildLayerContentFunction(mainController, p, layerView, layerLevel));
        });
    }
    return item;
}
exports.buildLayerContentFunction = buildLayerContentFunction;
function addItemRowFunction(layerView, itemRow) {
    itemRow.addEventListener("click", function () {
        var selectedRow = layerView.querySelector(".selectedRow");
        if (selectedRow)
            selectedRow.classList.remove("selectedRow");
        itemRow.classList.add("selectedRow");
    });
}
