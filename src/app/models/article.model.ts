import { MeasurementUnit } from './measurement-unit.model';

export class Article {
    articleId : number;
    brand : string;
    createDate : Date;
    currentPrice : number
    currentQuantity
    description : string;
    disabled : boolean;
    disabledDate : Date; 
    expirationDate : Date;
    measurementUnitId : number;
    measurementUnit : MeasurementUnit;
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
            this.name = name;
        }
}