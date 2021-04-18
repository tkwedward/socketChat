"use strict";
exports.__esModule = true;
exports.ToolBoxClass = void 0;
var ToolBoxClass = /** @class */ (function () {
    function ToolBoxClass() {
    }
    ToolBoxClass.prototype.createToolboxHtmlObject = function () {
        var self = this;
        var toolBoxHtmlObject = document.createElement("div");
        toolBoxHtmlObject.classList.add("toolBoxHtml");
        toolBoxHtmlObject.style.height = "200px";
        toolBoxHtmlObject.style.background = "silver";
        toolBoxHtmlObject.style.width = "90%";
        toolBoxHtmlObject.style.margin = "10px auto";
        toolBoxHtmlObject.itemArray = [];
        toolBoxHtmlObject.createToolBoxItem = function (name) {
            var toolBoxItem = self.createToolBoxItem(name, toolBoxHtmlObject);
            toolBoxHtmlObject.itemArray.push(toolBoxItem);
            toolBoxHtmlObject.appendChild(toolBoxItem);
        };
        return toolBoxHtmlObject;
    };
    ToolBoxClass.prototype.createToolBoxItem = function (name, toolBoxHtmlObject) {
        var toolBoxItem = document.createElement("div");
        // the html style part
        toolBoxItem.classList.add("toolBoxItem");
        toolBoxItem.innerText = name[0];
        toolBoxItem.style.background = "gold";
        toolBoxItem.style.display = "flex";
        toolBoxItem.style.margin = "10px 5px";
        toolBoxItem.style["align-items"] = "center";
        toolBoxItem.style["justify-content"] = "center";
        var squreLength = "40px";
        toolBoxItem.style.width = squreLength;
        toolBoxItem.style.height = squreLength;
        // internaal variable part
        toolBoxItem.status = false;
        toolBoxItem.resetButton = function () {
            toolBoxItem.status = false;
        };
        toolBoxItem.addEventListener("click", function () {
        });
        return toolBoxItem;
    };
    return ToolBoxClass;
}());
exports.ToolBoxClass = ToolBoxClass;
