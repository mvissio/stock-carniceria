import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/article.model';
import { ArticleService } from '../../../services/articles/article.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { MeasurementUnit } from '../../../models/measurement-unit.model';
import { MeasurementUnitService } from '../../../services/measurement-units/measurement-unit.service';



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
   this.getAllMeasurementUnit();
  }

  initForm() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    this.articleForm = this.fb.group({           
      name: [this.article.name, [Validators.required, Validators.maxLength(45)]],
      brand: [this.article.brand, [Validators.required, Validators.maxLength(45)]],
      currentPrice: [this.article.currentPrice],
      measurementUnit : [this.article.measurementUnit],
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
          this.translate.get('article.updateOk')
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
    if ((this.article.measurementUnit && this.article.measurementUnit !== this.articleForm.value.measurementUnit) || !this.article.measurementUnit) {
      debugger;
      this.article.measurementUnit = new MeasurementUnit(this.articleForm.value.measurementUnit);
      console.log("unidad medida",this.article.measurementUnit)
   
      this.article.measurementUnitId = this.article.measurementUnit.measurementUnitId;
    }
    delete this.article.measurementUnit;
    console.log("articulo final",this.article)
   
                
  }
   
  back() {
    this.router.navigate(['/configuracion/articulos']);
  }

  getAllMeasurementUnit() {
    this._articleService.getAllMeasurementUnits()
      .subscribe((res: any) => {       
        this.measurementUnits = res.content;
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  selectedMeasurementUnit(measurementUnitId: number): boolean {
    console.log("este es el id de la unidad de medida recup",measurementUnitId)
    console.log("boolean",this.article.measurementUnitId && measurementUnitId === this.article.measurementUnitId)
    return (this.article.measurementUnitId && measurementUnitId === this.article.measurementUnitId);
  }

  


}
