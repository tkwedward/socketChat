let buttonSubFunction = document.querySelector(".buttonSubFunction")

let penButton = document.querySelector("#pen")
penButton.addEventListener("click", function(){
    // create button SubFunctions
    currentStatus.drawObject = getDrawFunctionObject(currentStatus, "polyline")
})

let selectorButton = document.querySelector("#selector")
selectorButton.addEventListener("click", function(){
    // create button SubFunctions
    currentStatus.drawObject = getDrawFunctionObject(currentStatus, "selector")
})

class CommentController {
    constructor(){
        this.commentType = ["question", "comment", "important"]
        this.createCommentSideBar() // this.commentSideBar
        this.createCommentContainer() // this.commentContainer

        this.createComment()
        this.createComment()


    }

    createCommentSideBar(){
      this.commentSideBar = document.createElement("div")
      this.commentSideBar.classList.add("commentSideBar")
      this.commentSideBar.style.width = "30vw"
      this.commentSideBar.style.height = "100vw"
      this.commentSideBar.style.position = "absolute"
      this.commentSideBar.style.right = "0px"
      this.commentSideBar.style.background = "pink"
      document.body.append(this.commentSideBar)
    }

    createCommentContainer(){
      this.commentsContainer = document.createElement("div")
      this.commentsContainer.classList.add("commentSideBar")
      this.commentsContainer.style.width = "90%"
      this.commentsContainer.style.minHeight = "100px"
      this.commentsContainer.style.marginLeft = "auto"
      this.commentsContainer.style.marginRight = "auto"
      this.commentsContainer.style.marginTop = "20px"
      this.commentSideBar.append(this.commentsContainer)
    }


    createComment(innerHTML){
        let commentItem = document.createElement("div")


        commentItem.classList.add("comment")
        commentItem.style.height = "200px"
        commentItem.style.padding = "10px"
        commentItem.style.margin = "15px 0px"
        commentItem.style.background = "yellow"
        commentItem.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        this.commentsContainer.append(commentItem)



        // if (innerHTML){
        //
        // }

    }
}
let commentController = new CommentController()


class SelectorButtonSubFunction {
    constructor(){
        this.selectorSubFunctionController = document.createElement("div")
        this.selectorSubFunctionController.classList.add("selectorSubFunctionController")
        this.selectorSubFunctionController.style.display = "inline-block"

        this.createAddCommentButton()
        this.createRemoveButton()
        this.createCopyButton()
        buttonSubFunction.append(this.selectorSubFunctionController)

    }

    createAddCommentButton(){
        let addCommentButton = document.createElement("button")
        addCommentButton.classList.add("addCommentButton")
        addCommentButton.innerHTML = "Comment"
        addCommentButton.addEventListener("click", function(){
            let commentDiv = document.createElement("div")
            commentDiv.innerHTML = "fastobject"
            console.log(commentDiv);
        })
        this.selectorSubFunctionController.append(addCommentButton)
    }

    createRemoveButton(){}

    createCopyButton(){}
}

class LineButtonSubFunction {
    constructor(){
        this.color = ["red", "blue", "green", "pink"]

        this.lineSubFunctionController = document.createElement("div")
        this.lineSubFunctionController.classList.add("lineSubFunctionController")
        this.lineSubFunctionController.style.display = "inline-block"

        this.createStrokeIncreaseAndDecreaseButton()
        this.createColorButtons()

        buttonSubFunction.append(this.lineSubFunctionController)
    }

    createStrokeIncreaseAndDecreaseButton(){
        let strokeSizeIncreaseButton = document.createElement("button")
        strokeSizeIncreaseButton.classList.add("strokeSizeIncrease")
        strokeSizeIncreaseButton.innerHTML = "+5"
        strokeSizeIncreaseButton.addEventListener("click", function(){
            currentStatus.objectToBeDrawnAttribute.strokeWidth += 5
            console.log(currentStatus.objectToBeDrawnAttribute.strokeWidth);
        })
        this.lineSubFunctionController.append(strokeSizeIncreaseButton)

        let strokeSizeDecreaseButton = document.createElement("button")
        strokeSizeDecreaseButton.classList.add("strokeSizeDecrease")
        strokeSizeDecreaseButton.innerHTML = "-5"
        strokeSizeDecreaseButton.addEventListener("click", function(){
            currentStatus.objectToBeDrawnAttribute.strokeWidth -= 5
            console.log(currentStatus.objectToBeDrawnAttribute.strokeWidth);
        })
        this.lineSubFunctionController.append(strokeSizeDecreaseButton)
    }

    createColorButtons(){
        this.color.forEach(p=>{
            let size = "20px"
            let colorButton = document.createElement("span")
            colorButton.style.display = "inline-block"
            colorButton.style.width = size
            colorButton.style.height = size
            colorButton.style.margin = "5px"
            colorButton.style.background = p
            colorButton.style.position = "relative"
            colorButton.style.top = "10px"
            colorButton.style.borderRadius = "10px"
            this.lineSubFunctionController.append(colorButton)

            colorButton.addEventListener("click", function(){
                currentStatus.objectToBeDrawnAttribute.strokeColor = p
            })
        })
    }
}
let lineButtonSubFunction = new LineButtonSubFunction()
let selectorButtonSubFunction = new SelectorButtonSubFunction()
