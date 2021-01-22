function getDrawFunctionObject(status, shape){
    // draw polyline
    let attribute
    let createPolyLine, movePolyLine
    // @auto-fold here
    if (shape == "polyline"){
        attribute = {
            strokeColor: "blue",
            strokeWidth: 20,
            fill: "none",
            strokeLinecap: "round"
        }
        status.objectToBeDrawnAttribute = attribute

        createPolyLine = function(){
            let polyline = svgSoul.polyline().attr({
              "stroke": attribute.strokeColor,
              "stroke-width": attribute.strokeWidth,
              "fill": attribute.fill,
              "stroke-linecap": attribute.strokeLinecap
            })
            status.objectToBeDrawn = polyline
            status.pathArray = []
            return polyline
        }

        movePolyLine = function(){
            status.objectToBeDrawn.plot(status.pathArray)
        }

        return { "create": createPolyLine, "draw": movePolyLine}
    }

    // draw rectangle
    let createRect, drawRect
    // @auto-fold here
    if (shape == "rect"){
      createRect = function(){
        status.objectToBeDrawn = svgSoul.rect(100, 100)
      }
      drawRect = function (){}
      return { "create": createRect, "draw": drawRect}
    }


    let createEraser, moveEraser, upEraser
    // @auto-fold here
    if (shape == "eraser"){
        attribute = {
            radius: 100,
            color: "pink"
        }

        function checkOverlap(){

        }
        console.log(attribute);

        status.objectToBeDrawnAttribute = attribute

        createEraser = function (){
            let circle = svgSoul.circle()

            circle.attr({
              "cx": status.mouseX,
              "cy": status.mouseY,
              "fill": attribute.color
            })

            // let circle = svgSoul.circle(20)
            circle.cx(100)
            circle.cy(100)
            status.objectToBeDrawn = circle
            return circle
        }

        moveEraser = function(cx, cy){
            status.objectToBeDrawn.radius(attribute.radius)
            status.objectToBeDrawn.attr({
              "cx": cx,
              "cy": cy,
              "fill": attribute.color
            })
        }

        upEraser = function(){

            status.objectToBeDrawn.remove()
        }

        function detectCollision(position){
            let objectsInTheLayer = svgSoul.find("polyline")

            objectsInTheLayer.forEach(object=>{
                let lineArray = object.array()

                // position.mouseX, position.mouseY);
                lineArray.forEach(p=>{
                  // console.log(p[0], p[1], position.mouseX, position.mouseY);
                  // console.log(p[0]-position.mouseX)
                  // console.log(p[1]-position.mouseY)

                  let distance = (
                    (p[0] - position.mouseX)**2 + (p[1] - position.mouseY)**2
                  )**0.5

                  if (Math.abs(distance) < attribute.radius){
                      console.log(Math.abs(distance));
                      object.remove()
                  }
                })

            })


        }

        return {
            "create": createEraser,
            "draw": function(e){
                      let position = getTouchPosition(e)
                      moveEraser(position.mouseX, position.mouseY)
                      detectCollision(position)


                    },
            "up": upEraser
          }
    }


    let createSelector, moveSelector, upSelector, checkIfObjectWithin
    // @auto-fold here
    if (shape == "selector"){
      attribute = {
          strokeColor: "blue",
          strokeWidth: 5,
          fill: "none",
      }
      status.objectToBeDrawnAttribute = attribute

      checkIfObjectWithin = function(selector){
          let currentLayer = status.layer
          let allObjectsInLayer = currentLayer.children()
          let newPoint = currentLayer.node.createSVGPoint()
          let selectedObjects = []


          allObjectsInLayer.forEach(item=>{// item is an object in the current layer
              let inside = false
              let objectPointArray = item.array()
              objectPointArray.forEach(p=>{ // p is a points creating the object
                  newPoint.x = p[0]
                  newPoint.y = p[1]
                  if (selector.node.isPointInFill(newPoint)){
                      console.log("inside");
                      inside = true
                      return

                      // item.remove()
                  }
              })
              if (inside && status.objectToBeDrawn != item){
                  selectedObjects.push(item)
              }
          })

          if (selectedObjects.length==1){
              status.selectedObject = selectedObjects[0]
              status.selectedObject.attr({
                "opacity": 0.5
              })
              // console.log("add comment");
          }
      }

      createPolyLine = function(){
          let currentLayer = currentStatus.layer
          let lastSelector = currentLayer.findOne(".selectorLine")
          if (lastSelector){
              lastSelector.remove()
          }

          let polyline = svgSoul.polyline().attr({
            "stroke": attribute.strokeColor,
            "stroke-width": attribute.strokeWidth,
            "fill": attribute.fill,
            "stroke-dasharray": "5,5",
            "class": "selectorLine"
          })
          status.objectToBeDrawn = polyline
          status.pathArray = []
          return polyline
      }

      movePolyLine = function(){
          status.objectToBeDrawn.plot(status.pathArray)
      }

      upSelector = function(){
          let startPoint = status.objectToBeDrawn.array()[0]
          status.pathArray.push(startPoint)
          status.objectToBeDrawn.plot(status.pathArray)
          checkIfObjectWithin(status.objectToBeDrawn)
      }

      return { "create": createPolyLine, "draw": movePolyLine, "up": upSelector}
  }
}

// draw a testing rectangle
// currentStatus.objectToBeDrawn =
// currentStatus.objectToBeDrawn.x(currentStatus.startTouchX)
// currentStatus.objectToBeDrawn.y(currentStatus.startTouchY)
