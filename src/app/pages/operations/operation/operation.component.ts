import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../models/operation.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OperationsService } from '../../../services/pages/operations.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { CommonsService } from '../../../services/commons.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  id: number;
  operation: Operation = new Operation();
  operationTypes: any[]  = [];
  paymentMethods: any[]  = [];
  edit = false;
  operationForm: FormGroup;
  disabledFields = false;

  constructor( private activateRoute: ActivatedRoute,
    private translate: TranslateService,
    private _operationService: OperationsService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) {
    this.id = this.activateRoute.snapshot.params['id'];
    this.disabledFields = this.activateRoute.snapshot.queryParams['edit'] && this.activateRoute.snapshot.queryParams['edit'] === 'false';
    if (this.id) {
      this.edit = true;
      this.getOperation();
    } else {
      this.edit = false;
    }
    this.initForm();
  }

  ngOnInit() {
    // this.getAllRoles();
  }

  initForm() {
    this.operationForm = this.fb.group({
      operationType: [this.operation.operationType, Validators.required],
      paymentMethod: [this.operation.paymentMethod, Validators.required]
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.operationForm.disable();
    }
  }

  get operationControls() { return this.operationForm.controls; }


  getOperation() {
    this._operationService.getOperationById(this.id)
      .subscribe((res: Operation) => {
        this.operation = res;
        this.initForm();
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }


  // getAllRoles() {
  //   this._userService.getAllRoles()
  //     .subscribe((res: any) => {
  //       this.roles = res;
  //     }, (err: HttpErrorResponse) => {
  //       this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
  //     });
  // }

  saveOperation() {
    if (this.operationForm.invalid) {
      return;
    }
    this.setOperation();
    if (this.edit) {
      this._operationService.updateOperation(this.operation)
        .subscribe(() => {
          this.translate.get('users.updateOk')
          .subscribe((res: string) => {
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this._operationService.addOperation(this.operation)
        .subscribe(() => {
          this.translate.get('users.createOk')
          .subscribe((res: string) => { 
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    }
  }

  setOperation() {
    this.operation.operationType = this.operationForm.value.operationType;
    this.operation.paymentMethod = this.operationForm.value.paymentMethod;
  }

  // selectedRol(rol: string): boolean {
  //   return (this.user.rol && rol === this.user.rol.nombre);
  // }
 
  back() {
    this.router.navigate(['/operaciones']);
  }

}
