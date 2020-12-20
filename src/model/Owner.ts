export default class Owner {
    constructor(
        public name: string = '',
        public email: string = '',
        public id?: string
    ){
        if(!id){
            this.id = '';
        }
    }
}