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
var Automerge = __importStar(require("automerge"));
var DatabaseHelperFunction = __importStar(require("./databaseHelperFunction"));
var f = Automerge.init();
f = Automerge.change(f, function (doc) {
    doc["page"] = [];
    doc["bookmark"] = [];
    // doc["page"].push([
    //   {"name": "page", "number": 123},
    //   {"name": "Queen", "number": 430},
    // ])
    doc["page"].push({ "name": "Jack", "number": 430 });
    doc["page"].push({ "name": "Rashida", "number": 510 });
    doc["page"].push({ "name": "Kotaro", "number": 250 });
    doc["page"].push({ "friend": ["Dio", { "joan": "Chris" }] });
});
var MainController = /** @class */ (function () {
    function MainController() {
        this.mainDoc = Automerge.init();
        this.mainDoc = Automerge.change(f, function (doc) {
            doc["page"] = [];
            doc["bookmark"] = [];
            // doc["page"].push([
            //   {"name": "page", "number": 123},
            //   {"name": "Queen", "number": 430},
            // ])
            doc["page"].push({ "name": "Jack", "number": 430 });
            doc["page"].push({ "name": "Rashida", "number": 510 });
            doc["page"].push({ "name": "Kotaro", "number": 250 });
            doc["page"].push({ "friend": ["Dio", { "joan": "Chris" }] });
        });
        this.arrayID = {
            "page": Automerge.getObjectId(this.mainDoc.page),
            "bookmark": Automerge.getObjectId(this.mainDoc.bookmark)
        };
        console.log(this.mainDoc);
    }
    return MainController;
}());
var mainController = new MainController();
exports["default"] = mainController;
var masterObjectSoul = {
    "identity": {
        "accessPointer": Automerge.getObjectId(mainController.mainDoc.page[1]),
        "dataPointer": Automerge.getObjectId(mainController.mainDoc.page[1])
    }
};
function applyCSS(htmlObject, stylesheet) {
    Object.entries(stylesheet).forEach(function (_a, index) {
        var key = _a[0], value = _a[1];
        htmlObject.style[key] = value;
    });
}
var masterObjectData = {
    "name": "s",
    "identity": {},
    "linkObjectArray": [],
    "stylesheet": {
        "width": "50%",
        "height": "200px",
        "background": "grey",
        "margin": "5px"
    }
};
/** a color input */
function colorControllerCreater(controlledObject) {
    var colorArray = ["red", "blue", "green"];
    var colorInput = document.createElement("select");
    colorArray.forEach(function (p) {
        var option = document.createElement("option");
        option.value = p;
        option.innerHTML = p;
        colorInput.append(option);
    });
    colorInput.addEventListener("change", function (e) {
        controlledObject.style.background = colorInput.value;
        // access the linkObjectArray
        var masterObjectID = controlledObject.soul.identity.dataPointer;
        // let linkObjectArray = Automerge.getObjectById(mainController.mainDoc, masterObjectID)
        // console.log(115, mainController.mainDoc)
        // console.log(116, linkObjectArray["linkObjectArray"], masterObjectID)
        // controlledObject
    });
    return colorInput;
}
var masterObject = document.createElement("div");
applyCSS(masterObject, masterObjectData["stylesheet"]);
masterObject.soul = masterObjectSoul;
DatabaseHelperFunction.createNewItem(masterObject, masterObjectData, mainController["arrayID"]["page"]);
var masterObejctContainer = document.createElement("div");
masterObejctContainer.style.display = "grid";
masterObejctContainer.style.gridTemplateColumns = "1fr 1fr";
var controllerContainer = document.createElement("div");
var colorInput = colorControllerCreater(masterObject);
controllerContainer.append(colorInput);
masterObejctContainer.append(masterObject);
masterObejctContainer.append(controllerContainer);
var linkObjectSoul = {
    "identity": {}
};
var createLinkObjectButton = document.createElement("button");
createLinkObjectButton.innerText = "createLinkObjectButton";
createLinkObjectButton.addEventListener("click", function (e) {
    var linkObject = document.createElement("div");
    linkObject.classList.add("linkObject");
    linkObject.soul = linkObjectSoul;
    DatabaseHelperFunction.createLinkObject(linkObject, mainController["arrayID"]["bookmark"], masterObject.soul);
    // [_, mainController.mainDoc] = DatabaseHelperFunction.createLinkObject(linkObject, mainController["arrayID"]["bookmark"], masterObject.soul)
    var masterObjectData = DatabaseHelperFunction.accessDataFromDatabase(masterObject.soul.identity.dataPointer);
    Object.entries(masterObjectData["stylesheet"]).forEach(function (_a, index) {
        var key = _a[0], value = _a[1];
        return linkObject.style[key] = value;
    });
    document.body.append(linkObject);
});
document.body.append(masterObejctContainer, createLinkObjectButton);
