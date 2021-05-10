"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GNSvgImage = exports.GNSvgPolyLine = exports.GNSvgLine = exports.GNSvgRect = exports.GNSvgCircle = exports.GNSvg = void 0;
var svg_js_1 = __importDefault(require("svg.js"));
var GreateNoteObjectHelperFunction_1 = require("./GreateNoteObjectHelperFunction");
function createDummyData() {
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
        "stylesheet": {}
    };
}
//@auto-fold here
function GNSvg(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, message = createData.message, injectedData = createData.injectedData;
    var svgDivContainer = document.createElement("div");
    svgDivContainer.id = "testSvgDiv";
    var svgController = svg_js_1["default"](svgDivContainer);
    var svgBoard = svgController.node;
    svgBoard.svgController = svgController;
    svgBoard.GNType = GNSvg.name;
    svgBoard._name = name;
    svgBoard._dataStructure = [];
    svgBoard._styleStructure = ["width", "height", "background", "position", "left", "top"];
    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    svgBoard.appendToContainer = function (parent) {
        parent.appendChild(svgDivContainer);
    };
    svgBoard.applyStyle = function (stylesheet) {
        Object.entries(stylesheet).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            svgBoard["style"][key] = value;
        });
    };
    svgBoard.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgBoard.GNType;
        if (svgBoard._identity)
            dataObject["_identity"] = svgBoard._identity;
        svgBoard._dataStructure.forEach(function (p) {
            dataObject["data"][p] = svgBoard[p];
        });
        // stylesheet data
        svgBoard._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = svgBoard["style"][p];
        });
        return dataObject;
    };
    svgBoard.loadFromData = function (data) {
        svgBoard.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
        svgBoard.specialGNType = data.specialGNType;
        if (data.classList)
            data.classList.forEach(function (p) { return svgBoard.classList.add(p); });
        svgBoard._identity = data._identity;
        svgBoard.setAttribute("accessPointer", data._identity.accessPointer);
        svgBoard.applyStyle(data.stylesheet);
    };
    //
    svgBoard.extract = function () { return svgBoard.createDataObject(); };
    // add extra funcitons to the object
    GreateNoteObjectHelperFunction_1.superGNObject(svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer);
    return svgBoard;
}
exports.GNSvg = GNSvg;
//@auto-fold here
function GNSvgCircle(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase;
    var svgObjectSoul = new svg_js_1["default"].Circle();
    svgObjectSoul.radius(75);
    svgObjectSoul.fill("red");
    var svgObject = svgObjectSoul.node;
    svgObject.soul = svgObjectSoul;
    svgObject.GNType = GNSvgCircle.name;
    svgObject._name = name;
    svgObject._dataStructure = ["cx", "cy", "r"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (_GNData) {
        svgObject.style["cx"] = parseInt(_GNData["data"]["cx"]) + 200;
        svgObject.style["cy"] = parseInt(_GNData["data"]["cy"]);
        svgObject.style["r"] = parseInt(_GNData["data"]["r"]);
    };
    svgObject.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject.GNType;
        if (svgObject["_identity"])
            dataObject["_identity"] = svgObject["_identity"];
        dataObject["data"]["cx"] = svgObject.style["cx"];
        dataObject["data"]["cy"] = svgObject.style["cy"];
        dataObject["data"]["r"] = svgObject.style["r"];
        // stylesheet data
        svgObject._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = svgObject["style"][p];
        });
        return dataObject;
    };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        svgObjectSoul.attr(attrList);
    };
    svgObject.appendTo = function (parentSVGContainer) {
        //self.targetPage.svgNode.appendChild(eraser.node)
        parentSVGContainer.svgNode.appendChild(svgObject.node);
    };
    // add extra funcitons to the object
    GreateNoteObjectHelperFunction_1.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer);
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgCircle = GNSvgCircle;
// ==============
//@auto-fold here
function GNSvgRect(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = new svg_js_1["default"].Rect();
    svgObject.GNType = GNSvgRect.name;
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
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgRect = GNSvgRect;
//@auto-fold here
function GNSvgLine(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
    var svgObject = new svg_js_1["default"].Line();
    svgObject.GNType = GNSvgLine.name;
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
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgLine = GNSvgLine;
//@auto-fold here
function GNSvgPolyLine(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase;
    var svgObjectSoul = svg_js_1["default"](document.createElement("polyline")).polyline([0, 0, 0, 0]);
    var svgObject = svgObjectSoul.node;
    svgObject.soul = svgObjectSoul;
    svgObject.GNType = GNSvgPolyLine.name;
    svgObject._name = name;
    svgObject._dataStructure = ["points"];
    svgObject._styleStructure = ["stroke", "stroke-width", "fill"];
    // functions
    svgObject.loadFromData = function (automergeData) {
        svgObject.soul.plot(automergeData["data"]["points"]);
    };
    svgObject.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject.GNType;
        if (svgObject._identity)
            dataObject["_identity"] = svgObject._identity;
        dataObject["data"]["points"] = svgObject.soul.array().value.toString();
        // stylesheet data
        dataObject["stylesheet"]["stroke"] = svgObject["style"]["stroke"];
        dataObject["stylesheet"]["stroke-width"] = svgObject["style"]["stroke-width"];
        dataObject["stylesheet"]["fill"] = svgObject["style"]["fill"];
        return dataObject;
    };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        svgObject._styleStructure.forEach(function (p) {
            if (p == "fill") {
                svgObject["style"]["fill"] = attrList["fill"] || "none";
            }
            else {
                svgObject["style"][p] = attrList[p];
            }
        });
    };
    // to share same data function
    GreateNoteObjectHelperFunction_1.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer);
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    // add extra funcitons to the object
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
    svgObject.GNType = GNSvgImage.name;
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
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
exports.GNSvgImage = GNSvgImage;
function SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase) {
    svgObject.appendTo = function (parentSVGContainer) {
        svgObject.soul.addTo(parentSVGContainer.svgController);
    };
    //
    // svgObject.applyStyle = function (attributeSheet){
    //
}
