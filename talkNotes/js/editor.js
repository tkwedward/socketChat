class myRichTestEditor {
    constructor(arg){
        this.testTextArea = arg.selector

        this.defaultElements = [
          { command: "bold", type: "button", innerHTML: "button" },
          { command: "italic", type: "button", innerHTML: "italic" },
          { command: "underline", type: "button", innerHTML: "underline" },
          { command: "strikeThrough", type: "button", innerHTML: "strike" },
          { command: "justifyCenter", type: "button", innerHTML: "justify Center" },
          { command: "justifyFull", type: "button", innerHTML: "justify Full" },
          { command: "justifyLeft", type: "button", innerHTML: "justify Left" },
          { command: "justifyRight", type: "button", innerHTML: "justify Right" },
        ]

        var container = document.createElement("div")
        container.setAttribute("id", "myRichTextEditorFieldContainer")
        container.appendAfter(this.testTextArea)
        this.testTextArea.style.display = "none"

        var editorController = document.createElement("div")
        container.append(editorController)

        var contentEditable = document.createElement("iframe");
        contentEditable.setAttribute("name", "myRichTextEditorField");
        contentEditable.setAttribute("id", "myRichTextEditorField");
        contentEditable.style.width = "100%"
        contentEditable.style.border = "solid 1px lightgrey"
        container.appendChild(contentEditable)

        contentEditable.contentDocument.designMode = "on"

        this.defaultElements.forEach((p, i)=>{
            let item = document.createElement(p.type)
            console.log(item);
            item.innerHTML = p.innerHTML
            editorController.append(item)
        })


    }





}
