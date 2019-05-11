import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user.model';
import { Page } from '../../models/page.model';
import { HandleErrorsService } from '../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private _userService: UsersService,
    private _handleErrorsService: HandleErrorsService) { }

    ngOnInit() {
      this.getUsers(0);
    }

  setPage(nextPage: number) {
    this.getUsers(nextPage);
  }

  getUsers(nextPage: number) {
    this.loading = true;
    this._userService.getAllUsers(nextPage)
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
  
}
