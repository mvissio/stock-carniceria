import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {PageConfig} from '../../models/pageConfig.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl = environment.apiUrls.category;
  category: Category   = new Category ();

  constructor(private httpClient: HttpClient) { }

  addCategory(category: Category) {
    let newCategory = Object.assign({}, category); 
    newCategory.createDate = new Date();
    const url = this.categoryUrl.base;
    return this.httpClient.post(url, newCategory)
      .pipe(map((newCategory: any) => newCategory));
  }

  getAllCategories(page: PageConfig) {
    const url = this.categoryUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getCategoryByCategoryId(id: number) {
    const url = `${this.categoryUrl.getCategoryByCategoryId}/${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: Category) => {
          this.category = response;
        return response;
    }));
  }
  getCategoryByname(name: string) {
    const url = `${this.categoryUrl.getCategoryByName}?name=${name}`;
    return this.httpClient.get(url)
      .pipe(map((response: Category) => {
        this.category = response;
        return response;
    }));
  }

  updateCategory(category: Category) {
    const url = this.categoryUrl.base;
    return this.httpClient.put(url, category)
      .pipe(map((response: any) => response));
  }
 

  deleteCategory(id : number) {
    const url = `${this.categoryUrl.deleteCategory}/${id}`;
    return this.httpClient.delete(url)
    .pipe(map((response) => response));
  }

}
