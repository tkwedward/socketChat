export interface RectInputData {
    "tagName": string,
    "styleList":{
        "x": number,
        "y": number,
        "width": number,
        "height": number,
        "stroke"?: string,
        "stroke-width"?: number,
        "fill"?: string
    }
}

export interface LineInputData {
    "tagName": string,
    "styleList":{
        "x1": number,
        "y1": number,
        "x2": number,
        "y2": number,
        "stroke"?: string,
        "stroke-width"?: number
    }
}

export interface CircleInputData {
    "tagName": string,
    "styleList":{
        "r": number,
        "cx": number,
        "cy": number,
        "fill"?: string
        "stroke"?: string,
        "stroke-width"?: number
    }
}

export interface PolylineInputData {
    "tagName": string,

    "styleList":{
        "points": [number, number][],
        "fill"?: string
        "stroke"?: string,
        "stroke-width"?: number
    }
}

export interface ImageInputData {
    "tagName": string,
    "styleList":{
        "href": string,
        "x": number,
        "y": number
        "width"?: number,
        "height"?: number,

    }
}
