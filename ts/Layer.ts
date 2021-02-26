// const svg = require("svg")
// import svg from "svgjs"
/// <reference path="/Users/edwardtang/Project/socketJS/node_modules/@svgdotjs/svg.js"
// import { SVG } from '@svgdotjs/svg.js'


declare const SVG:any;




class LayerController {
    public static layerArray = []

    public static addToArray(svgLayer){
        LayerController.layerArray.push(svgLayer)
    }

    constructor(){

    }

    createLayer(){
        // let svgContainer: HTMLElement = document.querySelector("")
        let svgObject = SVG() .addTo('#svgContainer').size(300, 300)
        svgObject.rect(100, 100).attr({ fill: '#f06' })

        // svgContainer.style.background = "blue"
        // svgContainer.width = "100px"
        // svgContainer.height = "100px"

    }


}
let layerController = new LayerController()
layerController.createLayer()
