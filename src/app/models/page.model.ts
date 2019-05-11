export class Page {
    content: Array<any>;
    totalPages: number;
    totalElements: number;
    size?: number;
    number?: number;
    last?: boolean;
    first?: boolean;
    constructor(
        content?: Array<any>,
        totalPages?: number,
        totalElements?: number,
        size?: number,
        number?: number,
        last?: boolean,
        first?: boolean
    ) {
        this.content = content;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.size = size;
        this.number = number;
        this.last = last;
        this.first = first;
    }
}