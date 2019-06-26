import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/article.model';
import { ArticleService } from '../../../services/pages/article.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  id: number;
  article: Article = new Article();
  edit = false;
  articleForm: FormGroup;
  disabledFields = false;
  measurementUnits = [];
  categories = [];

  constructor( 
    private activateRoute: ActivatedRoute,
    private translate: TranslateService,
    private _articleService: ArticleService,       
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) {
      this.id = this.activateRoute.snapshot.params['id'];
    this.disabledFields = this.activateRoute.snapshot.queryParams['edit'] && this.activateRoute.snapshot.queryParams['edit'] === 'false';
    if (this.id) {
      this.edit = true;
      this.getArticle();
    } else {
      this.edit = false;
    }
    this.initForm();
     }

  ngOnInit() {
    this.getAllCategories();
    this.getAllMeasurementUnit();   
  }

  initForm() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    this.articleForm = this.fb.group({           
      name: [this.article.name, [Validators.required, Validators.maxLength(45)]],
      brand: [this.article.brand, [Validators.required, Validators.maxLength(45)]],
      currentPrice: [this.article.currentPrice],       
      measurementUnit : [this.article.measurementUnitId, Validators.required],           
      category : [this.article.categoryId, Validators.required],
      currentQuantity: [this.article.currentQuantity],
      description: [this.article.description, [Validators.required, Validators.maxLength(45)]],
      expirationDate: [(this.article.expirationDate != undefined) ? formatDate(this.article.expirationDate,format,locale) : null ]         
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.articleForm.disable();
    }
  }

  get articleControls() { return this.articleForm.controls; }

  getArticle() {
    this._articleService.getArticleByArticleId(this.id)
      .subscribe((res: Article) => {
        this.article = res;
        this.initForm();
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  saveArticle() {
    if (this.articleForm.invalid) {
      return;
    }
    this.setArticle();    
    if (this.edit) {      
      this._articleService.updateArticle(this.article)
        .subscribe(() => {
          this.translate.get('articles.updateOk')
          .subscribe((res: string) => {
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this._articleService.addArticle(this.article)
        .subscribe(() => {
          this.translate.get('articles.createOk')
          .subscribe((res: string) => { 
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    }
  }

  setArticle() {
    
    this.article.name = this.articleForm.value.name;
    this.article.brand = this.articleForm.value.brand;
    this.article.currentPrice = this.articleForm.value.currentPrice;
    this.article.currentQuantity = this.articleForm.value.currentQuantity;
    this.article.description = this.articleForm.value.description;
    this.article.expirationDate = new Date(this.articleForm.value.expirationDate);       
    this.article.measurementUnitId = this.articleForm.value.measurementUnit;    
    this.article.categoryId = this.articleForm.value.category;
    
    
                
  }
   
  back() {
    this.router.navigate(['/articulos']);
  }

  getAllMeasurementUnit() {
    this._articleService.getAllMeasurementUnits()
      .subscribe((res: any) => {       
        this.measurementUnits = res.content;
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  getAllCategories() {
    this._articleService.getAllCategories()
      .subscribe((res: any) => { 
        console.log("resultado all categories",res);      
        this.categories = res.content;
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  selectedMeasurementUnit(measurementUnitId: number): boolean {
    return (this.article.measurementUnitId == measurementUnitId);
  }

  selectedCategory(categoryId: number): boolean {    
    return (this.article.categoryId == categoryId );
  }

  


}
