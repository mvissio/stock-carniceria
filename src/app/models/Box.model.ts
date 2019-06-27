import {Operation} from './operation.model';

export class Box {
  boxId: number;
  cashOpen: string;
  dateOpen: Date;
  cashClose: string;
  dateClose: Date;
  open: boolean;
  detailClose: string;
  operationList: Array<Operation>;

  constructor(
    boxId?: number,
    cashOpen?: string,
    dateOpen?: Date,
    cashClose?: string,
    dateClose?: Date,
    open?: boolean,
    detailClose?: string,
    operationList?: Array<Operation>
  ) {
    this.boxId = boxId;
    this.cashOpen = cashOpen;
    this.dateOpen = dateOpen;
    this.cashClose = cashClose;
    this.dateClose = dateClose;
    this.open = open;
    this.detailClose = detailClose;
    this.operationList = operationList;
  }


}
