import Category from "./Category";

export default class Asset
{
    public name: string = '';
    public description: string = '';
    public category: Category = Category;
    public id?: string = 'new';

    constructor(name?: string, description?: string, category?: Category, id?: string)
    {
        if(name){
            this.name = name;
        }
        if(description){
            this.description = description;
        }
        if(category){
            this.category = category;
        }
        if(id){
            this.id = id;
        }
    }
}
