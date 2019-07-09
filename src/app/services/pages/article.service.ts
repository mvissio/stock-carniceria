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
  measurementUnitUrl = environment.apiUrls.measurementUnit;
  categoryUrl = environment.apiUrls.category;

  article : Article = new Article();

  constructor(private httpClient: HttpClient) { }

  addArticle(article : Article){
    console.log("esta es la fecha de expiracion 1",article.expirationDate);
    let newArticle = Object.assign({}, article);
    console.log("esta es la fecha de expiracion 12",newArticle.expirationDate);
    
    newArticle.disabled = false;
    newArticle.createDate = new Date();
    const url = this.articleUrl.base;
    return this.httpClient.post(url, newArticle)
      .pipe(map((newArticle: any) => newArticle));
  }

  getAllArticles(page?: PageConfig) {
    const url = this.articleUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getAllArticlesNotPagging() {
    const url = this.articleUrl.getAllArticlesNotPagging;
    return this.httpClient.get(url)
      .pipe(map((response: Article[]) => response));
  }

  getArticleByArticleId(id: number) {
    const url = `${this.articleUrl.getArticleByArticleId}/${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: Article) => {
          this.article = response;
          console.log("este es el articulo recup ",this.article )
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

  getArticlesByNameOrBrandOrCodeLike(search) {
    const url = `${this.articleUrl.getArticlesByNameOrBrandOrCodeLike}?search=${search}`;
    return this.httpClient.get(url)
    .pipe(map((response: Article[]) => {
      return response.map((article) => {
        article.label = article.name + ' - ' + article.brand;
        return article;
      });
    }));
  }
  
  updateArticle(article: Article) {
    article.expirationDate = article.expirationDate;
    const url = this.articleUrl.base;
    return this.httpClient.put(url, article)
      .pipe(map((response: any) => response));
  }


  getAllMeasurementUnits() {
    const url = this.measurementUnitUrl.base
    return this.httpClient.get(url)
      .pipe(map((response: any) => response));
  }

  getAllCategories() {
    const url = this.categoryUrl.base
    return this.httpClient.get(url)
      .pipe(map((response: any) => response));
  }
  
  deleteArticle(id: number) {
    const url = `${this.articleUrl.deleteArticle}/${id}`;
    return this.httpClient.delete(url)
    .pipe(map((response) => response));
  }

}
