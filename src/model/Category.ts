export default class Category {
    constructor(
        public name: string = '',
        public id?: string
    ) {
        if(!id){
            this.id = '';
        }
    }
}