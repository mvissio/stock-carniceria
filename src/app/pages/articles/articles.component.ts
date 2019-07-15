import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/pages/article.service';
import {Article} from '../../models/article.model';
import {Page} from '../../models/page.model';
import {HandleErrorsService} from '../../services/shared/handle-errors.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PageConfig} from '../../models/pageConfig.model';
import {forkJoin} from 'rxjs';
import swal from 'sweetalert';
import {CommonsService} from '../../services/commons.service';
import {Router} from '@angular/router';
import {MeasurementUnitService} from '../../services/measurement-units/measurement-unit.service';


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
  searchText: string;

  constructor(
    private _articleService: ArticleService,
    private _handleErrorsService: HandleErrorsService,
    private translate: TranslateService,
    private router: Router,
    private _commonsService: CommonsService,
  ) {
  }

  ngOnInit() {
    this.pageConfig = new PageConfig('articleId');
    this.getArticles(0);
  }

  setPage(nextPage: number) {
    if (this.searchText.length < 0) {
      this.findArticle(this.searchText, nextPage);
    } else {
      this.getArticles(nextPage);
    }
  }

  getArticles(nextPage: number) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    this._articleService.getAllArticles(this.pageConfig)
      .subscribe(
        (res: Page) => {
          if (res) {
            this.page = res;
            this.articles = this.page.content;
            this.pages = new Array(this.page.totalPages);
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
  }

  editOrShowArticle(articleId: number, edit: boolean = false) {
    this.router.navigate(['/articulo', articleId], {queryParams: {edit: edit}, skipLocationChange: true});
  }

  deleteArticle(name: string, id: number) {
    forkJoin(
      [this.translate.get('modals.deleteArticle.title', {param: name}),
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
          this._articleService.deleteArticle(id).subscribe(() => this.getArticles(this.page.number));
        }
      });
    });
  }

  getArticleStatus(article: Article): string {
    let status: string;
    this.translate.get((article.disabled) ? 'articleStatus.disabled' : 'articleStatus.enabled')
      .subscribe((res) => {
        status = res;
      });
    return status;
  }

  findArticle(articleName: string, nextPage = 0) {
    this.loading = true;
    this.pageConfig.pageNumber = nextPage;
    if (articleName !== null && articleName !== '') {
      this._articleService.getArticleByName(articleName, this.pageConfig)
      .subscribe(
        (res: Page) => {
          if(res) {
            this.articles = [];
            this.page = res;
            this.articles = this.page.content;
            this.pages = new Array(this.page.totalPages);
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.getArticles(0);
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this.getArticles(0);
    }
  }

}
