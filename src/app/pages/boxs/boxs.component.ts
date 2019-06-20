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

  boxs: Box[];
  typeSelect: any;
  actionTitle: string;
  openForm: FormGroup;
  TYPEBOX = {
    OPEN: 'create',
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

  onBoxAction(event) {
    this.typeSelect = event;
    switch (this.typeSelect) {
      case this.TYPEBOX.OPEN:
        this.initOpenForm();
        break;
      case this.TYPEBOX.CLOSE:
        this.initCloseForm();
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

  initOpenForm() {
    this.openForm = this.fb.group({
      cashInit: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]]
    });
  }

  createBox() {
    // this._boxService.addBox(this.box)
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
  setNewBox() {
    let box = new Box();
    box.cashOpen = this.openForm.value.cashInit;
    box.dateOpen = new Date();
    box.open = true;
  }
}
