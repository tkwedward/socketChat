import {GNContainerDiv} from "../GreatNoteClass/GreatNoteDataClass"
import {GNObjectInterface, GNContainerDivInterface, CreateGreatNoteObjectInterface} from "../GreatNoteClass/GreatNoteObjectInterface"

export interface CommentContainerInterface extends GNContainerDivInterface{
    // to create the comment object and append to the container
    createCommentObject(createData: CreateGreatNoteObjectInterface)
    createReplyObject(createData: CreateGreatNoteObjectInterface)
}


export function loadFromData(_commentContainer, injectedData){
    _commentContainer._identity = injectedData._identity
    _commentContainer.setAttribute("accessPointer", injectedData._identity.accessPointer)

    if (injectedData.classList) injectedData.classList.forEach(className=>{
      // add class name if the object does not have the class naame
        if (!_commentContainer.classList.contains(className)){
            _commentContainer.classList.add(className)
        }  else { return }
    }) // add classList

    if (injectedData.stylesheet){
      _commentContainer.applyStyle(injectedData.stylesheet, false)
    }
}


export function createCommentObject(_commentContainer, createData){
  let {arrayID, saveToDatabase, injectedData}  = createData

  let _commentObject = GNContainerDiv(createData)
  console.log(323232, _commentObject, createData)
  _commentObject.classList.add("commentField")
  // _commentObject.classList.add("commentField")
  // _commentObject.specialGNType = "GNCommentObject"
  _commentObject.contentEditable = "true"

  // when nit is not injectdData, then initialize the html
  if (!injectedData) {
    _commentObject.textContent = "create CommentDiv"
  }

  _commentObject.appendTo(_commentContainer)
  return _commentObject
}


//@auto-fold here
export function addEventToCommentContainer(commentContainer){
    commentContainer.addEventListener("click", function(e){
        e.stopPropagation()
    })
}


//@auto-fold here
export function addCommentController(_commentContainer: CommentContainerInterface){
    let controller =  document.createElement("div")
    controller.classList.add("commentController")

    // add comment button
    let addCommentButton = document.createElement("button")
    addCommentButton.classList.add("addCommentButton")
    addCommentButton.innerText = "add Comment"

    addCommentButton.addEventListener("click", (e)=>{
        let newCommentField = _commentContainer.createCommentObject({"name": "", arrayID: _commentContainer.getAccessPointer(), saveToDatabase:true})
        newCommentField.saveHTMLObjectToDatabase()
    })

    // delete comment button
    let deleteCommentButton = document.createElement("button")
    deleteCommentButton.classList.add("deleteCommentButton")
    deleteCommentButton.innerText = "delete Comment"
    deleteCommentButton.addEventListener("click", (e)=>{
        _commentContainer.deleteFromDatabase()
    })

    // add objects to htmlObject
    controller.append(addCommentButton, deleteCommentButton)

    _commentContainer.insertBefore(controller, _commentContainer.firstChild)
}
