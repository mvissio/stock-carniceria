export class Category {
    categoryId : number;
    createDate : Date;
    description : string;
    disabled : boolean;
    disabledDate? : Date; 
    name : string;    
    constructor(
        categoryId? : number,
        createDate? : Date,
        description? : string,
        disabled? : boolean,
        disabledDate? : Date,
        name? : string) {
            this.categoryId = categoryId,
            this.createDate = createDate || new Date(),
            this.description = description,
            this.disabled = disabled || false,
            this.disabledDate = disabledDate,
            this.name = name;
        }
}