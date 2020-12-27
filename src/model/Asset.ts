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
    public intTotal: number = -1;
    public intSome: number = -1;
    public av30m: number = -1;
    public av1h: number = -1;
    public av1d: number = -1;
    public av2d: number = -1;
    public av1w: number = -1;
    public av1m: number = -1;
    public id?: string = 'new';

    constructor(name?: string, 
        description?: string, 
        category?: Category, 
        owner?: Owner, 
        location?: string, 
        confInternal?: number,
        confExternal?: number,
        intTotal?: number,
        intSome?: number,
        av30m?: number,
        av1h?: number,
        av1d?: number,
        av2d?: number,
        av1w?: number,
        av1m?: number,
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
        if(intTotal){
            this.intTotal = intTotal;
        }
        if(intSome){
            this.intSome = intSome;
        }
        if(av30m){
            this.av30m = av30m;
        }
        if(av1h){
            this.av1h = av1h;
        }
        if(av1d){
            this.av1d = av1d;
        }
        if(av2d){
            this.av2d = av2d;
        }
        if(av1w){
            this.av1w = av1w;
        }
        if(av1m){
            this.av1m = av1m;
        }
        if(id){
            this.id = id;
        }
    }
}
