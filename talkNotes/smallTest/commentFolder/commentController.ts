import {GNObjectInterface, GNContainerDivInterface, CreateGreatNoteObjectInterface, GNContainerDiv, GNEditableDiv} from "../GreatNoteDataClass"

export function GNComment(createData: CreateGreatNoteObjectInterface) : GNContainerDivInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData} = createData


    let _commentObject = <GNContainerDivInterface> GNContainerDiv({name:"commentDiv", saveToDatabase:false})
    _commentObject.GNType = GNComment.name


    return _object
}
