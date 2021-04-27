import {GNObjectInterface, GNContainerDivInterface, CreateGreatNoteObjectInterface, GNContainerDiv, GNEditableDiv} from "../GreatNoteDataClass"

export interface CommentContainerInterface extends GNContainerDivInterface{
    // to create the comment object and append to the container
    createCommentObject(createData: CreateGreatNoteObjectInterface)
    createReplyObject(createData: CreateGreatNoteObjectInterface)
}

export function GNComment(createData: CreateGreatNoteObjectInterface) : GNContainerDivInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData} = createData

    let _commentContainer = <CommentContainerInterface> GNContainerDiv({name:"commentDiv", saveToDatabase:false})
    _commentContainer.GNType = GNComment.name
    _commentContainer.classList.add("_commentContainer")

    _commentContainer.createCommentObject = function(createData: CreateGreatNoteObjectInterface): GNObjectInterface{
        let _commentObject = GNContainerDiv(createData)
        _commentObject.specialGNType = "GNCommentObject"
        _commentObject.appendTo(_commentContainer)
        return _commentObject
    }

    _commentContainer.createReplyObject = function(createData: CreateGreatNoteObjectInterface):GNObjectInterface{
        let _replyObject = GNContainerDiv(createData)
        _replyObject.specialGNType = "GNReplyObject"
        _replyObject.appendTo(_commentContainer)
        return _replyObject
    }

    if (injectedData){
        // if there are data, loop each object and create
        injectedData["array"].forEach(p=>{
            let newObject
            if (p.specialGNType == "GNCommentObject"){
                newObject = _commentContainer.createCommentObject({name: ""})
                newObject.initializeHTMLObjectFromData(p)
            }

            if (p.specialGNType == "GNCommentObject"){
                newObject = _commentContainer.createReplyObject({name: "", injectedData: p})
                newObject.initializeHTMLObjectFromData(p)
            }
        })
    } else {
        let _commentObject = _commentContainer.createCommentObject({name: ""})
        _commentObject.innerHTML = "commentDiv commentDiv commentDiv commentDiv commentDiv"

        let _replyObject = _commentContainer.createReplyObject({name: ""})
        _replyObject.innerHTML = "reply reply reply reply reply"

        if (saveToDatabase){
            _commentContainer.addToDatabase(arrayID)
            let _commentContainerID = _commentContainer._identity.accessPointer

            _commentObject.addToDatabase(_commentContainerID)
            _replyObject.addToDatabase(_commentContainerID)
        }

    }






    return _commentContainer
}
