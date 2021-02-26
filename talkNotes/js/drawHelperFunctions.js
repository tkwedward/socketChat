function broadcastGenerator(status, shape){
    // to send the data of the new added object to all clients
    let objectAttribute = status.objectToBeDrawn.attr()
    objectAttribute.shape = shape
    // console.log(objectAttribute);
    socket.emit("newObject", {
        objectAttribute: objectAttribute
    })
}


socket.on("newObject", function(data){
    currentStatus.socketData = data.objectAttribute
    console.log(currentStatus);
    let shape = data.objectAttribute.shape
    let drawObject = getDrawFunctionObject(currentStatus, shape, true)
    drawObject.create()
    // console.log(data);

})

function adjustPolylinePosition(array){
    return array.map(point=>[point[0], point[1] - 30])
}


function getDrawFunctionObject(status, shape, fromSocket){
    // draw polyline
    let attribute
    let createPolyLine, movePolyLine, upPolyLine
    // @auto-fold here
    if (shape == "polyline"){

        attribute = {
            strokeColor: "blue",
            strokeWidth: 5,
            fill: "none",
            strokeLinecap: "round"
        }
        status.objectToBeDrawnAttribute = attribute

        // create object when touchstart
        createPolyLine = function(){
            let polyline = status.layer.polyline().attr({
              "stroke": attribute.strokeColor,
              "stroke-width": attribute.strokeWidth,
              "fill": attribute.fill,
              "stroke-linecap": attribute.strokeLinecap
            })
            status.objectToBeDrawn = polyline

            if (fromSocket){
                let points = status.socketData.points.split(" ")
                points = points.map(p=>{
                     let pointStr = p.split(",")
                     return [parseFloat(pointStr[0]), parseFloat(pointStr[1])]
                })
                // console.log(currentStatus.socketData);
                console.log(points);
                polyline.plot(points)
            } else {
                status.pathArray = []
            }

            return polyline
        }

        // event of touchmove
        movePolyLine = function(){

            let shiftedArray = adjustPolylinePosition(status.pathArray)



            status.objectToBeDrawn.plot(shiftedArray)
        }

        // to upload the change to the broadcast
        upPolyLine = function(){
            broadcastGenerator(status, "polyline")
        }

        return { "create": createPolyLine, "draw": movePolyLine, "up": upPolyLine}
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

        status.objectToBeDrawnAttribute = attribute

        createEraser = function (){
            let circle = status.layer.circle()

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
            let objectsInTheLayer = status.layer.find("polyline")
            let newPoint = status.layer.node.createSVGPoint();
            objectsInTheLayer.forEach(object=>{
                let lineArray = object.array()
                console.log(status.objectToBeDrawn);
                lineArray.forEach(p=>{
                  newPoint.x = p[0]
                  newPoint.y = p[1]
                  if (status.objectToBeDrawn.node.isPointInFill(newPoint)){
                        object.remove()
                        return
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

          let polyline = status.layer.polyline().attr({
            "stroke": attribute.strokeColor,
            "stroke-width": attribute.strokeWidth,
            "fill": attribute.fill,
            "stroke-dasharray": "5,5",
            "class": "selectorLine"
          })

          console.log(polyline.attr());
          status.objectToBeDrawn = polyline
          status.pathArray = []
          return polyline
      }

      movePolyLine = function(){
          let shiftedArray = adjustPolylinePosition(status.pathArray)
          status.objectToBeDrawn.plot(shiftedArray)
      }

      upSelector = function(){
          let shiftedArray = adjustPolylinePosition(status.pathArray)
          status.objectToBeDrawn.plot(shiftedArray)

          shiftedArray.push(shiftedArray[0])


          status.objectToBeDrawn.plot(shiftedArray)
          checkIfObjectWithin(status.objectToBeDrawn)
      }

      return { "create": createPolyLine, "draw": movePolyLine, "up": upSelector}
  }
}

// draw a testing rectangle
// currentStatus.objectToBeDrawn =
// currentStatus.objectToBeDrawn.x(currentStatus.startTouchX)
// currentStatus.objectToBeDrawn.y(currentStatus.startTouchY)
