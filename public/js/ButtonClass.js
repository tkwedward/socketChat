function getDrawFunctionObject(status, shape){
    let attribute = status.objectToBeDrawnAttribute
    console.log(attribute);
    if (shape == "polyline"){
        function createPolyLine(){
            let polyline = svgSoul.polyline().attr({
              "stroke": attribute.strokeColor,
              "stroke-width": attribute.strokeWidth,
              "fill": attribute.fill
            })
            status.objectToBeDrawn = polyline
            status.pathArray = []
            return polyline
        }

        function drawPolyLine(){
            status.objectToBeDrawn.plot(status.pathArray)
        }

        return {
            "create": createPolyLine,
            "draw": drawPolyLine
        }
    }



    if (shape == "rect"){
      function createRect(){
        status.objectToBeDrawn = svgSoul.rect(100, 100)
      }

      function drawRect(){

      }

      return {
          "create": createRect,
          "draw": drawRect
      }
    }



}
// draw a testing rectangle
// currentStatus.objectToBeDrawn =
// currentStatus.objectToBeDrawn.x(currentStatus.startTouchX)
// currentStatus.objectToBeDrawn.y(currentStatus.startTouchY)
