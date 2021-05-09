import {CreateGreatNoteObjectInterface, GNDropdownListInterface} from "./GreatNoteObjectInterface"
import {superGNObject, createDummyData} from "./GreateNoteObjectHelperFunction"

//@auto-fold here
export function GNDropdownList(_name:string, selectList: string[],arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true) : GNDropdownListInterface {
    let _object = <GNDropdownListInterface> document.createElement("select")

    selectList.forEach(p=>{
        let option = document.createElement("option")
        option.value = p
        option.innerText = p
        _object.appendChild(option)
    })

    _object._name = _name
    _object.GNType = GNDropdownList.name
    _object._dataStructure = ["value"]

    _object.extract = () => {
      let _dummyData = _object.createDataObject()
      return _dummyData
    }

    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    return _object
}
