import firebase from 'firebase'
import Asset from '../model/Asset';
import * as dotenv from 'dotenv';
import Category from '../model/Category';
import Owner from '../model/Owner';
import Threat from "../model/Threat";
import CategoryThreat from '../model/CategoryThreat';

export default class FirebaseDAO {
    private app: firebase.app.App;
    private db: firebase.database.Database;

    constructor(){
        dotenv.config();
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DATABASE_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID
          };
        
        if(!firebase.apps.length){
            this.app = firebase.initializeApp(firebaseConfig);
        }
        else {
            this.app = firebase.app();
        }
        this.db = this.app.database();
    }

    async getOwners(){
        let allOwners: Owner[] = [];
        await this.db.ref("owners").once("value", snap => {
            snap.forEach(owner => {
                allOwners.push(new Owner(
                    owner.val().name,
                    owner.val().email,
                    owner.key ?? ''
                ))
            })
        })
        return allOwners;
    }

    async addOwner(owner: Owner){
        try{
            const ref = await this.db.ref("owners").push(owner);
            return ref.key;
        }
        catch(e){
            console.error(e);
            return false;
        }
    }

    async getCategories(){
        let allCategories: Category[] = [];
        await this.db.ref("category").once("value", snap => {
            snap.forEach(category => {
                let categoryThreats: CategoryThreat[] = [];
                const threats = category.val().categiryThreats;
                if(threats){
                    for(let i in threats)
                    {
                        let categoryThreat = new CategoryThreat();
                        categoryThreat.name = threats[i].name;
                        categoryThreat.id = i;
                        for(let j in threats[i].controls)
                        {
                            categoryThreat.controls.push({
                                id: j,
                                name: threats[i].controls[j]
                            });
                        }
                        categoryThreats.push(categoryThreat);
                    }
                }

                allCategories.push(new Category(
                    category.val().name,
                    categoryThreats,
                    category.key ?? ''
                ))
            })
        })
        return allCategories;
    }

    async getCategory(id: string){
        let retCategory = new Category();
        await this.db.ref("category/"+id).once("value", category => {
            let categoryThreats: CategoryThreat[] = new Array<CategoryThreat>();
            const threats = category.val().categiryThreats;
            if(threats){
                for(let i in threats)
                {
                    let categoryThreat = new CategoryThreat();
                    categoryThreat.name = threats[i].name;
                    categoryThreat.id = i;
                    for(let j in threats[i].controls)
                    {
                        categoryThreat.controls.push({
                            id: j,
                            name: threats[i].controls[j]
                        });
                    }
                    categoryThreats.push(categoryThreat);
                }
            }

            retCategory = new Category(
                category.val().name,
                categoryThreats,
                category.key ?? ''
            )
        })
        return retCategory;
    }

    async getAssets() {
        let allAssets: Asset[] = [];
        let js: any[] = [];
        await this.db.ref("assets").once("value", snap => {
            snap.forEach(asset => {
                const a: Asset = asset.val();
                a.id = asset.key ?? '';
                js.push(a)
            });
        })
        for(let asset of js){
            asset.category = await this.getCategory(asset.category);
            allAssets.push(asset);
        }
        return allAssets;
    }

    async addAsset(asset: Asset) {
        try{
            let toSaveAsset: any = asset;
            toSaveAsset.category = asset.category.id;
            const ref: any = await this.db.ref("assets").push(toSaveAsset);
            return ref.key;
        }
        catch(e){
            return false;
        }
    }

    async updateAsset(asset: Asset) {
        try{
            let assetCp: any = {...asset};
            assetCp.category = asset.category.id;
            await this.db.ref(`assets/${asset.id}`).set(assetCp);
            return true;
        }
        catch(e){
            console.error(e);
            return false;
        }
    }

    async getThreats(){
        let allThreats: Threat[] = [];
        let js: any[] = [];

        await this.db.ref("threats").once("value", async snap => {
            await snap.forEach(threat => {
                js.push(threat);
            })
        });
        for(let threat of js){
            let asset: Asset = new Asset();
            await this.db.ref(`assets/${threat.val().assetId}`).once("value", snap => {
                asset = snap.val();
            });
            let temp = threat.val();
            delete temp.assetId;
            const t: Threat = temp;
            // t.asset = asset;
            t.id = threat.key ?? '';
            allThreats.push(t);
        }
        return allThreats;
    }

    async addThreat(threat: Threat){
        try{
            // let {asset, ...t} = threat;
            // // @ts-ignore
            // t["assetId"] = asset.id;
            // await this.db.ref("threats").push(t);
            return true;
        }
        catch (e){
            console.error(e);
            return false;
        }
    }

    async updateThreat(threat: Threat){
        try{
            // let {asset, ...t} = threat;
            // // @ts-ignore
            // t["assetId"] = asset.id;
            // await this.db.ref(`threats/${threat.id}`).set(t);
            return true;
        }
        catch (e){
            console.error(e);
            return false;
        }
    }
}