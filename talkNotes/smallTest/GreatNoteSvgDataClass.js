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
function GNSvg(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
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
    svgBoard._styleStructure = [];
    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    svgBoard.appendToContainer = function (parent) {
        parent.appendChild(svgDivContainer);
    };
    svgBoard.applyStyle = function () {
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
    // add extra funcitons to the object
    GreatNoteDataClass.superGNObject(svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer);
    console.log(900, svgBoard._identity);
    return svgBoard;
}
exports.GNSvg = GNSvg;
//@auto-fold here
function GNSvgCircle(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
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
    svgObject.loadFromData = function (data) { svgObject = data; };
    svgObject.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgDivContainer._type;
        if (svgDivContainer._identity)
            dataObject["_identity"] = _object._identity;
        svgDivContainer._dataStructure.forEach(function (p) {
            dataObject["data"][p] = svgDivContainer[p];
        });
        // stylesheet data
        svgDivContainer._styleStructure.forEach(function (p) {
            dataObject["stylesheet"][p] = svgDivContainer["style"][p];
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
function GNSvgPolyLine(name, arrayID, insertPosition, dataPointer, saveToDatabase) {
    if (saveToDatabase === void 0) { saveToDatabase = true; }
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
        console.log(300, data["data"]["points"]);
        svgObject.soul.plot(data["data"]["points"]);
        console.log(303, svgObject.applyStyle, data["stylesheet"]);
        svgObject.applyStyle(data["stylesheet"]);
    };
    svgObject.createDataObject = function () {
        var dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject._type;
        if (svgObject._identity)
            dataObject["_identity"] = svgObject._identity;
        console.log(302, svgObject.soul.array().value);
        svgObject._dataStructure.forEach(function (p) {
            dataObject["data"][p] = svgObject.soul.array().value.toString();
        });
        // stylesheet data
        svgObject._styleStructure.forEach(function (p) {
            console.log(320, p, svgObject["style"][p]);
            dataObject["stylesheet"][p] = svgObject["style"][p];
        });
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
    // }
}
