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
var svg_js_1 = __importDefault(require("svg.js"));
var io = __importStar(require("socket.io-client"));
var Automerge = __importStar(require("automerge"));
var svgHelperFunction = __importStar(require("./svgHelperFunction"));
var test2 = svg_js_1["default"]('testing2');
var socket = io.io();
var ShapeType;
(function (ShapeType) {
    ShapeType["rect"] = "rect";
    ShapeType["circle"] = "circle";
    ShapeType["line"] = "line";
    ShapeType["polyline"] = "polyline";
    ShapeType["image"] = "image";
    ShapeType["group"] = "group";
})(ShapeType || (ShapeType = {}));
function log() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    console.log(data);
}
var SVGArray = /** @class */ (function () {
    function SVGArray(name) {
        this.name = name;
        this.array = [];
        this.svgHTMLElement = this.createSVGHTMLElement();
    }
    SVGArray.prototype.createSVGHTMLElement = function () {
        var svg = svg_js_1["default"]('testing');
        return svg;
    };
    return SVGArray;
}());
var elemArray = [];
// to create some element for passing to the other side
var _svg_testing = new SVGArray("svgTest");
var svgArrayName = _svg_testing.name;
var arrayObject = {};
arrayObject[svgArrayName] = [];
var mainDoc = Automerge.from(arrayObject);
var previousDoc = Automerge.init();
console.log(57, previousDoc);
// rect
// line
var rectInputData = {
    "tagName": "rect",
    "styleList": { "x": 10, "y": 150, "width": 100, "height": 200,
        "fill": '#f06' }
};
// let rect = _svg_testing.svgHTMLElement
//                 .rect().attr(rectInputData)
var rect = svgHelperFunction.createElement(rectInputData, _svg_testing.svgHTMLElement);
_svg_testing.array.push(rect);
// circle
var circleInputData = {
    "tagName": "circle", "styleList": {
        "r": 10, "cx": 10, "cy": 10, "fill": 'blue'
    }
};
var circle2 = svgHelperFunction.createElement(circleInputData, _svg_testing.svgHTMLElement);
_svg_testing.array.push(circle2);
// line
var lineInputData = {
    "tagName": "line", "styleList": {
        "x1": 0, "y1": 0, "x2": 100, "y2": 300,
        "stroke": "gold", "stroke-width": 1
    }
};
var line1 = svgHelperFunction.createElement(lineInputData, _svg_testing.svgHTMLElement);
_svg_testing.array.push(line1);
// polyline
var polyLineInputData = {
    "tagName": "polyline",
    "styleList": {
        "points": [[0, 0], [400, 50], [50, 500]],
        "fill": "none", "stroke": "blue", "stroke-width": 1
    }
};
var polyline = svgHelperFunction.createElement(polyLineInputData, _svg_testing.svgHTMLElement);
_svg_testing.array.push(polyline);
// add image
var image = _svg_testing.svgHTMLElement
    .image("img/pikachu_family.jpeg", 200)
    .attr({ "x": 200, "y": 300 });
_svg_testing.array.push(image);
// var group = _svg_testing.svgHTMLElement.group()
// group.circle(25)
//      .cx(40)
//      .cy(40)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
// group.circle(50)
//      .cx(60)
//      .cy(60)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
//
// var subgroup = group.group()
// subgroup.circle(25)
//      .cx(150)
//      .cy(40)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
// subgroup.circle(50)
//      .cx(260)
//      .cy(60)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
// let data = svgHelperFunction.parseSVGElement(group.node)
// console.log("group data", data)
// console.log("the group node is here.", group.node)
// _svg_testing.array.push(group)
// let data = elemArray.map(p=>svgHelperFunction.parseSVGElement(p.node))
// console.log(data)
// add the element into the automerge doc
console.log(164, elemArray);
// previousDoc = mainDoc
mainDoc = Automerge.change(mainDoc, function (doc) {
    var data = _svg_testing.array.map(function (p) {
        console.log(166, p);
        return svgHelperFunction.parseSVGElement(p.node);
    });
    data.forEach(function (p) { return doc[svgArrayName].push(p); });
    console.log(146, doc[svgArrayName]);
});
var changes = Automerge.getChanges(previousDoc, mainDoc);
console.log(148, mainDoc[svgArrayName], 149, previousDoc);
console.log(150, changes);
// the click button below is used to add item to the automerge doc
var addCircleButton = document.querySelector(".addCircleButton");
addCircleButton.addEventListener("click", function () {
    mainDoc[svgArrayName].forEach(function (p) { return svgHelperFunction.createElement(p, test2); });
});
var x = document.querySelector("polyline");
console.log(svgHelperFunction.parseSVGElement(x));
socket.on("connect", function () {
    // ask the server for initial data
    socket.emit("message", "user connected");
    // socket.emit("initialDataRequest")
});
