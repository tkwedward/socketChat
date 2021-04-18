"use strict";
exports.__esModule = true;
exports.addMovingEvent = void 0;
function addMovingEvent(htmlObject) {
    var attributeX;
    var attributeY;
    switch (htmlObject.tagName) {
        case "circle":
            attributeX = "cx";
            attributeY = "cy";
            break;
        case "rect":
            attributeX = "x";
            attributeY = "y";
            break;
        default:
            attributeX = "left";
            attributeY = "top";
    }
    htmlObject.style.position = "relative";
    htmlObject.addEventListener("mousedown", function (e) {
        // to stop any event not related to this element
        if (e.target !== e.currentTarget)
            return;
        // e.stopPropagation()
        // to allow mouse to move into other elements
        Array.from(htmlObject.parentNode.children).forEach(function (p) {
            if (p != htmlObject)
                p.style.pointerEvents = "none";
            // })
            var startX = e["screenX"];
            var startY = e["screenY"];
            var objectInitialX = 0;
            var objectInitialY = 0;
            var initialLeftValue = parseInt(htmlObject.style[attributeX].replace("px", "")) || 0;
            var initialTopValue = parseInt(htmlObject.style[attributeY].replace("px", "")) || 0;
            console.log(initialLeftValue, initialTopValue);
            var currentX;
            var currentY;
            var deltaX = 0;
            var deltaY = 0;
            var mousemoveFunction = function (e) {
                currentY = e.screenY;
                currentX = e.screenX;
                deltaX = currentX - startX;
                deltaY = currentY - startY;
                var newX = htmlObject.style[attributeX] = initialLeftValue + deltaX + "px";
                htmlObject.style[attributeY] = initialTopValue + deltaY + "px";
            };
            htmlObject.addEventListener("mousemove", mousemoveFunction, false);
            function endDragEvent(e) {
                console.log(htmlObject.parentNode["children"]);
                Array.from(htmlObject.parentNode["children"]).forEach(function (p) {
                    console.log(p);
                    p["style"]["pointerEvents"] = "inherit";
                });
                var endX = e["screenX"];
                var endY = e["screenY"];
                htmlObject.removeEventListener("mousemove", mousemoveFunction);
                console.log("end at = (" + endX + ", " + endY + ")");
            }
            htmlObject.addEventListener("mouseup", function (e) {
                endDragEvent(e);
            }, false);
            htmlObject.addEventListener("mouseout", function (e) {
                endDragEvent(e);
            }, false);
        }, false);
    });
}
exports.addMovingEvent = addMovingEvent;
