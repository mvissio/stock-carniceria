export class MeasurementUnit{
    measurementUnitId : number;
    name : string;
    symbol : string;
    createDate : Date;   
    disabledDate : Date; 
    disabled : boolean;        
    
    constructor(
        measurementUnitId? : number,
        name? : string,
        symbol? : string,
        createDate? : Date,
        disabledDate? : Date,
        disabled? : boolean,         
    ){
        this.measurementUnitId = measurementUnitId,
        this.name = name,
        this.symbol = symbol,
        this.createDate = createDate,
        this.disabledDate = disabledDate,
        this.disabled = disabled;
        }
}