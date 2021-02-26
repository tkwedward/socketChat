declare class MainController {
    static mainHTMLContainer: HTMLElement;
    static createElement(ele: string, className: string | string[], attribute?: object): HTMLElement;
    static createButton(innerText: string, className: string, buttonAction: (e: Event) => void): HTMLElement;
}
