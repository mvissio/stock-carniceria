import { Component, OnInit } from '@angular/core';
import { PageConfig } from '../../models/pageConfig.model';
import { Page } from '../../models/page.model';
import { Operation } from '../../models/operation.model';
import { OperationsService } from '../../services/pages/operations.service';
import { HandleErrorsService } from '../../services/shared/handle-errors.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonsService } from '../../services/commons.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import swal from 'sweetalert';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  page: Page;
  operations: Operation[];
  pages: number[];
  loading = false;
  pageConfig: PageConfig;
  fromDate: Date;
  toDate: Date;
  selectedDate: Date;

  operationTypePeriod: string = "";
  paymentMethodPeriod: string = "";

  operationTypeOneDate: string = "";
  paymentMethodOneDate: string = "";

  showFilterOneDate: boolean;
  showFilterPeriod: boolean;

  constructor(private _operationService: OperationsService,
    private _handleErrorsService: HandleErrorsService,
    private translate: TranslateService,
    private router: Router,
    private _commonsService: CommonsService) {

      

  }

  ngOnInit() {
    this.pageConfig = new PageConfig('operationId');
    this.pageConfig.changeOrder();
    this.getTodayOperations(0);  
  }

  setPage(nextPage: number) {
    this.getTodayOperations(nextPage);
  }

  //consulta por la fecha de hoy
  getTodayOperations(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._operationService.getOperationsByTodayCreateDate(this.pageConfig)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.operations = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  getTodayOperationsByOneDate(nextPage: number, path: string) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._operationService.getOperationsByCreateDate(this.pageConfig, this.selectedDate, path)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.operations = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  getOperationsByPeriod(nextPage: number, path: string) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._operationService.getOperationsByPeriod(this.fromDate, this.toDate, this.pageConfig, path)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.operations = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }


  editOrShowOperation(operationId: number, edit: boolean = false) {
    this.router.navigate(['/operacion', operationId], { queryParams: { edit: edit }, skipLocationChange: true });
  }

  cancelOperation(operationId: number) {
    forkJoin(
      [this.translate.get('modals.cancelOperation.title', { param: operationId }),
      this.translate.get('modals')
      ]).subscribe((result) => {
        swal({
          title: result[0],
          icon: 'warning',
          closeOnClickOutside: true,
          buttons: {
            confirm: {
              text: result[1].defaultConfirmButton,
              value: true,
              visible: true,
              closeModal: true
            },
            cancel: {
              text: result[1].defaultCancelButton,
              value: false,
              visible: true,
              closeModal: true,
            }
          }
        }
        ).then((data) => {
          if (data) {
            this._operationService.cancelOperation(operationId).subscribe(() => this.getTodayOperations(this.page.number));
          }
        });
      });
  }

  getOperationStatus(operation: Operation) {
    return operation.operationStatus;
  }

  setearOperationTypePeriod(tipo: string) {
    this.operationTypePeriod = tipo;
    console.log("valor seteado", tipo);
  }

  setearPaymentMethodPeriod(tipo: string) {
    this.paymentMethodPeriod = tipo;
    console.log("valor seteado", tipo);
  }

  setearOperationTypeOneDate(tipo: string) {
    this.operationTypeOneDate = tipo;
    console.log("valor seteado", tipo);
  }

  setearPaymentMethodOneDate(tipo: string) {
    this.paymentMethodOneDate = tipo;
    console.log("valor seteado", tipo);
  }

  getOperationsByPeriodWithFilters() {

    if (this.operationTypePeriod.length == 0 && this.paymentMethodPeriod.length == 0) {
      this.getOperationsByPeriod(0, "getOperationsByPeriod");
      return;
    } else if (this.operationTypePeriod.length > 0 && this.paymentMethodPeriod.length > 0) {
      this.getOperationsByPeriod(0, "getOperationsByPeriodAndOperationTypeAndPaymentMethod");
      return;
    } else if (this.operationTypePeriod.length > 0) {
      this.getOperationsByPeriod(0, "getOperationsByPeriodAndOperationType");
      return;
    } else if (this.paymentMethodPeriod.length > 0) {
      this.getOperationsByPeriod(0, "getOperationsByPeriodAndPaymentMethod");
    }
  }

  getOperationsOneDateWithFilters() {

    if (this.operationTypeOneDate.length == 0 && this.paymentMethodOneDate.length == 0) {
      this.getTodayOperationsByOneDate(0, "getOperationsByOneDate");
      return;
    } else if (this.operationTypeOneDate.length > 0 && this.paymentMethodOneDate.length > 0) {
      this.getTodayOperationsByOneDate(0, "getOperationsByOneDateAndOperationTypeAndPaymentMethod");
      return;
    } else if (this.operationTypeOneDate.length > 0) {
      this.getTodayOperationsByOneDate(0, "getOperationsByOneDateAndOperationType");
      return;
    } else if (this.paymentMethodOneDate.length > 0) {
      this.getTodayOperationsByOneDate(0, "getOperationsByOneDateAndPaymentMethod");
      return;
    }
  }

  showOneDateFilter() {
    if (!this.showFilterOneDate) {
      this.showFilterOneDate = true;
    } else {
      this.showFilterOneDate = false;
    }
  }
  showPeriodFilter() {
    if (!this.showFilterPeriod) {
      this.showFilterPeriod = true;
    } else {
      this.showFilterPeriod = false;
    }


  }

  options: DatepickerOptions = {
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday   
    placeholder: 'Fecha de operación', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

}
