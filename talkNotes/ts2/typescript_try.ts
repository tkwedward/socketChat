import SVG from "svg.js";

class SVGArray{
    name: string
    array: [HTMLElement?]
    svgHTMLElement: SVG.Doc

    constructor(name:string){
        this.name = name
        this.array = []
        this.svgHTMLElement = this.createSVGHTMLElement()
    }

    createSVGHTMLElement(): SVG.Doc{
      let svg = SVG('.testing')
      return svg
    }
}




class Friend{
  name: string


  constructor(name:string){
    self.name = name
  }
}
