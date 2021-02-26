interface IAnnotations {
    id: number
    content: string
    commentHTMLObject: HTMLElement

    createHTMLObject():HTMLElement
}

interface AnnotationSaveDataStructure{
  id: number,
  annotationArray: {"type": string, "innerHTML": string}[]
}

enum AnnotationType {
    Question = "Question",
    Comment = "Comment"
}

enum AnnotationControllerButtons {
    addButton,
    deleteButton
}

let placeholder = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim<span class="resizable"><img src="https://i.pinimg.com/474x/ea/8c/ef/ea8cef79f2a00b3c8ec02fcbef86d9d7--pokemon-silver-needlepoint-patterns.jpg"></span>  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `
let placeholder2 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat<img src=\"https://i.pinimg.com/474x/ea/8c/ef/ea8cef79f2a00b3c8ec02fcbef86d9d7--pokemon-silver-needlepoint-patterns.jpg\"> non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class AnnotationController {
    public static HtmlObject: HTMLElement = document.querySelector(".annotationsController")

    public static addButton: HTMLElement = document.querySelector(".add")
}

let annotationAddButton = MainController.createButton("add", "addButton", e => {
    let newAnnotation = new Annotations()
})


let annotationSaveButton = MainController.createButton("save", "saveButton", e => {
    // Annotations.ANNOTATION_ARRAY.forEach(p=>console.log(p))
    Annotations.save()
})

MainController.mainHTMLContainer.append(annotationAddButton, annotationSaveButton)

class Annotations implements IAnnotations{
      private static ID_COUNTER: number = 0;
      public static ANNOTATION_ARRAY: IAnnotations[] = []

      public static addToArray(annotation: Annotations){
        Annotations.ANNOTATION_ARRAY.push(annotation)
      }

      public static save(){
        Promise.all(
          Annotations.ANNOTATION_ARRAY.map(p=>{
            let imgArray = p.commentHTMLObject.querySelectorAll("img")
            imgArray.forEach((p, i)=>{
                p.onload = async function(){
                  return await "finish"
                }
                p.src = "https://static.pokemonpets.com/images/monsters-images-300-300/1-Bulbasaur.png"
            })
          })
        ).then((resolve)=>{
          Annotations.ANNOTATION_ARRAY.forEach(p=>{
              let commentsArray = p.commentHTMLObject.querySelectorAll(".commentContent")

              let saveData: AnnotationSaveDataStructure = {
                id: 0,
                annotationArray: []
              }

              saveData.id = p.id
              saveData.annotationArray =  Array.from(commentsArray).map(p=>{
                return {
                  "type": p.getAttribute("contentType"),
                  "innerHTML": p.innerHTML
                }
              })
              console.log(saveData)
          })
        })
      }

      id: number
      content: string = ""
      AnnotationType: AnnotationType = AnnotationType.Comment
      commentHTMLObject: HTMLElement

      constructor(){
          this.id = Annotations.ID_COUNTER;
          Annotations.ID_COUNTER += 1;
          this.AnnotationType = AnnotationType.Comment
          this.commentHTMLObject = this.createHTMLObject()
      }

      createHTMLObject():HTMLElement{
          let htmlObject = MainController.createElement("div", "commentContainer", {
            "background": "pink",
            "padding": "10px",
            "margin": "10px 0px"
          })

          // create comment type selector
          let annotationButtonController = MainController.createElement("div", "AnnotationButtonController")

          let annotationTypeHtmlObject = MainController.createElement("select", "AnnotationType")
          for (let x in AnnotationType){
            let option = document.createElement("option")
            option.value = x
            option.innerText = x
            console.log(this.AnnotationType.valueOf(), x)
            console.log(this.AnnotationType.valueOf() == x)
            if (this.AnnotationType.valueOf() == x){
              option.selected = true
            }
            annotationTypeHtmlObject.append(option)
          }


          let processImageButton = MainController.createButton("processImage", "processImage", (e)=>{
              let imgArray = htmlObject.querySelectorAll("img")
              imgArray.forEach(p=>{
                let imgParent = p.parentElement
                if (!imgParent.classList.contains("resizable")){
                  let resizableContainer = MainController.createElement("div", "resizable")
                  imgParent.insertBefore(resizableContainer, p)
                  resizableContainer.append(p)
                }
              })
          })

          let addReplyButton = MainController.createButton("button", "replyButton", (e)=>{
            let replyContent = this.createAnnotationContent("reply")
            replyContent.innerHTML = placeholder2
            htmlObject.append(replyContent)
          })
          addReplyButton.innerHTML = "addReply"

          annotationButtonController.append(annotationTypeHtmlObject, addReplyButton, processImageButton)

          // the comment object
          let commentContentHtmlObject = this.createAnnotationContent("first")
          htmlObject.append(annotationButtonController, commentContentHtmlObject)
          commentContentHtmlObject.addEventListener("keyup", function(e){
            if (e.keyCode === 13) {
              event.preventDefault();
              console.log("You hit enter")
            }
          })


          // commentObject buttons
          MainController.mainHTMLContainer.append(htmlObject)
          Annotations.addToArray(this)

          return htmlObject
      }

      createAnnotationContent(type:string){
        let commentContentHtmlObject = MainController.createElement("div", ["commentContent", type])
        commentContentHtmlObject.setAttribute("contentType", type)
        commentContentHtmlObject.innerHTML = placeholder
        commentContentHtmlObject.contentEditable = "true"

        return commentContentHtmlObject
      }
}

let testAnnotation = new Annotations()
