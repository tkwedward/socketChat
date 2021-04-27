import * as GreatNoteDataClass from "../GreatNoteDataClass"
import * as GreatNoteSvgDataClass from "../GreatNoteSvgDataClass"

// ** make the layer controller panel so that you can add new div / new svg layer
export function createLayerController(mainController){
  // layerController
  let layerControllerTemplate = document.querySelector("#layerControllerTemplate")
  let layerControllerHTMLObject = layerControllerTemplate["content"].cloneNode(true);

  let layerView = layerControllerHTMLObject.querySelector(".layerView")


  let addDivLayerButton = layerControllerHTMLObject.querySelector(".addDivLayerButton")
  addDivLayerButton.addEventListener("click", function(){
      let currentPage = mainController.pageCurrentStatus.currentPage
      console.log("add a new div layer")
      let divLayer = GreatNoteDataClass.GNContainerDiv({name:"", arrayID: currentPage.getAccessPointer(), saveToDatabase: true})
      divLayer.applyStyle({width: "100%", height: "100%", background:"blue", "position": "absolute", "left": "0px", "right": "0px"})
      divLayer.classList.add("divLayer")
      divLayer.appendTo(currentPage)

  })

  let addSvgLayerButton = layerControllerHTMLObject.querySelector(".addSvgLayerButton")
  addSvgLayerButton.addEventListener("click", function(){
      console.log("add a new svg layer")
      let currentPage = mainController.pageCurrentStatus.currentPage
      let svgLayer = GreatNoteSvgDataClass.GNSvg({name:"", arrayID: currentPage.getAccessPointer(), saveToDatabase: true})
      console.log(mainController.toolBox.registerSvg)
      mainController.toolBox.registerSvg(svgLayer)

      svgLayer.applyStyle({width: "100%", height: "100%", background:"gold", position: "absolute", left: "0px", top: "0px"})
      mainController.saveHTMLObjectToDatabase(svgLayer)
      console.log(svgLayer)
      svgLayer.classList.add("svgLayer")
      svgLayer.appendTo(currentPage)
  })// addSvgLayerButton.addEventListener

  let showCurrentPageButton = layerControllerHTMLObject.querySelector(".showCurrentPageButton")
  showCurrentPageButton.addEventListener("click", function(){
      showCurrentPageButtonFunction(mainController, layerView)
  })

  return layerControllerHTMLObject
}


export function showCurrentPageButtonFunction(mainController, layerView){
    layerView.innerHTML = ""
    let currentPageData = mainController.pageCurrentStatus.currentPage.getDataFromDataBase()
    let layerObject = buildLayerContentFunction(currentPageData)
    console.log(layerObject)
    layerView.appendChild(layerObject)

}

//** aa funciton to build a list of items in a page so that tthey can be shown in the layer panel for switch on and off and lock the layer
export function buildLayerContentFunction(currentPageData, layerLevel=0){
  // first create an item object that conatin the information of the layerLeevel and pageAccessPointer
  // pageAccessPointer is used for finding the related HTML obejct show that you can manipulate them
    let item = document.createElement("div")
    item.style.marginLeft = layerLevel * 10 + "px"
    item.innerText = currentPageData.GNType
    item.setAttribute("layerLevel", layerLevel.toString())
    layerLevel+=1

    // add click event to the item object to change the style of the related html objec tin that page
    item.setAttribute("pageAccessPointer", currentPageData._identity.accessPointer)
    item.addEventListener("click", function(e){
        e.stopPropagation()
        let relatedHTMLObject = document.querySelector(`*[accessPointer='${currentPageData._identity.accessPointer}']`)
        // to test if the style is visible or not
        relatedHTMLObject.style.visibility =  (relatedHTMLObject.style.visibility == "hidden") ? "inherit": "hidden"
    })

    // to
    if (currentPageData.array.length>0){
        currentPageData.array.forEach(p=>{
            item.appendChild(buildLayerContentFunction(p, layerLevel))
        })
    }

    return item
}
