import FirebasaDAO from "../dao/FirebaseDAO";

export default class AssetController {
    private dao = new FirebasaDAO();
    
    async getCategpries(){
        return await this.dao.getCategories();
    }
}
