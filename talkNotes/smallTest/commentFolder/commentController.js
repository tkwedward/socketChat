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
exports.GNComment = void 0;
var GreatNoteDataClass_1 = require("../GreatNoteClass/GreatNoteDataClass");
var CommentControlerHelperFunction = __importStar(require("./commentControllerHelperFunction"));
//@auto-fold here
function GNComment(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage, injectedData = createData.injectedData;
    var _commentContainer = GreatNoteDataClass_1.GNContainerDiv({ name: "commentDiv", saveToDatabase: false });
    _commentContainer.GNType = GNComment.name;
    _commentContainer.classList.add("_commentContainer");
    if (arrayID && saveToDatabase) {
        _commentContainer.addToDatabase(arrayID);
        _commentContainer.saveHTMLObjectToDatabase();
    }
    //@auto-fold here
    _commentContainer.createCommentObject = function (createData) {
        return CommentControlerHelperFunction.createCommentObject(_commentContainer, createData);
    };
    _commentContainer.loadFromData = function (injectedData) {
        CommentControlerHelperFunction.loadFromData(_commentContainer, injectedData);
    }; // _commentContainer.loadFromData
    //@auto-fold here
    if (injectedData) {
        // if there are data, loop each object and create
        console.log(323232, "inject data");
        _commentContainer.loadFromData(injectedData);
        // ****************************
        // render the comments inside
        // ****************************
        injectedData["array"].forEach(function (p) {
            var newObject = _commentContainer.createCommentObject({ name: "", injectedData: p });
            // newObject.initializeHTMLObjectFromData(p)
        });
    }
    else {
        var newCommentField = _commentContainer.createCommentObject({ "name": "", arrayID: _commentContainer.getAccessPointer(), saveToDatabase: true });
        newCommentField.saveHTMLObjectToDatabase();
    } // if not injectedData
    CommentControlerHelperFunction.addEventToCommentContainer(_commentContainer);
    CommentControlerHelperFunction.addCommentController(_commentContainer);
    return _commentContainer;
}
exports.GNComment = GNComment;
