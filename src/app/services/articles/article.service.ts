import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../models/article.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {PageConfig} from '../../models/pageConfig.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleUrl = environment.apiUrls.article;
  article : Article = new Article();

  constructor(private httpClient: HttpClient) { }

  addArticle(article : Article){
    let newArticle = Object.assign({}, article);
    newArticle.disabled = false;
    newArticle.createDate = new Date();
    const url = this.articleUrl.base;
    return this.httpClient.post(url, newArticle)
      .pipe(map((newArticle: any) => newArticle));
  }

  getAllArticles(page: PageConfig) {
    const url = this.articleUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getArticleByArticleId(id: number) {
    const url = `${this.articleUrl.getArticleByArticleId}/${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: Article) => {
          this.article = response;
        return response;
    }));
  }

  getArticleByName(name: string) {
    const url = `${this.articleUrl.getArticleByName}?name=${name}`;
    return this.httpClient.get(url)
      .pipe(map((response: Article) => {
        this.article = response;
        return response;
    }));
  }
  
  updateArticle(article: Article) {
    article.expirationDate = new Date(article.expirationDate);
    const url = this.articleUrl.base;
    return this.httpClient.put(url, article)
      .pipe(map((response: any) => response));
  }

  
  deleteArticle(id: number) {
    const url = `${this.articleUrl.deleteArticle}/${id}`;
    console.log("esta es la url" + url)
    return this.httpClient.delete(url)
    .pipe(map((response) => response));
  }

}
