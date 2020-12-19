import FirebasaDAO from "../dao/FirebaseDAO";
import Asset from "../model/Asset";

export default class AssetController {
    private dao = new FirebasaDAO();
    
    getAssets(){
        return this.dao.getAssets();
    }

    async getAssetsForEditTable(){
        let assets = await this.dao.getAssets();
        assets.push(new Asset());
        return assets;
    }

    async updateAsset(asset: Asset){
        if(asset.id === 'new'){
            let assetNoId = asset;
            delete assetNoId.id;
            return await this.dao.addAsset(asset);
        }
        else {
            const res = await this.dao.updateAsset(asset);
            if(res){
                return asset.id;
            }
            else {
                return false;
            }
        }
    }
}
