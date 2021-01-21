
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
    plot(currentStatus.pathArray)
}
