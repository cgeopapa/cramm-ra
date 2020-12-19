import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import AssetController from '../controller/AssetController';
import CategoryController from '../controller/CategoryController';
import { domain } from 'process';

export default class AssetCartographyView extends Component{
    private assetsController = new AssetController();
    private categoryController = new CategoryController();
    private initialAsset: any;
    private editingAsset: any;
    state: any;

    constructor(props: any){
        super(props);

        this.state = {
            assets: null,
            categories: null,
            editingCategory: null,
            loading: true
        }
    }

    async componentDidMount(){
        this.setState({
            assets: await this.assetsController.getAssetsForEditTable(),
            categories: await this.categoryController.getCategpries(),
            loading: false
        });
        console.log(this.state.categories);

        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.categoryTemplate = this.categoryTemplate.bind(this);
    }

    onRowEditInit(event: any){
        this.initialAsset={...this.state.assets[event.index]};
        this.editingAsset={...this.initialAsset};
        this.setState({editingCategory: this.editingAsset.category});
    }

    onRowEditCancel(event: any) {
        let assets = this.state.assets;
        assets[event.index] = this.initialAsset;

        this.setState({ assets: assets });
    }

    async onRowEditSave(event: any){
        this.editingAsset.category = this.state.editingCategory;
        console.log(this.editingAsset);
        const res = await this.assetsController.updateAsset(this.editingAsset);
        if(res){
            this.setState({loading: true});
            this.setState({ 
                assets: await this.assetsController.getAssetsForEditTable(),
                loading: false
            });
        }
        else{
            this.onRowEditCancel(event);
        }
    }

    inputTextEditor(asset: any, field: string) {
        return <InputText type="text" defaultValue={asset[field]}
        onChange={(e) => this.editingAsset[field]=e.currentTarget.value}/>
    }

    inputCategoryEditor(asset: any) {
        return <Dropdown optionLabel="name" value={this.state.editingCategory} options={this.state.categories} 
        onChange={(e) => {this.setState({editingCategory: e.value})}}/>
    }

    categoryTemplate(asset: any){
        return asset.category.name;
    }

    render(){
        return (
            <div style={{width:"100%", height:"100%"}} className="card">
                <DataTable loading={this.state.loading} value={this.state.assets} editMode="row"
                onRowEditInit={(e) => this.onRowEditInit(e)} onRowEditCancel={(e) => this.onRowEditCancel(e)} onRowEditSave={(e) => this.onRowEditSave(e)}>
                    <Column field="name" header="Asset Name" editor={(e) => this.inputTextEditor(e.rowData, "name")}/>
                    <Column field="description" header="Description" editor={(e) => this.inputTextEditor(e.rowData, "description")}/>
                    <Column field="category" header="Category" body={this.categoryTemplate} editor={(e) => this.inputCategoryEditor(e.rowData)}/>
                    <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        );
    }
}