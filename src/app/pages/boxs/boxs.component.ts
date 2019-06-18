import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page.model';
import {BoxsService} from '../../services/pages/boxs.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-boxs',
  templateUrl: './boxs.component.html',
  styleUrls: ['./boxs.component.scss']
})
export class BoxsComponent implements OnInit {
  loading = false;
  page: Page;
  typeSelect: any;
  actionTitle: string;
  openForm: FormGroup;
  TYPEBOX = {
    OPEN: 'create',
    CLOSE: 'close'
  };


  constructor(private _boxs: BoxsService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
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
      cashInit: ['', Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]
    });
  }

  createBox() {
    debugger
  }
}
