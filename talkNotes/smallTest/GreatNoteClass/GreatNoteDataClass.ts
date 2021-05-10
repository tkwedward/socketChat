
import {GNObjectInterface, GNInputFieldInterface, CreateGreatNoteObjectInterface, GNButtonInterface, GNImageContainerInterface, GNContainerDivInterface, superGNObjectInterface} from "./GreatNoteObjectInterface"
import {superGNObject, createDummyData} from "./GreateNoteObjectHelperFunction"

//@auto-fold here

export function GNContainerDiv(createData: CreateGreatNoteObjectInterface) : GNContainerDivInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, contentEditable, _classNameList} = createData
    let _object = <GNContainerDivInterface> document.createElement("div");
    _object.childrenList = {}

    _object.GNType = GNContainerDiv.name
    _object.GNSpecialCreationMessage = specialCreationMessage || ""
    _object._dataStructure = ["textContent"]
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"]

    // add classname
    _object._classNameList = _classNameList
    _classNameList?.forEach(p=>{
      _object.classList.add(p)
    })

    // functions
    _object.appendElements = function(...childrenArray){
          childrenArray.forEach(p=>{
              _object.appendChild(p)
              _object.childrenList[p._name] = p
              p._parent = _object
          })
    }

    _object.loadFromData = (data) => {
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage

         _object.specialGNType = data.specialGNType

        if (data._classNameList) data._classNameList.forEach(p=>_object.classList.add(p))

        _object._identity = data._identity

        _object.setAttribute("accessPointer", data._identity.accessPointer)

        if (contentEditable){
          _object["textContent"] = data["data"]["textContent"]
        }
    }

    _object.extract = () => _object.createDataObject()

    _object.createDataObject = function(){
        let dataObject = createDummyData()

        dataObject["GNType"] = _object.GNType
        dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage
        dataObject["specialGNType"] = _object.specialGNType || ""

        if (_object._identity) dataObject["_identity"] = _object._identity

        dataObject["_classNameList"] = Array.from(_object.classList)

        // data structure
        if (contentEditable){
            dataObject["data"]["textContent"] = _object["textContent"]
        }

        // stylesheet data
        _object._styleStructure.forEach(p=>{
            dataObject["stylesheet"][p] = _object.style[p]
        })

        return dataObject
    }

    _object.applyStyle = function (styleObject, saveToDatabase=true){
        Object.entries(styleObject).forEach(([key, value], _)=>{
            _object["style"][key] = value
        })

        if (saveToDatabase) _object.saveHTMLObjectToDatabase()
    }




    // add extra funcitons to the object

    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData)

    if (injectedData){
      _object.loadFromData(injectedData)
      _object.applyStyle(injectedData.stylesheet, false)  //
    }

    // add events
    let eventStatus = {t0: 0, t1: 0, run: true}
    _object.addEventListener("input", (e)=>{
        e.stopPropagation()
        eventStatus.t0 = eventStatus.t1
        eventStatus.t1 = e.timeStamp

        if ( eventStatus.t1 - eventStatus.t0 > 100){
          console.log(9595959, _object.textContent)
            // let target = e["target"]
            if (_object._identity.accessPointer!="") _object.saveHTMLObjectToDatabase()
            console.log(_object.extract())
            if (_object.processUpdateData) _object.processUpdateData()
        }
    }, false)//addEventListener

    return _object
}


//@auto-fold here
export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {

}
