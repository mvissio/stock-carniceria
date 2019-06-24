import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoxsService} from '../../services/boxs/boxs.service';
import {PageConfig} from '../../models/pageConfig.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Box} from '../../models/Box.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import {CommonsService} from '../../services/commons.service';
import {Rol} from '../../models/rol.model';
import swal from 'sweetalert';
import {Operation} from '../../models/operation.model';
import {Observable} from 'rxjs';


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
    SHOW_OPERATIONS: 'show operations',
    CLOSE: 'close'
  };

  constructor(private _boxService: BoxsService,
              private fb: FormBuilder,
              private _handleErrorsService: HandleErrorsService,
              private _commonsService: CommonsService) {
  }

  ngOnInit() {
    this.pageConfig = new PageConfig('dateOpen');
    this.pageConfig.orderDesc = 'desc';
    this.getBoxs(0);
  }

  onBoxAction(event, box?: Box) {
    this.typeSelect = event;
    switch (this.typeSelect) {
      case this.TYPEBOX.OPEN:
        this.initOpenForm();
        break;
      case this.TYPEBOX.CLOSE:
        this.initCloseForm();
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

  initCloseForm() {
    this.openForm = this.fb.group({
      cashInit: ['', Validators.required]
    });
  }

  createBox() {
    this._boxService.checkOpenBox().subscribe((data: Array<Box>) => {
      if (data.length > 0) {
        this._commonsService.showMessage('warning', 'Por favor cierre todas las cajas abiertas.');
      } else {
        this._boxService.addBox(this.getNewBox()).subscribe(
          (res: Box) => {
            this._commonsService.showMessage('success', 'Caja Creada');
            this.getBoxs(0);
            this.closeModal();
          },
          (err: HttpErrorResponse) => {
            this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
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
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  getNewBox() {
    let box = new Box();
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
  }

  viewOperations(box: Box, nextPage?: number) {
    this.loadOperation = false;
    this.boxModal = box;
    this.pageConfig.pageNumber = (nextPage) ? nextPage : 0;
    this.pageConfig.sortName = 'createDateTime';
    this._boxService.getOperations(box.boxId, this.pageConfig)
      .subscribe(
        (resp: Page) => {
          this.pageOperation = resp;
          this.boxModal.operationList = this.pageOperation.content;
          this.pagesOperation = new Array(this.pageOperation.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        },
        () => this.loadOperation = true
      );
  }

  setPageOperation(nextPage: number) {
    this.viewOperations(this.boxModal, nextPage);
  }
}
