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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GNSvgImage = exports.GNSvgPolyLine = exports.GNSvgLine = exports.GNSvgRect = exports.GNSvgCircle = exports.GNSvg = void 0;
var svg_js_1 = __importDefault(require("svg.js"));
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
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
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, message = createData.message;
    console.log(4141, createData);
    var svgDivContainer = document.createElement("div");
    svgDivContainer.id = "testSvgDiv";
    var svgController = svg_js_1["default"](svgDivContainer);
    svgController.width("800px");
    svgController.height("300px");
    var svgBoard = svgController.node;
    svgBoard.svgController = svgController;
    svgBoard.style.background = "gold";
    svgBoard._type = GNSvg.name;
    svgBoard._name = name;
    svgBoard._dataStructure = ["innerHTML"];
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
        dataObject["GNType"] = svgBoard._type;
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
    //
    svgBoard.extract = function () { return svgBoard.createDataObject(); };
    console.log(987, svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer);
    // add extra funcitons to the object
    GreatNoteDataClass.superGNObject(svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer);
    console.log(900, svgBoard._identity);
    return svgBoard;
}
exports.GNSvg = GNSvg;
//@auto-fold here
function GNSvgCircle(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase;
    var svgObjectSoul = new svg_js_1["default"].Circle();
    console.log(119, svgObjectSoul);
    svgObjectSoul.radius(75);
    svgObjectSoul.fill("red");
    var svgObject = svgObjectSoul.node;
    svgObject.soul = svgObjectSoul;
    svgObject._type = GNSvgCircle.name;
    svgObject._name = name;
    svgObject._dataStructure = ["cx", "cy", "r"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = function (_GNData) {
        console.log(145, "the data is updated", _GNData);
        svgObject.style["cx"] = parseInt(_GNData["data"]["cx"]) + 200;
        svgObject.style["cy"] = parseInt(_GNData["data"]["cy"]);
        svgObject.style["r"] = parseInt(_GNData["data"]["r"]);
    };
    svgObject.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject._type;
        if (svgObject["_identity"])
            dataObject["_identity"] = svgObject["_identity"];
        dataObject["data"]["cx"] = svgObject.style["cx"];
        dataObject["data"]["cy"] = svgObject.style["cy"];
        dataObject["data"]["r"] = svgObject.style["r"];
        console.log(159, dataObject["data"]);
        // stylesheet data
        svgObject._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = svgObject["style"][p];
        });
        return dataObject;
    };
    svgObject.extract = function () { return svgObject.createDataObject(); };
    svgObject.applyStyle = function (attrList) {
        svgObject.attr(attrList);
    };
    svgObject.appendTo = function (parentSVGContainer) {
        //self.targetPage.svgNode.appendChild(eraser.node)
        console.log(139, parentSVGContainer, svgObject);
        parentSVGContainer.svgNode.appendChild(svgObject.node);
    };
    // add extra funcitons to the object
    console.log(146, GreatNoteDataClass.superGNObject);
    GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer);
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
        console.log(attrList);
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
function GNSvgPolyLine(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase;
    var svgObjectSoul = svg_js_1["default"](document.createElement("polyline")).polyline([0, 0, 0, 0]);
    var svgObject = svgObjectSoul.node;
    svgObject.soul = svgObjectSoul;
    svgObject._type = GNSvgPolyLine.name;
    svgObject._name = name;
    svgObject._dataStructure = ["points"];
    svgObject._styleStructure = ["stroke", "stroke-width", "fill"];
    // functions
    svgObject.loadFromData = function (data) {
        // svgObject.soul.plot([[0, 0], [10, 100]])
        console.log(309, data);
        svgObject.soul.plot(data["points"]);
        // console.log(303, svgObject.applyStyle, data["stylesheet"])
        // svgObject.applyStyle(data["stylesheet"])
    };
    svgObject.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject._type;
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
    GreatNoteDataClass.superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer);
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    // add extra funcitons to the object
    console.log(234, svgObject);
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
        console.log(317, parentSVGContainer);
        console.log(318, svgObject);
        svgObject.soul.addTo(parentSVGContainer.svgController);
    };
    //
    // svgObject.applyStyle = function (attributeSheet){
    //
}
