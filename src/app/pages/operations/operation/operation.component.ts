import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../models/operation.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OperationsService } from '../../../services/pages/operations.service';
import { HandleErrorsService } from '../../../services/shared/handle-errors.service';
import { CommonsService } from '../../../services/commons.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { OperationDetail } from '../../../models/operationDetail.model';
import { operationStatus, discountValues } from '../../../constants/constant';
import { ArticleService } from '../../../services/pages/article.service';
import { Article } from '../../../models/article.model';
import swal from 'sweetalert';
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
  articleAmountSizeError = false;
  discounts = discountValues;

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
          this._articleService.getArticleByArticleId(operationDetail.articleId).subscribe((res: Article) => {
            operationDetails.push(this.fb.group({
              amount: [operationDetail.amount, [Validators.required, Validators.min(1)]],
              price: [operationDetail.price, [Validators.required, Validators.min(1)]],
              article: [res, Validators.required]
            }));
            if(this.disabledFields) {
              operationDetails.controls[operationDetails.controls.length -1].disable();
            }
          });
        }
      }
    } else {
      this.operation.operationDetails = [];
      operationDetails.push(this.fb.group({
        amount: ['', [Validators.required, Validators.min(1)]],
        price: ['', [Validators.required, Validators.min(1)]],
        article: ['', Validators.required]
      }));
    }
    this.operationForm = this.fb.group({
      operationType: [this.operation.operationType, Validators.required],
      paymentMethod: [this.operation.paymentMethod, Validators.required],
      discount: [this.operation.discount], 
      operationDetails: operationDetails
    }, {updateOn: 'blur'});
    if (this.disabledFields)  {
      this.operationForm.disable();
    }
  }

  get operationControls() { return this.operationForm.controls; }

  operationDetailControls(i: number) { 
    return this.operationDetails.controls[i]["controls"];
  }
  
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

  getArticlesByName(query: any) {
    if (query.term.length > 2) {
      this.articles$ = this._articleService.getArticlesByNameOrBrandOrCodeLike(query.term);
    }
  }

  saveOperation() {
    if (this.operationForm.invalid) {
      return;
    }
    this.setOperation();
    if (!this.articleAmountSizeError) {
      forkJoin(
        [this.translate.get('modals.confirmOperation.title'),
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
          if (this.edit) {
            this._operationService.updateOperation(this.operation)
              .subscribe(() => {
                this.translate.get('operations.updateOk')
                .subscribe((res: string) => {
                  this._commonsService.showMessage('success', res);
                  this.back();
                });
              }, (err: HttpErrorResponse) => {
                this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
              });
          } else {
            this._operationService.addOperation(this.operation)
              .subscribe(() => {
                this.translate.get('operations.createOk')
                .subscribe((res: string) => { 
                  this._commonsService.showMessage('success', res);
                  this.back();
                });
              }, (err: HttpErrorResponse) => {
                this._commonsService.showMessage('error', this._handleErrorsService.handleErrors(err));
              });
            }
          }
        });
      });
    }
  }

  setOperation() {
    this.operation.operationType = this.operationForm.value.operationType;
    this.operation.paymentMethod = this.operationForm.value.paymentMethod;
    this.operation.discount = this.operationForm.value.discount;
    if (!this.edit) {
      this.operation.createDateTime = new Date();
      this.operation.operationStatus = (this.operation.operationType === 'SALE')? operationStatus.sold : operationStatus.purchased;
    }
    this.setOperationDetails();
    const total = this.getTotal();
    this.operation.subTotal = total;
    this.operation.total = total;
  }

  setOperationDetails() {
    this.operationDetails.value.some((odObject: {article: Article, price: number, amount?: number}, index: number) => {
      let operationDetail = new OperationDetail();
      if (odObject.article.currentQuantity >= odObject.amount) {
        operationDetail.amount = odObject.amount;
        operationDetail.articleId = odObject.article.articleId;
        operationDetail.price = (operationDetail.amount)? odObject.price * operationDetail.amount : odObject.price;
        const indexOperationDetail = this.operation.operationDetails.findIndex((od: OperationDetail) => od.articleId === odObject.article.articleId);
        if (indexOperationDetail !== -1) {
          this.operation.operationDetails[index] = operationDetail; 
        } else {
          this.operation.operationDetails.push(operationDetail);  
        }
      } else {
        this.translate.get('articles.amountInsuficient', {param: odObject.article.currentQuantity})
          .subscribe((result) => {
            this._commonsService.showMessage('error', result);
            this.articleAmountSizeError = true;
          });
          return true;
      }
    });
  }

  getTotal() {
    let total: number = 0;
    this.operation.operationDetails.forEach((operationDetail: OperationDetail) => total += operationDetail.price);
    if (this.operation.discount) {
      total = total - (total * (this.operation.discount/100)); 
    }
    return total;
  }

  selectedOperationType(operationType: string): boolean {
    return (this.operation.operationType && operationType === this.operation.operationType);
  }

  selectedPaymentMethod(paymentMethod: string): boolean {
    return (this.operation.paymentMethod && paymentMethod === this.operation.paymentMethod);
  }

  selectedDiscount(discount: number): boolean {
    return (this.operation.discount && discount === this.operation.discount);
  }

  selectArticle(article: Article, index: number) {
    if (article) {
      this.operationDetailControls(index).price.patchValue(article.currentPrice);
      //TODO: solo si la categoria no es carne(categoria carne es la con id 1) se debe sacar cuando este la funcionalidad de la balanza electronica
      if (article.categoryId === 1 && this.operationControls.operationType.value === "SALE") {
        this.operationDetailControls(index).amount.disable();
      }
    }
  }

  addOperationDetail() {
    this.operationDetails.push(
      this.fb.group({
        amount: ['', [Validators.required, Validators.min(1)]],
        price:['', [Validators.required, Validators.min(1)]],
        article: ['', Validators.required]
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
