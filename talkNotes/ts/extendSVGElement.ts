interface SuperHTMLElement {
  exportData(): any
  tagName: string
}

export function SuperClass(svgObject:HTMLElement):HTMLElement{
  // this is a class for common functions
    return svgObject
}


export function SuperCircle(circle){
    circle = SuperClass(circle)

    circle.exportData = ()=>{
      let result = {
        "styleList": {
          "r": circle.r.baseVal.value,
          "cx": circle.cx.baseVal.value,
          "cy": circle.cy.baseVal.value
        }
      }
      return result
    }

    return circle
}


export function SuperRect(rect){
    rect = SuperClass(rect)


    rect.exportData = ()=>{
      let result = {
        "styleList": {
          "width": rect.getBoundingClientRect().width,
          "height": rect.getBoundingClientRect().height,
          "x": rect.x.baseVal.value,
          "y": rect.y.baseVal.value
        }
      }
      return result
    }

    // rect._new_tell_me_yourName = ()=>{
    //   console.log("I am a rect.")
    // }

    return rect
}

export function SuperLine(line){
    line = SuperClass(line)
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    line.exportData = ()=>{
      let result = {
        "styleList": {
          "x1": line.x1.baseVal.value,
          "y1": line.y1.baseVal.value,
          "x2": line.x2.baseVal.value,
          "y2": line.y2.baseVal.value
        }
      }
      return result
    }
    return line
}

export function SuperPolyline(polyline){
    polyline = SuperClass(polyline)
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    polyline.exportData = ()=>{
      let result = {
        "styleList": {
          "x1": line.x1.baseVal.value,
          "y1": line.y1.baseVal.value,
          "x2": line.x2.baseVal.value,
          "y2": line.y2.baseVal.value
        }
      }
      return result
    }
    return polyline
}

export function SuperImage(image){
    image = SuperClass(image)
    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    return image
}

export function SuperGroup(group){
    // group = SuperClass(group)

    // line._new_tell_me_yourName = ()=>{
    //   console.log("I am a line.")
    // }
    return group
}
