import FirebasaDAO from "../dao/FirebaseDAO";
import Asset from "../model/Asset";
import Threat from "../model/Threat";

export default class AssetController {
    private dao = new FirebasaDAO();
    
    async getAssets(){
        return await this.dao.getAssets();
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

            for(let threat of assetNoId.category.threats){
                assetNoId.threats.push(new Threat(threat.name, threat.id));
            }

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

    public getConfidentialityScore(asset: Asset){
        return Math.max(asset.confInternal, asset.confExternal);
    }

    public getIntegrityScore(asset: Asset){
        return Math.max(asset.intSome, asset.intTotal);
    }

    public getAvailabilityScore(asset: Asset){
        return Math.max(asset.av1d, asset.av1h, asset.av1m, asset.av1w, asset.av2d, asset.av30m);
    }

    public getOverallScore(asset: Asset){
        return Math.max(this.getConfidentialityScore(asset), this.getIntegrityScore(asset), this.getAvailabilityScore(asset));
    }
}
