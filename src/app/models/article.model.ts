import { MeasurementUnit } from './measurement-unit.model';
import { Category } from './category.model';

export class Article {
    articleId : number;
    brand : string;
    createDate : Date;
    currentPrice : number
    currentQuantity
    description : string;
    measurementUnitId : number;
    categoryId : number;
    disabled : boolean;
    disabledDate? : Date; 
    expirationDate? : Date;
    measurementUnit? : MeasurementUnit;
    category? : Category;
    name : string;    
    constructor(
        articleId? : number,
        brand? : string,
        createDate? : Date,
        currentPrice? : number,
        currentQuantity? : number,
        description? : string,
        disabled? : boolean,
        disabledDate? : Date,
        expirationDate? : Date,
        measurementUnit? : MeasurementUnit,
        measurementUnitId? : number,
        categoryId? : number,
        category? : Category,
        name? : string) {
            this.articleId = articleId,
            this.brand = brand ,
            this.createDate = createDate || new Date(),
            this.currentPrice = currentPrice,
            this.currentQuantity = currentQuantity,
            this.description = description,
            this.disabled = disabled || false,
            this.disabledDate = disabledDate,
            this.expirationDate = expirationDate,
            this.measurementUnit = measurementUnit,
            this.measurementUnitId = measurementUnitId,
            this.categoryId = categoryId,
            this.category = category,
            this.name = name;
        }
}