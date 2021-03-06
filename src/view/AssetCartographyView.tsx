import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Tooltip } from 'primereact/tooltip';
import { TabView,TabPanel } from 'primereact/tabview';
import { Graph } from "react-d3-graph";
import AssetController from '../controller/AssetController';
import CategoryController from '../controller/CategoryController';
import Owner from '../model/Owner';
import OwnerContrller from '../controller/OwnerController';
import TopMenuView from './TopMenuView';
import Asset from '../model/Asset';
import { link } from 'fs';
import FooterView from './FooterView';

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
            loading: true,
            data: {},
            config: {},
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
        return <InputText type="text" placeholder={field} defaultValue={asset[field]}
        onChange={(e) => this.state.editingAsset[field]=e.currentTarget.value}/>
    }

    inputCategoryEditor(asset: any) {
        return (
            <Dropdown optionLabel="name" value={this.state.editingAsset.category} options={this.state.categories} 
            appendTo={document.body} placeholder="category"
            onChange={(e) => {
                let editingAsset = this.state.editingAsset;
                editingAsset.category = e.value;
                this.setState({editingAsset: editingAsset})}}/>
        )
    }

    inputLocationEditor(asset: any) {
        return (
            <Dropdown optionLabel="name" optionValue="name" value={this.state.editingAsset.location} options={this.state.assets}
            appendTo={document.body} placeholder="location"
            onChange={(e) => {
                let editingAsset = this.state.editingAsset;
                editingAsset.location = e.value;
                this.setState({editingAsset: editingAsset})}}/>
        )
    }
    
    inputOwnerEditor(asset: any) {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
                <Dropdown optionLabel="name" value={this.state.editingAsset.owner} options={this.state.owners} 
                appendTo={document.body} placeholder="owner"
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
        const locationHeader = (
            <div style={{width:"auto"}}>
                <Tooltip target=".customClassName" mouseTrack mouseTrackLeft={10} />
                <div className="customClassName" data-pr-tooltip="Located/Installed/Saved at..">Location</div>
            </div>
        )
        const prepareGraph = (e: any) => {
            const nodes = [];
            const links = [];
            for(let asset of this.state.assets){
                if(asset.name){
                    nodes.push({id: asset.name});
                }
                if(asset.location){
                    links.push({source: asset.name, target: asset.location});
                }
            }
            const data = {nodes: nodes, links: links};

            const myConfig = {
                nodeHighlightBehavior: true,
                height: 640,
                width: 2048,
                node: {
                  color: "lightgreen",
                  size: 120,
                  highlightStrokeColor: "darkgreen",
                },
                link: {
                  highlightColor: "lightblue",
                },
            };
            this.setState({activeIndex: e.index, data: data, config: myConfig});
        }
        return (
            <div style={{width:"100%", height:"100%"}} className="p-card">
                <TopMenuView/>
                <TabView activeIndex={this.state.activeIndex} onTabChange={prepareGraph}>
                    <TabPanel header="Table" leftIcon="pi pi-table">
                        <DataTable loading={this.state.loading} value={this.state.assets} editMode="row" sortMode="multiple" className="p-datatable-striped"
                        resizableColumns columnResizeMode="fit" header={header}
                        onRowEditInit={(e) => this.onRowEditInit(e)} onRowEditCancel={(e) => this.onRowEditCancel(e)} onRowEditSave={(e) => this.onRowEditSave(e)}>
                            <Column field="name" header="Asset Name" editor={(e) => this.inputTextEditor(e.rowData, "name")}/>
                            <Column field="description" header="Description" editor={(e) => this.inputTextEditor(e.rowData, "description")}/>
                            <Column field="category" header="Category" body={this.categoryTemplate} editor={(e) => this.inputCategoryEditor(e.rowData)}/>
                            <Column field="owner" header="Owner" body={this.ownerTemplate} editor={(e) => this.inputOwnerEditor(e.rowData)}/>
                            <Column field="location" header={locationHeader} editor={(e) => this.inputLocationEditor(e.rowData)}/>
                            <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Graph" leftIcon="pi pi-share-alt">
                        <div>
                            <Graph id="graph-id" data={this.state.data} config={this.state.config}/>
                        </div>
                    </TabPanel>
                </TabView>
                <FooterView/>
            </div>
        );
    }
}