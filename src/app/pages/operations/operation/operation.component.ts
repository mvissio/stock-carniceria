import {Component, OnInit, DoCheck} from '@angular/core';
import {Operation} from '../../../models/operation.model';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {OperationsService} from '../../../services/pages/operations.service';
import {HandleErrorsService} from '../../../services/shared/handle-errors.service';
import {CommonsService} from '../../../services/commons.service';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {OperationDetail} from '../../../models/operationDetail.model';
import {operationStatus, discountValues, operationTypes, toastType} from '../../../constants/constant';
import {ArticleService} from '../../../services/pages/article.service';
import {Article} from '../../../models/article.model';
import swal from 'sweetalert';

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit, DoCheck {

    id: number;
    operation: Operation = new Operation();
    articles$: Observable<any[]>;
    operationTypes: any[] = [];
    paymentMethods: any[] = [];
    edit = false;
    operationForm: FormGroup;
    disabledFields = false;
    articleAmountSizeError = false;
    openCodeModal = false;
    discounts = discountValues;

    constructor(private activateRoute: ActivatedRoute,
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
                this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
            });
    }

    initForm() {
        const operationDetails = this.fb.array([]);
        this.setOperationTypeIfSelected();
        if (this.edit) {
            if (this.operation.operationDetails) {
                for (const operationDetail of this.operation.operationDetails) {
                    this._articleService.getArticleByArticleId(operationDetail.articleId).subscribe((res: Article) => {
                        const priceOperationDetail = operationDetail.price / operationDetail.amount;
                        operationDetails.push(this.fb.group({
                            amount: [operationDetail.amount, Validators.required],
                            price: [priceOperationDetail, [Validators.required, Validators.min(1)]],
                            article: [res, Validators.required]
                        }));
                        if (this.disabledFields) {
                            operationDetails.controls[operationDetails.controls.length - 1].disable();
                        }
                    });
                }
            }
        } else {
            this.operation.operationDetails = [];
            operationDetails.push(this.fb.group({
                amount: ['', Validators.required],
                price: ['', [Validators.required, Validators.min(1)]],
                article: ['', Validators.required]
            }));
        }
        this.operationForm = this.fb.group({
            operationType: [this.operation.operationType, Validators.required],
            paymentMethod: [this.operation.paymentMethod, Validators.required],
            discount: [this.operation.discount],
            enabledDiscount: [(this.operation.discount)],
            operationDetails: operationDetails
        }, {updateOn: 'blur'});
        if (this.disabledFields) {
            this.operationForm.disable();
        }
    }

    get operationControls() {
        return this.operationForm.controls;
    }

    operationDetailControls(i: number) {
        return this.operationDetails.controls[i]['controls'];
    }

    get operationDetails(): FormArray {
        return this.operationForm.get('operationDetails') as FormArray;
    }

    getOperation() {
        this._operationService.getOperationById(this.id)
            .subscribe((res: Operation) => {
                this.operation = res;
                this.initForm();
            }, (err: HttpErrorResponse) => {
                this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
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
                                            this._commonsService.showMessage(toastType.success, res);
                                            this.back();
                                        });
                                }, (err: HttpErrorResponse) => {
                                    this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
                                });
                        } else {
                            this._operationService.addOperation(this.operation)
                                .subscribe(() => {
                                    this.translate.get('operations.createOk')
                                        .subscribe((res: string) => {
                                            this._commonsService.showMessage(toastType.success, res);
                                            this.back();
                                        });
                                }, (err: HttpErrorResponse) => {
                                    this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(err));
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
            this.operation.operationStatus = (this.operation.operationType === operationTypes.sale) ?
                operationStatus.sold : operationStatus.purchased;
        }
        this.setOperationDetails();
        const total = this.getTotal();
        this.operation.subTotal = total;
        this.operation.total = total;
    }

    setOperationDetails() {
        this.operationDetails.value.some((odObject: { article: Article, price: number, amount?: number }, index: number) => {
            const operationDetail = new OperationDetail();
            const indexOperationDetail = this.operation.operationDetails
                .findIndex((od: OperationDetail) => od.articleId === odObject.article.articleId);
            if (this.checkValidOperationDetail(odObject, indexOperationDetail)) {
                operationDetail.amount = odObject.amount;
                operationDetail.articleId = odObject.article.articleId;
                operationDetail.price = (operationDetail.amount) ? odObject.price * operationDetail.amount : odObject.price;
                if (indexOperationDetail !== -1) {
                    this.operation.operationDetails[index] = operationDetail;
                } else {
                    this.operation.operationDetails.push(operationDetail);
                }
            } else {
                this.showErrorInvalidOperationDetail(odObject.article.label, odObject.article.currentQuantity);
                return true;
            }
        });
    }

    getTotal() {
        let total = 0;
        this.operation.operationDetails.forEach((operationDetail: OperationDetail) => total += operationDetail.price);
        if (this.operation.discount) {
            total = total - (total * (this.operation.discount / 100));
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
        return (this.operation.discount && discount === Number(this.operation.discount));
    }

    selectArticle(article: Article, index: number) {
        if (article) {
            this.operationDetailControls(index).price.patchValue(article.currentPrice);
        }
    }

    addOperationDetail() {
        this.operationDetails.push(
            this.fb.group({
                amount: ['', [Validators.required, Validators.min(1)]],
                price: ['', [Validators.required, Validators.min(1)]],
                article: ['', Validators.required]
            })
        );
    }

    addOperationDetailByCB() {
        this.openCodeModal = true;
    }

    deleteOperationDetail(index: number) {
        this.operationDetails.removeAt(index);
    }

    setOperationTypeIfSelected() {
        this.operation.operationType = (this.activateRoute.snapshot.queryParams['sale']) ?
            operationTypes.sale : (this.activateRoute.snapshot.queryParams['buy']) ? operationTypes.buy : this.operation.operationType;
    }

    ngDoCheck() {
        this.setOperationTypeIfSelected();
    }

    toggleDiscount(value: any) {
        if (!value.currentTarget.checked) {
            this.operationForm.value.discount = null;
        }
    }

    checkValidOperationDetail(odObject: any, index: number): boolean {
        const operationDetail = this.operation.operationDetails[index];
        const operationType = (this.operation.operationType) ? this.operation.operationType : this.operationForm.value.operationType;
        const isvalid = (operationType === operationTypes.buy || (odObject.article.currentQuantity >= odObject.amount) ||
            (this.edit && operationDetail.amount > odObject.amount) ||
            (this.edit && operationDetail.amount < odObject.amount &&
                ((operationDetail.amount + odObject.article.currentQuantity) - odObject.amount) > 0));
        return isvalid;
    }

    validateOperationDetail(odObject: any) {
        const index = this.operation.operationDetails.findIndex((od: OperationDetail) => od.articleId === odObject.article.articleId);
        if (!this.checkValidOperationDetail(odObject, index)) {
            this.showErrorInvalidOperationDetail(odObject.article.label, odObject.article.currentQuantity);
        } else {
            this.articleAmountSizeError = false;
        }
    }

    showErrorInvalidOperationDetail(label: string, quantity: number) {
        this.translate.get('articles.amountInsuficient', {param1: label, param2: quantity})
            .subscribe((result) => {
                this._commonsService.showMessage(toastType.error, result);
                this.articleAmountSizeError = true;
            });
    }

    back() {
        this.router.navigate(['/operaciones']);
    }

    closeModal(id) {
        this.openCodeModal = false;
    }

    async findCodebar(event) {
        const codebarObj = {
            typeArticle: '',
            codeArticle: '',
            price: ''
        };
        codebarObj.typeArticle = event.target.value.substring(0, 2);
        codebarObj.codeArticle = event.target.value.substring(2, 6);
        codebarObj.price = `${event.target.value.substring(6, 10)}.${event.target.value.substring(10, 12)}`;
        await this._articleService.findArticleByCodebar(codebarObj.codeArticle).toPromise().then(res => {
            if (res) {
                if (this.operationDetails.value[this.operationDetails.length - 1].article === '') {
                    this.operationDetails.removeAt(this.operationDetails.length - 1);
                }
                this.operationDetails.push(
                    this.fb.group({
                        amount: [{
                            value: `${parseFloat(codebarObj.price) / res.currentPrice}`,
                            disabled: true
                        }, [Validators.required, Validators.min(1)]],
                        price: [{
                            value: `${parseFloat(codebarObj.price)}`,
                            disabled: true
                        }, [Validators.required, Validators.min(1)]],
                        article: [{
                            value: `${res.name} - ${res.brand}`,
                            disabled: true
                        }, Validators.required]
                    })
                );
            } else {
                this.translate.get('articles.noContent', {param1: event.target.value})
                    .subscribe((result) => {
                        this._commonsService.showMessage(toastType.warning, result);
                    });
            }
        }).catch(error => {
            this._commonsService.showMessage(toastType.error, this._handleErrorsService.handleErrors(error));
        }).finally(() => {
            event.target.value = '';
            this.openCodeModal = false;
        });
        // await
    }
}
