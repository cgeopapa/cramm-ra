import CategoryThreat from './CategoryThreat'

export default class Category {
    constructor(
        public name: string = '',
        public threats: CategoryThreat[] = [],
        public id?: string
    ) {
        if(!id){
            this.id = '';
        }
    }
}
