import { OperationDetail } from './operationDetail.model';

export class Operation {
    operationId: number;
    createDateTime?: Date;
    disabledDate?: Date;
    disabled?: boolean;
    operationType?: string;
    paymentMethod?: string;
    operationStatus?: string;
    total?: number;
    subTotal?: number;
    operationDetails?: OperationDetail[];  
    constructor(
        operationId?: number,
        createDateTime?: Date,
        disabledDate?: Date,
        disabled?: boolean,
        operationType?: string,
        paymentMethod?: string,
        operationStatus?: string,
        total?: number,
        subTotal?: number
    ) {
        this.operationId = operationId;
        this.createDateTime = createDateTime;
        this.disabledDate = disabledDate;
        this.disabled = disabled || false;
        this.operationType = operationType;
        this.paymentMethod = paymentMethod;
        this.operationStatus = operationStatus;
        this.total = total;
        this.subTotal = subTotal;
    }
}
