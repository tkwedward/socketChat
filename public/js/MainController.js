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
    pathArray: [],

    objectToBeDrawn: null,
    currentButton: null,
    paintFunction: null,
    saveSvg: function(){
      // console.log(svgHtmlObject.innerHTML);
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

let drawObject = {
    "draw": function(){}
}


function createRect(status){
    let rect = status.layer
}

// polyline functions

function createPolyLine(status, strokeColor = "blue", strokeWidth = "20", fill = "none"){
    let polyline = svgSoul.polyline().attr({
      "stroke": strokeColor,
      "stroke-width": strokeWidth,
      "fill": fill
    })
    status.pathArray = []
    return polyline
}

function drawPolyLine(item, array){
    item.plot(array)
}


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
            console.log(touchType);
            if (touchType == "pen"){

              e.preventDefault()

              currentStatus.startTouchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
              currentStatus.startTouchY = e.touches[0].pageY -
              currentStatus.svgOffsetTop

              // touch X and Y
              currentStatus.touchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
              currentStatus.touchY = e.touches[0].pageY -
              currentStatus.svgOffsetTop

              // draw a testing rectangle
              // currentStatus.objectToBeDrawn = svgSoul.rect(100, 100)
              // currentStatus.objectToBeDrawn.x(currentStatus.startTouchX)
              // currentStatus.objectToBeDrawn.y(currentStatus.startTouchY)

              currentStatus.objectToBeDrawn = createPolyLine(currentStatus)
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
                drawObject.draw()
                currentStatus.saveSvg()
            }
        })

    }
}

let monitor = new MainController(svgSoul, currentStatus)

// console.log(img);
let pdfBaseLayer = svgSoul.image()
// svgHtmlObject.append(img)
drawObject.draw = function(){
    drawPolyLine(currentStatus.objectToBeDrawn, currentStatus.pathArray)
}



// drawObject.draw = function(){
//     let rect = svgSoul.rect(10, 10)
//     rect.x(currentStatus.touchX)
//     rect.y(currentStatus.touchY)
// }
