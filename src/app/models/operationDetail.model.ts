
export class OperationDetail {
    operationDetailId: number;
    operationId?: number;
    articleId?: number;
    price?: number;
    amount?: number;
    constructor(
        operationDetailId?: number,
        operationId?: number,
        articleId?: number,
        price?: number,
        amount?: number
    ) {
        this.operationDetailId = operationDetailId;
        this.operationId = operationId;
        this.articleId = articleId;
        this.price = price;
        this.amount = amount;
    }
}
