import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/pages/categories.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  id: number;
  category: Category = new Category();
  edit = false;
  categoryForm: FormGroup;
  disabledFields = false;

  constructor( private activateRoute: ActivatedRoute,
    private translate: TranslateService,
    private _categoryService: CategoryService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) { 
      this.id = this.activateRoute.snapshot.params['id'];
    this.disabledFields = this.activateRoute.snapshot.queryParams['edit'] && this.activateRoute.snapshot.queryParams['edit'] === 'false';
    if (this.id) {
      this.edit = true;
      this.getCategory();
    } else {
      this.edit = false;
    }
    this.initForm();
    }

  ngOnInit() {
  }

  initForm() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    this.categoryForm = this.fb.group({           
      name: [this.category.name, [Validators.required, Validators.maxLength(45)]],
      description: [this.category.description, [Validators.required, Validators.maxLength(45)]]               
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.categoryForm.disable();
    }
  }

  get categoryControls() { return this.categoryForm.controls; }

  getCategory() {
    this._categoryService.getCategoryByCategoryId(this.id)
      .subscribe((res: Category) => {
        this.category = res;
        this.initForm();
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      console.log("el formulario es invalido");
      return;
    }
    console.log("el formulario es valido");
    this.setCategory();
    if (this.edit) {
      this._categoryService.updateCategory(this.category)
        .subscribe(() => {
          this.translate.get('categories.updateOk')
          .subscribe((res: string) => {
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    } else {
      this._categoryService.addCategory(this.category)
        .subscribe(() => {
          this.translate.get('categories.createOk')
          .subscribe((res: string) => { 
            this._commonsService.showMessage('success', res);
            this.back();
          });
        }, (err: HttpErrorResponse) => {
          this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
        });
    }
  }

  setCategory() {
    
    this.category.name = this.categoryForm.value.name;
    this.category.description = this.categoryForm.value.description;
                 
  }
   
  back() {
    this.router.navigate(['/categorias']);
  }



}
