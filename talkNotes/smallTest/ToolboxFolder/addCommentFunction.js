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
exports.addCommentMouseDownFunction = void 0;
var CommentController = __importStar(require("../commentFolder/commentController"));
function addCommentMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("addCommentItemButton")) {
        return;
    }
    var divLayerAccessID = divLayer.getAccessPointer();
    console.log(divLayer, mainController.getObjectById(divLayerAccessID));
    var commentBox = CommentController.GNComment({ name: "commentDiv", arrayID: divLayerAccessID, saveToDatabase: true });
    console.log(divLayer, mainController.getObjectById(divLayerAccessID));
    //
    //
    divLayer.append(commentBox);
}
exports.addCommentMouseDownFunction = addCommentMouseDownFunction;
