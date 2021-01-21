let draw = SVG().addTo("#create").size("100vw", "100vh")
let cake = document.querySelector(".cake")
// draw.node.style.background = "pink"
draw.node.style.position = "absolute"
draw.node.style.left = "0px"
draw.node.style.top = "200px"

 var mouse = {x: 0, y: 0};
 var last_mouse = {x: 0, y: 0};
 let startPoint = {x: 0, y:0}
 /* Mouse Capturing Work */


 // check MOuse position
 draw.node.addEventListener('mousemove', function(e) {
   currentStatus.typeOfEvent = "mouse"
   let offsetLeft = draw.node.style.left.replace("px", "")
   let offsetTop = draw.node.style.top.replace("px", "")

   currentStatus.lastX = currentStatus.mouseX;
   currentStatus.lastY = currentStatus.mouseY;
   currentStatus.mouseX = e.pageX - parseFloat(offsetLeft)
   currentStatus.mouseY = e.pageY - parseFloat(offsetTop)

 }, false);

 draw.node.addEventListener("touchstart", function(e){
    e.preventDefault()
    cake.innerHTML = new Date()
 })


 draw.node.addEventListener('touchmove', function(e) {
   e.preventDefault()
   let touchList = e.touches[0]
   console.log(touchList.screenX);

   currentStatus.typeOfEvent = "touch"
   let offsetLeft = draw.node.style.left.replace("px", "")
   let offsetTop = draw.node.style.top.replace("px", "")
   cake.innerHTML = `${touchList.screenX}, ${touchList.screenY}`
   // console.log(e.touches[0].clientX);
   // console.log(currentStatus);
   currentStatus.lastX = currentStatus.mouseX;
   currentStatus.lastY = currentStatus.mouseY;
   currentStatus.touchX = e.touches[0].pageX - parseFloat(offsetLeft)
   currentStatus.touchY = e.touches[0].pageY - parseFloat(offsetTop)

 }, false);
 //


function lineOnPaint(item){
    item.plot([currentStatus.startTouchX, currentStatus.startTouchY, currentStatus.touchX, currentStatus.touchY])
}

class LineButtonFunction {
    constructor(){
        this.currentStatus = currentStatus
    }

    static onPaint = function(item) {

        cake.innerHTML = "123"

        // e.preventDefault();
        // if (currentStatus.typeOfEvent== "mouse"){
        //     currentStatus.object.plot([currentStatus.startX, currentStatus.startY, currentStatus.mouseX, currentStatus.mouseY])
        // }
        // if (currentStatus.typeOfEvent== "touch"){
        //     currentStatus.object.plot([currentStatus.startTouchX, currentStatus.startTouchY, currentStatus.touchX, currentStatus.touchY])
        // }

    }

    static downAction = function(e) {
        e.preventDefault();
        console.log("down");
        let line = draw.line().stroke({
          "width": "10px",
          "color": "blue"
        })
        currentStatus.object = line
    }

    static upAction =  function(e) {
        e.preventDefault();
        if (currentStatus.typeOfEvent == "mouse"){
            draw.node.removeEventListener('mousemove', LineButtonFunction.onPaint, false);
        }
        if (currentStatus.typeOfEvent == "touch"){
            draw.node.removeEventListener('touchmove', LineButtonFunction.onPaint, false);
        }
    }
}


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

// downAction
 draw.node.addEventListener('mousedown', LineButtonFunction.downAction, false);
 draw.node.addEventListener('touchstart', LineButtonFunction.downAction, false);

// upAction
 draw.node.addEventListener('mouseup', LineButtonFunction.upAction, false);
 draw.node.addEventListener('touchend', LineButtonFunction.upAction, false);

div.append(button)
document.body.append(div)
