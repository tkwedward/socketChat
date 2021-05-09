"use strict";
exports.__esModule = true;
exports.createDummyData = void 0;
function createDummyData(data) {
    var _dummyData = {
        "data": data,
        "array": [],
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
        "stylesheet": {},
        "GNType": ""
    };
    var htmlObject = document.createElement("div");
    htmlObject.style.width = "300px";
    htmlObject.style.height = "200px";
    return _dummyData;
}
exports.createDummyData = createDummyData;
