import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../models/auth.model';
import { USUARIO_KEY } from '../constants/constant';
import { HandleErrorsService } from '../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberMe = false;
  username: string;
  recover = false;
  from: string;
  loading = false;
  enabled = true;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private _storageService: StorageService,
    private _authService: AuthService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    init_plugins();
    this.initForm();
    this.username = this._storageService.loadStorage(USUARIO_KEY) || '';
    if (this.username.length > 1) {
      this.rememberMe = true;
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    }, {updateOn: 'blur'});
  }

  get f() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) {
      return;
  }
    const auth: Auth = new Auth(this.loginForm.value.user, this.loginForm.value.password);
    this._authService.login(auth, this.loginForm.value.rememberMe)
    .subscribe(() => {
      this.router.navigate(['/inicio'])
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = this._handleErrorsService.handleErrors(err, 'login');
    });
  }

}
