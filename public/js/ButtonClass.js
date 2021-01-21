/*
Line button
*/

let cake = document.querySelector(".cake")

function lineOnPaint(item) {
    cake.innerHTML = "123"
    item.plot([currentStatus.startTouchX, currentStatus.startTouchY, currentStatus.touchX, currentStatus.touchY])
}

function lineMouseDown(e){
    let line = draw.line().stroke({
        "width": "10px",
        "color": "blue"
    })
    currentStatus.object = line
}
currentStatus.downFunction = lineMouseDown

function lineMouseUp(e){
    e.preventDefault();
    if (currentStatus.typeOfEvent == "mouse"){
        draw.node.removeEventListener('mousemove', lineOnPaint, false);
    }
    if (currentStatus.typeOfEvent == "touch"){
        draw.node.removeEventListener('touchmove', lineOnPaint, false);
    }
}

let actionFunction = {
    "lineOnPaint": function(item) {
        cake.innerHTML = "123"
        item.plot([currentStatus.startTouchX, currentStatus.startTouchY, currentStatus.touchX, currentStatus.touchY])
    }
}



//////////

let div = document.createElement("div")
let button = document.createElement("button")
button.innerHTML = "link"

// downAction
//  draw.node.addEventListener('mousedown', LineButtonFunction.downAction, false);
//  draw.node.addEventListener('touchstart', LineButtonFunction.downAction, false);
//
// // upAction
//  draw.node.addEventListener('mouseup', LineButtonFunction.upAction, false);
//  draw.node.addEventListener('touchend', LineButtonFunction.upAction, false);

div.append(button)
functionButtonSet.append(div)
document.body.style.background = "pink"
