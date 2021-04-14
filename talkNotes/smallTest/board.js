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
f = Automerge.change(f, function (p) {
    p["page"] = [];
    p["bookmark"] = [];
    p["page"].push([
        { "name": "page", "number": 123 },
        { "name": "Queen", "number": 430 },
    ]);
    p["page"].push({ "name": "Jack", "number": 430 });
    p["page"].push({ "name": "Rashida", "number": 510 });
    p["page"].push({ "name": "Kotaro", "number": 250 });
    p["page"].push({ "friend": ["Dio", { "joan": "Chris" }] });
});
f = Automerge.change(f, function (doc) {
    var temp1 = DatabaseHelperFunction.copyObject(doc["page"][1]);
    var temp2 = DatabaseHelperFunction.copyObject(doc["page"][2]);
    doc["page"][1] = temp2;
    doc["page"][2] = temp1;
});
function mainObject(f) {
    return { "mainDoc": f, "arrayID": {} };
}
var mainController = mainObject(f);
window.mainController = mainController;
exports["default"] = mainController;
mainController["arrayID"]["page"] = Automerge.getObjectId(mainController.mainDoc.page);
mainController["arrayID"]["bookmark"] = Automerge.getObjectId(mainController.mainDoc.bookmark);
var s = document.createElement("div");
var dataS = {
    "name": "s",
    "identity": {}
};
var t = document.createElement("div");
var masterObjectSoul = {
    "identity": {
        "accessPointer": Automerge.getObjectId(mainController.mainDoc.page[1]),
        "dataPointer": Automerge.getObjectId(mainController.mainDoc.page[1])
    }
};
var masterObject = document.createElement("div");
masterObject.style.width = "50%";
masterObject.style.height = "200px";
masterObject.style.background = "grey";
masterObject.soul = masterObjectSoul;
var createLinkObjectButton = document.createElement("button");
createLinkObjectButton.innerText = "createLinkObjectButton";
createLinkObjectButton.addEventListener("click", function (e) {
    // createLinkObject(mainController["arrayID"]["bookmark"], masterObject.soul)
});
document.body.append(masterObject, createLinkObjectButton);
DatabaseHelperFunction.createNewItem(s, dataS, mainController["arrayID"]["page"]);
console.log(mainController.mainDoc["page"]);
