var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AnnotationType;
(function (AnnotationType) {
    AnnotationType["Question"] = "Question";
    AnnotationType["Comment"] = "Comment";
})(AnnotationType || (AnnotationType = {}));
var AnnotationControllerButtons;
(function (AnnotationControllerButtons) {
    AnnotationControllerButtons[AnnotationControllerButtons["addButton"] = 0] = "addButton";
    AnnotationControllerButtons[AnnotationControllerButtons["deleteButton"] = 1] = "deleteButton";
})(AnnotationControllerButtons || (AnnotationControllerButtons = {}));
let placeholder = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim<span class="resizable"><img src="https://i.pinimg.com/474x/ea/8c/ef/ea8cef79f2a00b3c8ec02fcbef86d9d7--pokemon-silver-needlepoint-patterns.jpg"></span>  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `;
let placeholder2 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat<img src=\"https://i.pinimg.com/474x/ea/8c/ef/ea8cef79f2a00b3c8ec02fcbef86d9d7--pokemon-silver-needlepoint-patterns.jpg\"> non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
class AnnotationController {
}
AnnotationController.HtmlObject = document.querySelector(".annotationsController");
AnnotationController.addButton = document.querySelector(".add");
let annotationAddButton = MainController.createButton("add", "addButton", e => {
    let newAnnotation = new Annotations();
});
let annotationSaveButton = MainController.createButton("save", "saveButton", e => {
    // Annotations.ANNOTATION_ARRAY.forEach(p=>console.log(p))
    Annotations.save();
});
MainController.mainHTMLContainer.append(annotationAddButton, annotationSaveButton);
class Annotations {
    constructor() {
        this.content = "";
        this.AnnotationType = AnnotationType.Comment;
        this.id = Annotations.ID_COUNTER;
        Annotations.ID_COUNTER += 1;
        this.AnnotationType = AnnotationType.Comment;
        this.commentHTMLObject = this.createHTMLObject();
    }
    static addToArray(annotation) {
        Annotations.ANNOTATION_ARRAY.push(annotation);
    }
    static save() {
        Promise.all(Annotations.ANNOTATION_ARRAY.map(p => {
            let imgArray = p.commentHTMLObject.querySelectorAll("img");
            imgArray.forEach((p, i) => {
                p.onload = function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield "finish";
                    });
                };
                p.src = "https://static.pokemonpets.com/images/monsters-images-300-300/1-Bulbasaur.png";
            });
        })).then((resolve) => {
            Annotations.ANNOTATION_ARRAY.forEach(p => {
                let commentsArray = p.commentHTMLObject.querySelectorAll(".commentContent");
                let saveData = {
                    id: 0,
                    annotationArray: []
                };
                saveData.id = p.id;
                saveData.annotationArray = Array.from(commentsArray).map(p => {
                    return {
                        "type": p.getAttribute("contentType"),
                        "innerHTML": p.innerHTML
                    };
                });
                console.log(saveData);
            });
        });
    }
    createHTMLObject() {
        let htmlObject = MainController.createElement("div", "commentContainer", {
            "background": "pink",
            "padding": "10px",
            "margin": "10px 0px"
        });
        // create comment type selector
        let annotationButtonController = MainController.createElement("div", "AnnotationButtonController");
        let annotationTypeHtmlObject = MainController.createElement("select", "AnnotationType");
        for (let x in AnnotationType) {
            let option = document.createElement("option");
            option.value = x;
            option.innerText = x;
            console.log(this.AnnotationType.valueOf(), x);
            console.log(this.AnnotationType.valueOf() == x);
            if (this.AnnotationType.valueOf() == x) {
                option.selected = true;
            }
            annotationTypeHtmlObject.append(option);
        }
        let processImageButton = MainController.createButton("processImage", "processImage", (e) => {
            let imgArray = htmlObject.querySelectorAll("img");
            imgArray.forEach(p => {
                let imgParent = p.parentElement;
                if (!imgParent.classList.contains("resizable")) {
                    let resizableContainer = MainController.createElement("div", "resizable");
                    imgParent.insertBefore(resizableContainer, p);
                    resizableContainer.append(p);
                }
            });
        });
        let addReplyButton = MainController.createButton("button", "replyButton", (e) => {
            let replyContent = this.createAnnotationContent("reply");
            replyContent.innerHTML = placeholder2;
            htmlObject.append(replyContent);
        });
        addReplyButton.innerHTML = "addReply";
        annotationButtonController.append(annotationTypeHtmlObject, addReplyButton, processImageButton);
        // the comment object
        let commentContentHtmlObject = this.createAnnotationContent("first");
        htmlObject.append(annotationButtonController, commentContentHtmlObject);
        commentContentHtmlObject.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                event.preventDefault();
                console.log("You hit enter");
            }
        });
        // commentObject buttons
        MainController.mainHTMLContainer.append(htmlObject);
        Annotations.addToArray(this);
        return htmlObject;
    }
    createAnnotationContent(type) {
        let commentContentHtmlObject = MainController.createElement("div", ["commentContent", type]);
        commentContentHtmlObject.setAttribute("contentType", type);
        commentContentHtmlObject.innerHTML = placeholder;
        commentContentHtmlObject.contentEditable = "true";
        return commentContentHtmlObject;
    }
}
Annotations.ID_COUNTER = 0;
Annotations.ANNOTATION_ARRAY = [];
let testAnnotation = new Annotations();
