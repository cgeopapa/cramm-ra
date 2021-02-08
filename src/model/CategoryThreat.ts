export default class CategoryThreat
{
    constructor(
        public name: string = "",
        public controls: {id: string, name: string}[] = [],
        public id: string = ""
    ){}
}
