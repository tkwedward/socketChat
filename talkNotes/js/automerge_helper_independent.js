function getDocumentChain(node, chainArray = []){
    // to get the chain from the base doc to this object
    // e.g. a document has a structure of doc["cardsArray"]["dataArray"]["card"], then you will get back an array of ["cardsArray", "dataArray", "card"]
    // usage: you can use this to access to the location of the document
    // for internal use only, you don't need to use it normally because in the self defined object, there should be a property of getObjectInDoc(_doc). Normally, it is just the rootDocument.doc, but you can use the doc argument to refer to the new doc object created when you use Automerge.change().
    if (node.parent && node.parent.autoMergeContainerName){
        chainArray.unshift(node.autoMergeContainerName)
        return getDocumentChain(node.parent, chainArray)
    } else {
        chainArray.unshift(node.autoMergeContainerName)
        return chainArray
    }
}
