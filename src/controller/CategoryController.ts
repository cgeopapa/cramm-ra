import FirebasaDAO from "../dao/FirebaseDAO";

export default class CategoryController {
    private dao = new FirebasaDAO();
    
    async getCategpries(){
        return await this.dao.getCategories();
    }
}
