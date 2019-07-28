import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {User} from '../../models/user.model';
import {Page} from '../../models/page.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import { TranslateService } from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PageConfig} from '../../models/pageConfig.model';
import { forkJoin } from 'rxjs';
import swal from 'sweetalert';
import { CommonsService } from '../../services/commons.service';
import { Router } from '@angular/router';
import { toastType } from '../../constants/constant';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  page: Page;
  users: User[];
  pages: number[];
  loading = false;
  pageConfig: PageConfig;
  searchText: string;

  constructor(private _userService: UsersService,
              private _handleErrorsService: HandleErrorsService,
              private translate: TranslateService,
              private router: Router,
              private _commonsService: CommonsService) {
  }

  ngOnInit() {
    this.pageConfig = new PageConfig('userId');
    this.getUsers(0);
  }

  setPage(nextPage: number) {
    if (this.searchText.length < 0) {
      this.findUser(this.searchText, nextPage);
    } else {
      this.getUsers(nextPage);
    }
  }

  getUsers(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._userService.getAllUsers(this.pageConfig)
      .subscribe(
        (res: Page) => {
          if (res) {
            this.page = res;
            this.users = this.page.content;
            this.pages = new Array(this.page.totalPages);
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        });
  }

  findUser(username: string, nextPage = 0) {
    if(username.length > 2) {
      this.loading = true;
      this.pageConfig.pageNumber = nextPage;
      this._userService.getUserByUsername(username, this.pageConfig)
      .subscribe(
        (page: Page) => {
          if(!page.empty) {
            this.users = [];
            this.page = page;
            this.users = this.page.content;
            this.pages = new Array(this.page.totalPages);
          } else {
            this.translate.get('generalHTTPErrors.notFound')
            .subscribe((res) => {
              this._commonsService.showMessage(toastType.warning, res);
            });
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
        });
    } else {
      if (username.length === 0) {
        this.getUsers(0);
      }
    }
  }

  editOrShowUser(userId: number, edit: boolean = false) {
    this.router.navigate(['/usuario', userId], {queryParams: {edit: edit}, skipLocationChange: true});
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
          this._userService.deleteUser(username).subscribe(() => this.getUsers(this.page.number));
        }
      });
    });  
  }

  getUserStatus(user: User): string {
    let status: string;
    this.translate.get((user.enabled)? 'userStatus.enabled': 'userStatus.disabled')
    .subscribe((res) => {
      status = res;
    });
    return status;
  }
}
