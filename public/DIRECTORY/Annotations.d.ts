interface IAnnotations {
    id: number;
    content: string;
    commentHTMLObject: HTMLElement;
    createHTMLObject(): HTMLElement;
}
interface AnnotationSaveDataStructure {
    id: number;
    annotationArray: {
        "type": string;
        "innerHTML": string;
    }[];
}
declare enum AnnotationType {
    Question = "Question",
    Comment = "Comment"
}
declare enum AnnotationControllerButtons {
    addButton = 0,
    deleteButton = 1
}
declare let placeholder: string;
declare let placeholder2: string;
declare class AnnotationController {
    static HtmlObject: HTMLElement;
    static addButton: HTMLElement;
}
declare let annotationAddButton: HTMLElement;
declare let annotationSaveButton: HTMLElement;
declare class Annotations implements IAnnotations {
    private static ID_COUNTER;
    static ANNOTATION_ARRAY: IAnnotations[];
    static addToArray(annotation: Annotations): void;
    static save(): void;
    id: number;
    content: string;
    AnnotationType: AnnotationType;
    commentHTMLObject: HTMLElement;
    constructor();
    createHTMLObject(): HTMLElement;
    createAnnotationContent(type: string): HTMLElement;
}
declare let testAnnotation: Annotations;
