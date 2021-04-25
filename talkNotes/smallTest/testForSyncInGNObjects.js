"use strict";
exports.__esModule = true;
var divTest = false;
var inputFieldTest = false;
var buttonTest = false;
var svgElementTest = false;
var toolBoxTest = true;
var bigFourContainer;
var contentContainer;
var attributeController;
var metaDataController;
var widthController;
var fillController;
//@auto-fold here
// document.body.style.display = "grid"
// document.body.style.gridTemplateColumns = "1fr 3fr"
//
// let bookmarkArrayId = mainController.mainDocArray["bookmark"]
//
// //@auto-fold here
// let controllerStyleList = {
//     "width": "95%",
//     "height": "100vh",
//     "border": "2px black solid",
//     "margin": "20px auto"
// }
// //
// let controller = document.createElement("div")
// controller.classList.add("controller")
// controller.innerHTML = "king"
// controller.style.width = "95%"
// controller.style.height = "100vh"
// controller.style.margin = "20px auto"
// document.body.appendChild(controller)
//
//
// //@auto-fold here
// function addAccessPointerAndDataPointerDiv(htmlObject){
//     let containerInfo = document.createElement("div")
//     containerInfo.innerHTML +=  "=========================<br>"
//     let dpContainer = document.createElement("div")
//
//     dpContainer.innerHTML += "DP:" + htmlObject.getDataPointer() + "<br>"
//     dpContainer.addEventListener("click", function(){
//         console.log(mainController.getObjectById(htmlObject.getDataPointer()))
//     })
//
//     let apContainer = document.createElement("div")
//     apContainer.innerHTML += "AP:" + htmlObject.getAccessPointer() + "<br>"
//     apContainer.addEventListener("click", function(){
//         console.log(mainController.getObjectById(htmlObject.getAccessPointer()), htmlObject, htmlObject.stylesheet)
//     })
//
//     containerInfo.append(dpContainer, apContainer)
//     controller.appendChild(containerInfo)
// }
//
// //@auto-fold here
// if (!mainController.applyMainDocTemplate){
//     let linkArrayInfo = document.createElement("div")
//     linkArrayInfo.classList.add("linkArrayInfo")
//     controller.appendChild(linkArrayInfo)
//
//     let saveButton = document.createElement("button")
//     saveButton.innerHTML = "save"
//     saveButton.addEventListener("click", (e)=>{
//         let s = mainController.saveMainDoc()
//         socket.emit("saveMainDocToDisk", s)
//         console.log(mainController.mainDoc)
//     })
//     let loadButton = document.createElement("button")
//     loadButton.innerHTML = "load"
//     loadButton.addEventListener("click", (e)=>{
//         socket.emit("loadMainDoc")
//     })
//     controller.appendChild(saveButton)
//     controller.appendChild(loadButton)
//     //
//     contentContainer = document.createElement("div")
//     contentContainer.classList.add("contentContainer")
//     contentContainer.style.background = "silver"
//     contentContainer.style.position = "relative"
//     // EventModel.addMovingEvent(contentContainer)
//
//     let positionMonitor = document.createElement("div")
//     positionMonitor.classList.add("positionMonitor")
//     positionMonitor.style.width = "90%"
//     positionMonitor.style.minHeight = "200px"
//     positionMonitor.style.border = "2px black solid"
//     positionMonitor.style.margin = "20px auto"
//     let relativeX = document.createElement("div")
//     let relativeY = document.createElement("div")
//     relativeX.innerText = "relativeX = "
//     relativeY.innerText = "relativeY = "
//     positionMonitor.append(relativeX, relativeY)
//     controller.appendChild(positionMonitor)
//
//
//
//
//     document.body.appendChild(contentContainer)
//
//     attributeController = document.createElement("div")
//     attributeController.classList.add("attributeController")
//     attributeController.style.width = "90%"
//     attributeController.style.minHeight = "200px"
//     attributeController.style.border = "2px black solid"
//     attributeController.style.margin = "20px auto"
//
//     let attributeControllerBar = document.createElement("div")
//     attributeControllerBar.style.height = "35px"
//     attributeControllerBar.style.marginBottom = "10px"
//     attributeControllerBar.style.background = "yellow"
//
//     attributeController.append(attributeControllerBar)
//
//
//     metaDataController  = document.createElement("div")
//     metaDataController.classList.add("metaDataController")
//     metaDataController.style.width = "90%"
//     metaDataController.style.minHeight = "200px"
//     metaDataController.style.border = "2px black solid"
//     metaDataController.style.margin = "20px auto"
//
//     let metaDataControllerBar = document.createElement("div")
//     metaDataControllerBar.style.height = "35px"
//     metaDataControllerBar.style.marginBottom = "10px"
//     metaDataControllerBar.style.background = "yellow"
//     metaDataController.appendChild(metaDataControllerBar)
//
//     controller.append(attributeController, metaDataController)
//
//     bigFourContainer = GreatNoteDataClass.GNContainerDiv("bigFourContainer", bookmarkArrayId)
//     bigFourContainer.appendTo(contentContainer)
// }
//
//
// if (!mainController.applyMainDocTemplate && toolBoxTest){
//     attributeController
// }
//
// let attributeControllerObject = new ControllerModel.AttributeControllerClass()
// let mouseClickTest = true
// //@auto-fold here
// if (!mainController.applyMainDocTemplate && mouseClickTest){
//     // choice controller
//     let divControllerContainer = attributeControllerObject.createDivControllerContainer()
//
//     let svgCircleContainer = attributeControllerObject.createSvgCircleControllerContainer()
//
//     // append controller
//     attributeController.append(divControllerContainer, svgCircleContainer)
//
//     // ================ div ================//
//     let div = document.createElement("div")
//     div.style.width = "100px"
//     div.style.height = "100px"
//     div.style.background = "blue"
//     EventModel.addMovingEvent(div)
//     contentContainer.append(div)
//     divControllerContainer.attachTo(div)
//
//
//     // ============== svg ============== //
//     let svg = GreatNoteSvgDataClass.GNSvg("svg", "", false, false, false)
//     svg.appendToContainer(contentContainer)
//     EventModel.addMovingEvent(svg.svgNode)
//
//     // ============== svgCircle ============ //
//     let svgCircle = GreatNoteSvgDataClass.GNSvgCircle("", "", false, false, false)
//     svgCircle.appendTo(svg)
//     svgCircleContainer.attachTo(svgCircle.node)
//     console.log(svgCircleContainer.targetHTMLType)
//     // EventModel.addMovingEvent(svgCircle.node)
// }
//
// //
// // if (!mainController.applyMainDocTemplate && toolBoxTest){
// //     let toolBoxModel = new ToolBoxModel.ToolBoxClass()
// //     let toolBoxHtmlObject = toolBoxModel.createToolboxHtmlObject()
// //     attributeController.parentNode.insertBefore(toolBoxHtmlObject, attributeController)
// //     toolBoxHtmlObject.createToolBoxItem("Apple")
// //     toolBoxHtmlObject.createToolBoxItem("Boy")
// //     toolBoxHtmlObject.createToolBoxItem("Rashida")
// // }
// //
//
//
//
// // =============================  svgElementTest
// ////@auto-fold here
// // if (!mainController.applyMainDocTemplate && svgElementTest){
// //     let svgObject = GreatNoteSvgDataClass.GNSvg("bigFourContainer", bookmarkArrayId)
// //     // let svgObject2 = GreatNoteSvgDataClass.GNSvg("bigFourContainer", bookmarkArrayId)
// //     svgObject.appendToContainer(contentContainer)
// //
// //     let svgCircleElement = GreatNoteSvgDataClass.GNSvgCircle("bigFourContainer", bookmarkArrayId)
// //     svgCircleElement.applyStyle({"r": 5, "cx": 200, "cy": 200})
// //     svgCircleElement.appendTo(svgObject)
// //
// //     let svgRectElement = GreatNoteSvgDataClass.GNSvgRect("bigFourContainer", bookmarkArrayId)
// //     svgRectElement.applyStyle({"x": 500, "y": 100, "width": 100, "height": 400, "fill": "silver"})
// //     svgRectElement.appendTo(svgObject)
// //
// //     // let svgLineElement = GreatNoteSvgDataClass.GNSvgLine("bigFourContainer", bookmarkArrayId)
// //     // svgLineElement.applyStyle(
// //     //   {"points": [20, 20, 100, 400],
// //     //   "attribute":{"stroke": "blue", "width":1 }})
// //     // svgLineElement.appendTo(svgObject)
// //
// //     let svgPolyLineElement = GreatNoteSvgDataClass.GNSvgPolyLine("bigFourContainer", bookmarkArrayId)
// //     svgPolyLineElement.applyStyle(
// //       {"points": [10, 10, 50, 100, 40, 60, 90, 100],
// //       "attribute":{"stroke": "blue", "width":1 , "fill":"none"}})
// //     console.log(svgPolyLineElement)
// //     svgPolyLineElement.appendTo(svgObject)
// //
// //     let svgImageElement = GreatNoteSvgDataClass.GNSvgImage("bigFourContainer", bookmarkArrayId)
// //
// //     svgImageElement.setImgSrc("https://multi-canvas-art.com/wp-content/uploads/2019/12/Raichu-Pikachu-and-Pichu-1.jpg")
// //     console.log(131, svgImageElement)
// //
// //     svgImageElement.appendTo(svgObject)
// //     svgImageElement.width("300px")
// //     svgImageElement.height("200px")
//
//     // svgObject.createSVGObject()
//     // contentContainer.append(svgObject)
// //
//     // let circle = GreatNoteSvgDataClass.GNSvgCircle("circle", bookmarkArrayId)
//     // circle.appendTo(svgObject)
//
// }
//
// // =============================  inputFieldTest
// ////@auto-fold here
// // if (!mainController.applyMainDocTemplate && inputFieldTest){
// //     let inpuField1 = GreatNoteDataClass.GNInputField("inputField1", bigFourContainer.getAccessPointer())
// //     inpuField1.appendTo(bigFourContainer)
// //     addAccessPointerAndDataPointerDiv(inpuField1)
// //
// //     function createInputField(){
// //       let inpuField2 = GreatNoteDataClass.GNInputField("inputField1", bigFourContainer.getAccessPointer(), false, inpuField1.getDataPointer())
// //       inpuField2.appendTo(bigFourContainer)
// //       addAccessPointerAndDataPointerDiv(inpuField2)
// //     }
// //
// //     let number = 20
// //     for (let i = 0; i< number; i++){
// //       createInputField()
// //     }
// // }
//
// // =============================  button Test
// ////@auto-fold here
// // if (!mainController.applyMainDocTemplate && buttonTest){
// //     console.log(1289)
// //     let clickEvent = function(_object){
// //         let triggerEvent = new Event("changeStatusEvent")
// //         let currentIndex = _object.statusList.indexOf(_object.innerText)
// //         let nextIndex = (currentIndex + 1) % _object.statusList.length
// //         _object.innerText = _object.statusList[nextIndex]
// //         console.log(98, _object, _object.statusList, currentIndex)
// //
// //         _object.dispatchEvent(triggerEvent)
// //     }
// //
// //     let selectObject = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer.getAccessPointer())
// //     selectObject.addClickEvent(clickEvent)
// //     selectObject.appendTo(bigFourContainer)
// //     addAccessPointerAndDataPointerDiv(selectObject)
// //
// //     function createHTMLObject(){
// //       let _object = GreatNoteDataClass.GNButton("inputField1", ["yes", "no"], bigFourContainer.getAccessPointer(), false, selectObject.getDataPointer())
// //       _object.addClickEvent(clickEvent)
// //       _object.appendTo(bigFourContainer)
// //       addAccessPointerAndDataPointerDiv(_object)
// //     }
// //
// //     let number = 20
// //     for (let i = 0; i< number; i++){
// //       createHTMLObject()
// //     }
// // }
//
//
// ////@auto-fold here
// // if (!mainController.applyMainDocTemplate && divTest){
// //     let firstContainer
// //     Object.entries(mainController.mainDocArray).forEach(([arrayName, accessPointer], index) => {
// //         // let container =
// //         // if ()
// //         let containerEditable = GreatNoteDataClass.GNEditableDiv("editable", bigFourContainer.getAccessPointer(), false, firstContainer?.getDataPointer())
// //
// //         if (index==0){
// //           firstContainer = containerEditable
// //         }
// //
// //
// //         let containerInfo = document.createElement("div")
// //         containerInfo.innerHTML +=  "=========================<br>"
// //         let dpContainer = document.createElement("div")
// //
// //         dpContainer.innerHTML += "DP:" + containerEditable.getDataPointer() + "<br>"
// //         dpContainer.addEventListener("click", function(){
// //             console.log(mainController.getObjectById(containerEditable.getDataPointer()))
// //         })
// //
// //         let apContainer = document.createElement("div")
// //         apContainer.innerHTML += "AP:" + containerEditable.getAccessPointer() + "<br>"
// //         apContainer.addEventListener("click", function(){
// //             console.log(mainController.getObjectById(containerEditable.getAccessPointer()), containerEditable, containerEditable.stylesheet)
// //         })
// //
// //
// //
// //         containerInfo.append(dpContainer, apContainer)
// //         controller.appendChild(containerInfo)
// //
// //
// //         // let container = GreatNoteDataClass.GNEditableDiv(arrayName)
// //         let styleList = {
// //             "width": "95%",
// //             "height": "200px",
// //             "border": "2px black solid",
// //             "margin": "20px auto"
// //         }
// //         containerEditable.applyStyle(styleList)
// //         console.log(containerEditable.stylesheet)
// //
// //         bigFourContainer.appendChild(containerEditable)
// //     });
// //
// // }
