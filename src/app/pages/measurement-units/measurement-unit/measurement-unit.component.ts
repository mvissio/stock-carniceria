import { Component, OnInit } from '@angular/core';
import { MeasurementUnit } from '../../../models/measurement-unit.model';
import { MeasurementUnitService } from '../../../services//measurement-units//measurement-unit.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.scss']
})
export class MeasurementUnitComponent implements OnInit {

  id: number;
  measurementUnit: MeasurementUnit = new MeasurementUnit();
  edit = false;
  measurementUnitForm: FormGroup;
  disabledFields = false;


  constructor(
    private activateRoute: ActivatedRoute,
    private translate: TranslateService,
    private _measurementUnitService: MeasurementUnitService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) {  
    this.id = this.activateRoute.snapshot.params['id'];
    this.disabledFields = this.activateRoute.snapshot.queryParams['edit'] && this.activateRoute.snapshot.queryParams['edit'] === 'false';
    if (this.id) {
      this.edit = true;
      this.getMeasurementUnit();
    } else {
      this.edit = false;
    }
    this.initForm();}

  ngOnInit() {
  }

  initForm() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    this.measurementUnitForm = this.fb.group({           
      name: [this.measurementUnit.name, [Validators.required, Validators.maxLength(45)]],
      symbol: [this.measurementUnit.symbol, [Validators.required, Validators.maxLength(2)]]               
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.measurementUnitForm.disable();
    }
  }

  get measurementUnitControls() { return this.measurementUnitForm.controls; }

  getMeasurementUnit() {
    this._measurementUnitService.getMeasurementUnitByMeasurementUnitId(this.id)
      .subscribe((res: MeasurementUnit) => {
        this.measurementUnit = res;
        this.initForm();
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  saveMeasurementUnit() {
    if (this.measurementUnitForm.invalid) {
      return;
    }
    this.setMeasurementUnit();
    if (this.edit) {
      this._measurementUnitService.updateMeasurementUnit(this.measurementUnit)
        .subscribe(() => {
          this.translate.get('measurementUnit.updateOk')
          .subscribe((res: string) => {
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this._measurementUnitService.addMeasurementUnit(this.measurementUnit)
        .subscribe(() => {
          this.translate.get('measurementUnits.createOk')
          .subscribe((res: string) => { 
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    }
  }

  setMeasurementUnit() {
    
    this.measurementUnit.name = this.measurementUnitForm.value.name;
    this.measurementUnit.symbol = this.measurementUnitForm.value.symbol;
                 
  }
   
  back() {
    this.router.navigate(['/configuracion/unidadesMedida']);
  }

}
