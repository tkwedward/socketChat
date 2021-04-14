"use strict";
exports.__esModule = true;
exports.SuperGroup = exports.SuperImage = exports.SuperPolyline = exports.SuperLine = exports.SuperRect = exports.SuperCircle = exports.SuperClass = void 0;
function SuperClass(svgObject) {
    // this is a class for common functions
    return svgObject;
}
exports.SuperClass = SuperClass;
function SuperCircle(circle) {
    circle = SuperClass(circle);
    // circle._new_tell_me_yourName = ()=>{
    //     console.log("I am a ")
    // }
    circle.exportData = function () {
        var result = {
            "styleList": {
                "r": circle.r.baseVal.value,
                "cx": circle.cx.baseVal.value,
                "cy": circle.cy.baseVal.value
            }
        };
        return result;
    };
    return circle;
}
exports.SuperCircle = SuperCircle;
function SuperRect(rect) {
    rect = SuperClass(rect);
    rect.exportData = function () {
        var result = {
            "styleList": {
                "width": rect.getBoundingClientRect().width,
                "height": rect.getBoundingClientRect().height,
                "x": rect.x.baseVal.value,
                "y": rect.y.baseVal.value
            }
        };
        return result;
    };
    // rect._new_tell_me_yourName = ()=>{
    //   console.log("I am a rect.")
    // }
    return rect;
}
exports.SuperRect = SuperRect;
function SuperLine(line) {
    line = SuperClass(line);
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    line.exportData = function () {
        var result = {
            "styleList": {
                "x1": line.x1.baseVal.value,
                "y1": line.y1.baseVal.value,
                "x2": line.x2.baseVal.value,
                "y2": line.y2.baseVal.value
            }
        };
        return result;
    };
    return line;
}
exports.SuperLine = SuperLine;
function SuperPolyline(polyline) {
    polyline = SuperClass(polyline);
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    polyline.exportData = function () {
        var result = {
            "styleList": {
                "x1": line.x1.baseVal.value,
                "y1": line.y1.baseVal.value,
                "x2": line.x2.baseVal.value,
                "y2": line.y2.baseVal.value
            }
        };
        return result;
    };
    return polyline;
}
exports.SuperPolyline = SuperPolyline;
function SuperImage(image) {
    image = SuperClass(image);
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    return image;
}
exports.SuperImage = SuperImage;
function SuperGroup(group) {
    // group = SuperClass(group)
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    return group;
}
exports.SuperGroup = SuperGroup;
