let draw = SVG().addTo("#create").size("100vw", "100vh")
// draw.node.style.background = "pink"
draw.node.style.position = "absolute"
draw.node.style.left = "0px"
draw.node.style.top = "200px"
let currentStatus = {
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    mouseX: 0,
    mouseY: 0,
    object: null,
    currentButton: null
}

 var mouse = {x: 0, y: 0};
 var last_mouse = {x: 0, y: 0};
 let startPoint = {x: 0, y:0}
 /* Mouse Capturing Work */
 draw.node.addEventListener('mousemove', function(e) {
   let offsetLeft = draw.node.style.left.replace("px", "")
   let offsetTop = draw.node.style.top.replace("px", "")

   console.log(offsetLeft, offsetTop);
     currentStatus.lastX = currentStatus.mouseX;
     currentStatus.lastY = currentStatus.mouseY;
     currentStatus.mouseX = e.pageX - parseFloat(offsetLeft)
     currentStatus.mouseY = e.pageY - parseFloat(offsetTop)
     console.log(currentStatus, offsetTop, offsetLeft);
     // currentStatus.mouseX = e.pageX - offsetLeft
     // currentStatus.mouseY = e.pageY - offsetTop
 }, false);





 draw.node.addEventListener('mousedown', function(e) {
   console.log("down");
     let line = draw.line().stroke({
       "width": "10px",
       "color": "blue"
     })
     currentStatus.object = line
     currentStatus.startX = currentStatus.mouseX
     currentStatus.startY = currentStatus.mouseY
     draw.node.addEventListener('mousemove', onPaint, false);
 }, false);

 draw.node.addEventListener('mouseup', function() {
     draw.node.removeEventListener('mousemove', onPaint, false);
 }, false);

 var onPaint = function() {
     /* Drawing on Paint App */
     console.log(currentStatus.object);
     currentStatus.object.plot([currentStatus.startX, currentStatus.startY, currentStatus.mouseX, currentStatus.mouseY])
 };




let rect = draw.rect(100, 100).attr({
    "fill": "#11898C",
    "fill-opacity": 0.5,
    "stroke": "#09223C",
    "stroke-width": "20px"
})
rect.x(100).y(10)
rect.radius(60, 10)


let nest = draw.group()
let cirlce = nest.circle(100).x(500).y(300)
nest.circle(100).x(300).y(300)

let line = nest.line(10, 10, 100, 400)
    .stroke({
      "width": "10px",
      "color": "blue"
    })

let polyline = draw.polyline([[0, 0], [100,100], [300, 400]]).stroke({
  "width": "10px",
  "color": "blue",
})


// M = move to (starting 100, 200)
// C = Bessel curve (100, 100 = first grey point), (400, 100 = 2nd grey point), (400, 200 = end point)
// Z = close, H = horizontal, V = vertical
let path = draw.path("M100, 200 C100, 100 400, 100 400,200 Z").stroke({
  "width": "10px",
  "color": "blue"
})
// polyline.before(path)
// path.front()

cirlce.animate(2000).move(800,400)
cirlce.animate(2000).opacity(0.4)
cirlce.animate(2000).attr({"fill": "#456"})

// let circle = draw.circle(100)
// let ellipsse = draw.ellipse(300, 100)
let div = document.createElement("div")
let button = document.createElement("button")
button.innerHTML = "link"
div.append(button)
document.body.append(div)
