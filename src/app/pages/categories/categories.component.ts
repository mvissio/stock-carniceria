import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/pages/categories.service';
import {Category} from '../../models/category.model';
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
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  page: Page;
  categories: Category[];
  pages: number[];
  loading = false;
  pageConfig: PageConfig;

  constructor(private _categoryService: CategoryService,
    private _handleErrorsService: HandleErrorsService,
    private translate: TranslateService,
    private router: Router,
    private _commonsService: CommonsService) { }

  ngOnInit() {
    this.pageConfig = new PageConfig('categoryId');
    this.getCategories(0);
  }

  setPage(nextPage: number) {

    this.getCategories(nextPage);
  }

  getCategories(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._categoryService.getAllCategories(this.pageConfig)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.categories = this.page.content;
          console.log("resultado del request",this.page.content )
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  findCategory(category: string) {
    this.loading = true;
    if(category !== null) {
      this._categoryService.getCategoryByname(name).subscribe(
        (res: any) => {
          this.loading = false;
          this.categories = [];
          this.categories.push(res);
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this.getCategories(0);
    }
    
  }

  editOrShowCategory(categoryId: number, edit: boolean = false) {
    this.router.navigate(['/categoria', categoryId], {queryParams: {edit: edit}, skipLocationChange: true});
  }

  deleteCategory(name: string, id : number) {
    forkJoin(
      [this.translate.get('modals.deleteCategory.title', {param: name}),
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
        this._categoryService.deleteCategory(id).subscribe();
      }
    });
    });  
  }

  getCategoryStatus(category: Category): string {
    let status: string;
    this.translate.get((category.disabled)? 'categoryStatus.disabled': 'categoryStatus.enabled')
    .subscribe((res) => {
      status = res;
    });
    return status;
  }

}
