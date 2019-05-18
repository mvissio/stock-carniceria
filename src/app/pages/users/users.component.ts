import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {User} from '../../models/user.model';
import {Page} from '../../models/page.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import { TranslateService } from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PageConfig} from '../../models/pageConfig.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  page: Page;
  users: User[];
  pages: number[];
  loading = false;
  errorMessage: string;
  pageConfig: PageConfig;

  constructor(private _userService: UsersService,
              private _handleErrorsService: HandleErrorsService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.pageConfig = new PageConfig('userId');
    this.getUsers(0);
  }

  setPage(nextPage: number) {

    this.getUsers(nextPage);
  }

  getUsers(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._userService.getAllUsers(this.pageConfig)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.users = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = this._handleErrorsService.handleErrors(err);
        });
  }

  findUser(username: string) {
    this.loading = true;
    this._userService.getUserByUsername(username).subscribe(
      (res: User) => {
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this._handleErrorsService.handleErrors(err);
      });
  }

  deleteUser(username: string) {
    forkJoin(
      [this.translate.get('modals.deleteUser.title', {param: username}),
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
        this._userService.deleteUser(username).subscribe();
      }
    });
    });  
  }
}
