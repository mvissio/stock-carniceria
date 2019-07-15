import {Component, OnInit} from '@angular/core';
import {MeasurementUnitService} from '../../services/measurement-units/measurement-unit.service';
import {MeasurementUnit} from '../../models/measurement-unit.model';
import {Page} from '../../models/page.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PageConfig} from '../../models/pageConfig.model';
import {forkJoin} from 'rxjs';
import swal from 'sweetalert';
import {CommonsService} from '../../services/commons.service';
import {Router} from '@angular/router';

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
  searchText: string;

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
    if (this.searchText.length < 0) {
      this.findMeasurementUnit(this.searchText, nextPage);
    } else {
      this.getMeasurementUnits(nextPage);
    }
  }

  getMeasurementUnits(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._measurementUnitService.getAllMeasurementUnits(this.pageConfig)
      .subscribe(
        (res: Page) => {
          if(res) {
            this.page = res;
            this.measurementUnits = this.page.content;
            this.pages = new Array(this.page.totalPages);
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  findMeasurementUnit(nameMeasurementUnit: string, nextPage = 0) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    if (nameMeasurementUnit !== null && nameMeasurementUnit !== '') {
      this._measurementUnitService.getMeasurementUnitByname(nameMeasurementUnit, this.pageConfig)
      .subscribe(
        (res: Page) => {
          if(res) {
            this.measurementUnits = [];
            this.page = res;
            this.measurementUnits = this.page.content;
            this.pages = new Array(this.page.totalPages);
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.getMeasurementUnits(0);
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this.getMeasurementUnits(0);
    }

  }

  editOrShowMeasurementUnit(measurementUnitId: number, edit: boolean = false) {
    this.router.navigate(['/unidadMedida', measurementUnitId], {queryParams: {edit: edit}, skipLocationChange: true});
  }

  deleteMeasurementUnit(name: string, id: number) {
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
          this._measurementUnitService.deleteMeasurementUnit(id).subscribe(() => this.getMeasurementUnits(0));
        }
      });
    });
  }

  getMeasurementUnitStatus(measurementUnit: MeasurementUnit): string {
    let status: string;
    this.translate.get((measurementUnit.disabled) ? 'measurementUnitStatus.disabled' : 'measurementUnitStatus.enabled')
      .subscribe((res) => {
        status = res;
      });
    return status;
  }
}
