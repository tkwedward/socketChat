import * as GreatNoteDataClass from "../GreatNoteClass/GreatNoteDataClass"
import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import * as PopUpBoxManager from "../pageControllerFolder/PopUpBoxFunction"
import {clearUpEvent, calculateDistance, changeItemPosition, getOffSetXY, getPageXY, mousePositionRatioAdjustment, getTouchOffset} from "./toolBoxHelperFunction"
import * as Settings from "../settings"

export function markObjectInsideSelectionArea(svgBoard, selectionStatusObject){
  let selectionObjectSet = new Set()
  let polyline = selectionStatusObject.polyline
  let newPoint = svgBoard.createSVGPoint();
  svgBoard.childNodes.forEach(object=>{
      // console.log(121210002, object!=polyline, object.id, svgBoard.childNodes, selectionStatusObject)
      // the object cannot  be the polyline
      if (object!=polyline && object.soul){
        let lineArray = object.soul.array().value
        Array.from(lineArray).forEach(p=>{
            newPoint.x = p[0]
            newPoint.y = p[1]
            if (polyline.isPointInFill(newPoint)){
                selectionObjectSet.add(object.getAccessPointer())
            }
            return
        }) // Array.from(lineArray)
        return
      } // if object!=polyline)
  })// svgBoard.childNodes.forEach
  selectionStatusObject.selectedObjectArray = Array.from(selectionObjectSet)

  selectionStatusObject.selectedObjectArray = selectionStatusObject.selectedObjectArray.map(p=>svgBoard.querySelector(`polyline[accessPointer='${p}']`))
  // selectionStatusObject.selectedObjectArray.push(polyline)
}

export function selectionToolMouseMoveFunction(e, selectionStatusObject, ratio){
  let offsetX
  let offsetY
  if (e.type=="touchmove"){
      let rect = e.target.getBoundingClientRect();
      offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
      offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
  }
   if (e.type=="mousemove"){
      offsetX = e.offsetX
      offsetY = e.offsetY
  }


  let newPoint = selectionStatusObject.polyline.soul.array().value
  // console.log(newPoint)
  newPoint.push([offsetX, offsetY])
  selectionStatusObject.polyline.soul.plot(newPoint)
}


export function selectionToolMouseUpFunction(e, svgBoard, polyline, mouseMoveFunctionToBeRemoved, mouseUpFunctionToBeRemoved, moveEventName, upEventName){
  // connect the last point with the first point
  let newPoint = polyline.soul.array().value
  newPoint.push(newPoint[0])
  polyline.soul.plot(newPoint)
  // cleaan up
  clearUpEvent(svgBoard, moveEventName, mouseMoveFunctionToBeRemoved)
  clearUpEvent(svgBoard, upEventName, mouseUpFunctionToBeRemoved)
}



export function selectionToolMouseDownFunction(e, mainController, svgBoard, moveEventName:string, upEventName:string, selectionStatusObject){
    if (!mainController.toolBox.checkToolBoxItemStatus("selectionToolItemButton")){
        return
    }

    let [originalPositionX, originalPositionY, touchIsPen] = getOffSetXY(e)
    let [offsetX, offsetY] = [originalPositionX, originalPositionY]


    touchIsPen = true

    // if (!touchIsPen) return
    e.preventDefault()

    if (selectionStatusObject.mode=="selectionMode"){
        mouseDownEventBeforeSelection(e, mainController, svgBoard, moveEventName, upEventName, originalPositionX, originalPositionY, offsetX, offsetY, touchIsPen, selectionStatusObject)
        selectionStatusObject.mode = "selectedMode"
    } else if (selectionStatusObject.mode=="selectedMode"){
        mouseDownEventAfterSelection(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject)
    }
} // selectionToolMouseDownFunction


function mouseDownEventBeforeSelection(e, mainController, svgBoard, moveEventName, upEventName, originalPositionX, originalPositionY, offsetX, offsetY, touchIsPen, selectionStatusObject){
  if (e.type=="mousedown" || touchIsPen){
     selectionStatusObject.selectedObjectArray = []

    let strokeColor = "blue"
    let strokeWidth = "2px"

    let polyline = GreatNoteSvgDataClass.GNSvgPolyLine({name:"",  saveToDatabase:false})
    polyline.style.pointerEvents = "none"
    polyline.soul.plot([[offsetX, offsetY]])
    polyline.appendTo(svgBoard)
    polyline.applyStyle({"stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none"})
    polyline.style["stroke-dasharray"] = "5"
    selectionStatusObject.polyline = polyline

    let rect = e.target.getBoundingClientRect();
    let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]

    let mouseMoveFunction = (e)=>{
      e.preventDefault()
      let [newX, newY, ..._] = getOffSetXY(e)
      let distance = calculateDistance(newX, newY, offsetX, offsetY)
      // console.log(112112, selectionStatusObject.polyline.soul.array().value.length, newX, newY, distance)
      console.log("----------------")
      selectionToolMouseMoveFunction(e, selectionStatusObject, ratio)
    }

    let mouseUpFunction = (e)=>{
      e.preventDefault()
      // cleaan up
      selectionToolMouseUpFunction(e, svgBoard, selectionStatusObject.polyline, mouseMoveFunction, mouseUpFunction, moveEventName, upEventName)

      markObjectInsideSelectionArea(svgBoard, selectionStatusObject)
    }

    // define the mouse move event
    svgBoard.addEventListener(moveEventName, mouseMoveFunction)
    svgBoard.addEventListener(upEventName, mouseUpFunction)
  }
}  // mouseDownEventBeforeSelection

function mouseDownEventAfterSelection(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject){
  let clickedPoint = svgBoard.createSVGPoint()
  let touchIsPen;
  [clickedPoint.x, clickedPoint.y, touchIsPen] = getOffSetXY(e);

  if (!touchIsPen) {
    // return
  }
  e.preventDefault();

  // let targetObjectOriginalDataArray = selectionStatusObject.selectedObjectArray.map(p=>p.soul.array().value);
  // console.log(144, "lenght of targetObjectOriginalDataArray", targetObjectOriginalDataArray.length)
  let selectionPolylineOriginalData = selectionStatusObject.polyline.soul.array().value;


  // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
  if (!selectionStatusObject.polyline.isPointInFill(clickedPoint)){
    selectionStatusObject.polyline.remove()
    selectionStatusObject.polyline = null
    selectionStatusObject.mode = "selectionMode"
    return
  }

  selectionStatusObject.triggerFlag = true
  setTimeout(function(){
      if (selectionStatusObject.triggerFlag ){
        // if hold, then create popup box
        addHoldTouchAction(e, svgBoard, selectionStatusObject)
      } else {
        console.log("I will not trigger.")
      }
   }, 1000)

  let blockEvent = false

  let mouseMoveFunction = (e)=>{
      e.preventDefault()
      if (!selectionStatusObject.polyline) return
      // console.log(selectionStatusObject.polyline)
      // return
      // if (blockEvent) return
      // blockEvent = true
      // setTimeout(()=>{blockEvent = false}, 100)



      let [newX, newY, ..._] = getOffSetXY(e)
      let [deltaX, deltaY] = [newX - clickedPoint.x, newY - clickedPoint.y]
      console.log(179, "newX, newY", newX, newY, "deltaX, Y; ", deltaX, deltaY)

      // selectionStatusObject.polyline.soul.plot(selectionStatusObject.polyline.soul.array().value.map(p=> [p[0] + deltaX, p[1] + deltaY]))

      changeItemPosition(selectionStatusObject.polyline, selectionPolylineOriginalData, deltaX, deltaY)
      // selectionStatusObject.selectedObjectArray.forEach((p, i)=>{
      //   if (p.soul){
      //       changeItemPosition(p, targetObjectOriginalDataArray[i], deltaX, deltaY)
      //   }
      //
      //   // try {
      //   //     // p is the pint arrays
      //   //     // targetObjectOriginalDataArray is the original positionss of the points of the polylines
      //   //
      //   // } catch {
      //   //     // console.log("some error", targetf12ObjectOriginalDataArray)
      //   //     return
      //   // }
      //
      //
      //
      // })

      let distance = calculateDistance(newX, newY, clickedPoint.x, clickedPoint.y)

      if (distance > 0.5) selectionStatusObject.triggerFlag = false
  }

  let mouseUpFunction = (e)=>{
      e.preventDefault()
      selectionStatusObject.triggerFlag = false

      selectionToolMouseUpFunction(e, svgBoard, selectionStatusObject.polyline, mouseMoveFunction, mouseUpFunction, moveEventName, upEventName)
      svgBoard.removeEventListener(mouseMoveFunction, mouseMoveFunction)
  }

  // define the mouse move event
  svgBoard.addEventListener(moveEventName, mouseMoveFunction)
  // svgBoard.addEventListener(upEventName, mouseUpFunction)
}


// a popup box comes out
function addHoldTouchAction(e, svgBoard, selectionStatusObject){
    // let popUpBox = PopUpBoxManager.createPopUpBox()
    // let [pageX, pageY, ..._] = getPageXY(e)
    // svgBoard.parentNode.appendChild(popUpBox)
    // popUpBox.style.left = (pageX + 10) + "px"
    // popUpBox.style.top = (pageY + 10) + "px"
    //
    // PopUpBoxManager.addItemToCreatePopUpBox(popUpBox, "deleteAll", function(){
    //     selectionStatusObject.selectedObjectArray.forEach(p=>{
    //         p.remove()
    //     })
    //     popUpBox.remove()
    // })
}
