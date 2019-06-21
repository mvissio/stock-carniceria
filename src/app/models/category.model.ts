export class Category {

    categoryId : number;
    name : string;
    description : string;
    createDate : Date;
    disabledDate : Date;
    disabled : boolean;

    constructor(
        categoryId? : number,
        name? : string,
        description? : string,
        createDate? : Date,
        disabledDate? : Date,
        disabled? : boolean){

            this.categoryId = categoryId,
            this.name = name,
            this.description = description,
            this.createDate = createDate,
            this.disabledDate = disabledDate,
            this.disabled = disabled
    }




}