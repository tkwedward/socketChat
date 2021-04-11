"use strict";
exports.__esModule = true;
exports.createElement = exports.parseSVGElement = void 0;
function parseSVGElement(elem) {
    // a function to parse an elem into a json file so that it can be push to thhe svgArray of automerge. The new information can be used to create the same object in other nodes
    var result;
    var elemAttribute = elem.attributes;
    var tagName = elem.tagName;
    switch (tagName) {
        case "rect":
            result = {
                "styleList": {
                    "width": elem.getBoundingClientRect().width,
                    "height": elem.getBoundingClientRect().height,
                    "x": elem.x.baseVal.value,
                    "y": elem.y.baseVal.value
                }
            };
            break;
        case "circle":
            result = {
                "styleList": {
                    "r": elem.r.baseVal.value,
                    "cx": elem.cx.baseVal.value,
                    "cy": elem.cy.baseVal.value
                }
            };
            break;
        //
        case "line":
            result = {
                "styleList": {
                    "x1": elem.x1.baseVal.value,
                    "y1": elem.y1.baseVal.value,
                    "x2": elem.x2.baseVal.value,
                    "y2": elem.y2.baseVal.value
                }
            };
            break;
        //
        case "polyline":
            result = {
                "styleList": {
                    "points": elemAttribute.points.value
                }
            };
            break;
        //
        case "image":
            result = {
                "src": elemAttribute.href.value,
                "styleList": {
                    "x": elemAttribute.x.value,
                    "y": elemAttribute.y.value,
                    "width": elemAttribute.width.value,
                    "height": elemAttribute.height.value
                }
            };
            break;
        //
        case "g":
            tagName = "g";
            result = processGroupElement(elem);
            console.log("Here is the result of the group");
            console.log(elemAttribute, result);
            break;
    }
    // console.log("tagName = g", tagName=="g")
    result["tagName"] = tagName;
    result["id"] = elem.id;
    result["classList"] = Array.from(elem.classList).map(function (p) { return p; });
    result["styleList"]["fill"] = elemAttribute.fill ? elemAttribute.fill.value : "none";
    result["styleList"]["stroke"] = elemAttribute.stroke ? elemAttribute.stroke.value : "none";
    result["styleList"]["stroke-width"] = elemAttribute["stroke-width"] ? elemAttribute["stroke-width"].value : "none";
    return result;
}
exports.parseSVGElement = parseSVGElement;
function processGroupElement(groupElem) {
    // to convert group elements into json text
    var result = {
        "groupElements": [],
        "tagName": "g",
        "classList": [],
        "id": "",
        "styleList": {}
    };
    Array.from(groupElem.children).forEach(function (p) {
        if (p.tagName != "g") {
            result["groupElements"].push(parseSVGElement(p));
        }
        else {
            result["groupElements"].push(processGroupElement(p));
        }
    });
    return result;
}
function createGroupHTMLObject(groupData, svgBoard) {
    // to create group HTML object from the GroupElemData defined
    groupData.forEach(function (p) {
        // console.log("The tagName is : ", p.tagName )
        if (p.tagName != undefined) {
            createElement(p, svgBoard);
        }
        else {
            var _svgBoard = svgBoard.group();
            var _groupData = p;
            // console.log(_groupData["groupElements"])
            createGroupHTMLObject(_groupData, _svgBoard);
        }
    });
}
function createElement(elemData, svgBoard) {
    // to create simple object such as rects, circles, lines and polylines
    switch (elemData.tagName) {
        case "rect":
            var rect = svgBoard.rect().attr(elemData.styleList);
            return rect;
            break;
        case "circle":
            var circle = svgBoard.circle().attr(elemData.styleList);
            return circle;
            break;
        case "line":
            var line = svgBoard.line([0, 0, 0, 0])
                .attr(elemData.styleList);
            return line;
            break;
        case "polyline":
            var polyline = svgBoard.polyline([0, 0, 0, 0])
                .attr(elemData.styleList);
            return polyline;
            break;
        case "image":
            var image = svgBoard.image(elemData.src)
                .attr(elemData.styleList);
            return image;
            break;
        case "g":
            var _group = svgBoard.group();
            console.log("create group elements", _group);
            var groupData = elemData;
            createGroupHTMLObject(groupData["groupElements"], _group);
            return _group;
            break;
    }
}
exports.createElement = createElement;
