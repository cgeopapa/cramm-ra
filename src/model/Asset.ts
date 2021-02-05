import Category from "./Category";
import Owner from "./Owner";

export default class Asset
{
    constructor(
        public name: string = '',
        public description: string = '',
        public category: Category = new Category(),
        public owner: Owner = new Owner(),
        public location: string = '',
        public confInternal: number = 0,
        public confExternal: number = 0,
        public intTotal: number = 0,
        public intSome: number = 0,
        public av30m: number = 0,
        public av1h: number = 0,
        public av1d: number = 0,
        public av2d: number = 0,
        public av1w: number = 0,
        public av1m: number = 0,
        public id?: string)
    {
        if(!id){
            this.id = 'new';
        }
    }
}
