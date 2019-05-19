import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor( private activateRoute: ActivatedRoute,
    private _userService: UsersService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) {
    this.id = this.activateRoute.snapshot.params['id'];
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
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      rol: [this.user.rol, Validators.required],
      enabled: [this.user.enabled]
    }, {updateOn: 'blur'});
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
    this.user.rol = new Rol(this.userForm.value.rol);
    console.log(this.userForm.value);
    // if (this.edit) {
    //   this._userService.updateUser(this.user)
    //     .subscribe(() => {
    //       this.back();
    //     }, (err: HttpErrorResponse) => {
    //       this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
    //     });
    // } else {
    //   this._userService.addUser(this.user)
    //     .subscribe(usuario => {
    //       this.user.username = usuario.username;
    //       this.back();
    //     }, (err: HttpErrorResponse) => {
    //       this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
    //     });
    // }
  }

  back() {
    this.router.navigate(['/configuracion/usuarios']);
  }

}
