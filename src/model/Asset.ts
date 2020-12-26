import Category from "./Category";
import Owner from "./Owner";

export default class Asset
{
    public name: string = '';
    public description: string = '';
    public category: Category = new Category();
    public owner: Owner = new Owner();
    public location: string = '';
    public confInternal: number = -1;
    public confExternal: number = -1;
    public id?: string = 'new';

    constructor(name?: string, 
        description?: string, 
        category?: Category, 
        owner?: Owner, 
        location?: string, 
        confInternal?: number,
        confExternal?: number,
        id?: string)
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
        if(owner){
            this.owner = owner;
        }
        if(location){
            this.location = location;
        }
        if(confInternal){
            this.confInternal = confInternal;
        }
        if(confExternal){
            this.confExternal = confExternal;
        }
        if(id){
            this.id = id;
        }
    }
}
