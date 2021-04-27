"use strict";
exports.__esModule = true;
exports.GNComment = void 0;
var GreatNoteDataClass_1 = require("../GreatNoteDataClass");
function GNComment(createData) {
    var name = createData.name, arrayID = createData.arrayID, insertPosition = createData.insertPosition, dataPointer = createData.dataPointer, saveToDatabase = createData.saveToDatabase, specialCreationMessage = createData.specialCreationMessage, injectedData = createData.injectedData;
    var _commentContainer = GreatNoteDataClass_1.GNContainerDiv({ name: "commentDiv", saveToDatabase: false });
    _commentContainer.GNType = GNComment.name;
    _commentContainer.classList.add("_commentContainer");
    _commentContainer.createCommentObject = function (createData) {
        var _commentObject = GreatNoteDataClass_1.GNContainerDiv(createData);
        _commentObject.specialGNType = "GNCommentObject";
        _commentObject.appendTo(_commentContainer);
        return _commentObject;
    };
    _commentContainer.createReplyObject = function (createData) {
        var _replyObject = GreatNoteDataClass_1.GNContainerDiv(createData);
        _replyObject.specialGNType = "GNReplyObject";
        _replyObject.appendTo(_commentContainer);
        return _replyObject;
    };
    if (injectedData) {
        // if there are data, loop each object and create
        injectedData["array"].forEach(function (p) {
            var newObject;
            if (p.specialGNType == "GNCommentObject") {
                newObject = _commentContainer.createCommentObject({ name: "" });
                newObject.initializeHTMLObjectFromData(p);
            }
            if (p.specialGNType == "GNCommentObject") {
                newObject = _commentContainer.createReplyObject({ name: "", injectedData: p });
                newObject.initializeHTMLObjectFromData(p);
            }
        });
    }
    else {
        var _commentObject = _commentContainer.createCommentObject({ name: "" });
        _commentObject.innerHTML = "commentDiv commentDiv commentDiv commentDiv commentDiv";
        var _replyObject = _commentContainer.createReplyObject({ name: "" });
        _replyObject.innerHTML = "reply reply reply reply reply";
        if (saveToDatabase) {
            _commentContainer.addToDatabase(arrayID);
            var _commentContainerID = _commentContainer._identity.accessPointer;
            _commentObject.addToDatabase(_commentContainerID);
            _replyObject.addToDatabase(_commentContainerID);
        }
    }
    return _commentContainer;
}
exports.GNComment = GNComment;
