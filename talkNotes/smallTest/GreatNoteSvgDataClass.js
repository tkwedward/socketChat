"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GNSvgImage = exports.GNSvgPolyLine = exports.GNSvgLine = exports.GNSvgRect = exports.GNSvgCircle = exports.GNSvg = void 0;
var svg_js_1 = __importDefault(require("svg.js"));
//@auto-fold here
function GNSvg(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgDivContainer = document.createElement("div");
    svgDivContainer.id = "testSvgDiv";
    svgDivContainer.appendToContainer = function (parent) {
        parent.appendChild(svgDivContainer);
        var svgController = svg_js_1["default"](svgDivContainer);
        svgController.width("800px");
        svgController.height("300px");
        svgDivContainer.svgController = svgController;
        svgDivContainer.svgNode = svgController.node;
        svgController.node.style.background = "gold";
    };
    svgDivContainer.applyStyle = function () {
    };
    svgDivContainer.createDataObject = function () {
        var dataObject = {
            "data": {},
            "array": [],
            "GNType": "",
            "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
            "stylesheet": {}
        };
    };
    // svgObject.style.width = "70vw";
    // svgObject.style.height = "80vh";
    // svgObject.style.margin = "20px";
    // svgObject.style.background = "Aliceblue"
    // // let svgController:SVG.Doc = SVG(svgObject)
    //
    // svgObject._type = GNSvg.name
    // svgObject._name = name
    // svgObject._dataStructure = ["value"]
    // svgObject._styleStructure = []
    //
    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    //
    // svgObject.extract = () => svgObject.createDataObject()
    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    return svgDivContainer;
}
exports.GNSvg = GNSvg;
//@auto-fold here
function GNSvgCircle(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = new svg_js_1["default"].Circle();
    var html = document.createElement("div");
    svgObject.radius(75);
    svgObject.fill("red");
    svgObject._type = GNSvgCircle.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (data) { svgObject = data; };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        Object.entries(attrList).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            svgObject.node.style[key] = value;
        });
    };
    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgCircle = GNSvgCircle;
//@auto-fold here
function GNSvgRect(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = new svg_js_1["default"].Rect();
    svgObject._type = GNSvgRect.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (data) { svgObject = data; };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        Object.entries(attrList).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            svgObject.node.style[key] = value;
        });
    };
    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgRect = GNSvgRect;
//@auto-fold here
function GNSvgLine(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = new svg_js_1["default"].Line();
    svgObject._type = GNSvgLine.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (data) { svgObject = data; };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        svgObject.plot(attrList["points"]);
        svgObject.attr(attrList["attribute"]);
    };
    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgLine = GNSvgLine;
//@auto-fold here
function GNSvgPolyLine(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = svg_js_1["default"](document.createElement("polyline")).polyline([0, 0, 0, 0]);
    console.log(234, svgObject);
    svgObject._type = GNSvgPolyLine.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (data) { svgObject = data; };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        svgObject.plot(attrList["points"]);
        svgObject.attr(attrList["attribute"]);
    };
    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
} //GNSvgPolyLine
exports.GNSvgPolyLine = GNSvgPolyLine;
//@auto-fold here
function GNSvgImage(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = svg_js_1["default"](document.createElement("image")).image();
    svgObject.setImgSrc = function (src) {
        svgObject.load(src);
    };
    svgObject._type = GNSvgImage.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (data) { svgObject = data; };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        svgObject.attr(attrList["attribute"]);
    };
    // add extra funcitons to the object
    // GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgImage = GNSvgImage;
function SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase) {
    svgObject.appendTo = function (parentSVGContainer) {
        svgObject.addTo(parentSVGContainer.svgController);
    };
    //
    // svgObject.applyStyle = function (attributeSheet){
    //
    // }
}
