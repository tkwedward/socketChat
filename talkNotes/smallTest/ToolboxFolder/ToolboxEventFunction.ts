import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import {mousePositionRatioAdjustment} from "./toolBoxHelperFunction"

export function polylineMouseDownFunction(e, mainController, svgBoard, moveEventName:string, upEventName:string){
    console.log(mainController)
    if (!mainController.toolBox.checkToolBoxItemStatus("polylineItemButton")){
        return
    }

    let polylineController = mainController.attributeControllerMapping.polylineController

    let offsetX, offsetY, touchIsPen, ratio
    let originalWidth = mainController.pageCurrentStatus.fullPageSize[0]
    let testInfo = document.querySelector(".testInfo")
    if (e.type=="touchstart"){
        let rect = e.target.getBoundingClientRect();
        ratio =  rect.width / originalWidth
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio) ;
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        console.log(e)
        touchIsPen = e.targetTouches[0].radiusX > 10? false: true
    }

    if (e.type=="mousedown"){
       offsetX = mousePositionRatioAdjustment(e.offsetX, ratio)
       offsetY = mousePositionRatioAdjustment(e.offsetY, ratio)


       // testInfo.innerHTML = `distance_1 = ${distance1} <br>` + `distance_2 = ${distance2} <br>` + `totalDistance = ${distance1 + distance2}, scale = ${scale}, scale = ${scale + scaleDirection * deltaScale}, direction = ${scaleDirection}, finalX = ${finalPointX}, finalY = ${finalPointY}, finalX2 = ${finalPointX2}, finalY2 = ${finalPointY2}, width ${e.target.getBoundingClientRect().width}`

   }
   touchIsPen = true
   if (e.type=="mousedown" || touchIsPen){
        e.preventDefault()
       let [strokeColor, strokeWidth]:[string, string] = polylineController.extract()
       let polyline = GreatNoteSvgDataClass.GNSvgPolyLine({name:"", arrayID: svgBoard.getAccessPointer(), insertPosition:false, dataPointer:false, saveToDatabase:true, specialCreationMessage:"polylineCreated"})
       polyline.style.pointerEvents = "none"


       //
       polyline.soul.plot([[offsetX, offsetY]])
       polyline.appendTo(svgBoard)
       polyline.applyStyle({"stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none"})
       //
       // define the mouse move event
       let mouseMoveFunction = (e)=>{
         e.preventDefault()
         testInfo.innerHTML = `offsetX = ${offsetX * 1/ratio} <br>` + `offsetY = ${offsetY * 1/ratio} <br> ratio = ${ratio}`
         polylineMouseMoveFunction(e, polyline, ratio)
       }
       svgBoard.addEventListener(moveEventName, mouseMoveFunction)
       //
       // define the mouse move function
       let mouseUpFunction = (e)=>{
         e.preventDefault()
         polylineMouseUpFunction(e, svgBoard, polyline, mouseMoveFunction, mouseUpFunction, moveEventName, upEventName)
       }

       svgBoard.addEventListener(upEventName, mouseUpFunction)
   }

}

export function polylineMouseMoveFunction(e, polyline, ratio){
  let offsetX
  let offsetY
  if (e.type=="touchmove"){
      let rect = e.target.getBoundingClientRect();
      offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
      offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
  }
   if (e.type=="mousemove"){
      offsetX = mousePositionRatioAdjustment(e.offsetX, ratio)
      offsetY = mousePositionRatioAdjustment(e.offsetY, ratio)
  }

  let newPoint = polyline.soul.array().value
  newPoint.push([offsetX, offsetY])
  polyline.soul.plot(newPoint)
}

export function polylineMouseUpFunction(e, svgBoard, polyline, mouseMoveFunctionToBeRemoved, mouseUpFunctionToBeRemoved, moveEventName, upEventName){
  console.log(145, "save to database", new Date())
  polyline.saveHTMLObjectToDatabase()
  svgBoard.removeEventListener(moveEventName, mouseMoveFunctionToBeRemoved)
  svgBoard.removeEventListener(upEventName, mouseUpFunctionToBeRemoved)
}
