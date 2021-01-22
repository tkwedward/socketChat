

// create Rectangle
let svgSoul = SVG().addTo("#create").size("100vw", "100vh")
let svgHtmlObject = svgSoul.node
svgHtmlObject.classList.add("baseSvg")
let svgDim = svgHtmlObject.getClientRects()[0]
let buttonSet = document.querySelector("#functionButtonSet")



let currentStatus = {
    layer: svgSoul,
    typeOfEvent: null,
    svgOffsetLeft: svgDim.x,
    svgOffsetTop: svgDim.y,

    // mouse positions
    startX: 0, startY: 0, lastX: 0, lastY: 0,
    mouseX: 0, mouseY: 0,

    // touch positions
    startTouchX: 0, startTouchY: 0, lastTouchX: 0,
    lastTouchY: 0, touchX: 0, touchY: 0,

    // usedForCreating Object
    // objectToBeDrawn = e.g. polyline, circle, ...
    // paintFunction = addObject
    objectToBeDrawn: null,
    paintFunction: null,
    objectToBeDrawnAttribute: null,
          // used for plotting a polyline
          pathArray: [],
    currentButton: null,

    // used for adding comments
    selectedObject: null,
    

    saveSvg: function(){
      // console.log(svgHtmlObject.innerHTML);


    }
}

function getTouchPosition(e){
    return {
      mouseX: e.targetTouches[0].pageX - currentStatus.svgOffsetLeft,
      mouseY: e.targetTouches[0].pageY - currentStatus.svgOffsetTop
    }
}

function checkTouchType(event){
    let radius = event.targetTouches[0].radiusX
    if (radius < 25){
      return "pen"
    } else {
      return "finger"
    }
}

// function getCurrentStatus(){
//     return currentStatus
// }

let drawObject = {
    "draw": function(){}
}


function createRect(status){
    let rect = status.layer
}

// polyline functions


class MainController {
    constructor(svgSoul, currentStatus){
        // this.svgSoul = svgSoul
        // this.svgHtmlObject = this.svgSoul.node
        this.currentStatus = currentStatus
        // let svgDim = this.svgHtmlObject.getClientRects()[0]
        let svgDim = svgHtmlObject.getClientRects()[0]
        // to start the basic events
        this.updatePositionOnScreen()
    }

    updatePositionOnScreen(){
        // let drawObject = this.drawObject
        svgHtmlObject.addEventListener("touchstart", function(e){
            // e.preventDefault()
            let touchType = checkTouchType(e)
            if (touchType == "pen"){

              e.preventDefault()

              currentStatus.startTouchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
              currentStatus.startTouchY = e.touches[0].pageY -
              currentStatus.svgOffsetTop

              // touch X and Y
              currentStatus.touchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
              currentStatus.touchY = e.touches[0].pageY -
              currentStatus.svgOffsetTop

              console.log(currentStatus);

              currentStatus.drawObject.create()


            }

        })

        svgHtmlObject.addEventListener("touchmove", function(e){
            // lastTouchX, lastTouchY
            // console.log(e.targetTouches[0].radiusX);
            let touchType = checkTouchType(e)
            if (touchType == "pen"){
                e.preventDefault()
                currentStatus.lastTouchX = currentStatus.touchX
                currentStatus.lastTouchY = currentStatus.touchY
                currentStatus.touchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
                currentStatus.touchY = e.touches[0].pageY -
                currentStatus.svgOffsetTop

                // draw path
                currentStatus.pathArray.push([currentStatus.touchX, currentStatus.touchY])

                currentStatus.drawObject.draw(e)
            }
        })

        svgHtmlObject.addEventListener("touchend", function(e){

            if (currentStatus.drawObject.up){
              console.log("touchleave");
                currentStatus.drawObject.up()
            }
        })

    }
}

let monitor = new MainController(svgSoul, currentStatus)

// console.log(img);
// let circle = svgSoul.circle(20)
// circle.attr({ cx: 100, cy: 100})
// svgHtmlObject.append(img)



let rectButton = document.querySelector("#rect")
rectButton.addEventListener("click", function(){
    currentStatus.drawObject = getDrawFunctionObject(currentStatus, "rect")
})

let eraserButton = document.querySelector("#eraser")
eraserButton.addEventListener("click", function(){
    currentStatus.drawObject = getDrawFunctionObject(currentStatus, "eraser")
})



// drawObject.draw = function(){
//     let rect = svgSoul.rect(10, 10)
//     rect.x(currentStatus.touchX)
//     rect.y(currentStatus.touchY)
// }
