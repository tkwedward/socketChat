class MainController {
    static mainHTMLContainer: HTMLElement = document.querySelector("#mainContainer")


    public static createElement(ele: string, className: string|string[], attribute?: object): HTMLElement {
      let htmlObject = document.createElement(ele)
      if (typeof className == "string"){
          htmlObject.classList.add(className)
      } else {
          className.forEach(p=>htmlObject.classList.add(p))
      }


      if (attribute){
        Object.entries(attribute).forEach(p=>{
            let attr = p[0]
            let value = p[1]
            htmlObject.style.setProperty(attr, value)
        })
      }
      return htmlObject
    }

    public static createButton(innerText:string, className: string, buttonAction: (e: Event)=>void): HTMLElement{
        let button = document.createElement("button")
        button.innerText = innerText
        button.classList.add(className)
        button.addEventListener("click", buttonAction)
        return button
    }
}
