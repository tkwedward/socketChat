import SVG from "svg.js";

export function parseSVGElement(elem: HTMLElement){
    // a function to parse an elem into a json file so that it can be push to thhe svgArray of automerge. The new information can be used to create the same object in other nodes
    let result
    let elemAttribute = elem.attributes
    let tagName = elem.tagName

    switch(tagName) {
        case "rect":
            result = {
              "styleList": {
                "width": elem.getBoundingClientRect().width,
                "height": elem.getBoundingClientRect().height,
                "x": elem.x.baseVal.value,
                "y": elem.y.baseVal.value,
              }
            }
            break;

        case "circle":
            result = {
              "styleList": {
                "r": elem.r.baseVal.value,
                "cx": elem.cx.baseVal.value,
                "cy": elem.cy.baseVal.value
              },
            }
            break;
        //
        case "line":
            result = {
              "styleList": {
                "x1": elem.x1.baseVal.value,
                "y1": elem.y1.baseVal.value,
                "x2": elem.x2.baseVal.value,
                "y2": elem.y2.baseVal.value
              }
            }
            break;
        //
        case "polyline":
            result = {
              "styleList": {
                  "points": elemAttribute.points.value
              }
            }
            break;
        //
        case "image":
            result = {
              "src": elemAttribute.href.value,
              "styleList": {
                "x": elemAttribute.x.value,
                "y": elemAttribute.y.value,
                "width": elemAttribute.width.value,
                "height": elemAttribute.height.value,
              }
            }
            break;
        //
        case "g":
            tagName = "g"
            result = processGroupElement(elem)
            console.log("Here is the result of the group")
            console.log(elemAttribute, result)
            break;
    }
    // console.log("tagName = g", tagName=="g")


    result["tagName"] = tagName
    result["id"] = elem.id
    result["classList"] = Array.from(elem.classList).map(p=>p)
    result["styleList"]["fill"] = elemAttribute.fill?elemAttribute.fill.value:"none"
    result["styleList"]["stroke"] = elemAttribute.stroke?elemAttribute.stroke.value:"none"
    result["styleList"]["stroke-width"] = elemAttribute["stroke-width"]?elemAttribute["stroke-width"].value:"none"

    return result
}

function processGroupElement(groupElem):GroupElemData{
    // to convert group elements into json text
    let result = {
      "groupElements": [],
      "tagName": "g",
      "classList": [],
      "id": "",
      "styleList": {}
    }

    Array.from(groupElem.children).forEach((p:HTMLElement)=>{
        if (p.tagName != "g"){
            result["groupElements"].push(parseSVGElement(p))
        } else {
            result["groupElements"].push(processGroupElement(p))
        }
    })
    return result

}

interface GroupElemData{
    tagName: string,
    classList: string[],
    id: string,
    groupElements: any[],
}

function createGroupHTMLObject(groupData, svgBoard:SVG.G){
    // to create group HTML object from the GroupElemData defined
    groupData.forEach(p=>{
      // console.log("The tagName is : ", p.tagName )
        if (p.tagName != undefined){
            createElement(p, svgBoard)
        } else {
            let _svgBoard = svgBoard.group()
            let _groupData: GroupElemData = p
            // console.log(_groupData["groupElements"])
            createGroupHTMLObject(_groupData, _svgBoard)
        }
    })
}

export function createElement(elemData, svgBoard:SVG.Doc|SVG.G){
    // to create simple object such as rects, circles, lines and polylines

    switch (elemData.tagName) {
        case "rect":
            let rect = svgBoard.rect().attr(elemData.styleList)
            return rect
            break;

        case "circle":
            let circle =  svgBoard.circle().attr(elemData.styleList)
            return circle
            break;

        case "line":
            let line = svgBoard.line([0, 0, 0, 0])
                            .attr(elemData.styleList)
            return line
            break;

        case "polyline":
            let polyline = svgBoard.polyline([0, 0, 0, 0])
                            .attr(elemData.styleList)
            return polyline
            break;

        case "image":
            let image = svgBoard.image(elemData.src)
                    .attr(elemData.styleList)
            return image
            break;

        case "g":
            let _group = svgBoard.group()
            console.log("create group elements", _group)
            let groupData:GroupElemData = elemData
            createGroupHTMLObject(groupData["groupElements"], _group)
            return _group
            break;
    }

}
