import {GNObjectInterface, GNInputField, GNContainerDivInterface, GNDropdownListInterface, GNInputFieldInterface, GNButtonInterface, applyStyleHelperFunction} from "./GreatNoteDataClass"



export interface GNControllerInterface extends  GNContainerDivInterface{
    /** to get the controlledObject passed when click event happened and something is selected*/
    getControlledObject(any)
    // "controllerItemList": GNControllerItemInterface[]
}

export function GNControllerItem(controllerObject: any,  eventType: string, controlledObject?: any):GNDropdownListInterface | GNInputFieldInterface | GNButtonInterface {
    controllerObject.addEventListener(eventType, controllerObject.controllerEvent)
    controllerObject.controlledObject = controlledObject

    return controllerObject
}

export interface GNImageControllerInterface extends GNControllerInterface{
    imgWidthController: any,
    imgHeightController: any,
    imgTransparencyController: any,
    imgRotationController?:any
}

export function GNController(_name:string, _parent?:any) : GNControllerInterface {
    let _object = <GNControllerInterface> document.createElement("div");
    _object.classList.add(_name)

    // internal properties
    _object._name = _name
    _object._type = GNController.name
    _object._styleList = {
      "height": "150px",
      "background": "silver",
      "margin": "10px"
    }

    _object.appendElements = function(...childrenList){
        childrenList.forEach(p=>{
            p._parent = _object
            _object.appendChild(p)
        })

    }

    // functions
    _object.update = (data) => {data}
    _object.extract = () => 123


    // events
    _object.addEventListener("eventName", (e)=>{
        // do something

    })

    // do something before return
    applyStyleHelperFunction(_object, _object._styleList)

    return _object
}

/** to create GNImageController*/
export function GNImageController(_name:string, _parent?:any) : GNImageControllerInterface {
    let _object = <GNImageControllerInterface> GNController(_name);

    // internal properties
    _object._name = _name
    _object._type = GNImageController.name

    // functions
    _object.getControlledObject = function(target){
      _object.controlledObject = target
    }
    _object.update = (data) => {data}
    _object.extract = () => 123


    _object.addEventListener("eventName", (e)=>{
        // do something
    })


    /* part 2: controllers
        // a)  create width controller
        // b)  create height controller
        // c) create transparency controller
        // d) creatte rotation controller
    */

    // a)  create width controller
    let imgWidthInputController = GNInputField("imgWidthController")
    imgWidthInputController.controllerEvent = function(e){
        if (_object.controlledObject){
            _object.controlledObject.style.width = imgWidthInputControllerItem.value + "px"
        } else {
            console.log("please select an item")
        }
    }
    let imgWidthInputControllerItem = <GNInputFieldInterface> GNControllerItem(imgWidthInputController, "input")


    // b)  create height controller


    // c) create transparency controller

    // d) creatte rotation controller



    // add item to the controller
    _object.appendElements(imgWidthInputControllerItem)

    return _object
}



export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {

}

export function GNTemplate(_name:string, _parent?:any) : GNObjectInterface {
    let _object = <GNContainerDivInterface> document.createElement("div");

    // internal properties
    _object._name = _name
    _object._type = GNTemplate.name

    // functions
    _object.update = (data) => {data}
    _object.extract = () => 123

    _object.addEventListener("eventName", (e)=>{
        // do something

    })

    return _object
}
