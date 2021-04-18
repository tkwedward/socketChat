interface ToolBoxInterface extends HTMLDivElement{
    itemArray: any[]       // to mark the status of the button
    createToolBoxItem(name:string):void    // to create an item
}

interface ToolBoxItemInterface extends HTMLDivElement{
    status: boolean       // to mark the status of the button
    resetButton()         // to reset the button when other buttons aare clked
}

export class ToolBoxClass {
    constructor(){

    }

    createToolboxHtmlObject(){
        let self = this
        let toolBoxHtmlObject = <ToolBoxInterface>document.createElement("div")
        toolBoxHtmlObject.classList.add("toolBoxHtml")
        toolBoxHtmlObject.style.height = "200px"
        toolBoxHtmlObject.style.background = "silver"
        toolBoxHtmlObject.style.width = "90%"
        toolBoxHtmlObject.style.margin = "10px auto"


        toolBoxHtmlObject.itemArray = []

        toolBoxHtmlObject.createToolBoxItem = function(name){
            let toolBoxItem = self.createToolBoxItem(name, toolBoxHtmlObject)
            toolBoxHtmlObject.itemArray.push(toolBoxItem)
            toolBoxHtmlObject.appendChild(toolBoxItem)
        }

        return toolBoxHtmlObject
    }

    createToolBoxItem(name, toolBoxHtmlObject){
        let toolBoxItem = <ToolBoxItemInterface> document.createElement("div")
        // the html style part
        toolBoxItem.classList.add("toolBoxItem")
        toolBoxItem.innerText = name[0]
        toolBoxItem.style.background = "gold"
        toolBoxItem.style.display = "flex"
        toolBoxItem.style.margin = "10px 5px"
        toolBoxItem.style["align-items"] = "center"
        toolBoxItem.style["justify-content"] = "center"
        let squreLength = "40px"
        toolBoxItem.style.width = squreLength
        toolBoxItem.style.height = squreLength


        // internaal variable part
        toolBoxItem.status = false

        toolBoxItem.resetButton = function(){
            toolBoxItem.status = false
        }

        toolBoxItem.addEventListener("click", function(){

        })
        return toolBoxItem
    }
}
