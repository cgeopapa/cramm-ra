import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import AssetController from '../controller/AssetController';
import CategoryController from '../controller/CategoryController';
import Owner from '../model/Owner';
import OwnerContrller from '../controller/OwnerController';

export default class AssetCartographyView extends Component{
    private assetsController = new AssetController();
    private categoryController = new CategoryController();
    private ownerController = new OwnerContrller();
    private initialAsset: any;
    private op: any;
    state: any;

    constructor(props: any){
        super(props);

        this.state = {
            assets: null,
            categories: null,
            owners: null,
            editingOwner: new Owner(),
            loading: true
        }
    }

    async componentDidMount(){
        this.setState({
            assets: await this.assetsController.getAssetsForEditTable(),
            categories: await this.categoryController.getCategpries(),
            owners: await this.ownerController.getOwners(),
            loading: false
        });

        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.categoryTemplate = this.categoryTemplate.bind(this);
    }

    onRowEditInit(event: any){
        this.initialAsset={...this.state.assets[event.index]};
        this.setState({editingAsset: this.initialAsset});
    }

    onRowEditCancel(event: any) {
        let assets = this.state.assets;
        assets[event.index] = this.initialAsset;

        this.setState({ assets: assets });
    }

    async onRowEditSave(event: any){
        const res = await this.assetsController.updateAsset(this.state.editingAsset);
        if(res){
            this.reloadAssets();
        }
        else{
            this.onRowEditCancel(event);
        }
    }

    async onOwnerEditSave(owner: Owner){
        const res = await this.ownerController.createOwner(owner);
        if(res){
            this.setState({owners: await this.ownerController.getOwners()});    
            this.op.hide();
        }
    }

    async reloadAssets(){
        this.setState({loading: true});
        this.setState({ 
            assets: await this.assetsController.getAssetsForEditTable(),
            loading: false
        });
}

    inputTextEditor(asset: any, field: string) {
        return <InputText type="text" defaultValue={asset[field]}
        onChange={(e) => this.state.editingAsset[field]=e.currentTarget.value}/>
    }

    inputCategoryEditor(asset: any) {
        return (
            <Dropdown optionLabel="name" value={this.state.editingAsset.category} options={this.state.categories} 
            onChange={(e) => {
                let editingAsset = this.state.editingAsset;
                editingAsset.category = e.value;
                this.setState({editingAsset: editingAsset})}}/>
        )
    }
    
    inputOwnerEditor(asset: any) {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
                <Dropdown optionLabel="name" value={this.state.editingAsset.owner} options={this.state.owners} 
                onChange={(e) => {
                    let editingAsset = this.state.editingAsset;
                    editingAsset.owner = e.value;
                    this.setState({editingAsset: editingAsset})}}/> 
                <Button label="Create new owner" className="p-button-text p-button-sm" onClick={(e) => this.op.toggle(e)} />

                <OverlayPanel showCloseIcon  ref={(el) => this.op = el}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <h5>New owner</h5>
                        <span className="p-float-label">
                            <InputText id="ownerName" value={this.state.editingOwner.name}
                            onChange={(e) => this.setState({editingOwner: {...this.state.editingOwner, name: e.currentTarget.value}})}/>
                            <label htmlFor="ownerName">Name</label>
                        </span>
                        <span className="p-float-label p-my-5">
                            <InputText id="ownerEmail" value={this.state.editingOwner.email}
                            onChange={(e) => this.setState({editingOwner: {...this.state.editingOwner, email: e.currentTarget.value}})}/>
                            <label htmlFor="ownerEmail">Email</label>
                        </span>
                        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                            <Button label="Create" className="p-button-sm" onClick={(e) => this.onOwnerEditSave(this.state.editingOwner)}/>
                            <Button label="Cancel" className="p-button-text p-button-sm" onClick={(e) => this.op.hide()}/>
                        </div>
                    </div>
                </OverlayPanel>
            </div>
        )
    }

    categoryTemplate(asset: any){
        return asset.category.name;
    }

    ownerTemplate(asset: any){
        return (
            <div>
                <div className="p-text-normal">{asset.owner.name}</div>
                <div className="p-text-light">{asset.owner.email}</div>
            </div>
        );
    }

    render(){
        const header = (
            <h1 className="p-text-light p-m-0">Asset Chartography tool</h1>
        )
        return (
            <div style={{width:"100%", height:"100%"}} className="card">
                <DataTable loading={this.state.loading} value={this.state.assets} editMode="row" sortMode="multiple" className="p-datatable-striped"
                resizableColumns columnResizeMode="fit" header={header}
                onRowEditInit={(e) => this.onRowEditInit(e)} onRowEditCancel={(e) => this.onRowEditCancel(e)} onRowEditSave={(e) => this.onRowEditSave(e)}>
                    <Column field="name" header="Asset Name" sortable editor={(e) => this.inputTextEditor(e.rowData, "name")}/>
                    <Column field="description" header="Description" sortable editor={(e) => this.inputTextEditor(e.rowData, "description")}/>
                    <Column field="category" header="Category" sortable body={this.categoryTemplate} editor={(e) => this.inputCategoryEditor(e.rowData)}/>
                    <Column field="owner" header="Owner" sortable body={this.ownerTemplate} editor={(e) => this.inputOwnerEditor(e.rowData)}/>
                    <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        );
    }
}