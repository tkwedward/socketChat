declare const SVG: any;
declare class LayerController {
    static layerArray: any[];
    static addToArray(svgLayer: any): void;
    constructor();
    createLayer(): void;
}
declare let layerController: LayerController;
