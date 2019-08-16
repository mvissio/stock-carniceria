import {IMyDateModel } from 'mydatepicker';

export class Article {
    articleId : number;
    brand : string;
    createDate : Date;
    currentPrice : number
    currentQuantity
    description : string;
    disabled : boolean;
    disabledDate : Date; 
    measurementUnitId : number;
    categoryId : number;
    name : string;
    label: string;    
    constructor(
        articleId? : number,
        brand? : string,
        createDate? : Date,
        currentPrice? : number,
        currentQuantity? : number,
        description? : string,
        disabled? : boolean,
        disabledDate? : Date,
        measurementUnitId? : number,
        categoryId? : number,
        name? : string,
        label? : string) {
            this.articleId = articleId,
            this.brand = brand ,
            this.createDate = createDate || new Date(),
            this.currentPrice = currentPrice,
            this.currentQuantity = currentQuantity,
            this.description = description,
            this.disabled = disabled || false,
            this.disabledDate = disabledDate,
            this.measurementUnitId = measurementUnitId,
            this.categoryId = categoryId,
            this.name = name,
            this.label = label;
        }
}