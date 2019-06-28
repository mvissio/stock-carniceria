import {Component, OnInit} from '@angular/core';
import {MeasurementUnitService} from '../../services/measurement-units/measurement-unit.service';
import {MeasurementUnit} from '../../models/measurement-unit.model';
import {Page} from '../../models/page.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import { TranslateService } from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PageConfig} from '../../models/pageConfig.model';
import { forkJoin } from 'rxjs';
import swal from 'sweetalert';
import { CommonsService } from '../../services/commons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement-units',
  templateUrl: './measurement-units.component.html'  
})
export class MeasurementUnitsComponent implements OnInit {

  page: Page;
  measurementUnits: MeasurementUnit[];
  pages: number[];
  loading = false;
  pageConfig: PageConfig;

  constructor(private _measurementUnitService: MeasurementUnitService,
              private _handleErrorsService: HandleErrorsService,
              private translate: TranslateService,
              private router: Router,
              private _commonsService: CommonsService) {
  }

  ngOnInit() {
    this.pageConfig = new PageConfig('measurementUnitId');
    this.getMeasurementUnits(0);
  }

  setPage(nextPage: number) {

    this.getMeasurementUnits(nextPage);
  }

  getMeasurementUnits(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._measurementUnitService.getAllMeasurementUnits(this.pageConfig)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.measurementUnits = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  findMeasurementUnit(username: string) {
    this.loading = true;
    if(username !== null) {
      this._measurementUnitService.getMeasurementUnitByname(name).subscribe(
        (res: any) => {
          this.loading = false;
          this.measurementUnits = [];
          this.measurementUnits.push(res);
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this.getMeasurementUnits(0);
    }
    
  }

  editOrShowMeasurementUnit(measurementUnitId: number, edit: boolean = false) {
    this.router.navigate(['/unidadMedida', measurementUnitId], {queryParams: {edit: edit}, skipLocationChange: true});
  }

  deleteMeasurementUnit(name: string, id : number) {
    forkJoin(
      [this.translate.get('modals.deleteMeasurementUnit.title', {param: name}),
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
        this._measurementUnitService.deleteMeasurementUnit(id).subscribe();
      }
    });
    });  
  }

  getMeasurementUnitStatus(measurementUnit: MeasurementUnit): string {
    let status: string;
    this.translate.get((measurementUnit.disabled)? 'measurementUnitStatus.disabled': 'measurementUnitStatus.enabled')
    .subscribe((res) => {
      status = res;
    });
    return status;
  }
}
