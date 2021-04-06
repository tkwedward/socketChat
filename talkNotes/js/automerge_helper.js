function searchElemIDFromIndex(elemContainer, index){
    let elemIdSymbol = Object.getOwnPropertySymbols(elemContainer)[2]
    let elemID = elemContainer[elemIdSymbol][index]
    return elemID
}


function searchIndexInAContainerByElemID(elemContainer, elemID){
    // use element ID to search the index of the an element in a container
    // 2 is Symbol(_elemIds)
    let elemIdSymbol = Object.getOwnPropertySymbols(elemContainer)[2]
    let elemIdArray = elemContainer[elemIdSymbol]
    let position = elemIdArray.indexOf(elemID)
    return position
}


function convertIdToHtmlReadableId(original_ID, forQuerySelector){
    // convert the original ID to querySelector class ID
    converted_ID = "obj" + original_ID.split("-").join("_").replace(":", "COLON").replace("\n", "")

    if (forQuerySelector){
        return "." + converted_ID
    } else {
        return converted_ID
    }
}
