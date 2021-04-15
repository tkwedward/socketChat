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
exports.__esModule = true;
var GreatNoteDataClass = __importStar(require("./GreatNoteDataClass"));
var GreatNoteControllerClass = __importStar(require("./GreatNoteControllerClass"));
var inputField = GreatNoteDataClass.GNInputField("colorInputField");
inputField.value = 'Test';
inputField.update(123);
// document.body.appendChild(inputField);
// let inputField = new GreatNoteDataClass.GNInputField()
var div = GreatNoteDataClass.GNEditableDiv("nameField");
div.update('Testing Div');
// let inputField = new GreatNoteDataClass.GNInputField()
var button = GreatNoteDataClass.GNButton("saveButton", ["save", "unsave"], function (e) {
    var currentIndex = button.statusList.indexOf(button.innerText);
    var nextIndex = (currentIndex + 1) % button.statusList.length;
    button.innerHTML = button.statusList[nextIndex];
    console.log(nextIndex, button.statusList);
});
var img = GreatNoteDataClass.GNImage("testImage", "http://1.bp.blogspot.com/-nxUhwaWQceU/Vbne9scyheI/AAAAAAAABJk/KN8-02fIgoc/s1600/Pichu.full.1426629.jpg");
// imageController
var page = GreatNoteDataClass.GNDivPage("page1");
var divContainer = GreatNoteDataClass.GNContainerDiv();
var imageController = GreatNoteControllerClass.GNImageController("imageController");
var textController = GreatNoteControllerClass.GNTextController("textController");
var currentSelectedObject;
page.addEventListener("click", function (e) {
    var isPageObject = false;
    var className = e.target["classList"][0];
    if (className && className.startsWith("page_item_")) {
        isPageObject = true;
    }
    // to check if tthe selected object is the saame one or different one
    if (currentSelectedObject != e.target && isPageObject) {
        switch (e.target["tagName"]) {
            // case
        }
        if (className.includes(GreatNoteDataClass.GNImage.name)) {
            // if an image is clicked
            imageController.getControlledObject(e.target);
            console.log("An image is selected.", imageController.controlledObject);
        }
        else if (className.includes(GreatNoteDataClass.GNEditableDiv.name)) {
            // if it is GNEditableDiv
            textController.getControlledObject(e.target);
            console.log("An editable textfield is selected.", imageController.controlledObject);
        }
        currentSelectedObject = e.target;
        console.log(currentSelectedObject._parent);
    }
});
var r1 = {
    "identity": "1002012",
    "data": "1230423",
    "fatt": [{}]
};
function createNode(name, ap, dp, color) {
    var data_object = {
        "name": name,
        "array": [],
        "identity": {
            "accessPointer": ap,
            "dataPointer": dp
        },
        "stylesheet": {
            "background": color
        }
    };
    data_object.push = function (item) {
        data_object["array"].push(item);
    };
    return data_object;
}
var database = {
    "root": {
        "itemName": "rootNode",
        "pageArray": [],
        "bookmarkArray": [],
        "itemIdentity": {
            "accessPointer": 1,
            "dataPointer": 1,
            "parentPointer": 0
        },
        "itemStylesheet": {
            "background": "silver"
        }
    }
};
database.push = function (array, data) {
    database[array].push(data);
};
function createInputField(name) {
    var inputField = document.createElement("input");
    inputField.placeholder = name;
    inputField.style.margin = "10px";
    // inputField.addEventListener("")
    controlPanel.append(inputField);
    return inputField;
}
function createHTMLObject(data_object, parent) {
    var node = document.createElement("div");
    node.parent = parent;
    node.style.background = data_object.itemStylesheet.background;
    node.style.width = "200px";
    node.style.height = "70px";
    node.style.padding = "20px";
    node.itemName = data_object.itemName;
    node.itemIdentity = data_object.itemIdentity;
    node.classList.add("item_" + node.itemIdentity.accessPointer);
    node.innerHTML = "arrayName:\n     " + node.itemName + "<br>accessPointer: " + node.itemIdentity.accessPointer + "<br>dataPointer: " + node.itemIdentity.dataPointer + "<br>parentPointer: " + node.parent.itemIdentity.parentPointer;
    node.getData = function () {
        return data_object;
    };
    node.addEventListener("click", function () {
        controlPannelTitle.innerHTML = "Append to " + node.itemName;
        console.log("current node is " + node.itemName);
        controlPanel.currentNode = node;
    });
    if (!parent) {
        nodeContainer.append(node);
    }
    else {
        parent.append(node);
    }
    return node;
}
document.body.style.display = "grid";
document.body.style.gridTemplateColumns = "4fr 1fr";
var controlPanel = document.createElement("div");
controlPanel.style.background = "pink";
controlPanel.style.height = "100vh";
var controlPannelTitle = document.createElement("div");
controlPannelTitle.innerHTML = "Title";
controlPannelTitle.style.fontSize = "20px";
controlPannelTitle.style.margin = "10px";
controlPannelTitle.style.display = "block";
controlPanel.currentNode = null;
controlPanel.append(controlPannelTitle);
var nameInputField = createInputField("name");
var apInputField = createInputField("apInputField");
var dpInputField = createInputField("dpInputField");
var submitButton = document.createElement("input");
submitButton.style.margin = "10px";
submitButton.style.display = "block";
submitButton.type = "submit";
submitButton.addEventListener("click", function () {
    var nameValue = nameInputField.value;
    var apValue = apInputField.value;
    var dpValue = dpInputField.value;
    var newData = controlPanel.currentNode;
    console.log(nameValue, apValue, dpValue);
});
controlPanel.append(submitButton);
var getAccessChainOfNodeButton = document.createElement("button");
getAccessChainOfNodeButton.innerText = "getAccessChain";
getAccessChainOfNodeButton.style.margin = "10px";
getAccessChainOfNodeButton.addEventListener("click", function () {
    if (controlPanel.currentNode) {
        var accessChain = getAccessChain(controlPanel.currentNode);
        console.log(179, accessChain);
    }
});
controlPanel.append(getAccessChainOfNodeButton);
var nodeContainer = document.createElement("div");
nodeContainer.style.background = "gold";
nodeContainer.style.height = "100vh";
nodeContainer.itemIdentity = {
    "accessPointer": 0,
    "dataPointer": 0,
    "parentPointer": null
};
// initialize thee dataa
document.body.append(nodeContainer, controlPanel);
var r = createHTMLObject(database["root"], nodeContainer);
r.style.position = "absolute";
// methods to access the database
function getItem(accessPointer) {
    return document.querySelector(".item_" + accessPointer);
}
function getAccessChain(htmlNode, accessChain) {
    if (accessChain === void 0) { accessChain = []; }
    console.log(htmlNode);
    accessChain.unshift(htmlNode.itemIdentity.accessPointer);
    console.log(accessChain);
    if (htmlNode.parent && htmlNode.parent.itemIdentity) {
        return getAccessChain(htmlNode.parent, accessChain);
    }
    else {
        return accessChain;
    }
}
window.getItem = getItem;
// r.style.marginRight = "auto"
