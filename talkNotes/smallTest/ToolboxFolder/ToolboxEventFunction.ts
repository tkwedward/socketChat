import * as GreatNoteSvgDataClass from "../GreatNoteSvgDataClass"

export function polylineMouseDownFunction(e, svgBoard, polylineController, moveEventName:string, upEventName:string){
    e.preventDefault()
    let [strokeColor, strokeWidth]:[string, string] = polylineController.extract()
    let polyline = GreatNoteSvgDataClass.GNSvgPolyLine({name:"", arrayID: svgBoard.getAccessPointer(), insertPosition:false, dataPointer:false, saveToDatabase:true, specialCreationMessage:"polylineCreated"})
    polyline.style.pointerEvents = "none"


    let offsetX
    let offsetY
    if (e.type=="touchstart"){
        let rect = e.target.getBoundingClientRect();
        offsetX = e.targetTouches[0].pageX - rect.left;
        offsetY = e.targetTouches[0].pageY - rect.top;
    }
    if (e.type=="mousedown"){
       offsetX = e.offsetX
       offsetY = e.offsetY
   }

    console.log(offsetX, offsetY)
    //
    polyline.soul.plot([[offsetX, offsetY]])
    polyline.appendTo(svgBoard)
    polyline.applyStyle({"stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none"})
    //
    // define the mouse move event
    let mouseMoveFunction = (e)=>{
      e.preventDefault()
      polylineMouseMoveFunction(e, polyline)
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

export function polylineMouseMoveFunction(e, polyline){
  let offsetX
  let offsetY
  if (e.type=="touchmove"){
      let rect = e.target.getBoundingClientRect();
      offsetX = e.targetTouches[0].pageX - rect.left;
      offsetY = e.targetTouches[0].pageY - rect.top;
  }
   if (e.type=="mousemove"){
      offsetX = e.offsetX
      offsetY = e.offsetY
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
