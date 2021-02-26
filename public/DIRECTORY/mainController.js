class MainController {
    static createElement(ele, className, attribute) {
        let htmlObject = document.createElement(ele);
        if (typeof className == "string") {
            htmlObject.classList.add(className);
        }
        else {
            className.forEach(p => htmlObject.classList.add(p));
        }
        if (attribute) {
            Object.entries(attribute).forEach(p => {
                let attr = p[0];
                let value = p[1];
                htmlObject.style.setProperty(attr, value);
            });
        }
        return htmlObject;
    }
    static createButton(innerText, className, buttonAction) {
        let button = document.createElement("button");
        button.innerText = innerText;
        button.classList.add(className);
        button.addEventListener("click", buttonAction);
        return button;
    }
}
MainController.mainHTMLContainer = document.querySelector("#mainContainer");
