import { Component, OnInit } from '@angular/core';
import { PageConfig } from '../../models/pageConfig.model';
import { Page } from '../../models/page.model';
import { Operation } from '../../models/operation.model';
import { MonthlyOperationsReport } from '../../models/monthlyOperationsReport.model';
import { OperationsService } from '../../services/pages/operations.service';
import { HandleErrorsService } from '../../services/shared/handle-errors.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonsService } from '../../services/commons.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import swal from 'sweetalert';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { toastType } from '../../constants/constant';



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
  fromDate: IMyDateModel;
  toDate: IMyDateModel;
  oneDate: IMyDateModel;
  operationTypePeriod = '';
  paymentMethodPeriod = '';
  operationTypeOneDate = '';
  paymentMethodOneDate = '';
  showFilterOneDate: boolean;
  showFilterPeriod: boolean;
  lastUsedFilter = 'ninguno';
  operationTypes: any[] = [];
  paymentMethods: any[] = [];
  typeSelect : any;
  TYPEOPERATIONS = {
    SHOW_OPERATIONS: 'show operations'
  };
  monthlyOperationsReport : any = this.limpiarMonthlyOperationsReport();
  yearOperationsReport: number = new Date().getFullYear();
  monthOperationsReport: number = new Date().getMonth();
  availableMonths: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  isMonthSelected:boolean;

  constructor(
    private _operationService: OperationsService,
    private _handleErrorsService: HandleErrorsService,
    private translate: TranslateService,
    private router: Router,
    private _commonsService: CommonsService) {
  }

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false
  };

  ngOnInit() {
    this.pageConfig = new PageConfig('operationId');
    this.pageConfig.changeOrder();
    this.getTodayOperations(0);

    forkJoin([
      this._operationService.getAllOperationTypes(),
      this._operationService.getAllPaymentMethods()
    ])
      .subscribe((res: any) => {
        this.operationTypes = res[0];
        this.paymentMethods = res[1];
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
      });
  }

  setPage(nextPage: number) {
    if (this.lastUsedFilter === 'ninguno') {
      this.getTodayOperations(nextPage);
    } else if (this.lastUsedFilter === 'periodo') {
      this.getOperationsByPeriodWithFilters(nextPage);
    } else if (this.lastUsedFilter === 'fecha') {
      this.getOperationsOneDateWithFilters(nextPage);
    }

  }

  // consulta por la fecha de hoy
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
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        });
  }

  getOperationsByOneDate(path: string, operationTypeOneDate: string, paymentMethodOneDate: string, nextPage = 0) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._operationService.getOperationsByCreateDate(this.pageConfig, this.oneDate.jsdate, path, operationTypeOneDate, paymentMethodOneDate)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.operations = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        });
  }

  getOperationsByPeriod(path: string, operationTypePeriod: string, paymentMethodPeriod: string, nextPage = 0) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._operationService.getOperationsByPeriod(this.fromDate.jsdate, this.toDate.jsdate, this.pageConfig,
      path, operationTypePeriod, paymentMethodPeriod)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.operations = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
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

  setearOperationTypePeriod(operationType: string) {
    this.operationTypePeriod = operationType;
  }

  setearPaymentMethodPeriod(paymentMethod: string) {
    this.paymentMethodPeriod = paymentMethod;
  }

  setearOperationTypeOneDate(operationType: string) {
    this.operationTypeOneDate = operationType;
  }

  setearPaymentMethodOneDate(paymentMethodOne: string) {
    this.paymentMethodOneDate = paymentMethodOne;
  }

  getOperationsByPeriodWithFilters(nextPage: number) {
    this.cleanOneDateFilter();
    this.lastUsedFilter = 'periodo';
    if (this.operationTypePeriod.length === 0 && this.paymentMethodPeriod.length === 0) {
      this.getOperationsByPeriod('getOperationsByPeriod', null, null, nextPage);
      return;
    } else if (this.operationTypePeriod.length > 0 && this.paymentMethodPeriod.length > 0) {
      this.getOperationsByPeriod('getOperationsByPeriodAndOperationTypeAndPaymentMethod',
        this.operationTypePeriod, this.paymentMethodPeriod, nextPage);
      return;
    } else if (this.operationTypePeriod.length > 0) {
      this.getOperationsByPeriod('getOperationsByPeriodAndOperationType', this.operationTypePeriod, null, nextPage);
      return;
    } else if (this.paymentMethodPeriod.length > 0) {
      this.getOperationsByPeriod('getOperationsByPeriodAndPaymentMethod', null, this.paymentMethodPeriod, nextPage);
    }
  }

  getOperationsOneDateWithFilters(nextPage: number) {
    this.cleanPeriodFilter();
    this.lastUsedFilter = 'fecha';
    if (this.operationTypeOneDate.length === 0 && this.paymentMethodOneDate.length === 0) {
      this.getOperationsByOneDate('getOperationsByOneDate', null, null, nextPage);
      return;
    } else if (this.operationTypeOneDate.length > 0 && this.paymentMethodOneDate.length > 0) {
      this.getOperationsByOneDate('getOperationsByOneDateAndOperationTypeAndPaymentMethod',
        this.operationTypeOneDate, this.paymentMethodOneDate, nextPage);
      return;
    } else if (this.operationTypeOneDate.length > 0) {
      this.getOperationsByOneDate('getOperationsByOneDateAndOperationType', this.operationTypeOneDate, null, nextPage);
      return;
    } else if (this.paymentMethodOneDate.length > 0) {
      this.getOperationsByOneDate('getOperationsByOneDateAndPaymentMethod', null, this.paymentMethodOneDate, nextPage);
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

  cleanPeriodFilter() {
    this.lastUsedFilter = 'ninguno';
    this.operationTypePeriod = '';
    this.paymentMethodPeriod = '';
    this.fromDate = null;
    this.toDate = null;
    this.getTodayOperations(0);

  }

  cleanOneDateFilter() {
    this.lastUsedFilter = 'ninguno';
    this.operationTypeOneDate = '';
    this.paymentMethodOneDate = '';
    this.oneDate = null;
    this.getTodayOperations(0);

  }

  onBoxAction(event) {
    this.limpiarMonthlyOperationsReport();
    this.typeSelect = event;
  }


  viewMonthlyOperationReport() {
   
    if(!this.isMonthSelected){
      return;
    }
   
    this._operationService.getMonthlyOperationsReport(this.yearOperationsReport, this.monthOperationsReport)
      .subscribe(
        (resp: any) => {
          this.monthlyOperationsReport = resp;
          console.log("resultado", this.page.content);
          this.isMonthSelected = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        }
      );
  }

  closeModal() {
    this.typeSelect = undefined;
    this.limpiarMonthlyOperationsReport();
  }

  setSelectedMonth(month: string) {
    
    this.isMonthSelected = true;

    switch (month) {
      case 'Enero':
        this.monthOperationsReport = 0;
        break;
      case 'Febrero':
        this.monthOperationsReport = 1;
        break;
      case 'Marzo':
        this.monthOperationsReport = 2;
        break;
      case 'Abril':
        this.monthOperationsReport = 3;
        break;
      case 'Mayo':
        this.monthOperationsReport = 4;
        break;
      case 'Junio':
        this.monthOperationsReport = 5;
        break;
      case 'Julio':
        this.monthOperationsReport = 6;
        break;
      case 'Agosto':
        this.monthOperationsReport = 7;
        break;
      case 'Septiembre':
        this.monthOperationsReport = 8;
        break;
      case 'Octubre':
        this.monthOperationsReport = 9;
        break;
      case 'Noviembre':
        this.monthOperationsReport = 10;
        break;
      case 'Diciembre':
        this.monthOperationsReport = 11;
        break;
    }
    console.log("mes seleccionado", this.monthOperationsReport);
  }

  setSelectedYear(year: number) {
    this.yearOperationsReport = year;  
    console.log("año seleccionado", this.yearOperationsReport);
  }
  
  limpiarMonthlyOperationsReport(){
    this.monthlyOperationsReport = {
      totalMoneySale : 0.0,
      totalMoneyBuy : 0.0,
      totalCountSale : 0.0,
      totalCountBuy : 0.0

    
    };
  }


}
