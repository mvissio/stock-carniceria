import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from '../../models/article.model';
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
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  page: Page;
  articles: Article[];
  pages: number[];
  loading = false;
  pageConfig: PageConfig;

  constructor(private _articleService: ArticleService,
              private _handleErrorsService: HandleErrorsService,
              private translate: TranslateService,
              private router: Router,
              private _commonsService: CommonsService) {
  }

  ngOnInit() {
    this.pageConfig = new PageConfig('articleId');
    this.getArticles(0);
  }

  setPage(nextPage: number) {

    this.getArticles(nextPage);
  }

  getArticles(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._articleService.getAllArticles(this.pageConfig)
      .subscribe(
        (res: Page) => {
          this.page = res;
          this.articles = this.page.content;
          this.pages = new Array(this.page.totalPages);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  findUser(username: string) {
    this.loading = true;
    if(username !== null) {
      this._articleService.getArticleByName(name).subscribe(
        (res: any) => {
          this.loading = false;
          this.articles = [];
          this.articles.push(res);
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this.getArticles(0);
    }
    
  }

  editOrShowArticle(articleId: number, edit: boolean = false) {
    this.router.navigate(['/configuracion/article', articleId], {queryParams: {edit: edit}, skipLocationChange: true});
  }

  deleteArticle(username: string) {
    forkJoin(
      [this.translate.get('modals.deleteArticñe.title', {param: name}),
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
        this._articleService.deleteArticle(name).subscribe();
      }
    });
    });  
  }

  getArticleStatus(article: Article): string {
    let status: string;
    this.translate.get((article.disabled)? 'articleStatus.disabled': 'articleStatus.enabled')
    .subscribe((res) => {
      status = res;
    });
    return status;
  }
}
