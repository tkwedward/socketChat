const socket = io()

let colorPicker = document.querySelector(".color-picker-container input")
let brushSizePicker = document.querySelector(".brushsize-container select")

let myStatus = {
    color: "#919311",
    size: "5"
}
colorPicker.value = myStatus.color
brushSizePicker.value = myStatus.size

colorPicker.addEventListener("change", function(){
    myStatus.color = colorPicker.value
    console.log(colorPicker.value);
})

brushSizePicker.addEventListener("change", function(){
    myStatus.size = brushSizePicker.value
    console.log(myStatus.size);
})


let canvas = document.querySelector('#board');
let ctx = canvas.getContext('2d');
let sketch = document.querySelector('#sketch');

function drawOnCanvas(){
    console.log("hello");
   var sketch_style = getComputedStyle(sketch);
   canvas.width = parseInt(sketch_style.getPropertyValue('width'));
   canvas.height = parseInt(sketch_style.getPropertyValue('height'));

   var mouse = {x: 0, y: 0};
   var last_mouse = {x: 0, y: 0};

   /* Mouse Capturing Work */
   canvas.addEventListener('mousemove', function(e) {
       last_mouse.x = mouse.x;
       last_mouse.y = mouse.y;
       mouse.x = e.pageX - this.offsetLeft;
       mouse.y = e.pageY - this.offsetTop;
   }, false);



   canvas.addEventListener('mousedown', function(e) {
       canvas.addEventListener('mousemove', onPaint, false);
   }, false);

   canvas.addEventListener('mouseup', function() {
       canvas.removeEventListener('mousemove', onPaint, false);
   }, false);

   var onPaint = function() {
       /* Drawing on Paint App */
       ctx.lineWidth = myStatus.size;
       ctx.lineJoin = 'round';
       ctx.lineCap = 'round';
       ctx.strokeStyle = myStatus.color;
       ctx.beginPath();
       ctx.moveTo(last_mouse.x, last_mouse.y);
       ctx.lineTo(mouse.x, mouse.y);
       ctx.closePath();
       ctx.stroke();

       setTimeout(function(){
          let  base64ImageData = canvas.toDataURL("image/png");
          socket.emit("canvas-data", base64ImageData)
          // console.log(base64ImageData);
       }, 1000)
   };


}
drawOnCanvas()

socket.on("canvas-data", function(data){
  console.log("receive data");
  var image = new Image()

  image.onload = function(){
      ctx.drawImage(image, 0, 0)
  }
  image.src = data
})
