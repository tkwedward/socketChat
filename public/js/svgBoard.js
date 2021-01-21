let line = draw.line(10, 10, 100, 400)
              .stroke({
                "width": "10px",
                "color": "blue"
              })

draw.node.addEventListener("touchstart", function(e){
  e.preventDefault()
  // cake.innerHTML = new Date()
  currentStatus.typeOfEvent = "touch"
  currentStatus.startTouchX = e.touches[0].screenX
  currentStatus.startTouchY = e.touches[0].screenY
  // draw.node.addEventListener('touchmove', LineButtonFunction.onPaint, true);


  draw.node.addEventListener('touchmove', function(){
    currentStatus.paintFunction = actionFunction["lineOnPaint"]

    currentStatus.paintFunction(currentStatus.object)
  }, false);
})



draw.node.addEventListener("mousedown", function(e){
  e.preventDefault()
  cake.innerHTML = new Date()
  currentStatus.typeOfEvent = "mouse"
  currentStatus.startX = e.pageX
  currentStatus.startY = e.pageY
  draw.node.addEventListener('mousemove', LineButtonFunction.onPaint, false);
})


draw.node.addEventListener('touchmove', function(e) {
  // update touchposition
  e.preventDefault()
  // cake.innerHTML = JSON.stringify(currentStatus)
  let touchList = e.touches[0]
  console.log(currentStatus);

  let offsetLeft = draw.node.style.left.replace("px", "")
  let offsetTop = draw.node.style.top.replace("px", "")
  // cake.innerHTML = `screenX: ${touchList.screenX}, screen Y: ${touchList.screenY}`
  // console.log(e.touches[0].clientX);
  // console.log(currentStatus);
  console.log(currentStatus.svgOffsetLeft);
  currentStatus.lastX = currentStatus.mouseX;
  currentStatus.lastY = currentStatus.mouseY;
  currentStatus.touchX = e.touches[0].pageX
  currentStatus.touchY = e.touches[0].pageY
  currentStatus.touchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
  currentStatus.touchY = e.touches[0].pageY - currentStatus.svgOffsetTop
}, false);

draw.node.addEventListener('mousemove', function(e) {

  let offsetLeft = draw.node.style.left.replace("px", "")
  let offsetTop = draw.node.style.top.replace("px", "")

  currentStatus.lastX = currentStatus.mouseX;
  currentStatus.lastY = currentStatus.mouseY;
  currentStatus.mouseX = e.pageX
  currentStatus.mouseY = e.pageY

}, false);
