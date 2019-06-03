import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../models/operation.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OperationsService } from '../../../services/pages/operations.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { CommonsService } from '../../../services/commons.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { OperationDetail } from '../../../models/operationDetail.model';
import { operationStatus } from '../../../constants/constant';
import { ArticleService } from '../../../services/articles/article.service';
import { Article } from '../../../models/article.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  id: number;
  operation: Operation = new Operation();
  articles$: Observable<any[]>;
  operationTypes: any[]  = [];
  paymentMethods: any[]  = [];
  edit = false;
  operationForm: FormGroup;
  disabledFields = false;

  constructor( private activateRoute: ActivatedRoute,
    private translate: TranslateService,
    private _operationService: OperationsService,
    private _articleService: ArticleService,
    private _handleErrorsService: HandleErrorsService,
    private router: Router,
    private fb: FormBuilder,
    private _commonsService: CommonsService) {
    this.id = this.activateRoute.snapshot.params['id'];
    this.disabledFields = this.activateRoute.snapshot.queryParams['edit'] && this.activateRoute.snapshot.queryParams['edit'] === 'false';
    if (this.id) {
      this.edit = true;
      this.getOperation();
    } else {
      this.edit = false;
    }
    this.initForm();
  }

  ngOnInit() {
    this.articles$ = this._articleService.getAllArticlesNotPagging();
    forkJoin([this._operationService.getAllOperationTypes(),
      this._operationService.getAllPaymentMethods()
    ])
    .subscribe((res: any) => {
      this.operationTypes = res[0];
      this.paymentMethods = res[1];
    }, (err: HttpErrorResponse) => {
      this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
    });
  }

  initForm() {
    let operationDetails = this.fb.array([]);
    if (this.edit) {
      if (this.operation.operationDetails) {
        for (let operationDetail of this.operation.operationDetails) {
          operationDetails.push(this.fb.group({
            price: [operationDetail.price, Validators.required],
            amount: [operationDetail.amount, Validators.required]
          })
          );
        }
      }
    } else {
      operationDetails.push(this.fb.group({
        amount: ['', Validators.required],
        articleId: ['', Validators.required]
      }));
    }
    this.operationForm = this.fb.group({
      operationType: [this.operation.operationType, Validators.required],
      paymentMethod: [this.operation.paymentMethod, Validators.required],
      operationDetails: operationDetails
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.operationForm.disable();
    }
  }

  get operationControls() { return this.operationForm.controls; }

  operationDetailControls(i: number) { return this.operationDetails.controls[i].controls; }
  
  get operationDetails() { return this.operationForm.get("operationDetails") as FormArray; }


  getOperation() {
    this._operationService.getOperationById(this.id)
      .subscribe((res: Operation) => {
        this.operation = res;
        this.initForm();
      }, (err: HttpErrorResponse) => {
        this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
      });
  }

  saveOperation() {
    console.log(this.operationForm.value);
    // if (this.operationForm.invalid) {
    //   return;
    // }
    // this.setOperation();
    // if (this.edit) {
    //   this._operationService.updateOperation(this.operation)
    //     .subscribe(() => {
    //       this.translate.get('users.updateOk')
    //       .subscribe((res: string) => {
    //         this._commonsService.showMessage('success', res);
    //         this.back();
    //       });
    //     }, (err: HttpErrorResponse) => {
    //       this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
    //     });
    // } else {
    //   this._operationService.addOperation(this.operation)
    //     .subscribe(() => {
    //       this.translate.get('users.createOk')
    //       .subscribe((res: string) => { 
    //         this._commonsService.showMessage('success', res);
    //         this.back();
    //       });
    //     }, (err: HttpErrorResponse) => {
    //       this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
    //     });
    // }
  }

  setOperation() {
    this.operation.operationType = this.operationForm.value.operationType;
    this.operation.paymentMethod = this.operationForm.value.paymentMethod;
    this.setOperation();
    if (!this.edit) {
      this.operation.createDate = new Date();
      this.operation.operationStatus = operationStatus.buy;
      this.operation.subTotal = this.getTotal();
      this.operation.total = this.getTotal();
    }
  }

  setOperationDetails() {
    this.operationDetails.array.forEach((operationDetailFormArray: FormArray) => {
      let operationDetail = new OperationDetail();
      operationDetail.amount = operationDetailFormArray.value.amount;
      operationDetail.articleId = operationDetailFormArray.value.articleId;
      this.articles$.subscribe((articles: Article []) => {
        articles.filter((article: Article) => {
          if (article.articleId === operationDetail.articleId) {
            operationDetail.price = article.currentPrice * operationDetail.amount;
            return article;
          }
        }); 
      }); 
    });
  }

  getTotal() {
    let total: number;
    this.operation.operationDetails.forEach((operationDetail: OperationDetail) => total += operationDetail.price);
    return total;
  }

  selectedOperationType(operationType: string): boolean {
    return (this.operation.operationType && operationType === this.operation.operationType);
  }

  selectedPaymentMethod(paymentMethod: string): boolean {
    return (this.operation.paymentMethod && paymentMethod === this.operation.paymentMethod);
  }

  onSelectArticle(article: Article) {
    console.log(article);
  }

  addOperationDetail() {
    this.operationDetails.push(
      this.fb.group({
        amount: ['', Validators.required],
        articleId: ['', Validators.required]
      })
    );
  }

  deleteOperationDetail(index: number) {
    this.operationDetails.removeAt(index);
  }
 
  back() {
    this.router.navigate(['/operaciones']);
  }

}
