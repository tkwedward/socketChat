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
exports.buildLayerContentFunction = exports.showCurrentPageButtonFunction = exports.createLayerController = void 0;
var GreatNoteDataClass = __importStar(require("../GreatNoteDataClass"));
var GreatNoteSvgDataClass = __importStar(require("../GreatNoteSvgDataClass"));
// ** make the layer controller panel so that you can add new div / new svg layer
function createLayerController(mainController) {
    // layerController
    var layerControllerTemplate = document.querySelector("#layerControllerTemplate");
    var layerControllerHTMLObject = layerControllerTemplate["content"].cloneNode(true);
    var layerView = layerControllerHTMLObject.querySelector(".layerView");
    var addDivLayerButton = layerControllerHTMLObject.querySelector(".addDivLayerButton");
    addDivLayerButton.addEventListener("click", function (e) {
        console.log("15, The event detail is ", e.detail);
        var currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        var divLayer = GreatNoteDataClass.GNContainerDiv({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true });
        divLayer.applyStyle({ width: "100%", height: "100%", background: "blue", "position": "absolute", "left": "0px", "right": "0px" });
        divLayer.classList.add("divLayer");
        divLayer.appendTo(currentPage);
    }, { detail: { "run": 12345 } });
    var addSvgLayerButton = layerControllerHTMLObject.querySelector(".addSvgLayerButton");
    addSvgLayerButton.addEventListener("click", function () {
        console.log("add a new svg layer");
        var currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        var svgLayer = GreatNoteSvgDataClass.GNSvg({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true });
        console.log(mainController.toolBox.registerSvg);
        mainController.toolBox.registerSvg(svgLayer);
        svgLayer.applyStyle({ width: "100%", height: "100%", background: "gold", position: "absolute", left: "0px", top: "0px" });
        mainController.saveHTMLObjectToDatabase(svgLayer);
        console.log(svgLayer);
        svgLayer.classList.add("svgLayer");
        svgLayer.appendTo(currentPage);
    }); // addSvgLayerButton.addEventListener
    var showCurrentPageButton = layerControllerHTMLObject.querySelector(".showCurrentPageButton");
    showCurrentPageButton.addEventListener("click", function () {
        showCurrentPageButtonFunction(mainController, layerView);
    });
    return layerControllerHTMLObject;
}
exports.createLayerController = createLayerController;
function showCurrentPageButtonFunction(mainController, layerView) {
    layerView.innerHTML = "";
    var currentPageData = mainController.pageController.currentPage.getDataFromDataBase();
    var layerObject = buildLayerContentFunction(currentPageData);
    console.log(layerObject);
    layerView.appendChild(layerObject);
}
exports.showCurrentPageButtonFunction = showCurrentPageButtonFunction;
//** aa funciton to build a list of items in a page so that tthey can be shown in the layer panel for switch on and off and lock the layer
function buildLayerContentFunction(currentPageData, layerLevel) {
    if (layerLevel === void 0) { layerLevel = 0; }
    // first create an item object that conatin the information of the layerLeevel and pageAccessPointer
    // pageAccessPointer is used for finding the related HTML obejct show that you can manipulate them
    var item = document.createElement("div");
    item.style.marginLeft = layerLevel * 10 + "px";
    item.innerText = currentPageData.GNType;
    item.setAttribute("layerLevel", layerLevel.toString());
    layerLevel += 1;
    // add click event to the item object to change the style of the related html objec tin that page
    item.setAttribute("pageAccessPointer", currentPageData._identity.accessPointer);
    item.addEventListener("click", function (e) {
        e.stopPropagation();
        var relatedHTMLObject = document.querySelector("*[accessPointer='" + currentPageData._identity.accessPointer + "']");
        // to test if the style is visible or not
        relatedHTMLObject.style.visibility = (relatedHTMLObject.style.visibility == "hidden") ? "inherit" : "hidden";
    });
    // to
    if (currentPageData.array.length > 0) {
        currentPageData.array.forEach(function (p) {
            item.appendChild(buildLayerContentFunction(p, layerLevel));
        });
    }
    return item;
}
exports.buildLayerContentFunction = buildLayerContentFunction;
