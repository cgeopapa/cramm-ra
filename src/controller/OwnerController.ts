import FirebaseDAO from "../dao/FirebaseDAO";
import Owner from "../model/Owner";

export default class OwnerContrller{
    dao = new FirebaseDAO();

    public async getOwners(){
        return await this.dao.getOwners();
    }

    public createOwner(owner: Owner){
        const emailRegEx = /^\S+\@\S+(\.\S*)+$/;
        console.log(emailRegEx.test(owner.email));
        if(owner.name.length > 0 && emailRegEx.test(owner.email)){
            delete owner.id;
            this.dao.addOwner(owner);
            return true;
        }
        return false;
    }
}