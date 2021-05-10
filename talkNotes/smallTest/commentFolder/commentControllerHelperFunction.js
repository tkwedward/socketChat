"use strict";
exports.__esModule = true;
exports.addCommentController = exports.addEventToCommentContainer = exports.createCommentObject = exports.loadFromData = void 0;
var GreatNoteDataClass_1 = require("../GreatNoteClass/GreatNoteDataClass");
var GNDropdownList_1 = require("../GreatNoteClass/GNDropdownList");
function loadFromData(_commentContainer, injectedData) {
    _commentContainer._identity = injectedData._identity;
    _commentContainer.setAttribute("accessPointer", injectedData._identity.accessPointer);
    if (injectedData.classList)
        injectedData.classList.forEach(function (className) {
            // add class name if the object does not have the class naame
            if (!_commentContainer.classList.contains(className)) {
                _commentContainer.classList.add(className);
            }
            else {
                return;
            }
        }); // add classList
    if (injectedData.stylesheet) {
        _commentContainer.applyStyle(injectedData.stylesheet, false);
    }
}
exports.loadFromData = loadFromData;
function createCommentObject(_commentContainer, createData) {
    var arrayID = createData.arrayID, saveToDatabase = createData.saveToDatabase, injectedData = createData.injectedData;
    var _commentObject = GreatNoteDataClass_1.GNContainerDiv(createData);
    _commentObject.classList.add("commentObject");
    _commentObject.specialGNType = "GNCommentObject";
    // commentContent
    var _commentContent = GreatNoteDataClass_1.GNContainerDiv({
        name: "commentContent",
        arrayID: _commentObject.getAccessPointer(), contentEditable: true,
        saveToDatabase: saveToDatabase
    });
    _commentContent.contentEditable = "true";
    _commentContent.classList.add("commentField");
    // _commentType
    var _commentType = GNDropdownList_1.GNDropdownList({
        name: "commentType",
        arrayID: _commentObject.getAccessPointer(),
        statusList: ["reply", "comment"],
        saveToDatabase: saveToDatabase
    });
    //
    if (injectedData) {
        console.log(45, "injected", injectedData["array"][1]);
        _commentType.loadFromData(injectedData["array"][0]);
        _commentContent.loadFromData(injectedData["array"][1]);
    }
    _commentType.classList.add("commentType");
    _commentType.style.display = "block";
    console.log(636363, _commentContent, _commentType);
    //   when nit is not injectdData, then initialize the html
    if (!injectedData) {
        // _commentObject.textContent = "creaaated by intiaal"
    }
    _commentObject.append(_commentType, _commentContent);
    // _commentObject.append(_commentType, _commentContent)
    _commentObject.appendTo(_commentContainer);
    return _commentObject;
}
exports.createCommentObject = createCommentObject;
//@auto-fold here
function addEventToCommentContainer(commentContainer) {
    commentContainer.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}
exports.addEventToCommentContainer = addEventToCommentContainer;
//@auto-fold here
function addCommentController(_commentContainer) {
    var controller = document.createElement("div");
    controller.classList.add("commentController");
    // add comment button
    var addCommentButton = document.createElement("button");
    addCommentButton.classList.add("addCommentButton");
    addCommentButton.innerText = "add Comment";
    addCommentButton.addEventListener("click", function (e) {
        var newCommentField = _commentContainer.createCommentObject({ "name": "", arrayID: _commentContainer.getAccessPointer(), saveToDatabase: true, contentEditable: false });
        newCommentField.saveHTMLObjectToDatabase();
    });
    // delete comment button
    var deleteCommentButton = document.createElement("button");
    deleteCommentButton.classList.add("deleteCommentButton");
    deleteCommentButton.innerText = "delete Comment";
    deleteCommentButton.addEventListener("click", function (e) {
        _commentContainer.deleteFromDatabase();
    });
    // add objects to htmlObject
    controller.append(addCommentButton, deleteCommentButton);
    _commentContainer.insertBefore(controller, _commentContainer.firstChild);
}
exports.addCommentController = addCommentController;
