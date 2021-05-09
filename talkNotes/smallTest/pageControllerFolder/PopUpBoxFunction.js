"use strict";
exports.__esModule = true;
exports.addItemToCreatePopUpBox = exports.createPopUpBox = void 0;
function createPopUpBox() {
    var popUpBox = document.createElement("div");
    popUpBox.classList.add("popUpBox");
    addItemToCreatePopUpBox(popUpBox, "delete", function () { return popUpBox.remove(); });
    addItemToCreatePopUpBox(popUpBox, "delete", function () { return popUpBox.remove(); });
    addItemToCreatePopUpBox(popUpBox, "delete", function () { return popUpBox.remove(); });
    addItemToCreatePopUpBox(popUpBox, "delete", function () { return popUpBox.remove(); });
    return popUpBox;
}
exports.createPopUpBox = createPopUpBox;
function addItemToCreatePopUpBox(popUpBox, name, buttonFunction) {
    var button = document.createElement("div");
    button.classList.add("popUpBoxButton");
    button.textContent = name;
    button.addEventListener("click", function (e) {
        buttonFunction();
    });
    popUpBox.appendChild(button);
}
exports.addItemToCreatePopUpBox = addItemToCreatePopUpBox;
