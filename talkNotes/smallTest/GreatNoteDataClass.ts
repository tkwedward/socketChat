export function applyStyleHelperFunction(_object, styleList:{}|{}[], stylechoice?:any){
  if (stylechoice){
    Object.entries(styleList[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
  } else {
    Object.entries(styleList).forEach(([key, value], _)=>{_object.style[key] = value})
  }
}

export interface GNObjectInterface {
    update?(data)
    extract?():any
    controlledObject?:any
    controllerEvent?:any

    _identity?: {
      "accessPointer": string,
      "dataPointer": string
    }
    _styleList?: {}
    _type: string
    _name: string // a name to describe the object
}

interface HTMLElement {
    applyStyle?()
}

// GNInputFieldInterface
export interface GNInputFieldInterface extends GNObjectInterface, HTMLInputElement {
    _parent?:any
}

export function GNInputField(_name:string) : GNInputFieldInterface {
    let _object = <GNInputFieldInterface> document.createElement("input");

    _object._type = GNInputField.name

    console.log(_object._type)

    _object._name = _name

    _object.update = (data)=>{ _object.value = data }

    _object.extract = () => _object.value

    _object.addEventListener("input", (e)=>{
        let newData = _object.extract()
        _object._parent.receiveDataFromChild(newData)
    })

    return _object
}

// GNButtonInterface
export interface GNButtonInterface extends HTMLButtonElement, GNObjectInterface {
    _parent?: any
    status: any
    statusList: string[]
    event(e)
}

export function GNButton(_name:string, statusList: string[], event:(any)=>void, _parent?:any):GNButtonInterface{
    let _object = <GNButtonInterface> document.createElement("button");

    _object._name = _name

    _object._type = GNButton.name

    _object.statusList = statusList

    _object.innerHTML = statusList[0]

    _object.event = event

    _object.update = (data) => { _object.innerHTML = data }

    _object.extract = ()=>_object.innerHTML

    // a user define array
    _object.addEventListener("click", _object.event)
    _object.addEventListener("click", ()=>{
      let newData = _object.extract()
      console.log(newData)
      _object._parent.receiveDataFromChild(newData)
    })


    return _object
}

// GNEditableDivInterface
export interface GNEditableDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any
}

export function GNEditableDiv(_name:string, _parent?:any) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> document.createElement("div");
    _object.contentEditable = "true"

    _object._name = _name
    _object._parent = _parent
    _object._type = GNEditableDiv.name

    _object.update = (data) => {_object.innerHTML = data}
    _object.extract = () => _object.innerHTML

    _object.addEventListener("input", (e)=>{
        _object._parent.extract()
    })

    return _object
}


export interface GNContainerDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any
    childrenList?: {string:GNObjectInterface}|{}
    update(data)
    extract(): any
    appendElements(...any)
}


export function GNContainerDiv(_parent?):GNContainerDivInterface{
    let _object = <GNContainerDivInterface> document.createElement("div");
    _object.childrenList = {}

    _object._type = GNContainerDiv.name

    _object.appendElements = function(...childrenArray){
          childrenArray.forEach(p=>{
              _object.appendChild(p)
              _object.childrenList[p._name] = p
              p._parent = _object
          })
          console.log(Object.entries(_object.childrenList))
    }

    _object.update = function (data){
        Object.values(_object.childrenList).forEach(p=>p.update(data[p._name]))
    }

    _object.extract = function (){
        let dataObject = {}
        Object.entries(_object.childrenList).forEach(([key, value], index) => {
            // let _value = <GNObjectInterface>value
            dataObject[key] = value.extract()
        })

        _object.style.background = dataObject["colorInputField"]
        console.log(dataObject)
    }

    return _object

}

export interface GNImageInterface extends GNObjectInterface, HTMLImageElement {
    _name:string

}

export function GNImage(_name, imgsrc):GNImageInterface{
    let _object = <GNImageInterface> document.createElement("img");

    _object._name = _name
    _object.src = imgsrc
    _object._type = GNImage.name
    _object.style.width = "60%"

    _object.update = (data) => {data}
    _object.extract = () => 123

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
}


export interface GNPageInterface extends GNContainerDivInterface {
    styleList: {}[]
    applyStyle(any?)
}

export function GNDivPage(_name:string, _parent?:any) : GNPageInterface {
    let _object = <GNPageInterface> GNContainerDiv();

    // internal properties
    _object._name = _name
    _object._type = GNImage.name
    _object.styleList = []
    _object.styleList[0] = {
        "height": "400px",
        "background": "lightgreen"
    }
    _object.styleList[1] = {
        "height": "50vh",
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr 1fr",
        "gridGap": "10px",
        "gridBorder": "1px black solid"
    }

    _object.appendElements = function(...childrenList){

        childrenList.forEach(p=>{
            let gridItem = document.createElement("div")
            gridItem.style.border = "1px black solid"
            gridItem.style.width = "100%"
            gridItem.style.height = "100%"
            gridItem.appendChild(p)
            _object.appendChild(gridItem)
            _object.childrenList[p._name] = p
            p._parent = _object
            p.classList.add(`page_item_${_object._name}_${p._type}`)
        })
        console.log(Object.entries(_object.childrenList))
    }

    /** apply the styleList to the HTMLObject */
    _object.applyStyle = function(stylechoice){
        Object.entries(_object.styleList[stylechoice]).forEach(([key, value], _)=>{_object.style[key] = value})
    }

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    // do something before the object is returned
    _object.applyStyle(1)

    console.log(_object)

    return _object
}

export interface GNDropdownListInterface extends GNObjectInterface{

}





export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {

}

export function GNTemplate(_name:string, _parent?:any) : GNEditableDivInterface {
    let _object = <GNEditableDivInterface> document.createElement("div");

    // internal properties
    _object._name = _name
    _object._type = GNImage.name




    // functions
    _object.update = (data) => {data}
    _object.extract = () => 123

    _object.addEventListener("eventName", (e)=>{
        // do something
    })

    return _object
}
