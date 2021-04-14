import SVG from "svg.js";
import * as io from 'socket.io-client';
import * as Automerge from 'automerge'
import * as svgHelperFunction from "./svgHelperFunction"
import * as ShapeTypeInterface from "./shapeTypeInterface"

let test2 = SVG('testing2')

const socket = io.io()




enum ShapeType {
  rect = "rect",
  circle = "circle",
  line = "line",
  polyline = "polyline",
  image = "image",
  group = "group"
}


function log(...data){
  console.log(data)
}

class SVGArray{
    name: string
    array: any[]
    svgHTMLElement: SVG.Doc

    constructor(name:string){
        this.name = name
        this.array = []
        this.svgHTMLElement = this.createSVGHTMLElement()
    }

    createSVGHTMLElement(): SVG.Doc{
      let svg = SVG('testing')
      return svg
    }
}

let elemArray = []
// to create some element for passing to the other side
var _svg_testing = new SVGArray("svgTest")


let svgArrayName = _svg_testing.name
let arrayObject = {}
arrayObject[svgArrayName] = []

let mainDoc = Automerge.from(arrayObject)
let previousDoc = Automerge.init()
console.log(57, previousDoc)

// rect
// line
let rectInputData: ShapeTypeInterface.RectInputData = {
    "tagName": "rect",
    "styleList":{"x": 10, "y": 150, "width": 100, "height": 200,
    "fill": '#f06'}
}
// let rect = _svg_testing.svgHTMLElement
//                 .rect().attr(rectInputData)
let rect = svgHelperFunction.createElement(rectInputData, _svg_testing.svgHTMLElement)
_svg_testing.array.push(rect)

// circle
let circleInputData: ShapeTypeInterface.CircleInputData = {
    "tagName": "circle", "styleList": {
        "r": 10, "cx": 10, "cy": 10, "fill": 'blue'
    }
}
let circle2 = svgHelperFunction.createElement(circleInputData, _svg_testing.svgHTMLElement)
_svg_testing.array.push(circle2)

// line
let lineInputData: ShapeTypeInterface.LineInputData = {
    "tagName": "line", "styleList": {
        "x1": 0, "y1": 0, "x2": 100, "y2": 300,
        "stroke": "gold", "stroke-width": 1
    }
}
let line1 = svgHelperFunction.createElement(lineInputData, _svg_testing.svgHTMLElement)
_svg_testing.array.push(line1)


// polyline
let polyLineInputData: ShapeTypeInterface.PolylineInputData = {
    "tagName": "polyline",

    "styleList": {
        "points": [[0,0], [400,50], [50,500]],
        "fill": "none", "stroke": "blue", "stroke-width": 1
    }
}
var polyline = svgHelperFunction.createElement(polyLineInputData, _svg_testing.svgHTMLElement)
_svg_testing.array.push(polyline)

// add image


var image = _svg_testing.svgHTMLElement
              .image("img/pikachu_family.jpeg", 200)
              .attr({"x": 200, "y": 300})
_svg_testing.array.push(image)


// var group = _svg_testing.svgHTMLElement.group()
// group.circle(25)
//      .cx(40)
//      .cy(40)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
// group.circle(50)
//      .cx(60)
//      .cy(60)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
//
// var subgroup = group.group()
// subgroup.circle(25)
//      .cx(150)
//      .cy(40)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})
// subgroup.circle(50)
//      .cx(260)
//      .cy(60)
//      .attr({"stroke": "green", "stroke-width": 5, "fill": "white"})

// let data = svgHelperFunction.parseSVGElement(group.node)
// console.log("group data", data)
// console.log("the group node is here.", group.node)
// _svg_testing.array.push(group)

// let data = elemArray.map(p=>svgHelperFunction.parseSVGElement(p.node))
// console.log(data)
// add the element into the automerge doc
console.log(164, elemArray)
// previousDoc = mainDoc
mainDoc = Automerge.change(mainDoc, doc=>{
  let data = _svg_testing.array.map(p=>{
    console.log(166, p)
    return svgHelperFunction.parseSVGElement(p.node)})
  data.forEach(p=>doc[svgArrayName].push(p))
  console.log(146, doc[svgArrayName])
})


let changes = Automerge.getChanges(previousDoc, mainDoc)
console.log(148, mainDoc[svgArrayName], 149, previousDoc)
console.log(150, changes)

// the click button below is used to add item to the automerge doc
let addCircleButton = document.querySelector(".addCircleButton")
addCircleButton.addEventListener("click", ()=>{
    mainDoc[svgArrayName].forEach(p=>svgHelperFunction.createElement(p, test2))
})

let x = document.querySelector("polyline")
console.log(svgHelperFunction.parseSVGElement(x))

socket.on("connect", ()=>{
    // ask the server for initial data
    socket.emit("message", "user connected")
    // socket.emit("initialDataRequest")

})
