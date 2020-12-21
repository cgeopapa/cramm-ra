import firebase from 'firebase'
import Asset from '../model/Asset';
import * as dotenv from 'dotenv';
import Category from '../model/Category';
import Owner from '../model/Owner';

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
                allCategories.push(new Category(
                    category.val().name,
                    category.key ?? ''
                ))
            })
        })
        return allCategories;
    }

    async getAssets() {
        let allAssets: any[] = [];
        await this.db.ref("assets").once("value", snap => {
            snap.forEach(asset => {
                allAssets.push(new Asset(
                    asset.val().name,
                    asset.val().description,
                    new Category(
                        asset.val().category.name, 
                        asset.val().category.id.toString()
                    ),
                    new Owner(
                        asset.val().owner.name,
                        asset.val().owner.email,
                        asset.val().owner.id,
                    ),
                    asset.val().location,
                    asset.key ?? ''
                    ))
            });
        })
        return allAssets;
    }

    async addAsset(asset: Asset) {
        try{
            const ref: any = await this.db.ref("assets").push(asset);
            return ref.key;
        }
        catch(e){
            return false;
        }
    }

    async updateAsset(asset: Asset) {
        try{
            await this.db.ref(`assets/${asset.id}`).set(asset);
            return true;
        }
        catch(e){
            return false;
        }
    }
}