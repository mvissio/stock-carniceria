import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoxsService} from '../../services/pages/boxs.service';
import {PageConfig} from '../../models/pageConfig.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Box} from '../../models/Box.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import {CommonsService} from '../../services/commons.service';
import swal from 'sweetalert';
import {forkJoin} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {toastType} from '../../constants/constant';
import {Operation} from '../../models/operation.model';


@Component({
  selector: 'app-boxs',
  templateUrl: './boxs.component.html',
  styleUrls: ['./boxs.component.scss']
})
export class BoxsComponent implements OnInit {
  loading = false;
  page: Page;
  pageConfig: PageConfig;
  pages: number[];
  boxModal: Box;
  pageOperation: Page;
  pagesOperation: number[];
  loadOperation = false;
  boxs: Box[];
  typeSelect: any;
  actionTitle: string;
  openForm: FormGroup;
  TYPEBOX = {
    OPEN: 'create',
    SHOW_DETAILS: 'show details',
    SHOW_OPERATIONS: 'show operations'
  };
  boxOperation = {
    saleOperation: {
      total: 0,
      cant: 0
    },
    buyOperation: {
      total: 0,
      cant: 0
    }
  };


  ngOnInit() {
    this.pageConfig = new PageConfig('dateOpen');
    this.pageConfig.orderDesc = 'desc';
    this.getBoxs(0);
  }

  constructor(private _boxService: BoxsService,
              private fb: FormBuilder,
              private translate: TranslateService,
              private _handleErrorsService: HandleErrorsService,
              private _commonsService: CommonsService) {
  }

  onBoxAction(event, box?: Box) {
    this.typeSelect = event;
    switch (this.typeSelect) {
      case this.TYPEBOX.OPEN:
        this.initOpenForm();
        break;
      case this.TYPEBOX.SHOW_OPERATIONS:
        this.viewOperations(box);
        break;
      case this.TYPEBOX.SHOW_DETAILS:
        this.viewDetails(box);
        break;
    }
  }

  closeModal() {
    this.typeSelect = undefined;
  }

  createBox() {
    this._boxService.checkOpenBox().subscribe((data: Array<Box>) => {
      if (data.length > 0) {
        this.translate.get('boxs.errorOpenBox')
          .subscribe((res: string) => {
            this._commonsService.showMessage(toastType.warning, res);
          });
      } else {
        this._boxService.addBox(this.getNewBox()).subscribe(
          (res: Box) => {
            this._commonsService.showMessage(toastType.success, 'Caja Creada');
            this.getBoxs(0);
            this.closeModal();
          },
          (err: HttpErrorResponse) => {
            this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
          });
      }
    });
  }

  initOpenForm() {
    this.openForm = this.fb.group({
      cashInit: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]]
    });
  }

  get openControls() {
    return this.openForm.controls;
  }

  getBoxs(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._boxService.getAllBoxs(this.pageConfig)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.boxs = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        });
  }

  getNewBox() {
    const box = new Box();
    box.cashOpen = this.openForm.value.cashInit;
    box.dateOpen = new Date();
    box.open = true;
    return box;
  }

  setPage(nextPage: number) {
    this.getBoxs(nextPage);
  }

  viewDetails(box: Box) {
    this.boxModal = box;
    this._boxService.getOperations(box.boxId).subscribe((resp: Array<Operation>) => {
      resp.forEach(operation => {
        switch (operation.operationType) {
          case 'BUY':
            this.boxOperation.buyOperation.cant += 1;
            this.boxOperation.buyOperation.total += operation.total;
            break;
          case 'SALE':
            this.boxOperation.saleOperation.cant += 1;
            this.boxOperation.saleOperation.total += operation.total;
            break;
        }
      });
    });
  }

  viewOperations(box: Box, nextPage?: number) {
    this.loadOperation = false;
    this.boxModal = box;
    this.pageConfig.pageNumber = (nextPage) ? nextPage : 0;
    this.pageConfig.sortName = 'createDateTime';
    this._boxService.getOperationsPage(box.boxId, this.pageConfig)
      .subscribe(
        (resp: Page) => {
          this.pageOperation = resp;
          this.boxModal.operationList = this.pageOperation.content;
          this.pagesOperation = new Array(this.pageOperation.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        },
        () => this.loadOperation = true
      );
  }

  setPageOperation(nextPage: number) {
    this.viewOperations(this.boxModal, nextPage);
  }

  showCloseModal(box: Box) {
    forkJoin(
      [this.translate.get('modals.closeBox.title'),
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
            this._boxService.closeBox(box).subscribe(
              (resp: any) => {
                this.translate.get('boxs.closeOk')
                  .subscribe((res: string) => {
                    this._commonsService.showMessage(toastType.success, res);
                    this.getBoxs(0);
                  });
              }, (err: HttpErrorResponse) => {
                this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
              });
          }
        }
      );
    });
  }
}
