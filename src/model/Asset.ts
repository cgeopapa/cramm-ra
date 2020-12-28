import Category from "./Category";
import Owner from "./Owner";

export default class Asset
{
    // public name: string = '';
    // public description: string = '';
    // public category: Category = new Category();
    // public owner: Owner = new Owner();
    // public location: string = '';
    // public confInternal: number = -1;
    // public confExternal: number = -1;
    // public intTotal: number = -1;
    // public intSome: number = -1;
    // public av30m: number = -1;
    // public av1h: number = -1;
    // public av1d: number = -1;
    // public av2d: number = -1;
    // public av1w: number = -1;
    // public av1m: number = -1;
    // public id?: string = 'new';

    constructor(
        public name: string = '', 
        public description: string = '',
        public category: Category = new Category(),
        public owner: Owner = new Owner(),
        public location: string = '', 
        public confInternal: number = -1,
        public confExternal: number = -1,
        public intTotal: number = -1,
        public intSome: number = -1,
        public av30m: number = -1,
        public av1h: number = -1,
        public av1d: number = -1,
        public av2d: number = -1,
        public av1w: number = -1,
        public av1m: number = -1,
        public id?: string)
    {
        if(!id){
            this.id = 'new';
        }
    }
}
