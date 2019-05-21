import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id: number;
  roles: string[];
  user: User = new User();
  edit = false;
  userForm: FormGroup;
  disabledFields = false;

  constructor( private activateRoute: ActivatedRoute,
    private translate: TranslateService,
    private _userService: UsersService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) {
    this.id = this.activateRoute.snapshot.params['id'];
    this.disabledFields = this.activateRoute.snapshot.queryParams['edit'] && this.activateRoute.snapshot.queryParams['edit'] === 'false';
    if (this.id) {
      this.edit = true;
      this.getUser();
    } else {
      this.edit = false;
    }
    this.initForm();
  }

  ngOnInit() {
    this.getAllRoles();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: [this.user.username, [Validators.required, Validators.maxLength(45)]],
      password: [this.user.password, [Validators.required, Validators.maxLength(60)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      rol: [this.user.rol, Validators.required],
      enabled: [this.user.enabled]
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.userForm.disable();
    }
  }

  get userControls() { return this.userForm.controls; }


  getUser() {
    this._userService.getUserByUserId(this.id)
      .subscribe((res: User) => {
        this.user = res;
        this.initForm();
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }


  getAllRoles() {
    this._userService.getAllRoles()
      .subscribe((res: any) => {
        this.roles = res;
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }
    this.setUser();
    if (this.edit) {
      this._userService.updateUser(this.user)
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
      this._userService.addUser(this.user)
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

  setUser() {
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.user.enabled = this.userForm.value.enabled;
    this.user.password = this.userForm.value.password;
    this.user.rol = new Rol(this.userForm.value.rol);
  }

  selectedRol(rol: string): boolean {
    return (this.user.rol && rol === this.user.rol.nombre);
  }
 
  back() {
    this.router.navigate(['/configuracion/usuarios']);
  }

}
