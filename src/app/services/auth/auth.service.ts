import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Auth} from '../../models/auth.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {HEADER_AUTHORIZATION_KEY, TOKEN_KEY, USUARIO_KEY} from '../../constants/constant';
import {StorageService} from '../storage/storage.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';

// Rxjs
import {map} from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlAuth = environment.apiUrls.auth;
  token: string;
  helper: JwtHelperService;

  constructor(private httpClient: HttpClient,
              private _storageService: StorageService,
              private router: Router,
              private translate: TranslateService) {
    this.helper = new JwtHelperService();
  }

  login(auth: Auth, rememberMe: boolean) {
    const url = this.urlAuth.login;
    const body = JSON.stringify(auth);
    return this.httpClient.post(url, body, {observe: 'response'})
      .pipe(map((resp: HttpResponse<any>) => {
        this.token = resp.headers.get(HEADER_AUTHORIZATION_KEY);
        if (rememberMe) {
          this._storageService.saveStorage(`${TOKEN_KEY}:${this.token}`, `${USUARIO_KEY}:${auth.username}`);
        } else {
          this._storageService.saveStorage(`${TOKEN_KEY}:${this.token}`);
          this._storageService.removeStorage(USUARIO_KEY);
        }
        return true;

      }));
  }

  recoverPassword(email: string) {
    const url = this.urlAuth.recoverPassword;
    return this.httpClient.post(url, {}, {
      params: {
        email: email
      }
    })
      .pipe(map((response: any) => response));
  }

  isLogged() {
    if (!this.token) {
      this.token = this._storageService.loadStorage(TOKEN_KEY);
    }
    return (this.token != null) ? this.isTokenActive() : false;
  }

  hasPermissions(roles: string[], userRole?: string): boolean {
    const rol = (userRole) ? userRole : this.helper.decodeToken(this.token).rol;
    return (roles.indexOf(rol) !== -1);
  }

  logout() {
    this.token = '';
    this._storageService.removeStorage('token');
    this.router.navigate(['/login']);
  }

  getAuthToken(): string {
    return this.token;
  }

  isTokenActive() {
    if (this.helper.isTokenExpired(this.token)) {
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  }

  getUserRol(): string {
    return this.helper.decodeToken(this.token).rol;
  }

  getUserName(): string {
    return this.helper.decodeToken(this.token).sub;
  }


  openLogoutModal() {
    this.translate.get('modals')
      .subscribe((res: any) => {
        swal({
          title: res.logout.title,
          icon: 'warning',
          closeOnClickOutside: true,
          buttons: {
            confirm: {
              text: res.defaultConfirmButton,
              value: true,
              visible: true,
              closeModal: true
            },
            cancel: {
              text: res.defaultCancelButton,
              value: false,
              visible: true,
              closeModal: true,
            }
          }
        }
      ).then((data) => {
        if (data) {
          this.logout();
        }
      });
    });
  }
}

