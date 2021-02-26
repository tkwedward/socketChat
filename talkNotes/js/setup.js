// create Rectangle
let svgContainer = document.querySelector("#create")
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
}


let drawObject = {
    "draw": function(){}
}




let commentController = new CommentController()
let lineButtonSubFunction = new LineButtonSubFunction()
let selectorButtonSubFunction = new SelectorButtonSubFunction()
