import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles/numberfield.css';
import './styles/cellStyle.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { InputNumber } from 'primereact/inputnumber';
import AssetController from '../controller/AssetController';
import Asset from '../model/Asset';

export default class AssetEvaluationView extends Component{
    private assetsController = new AssetController();
    state: any;

    constructor(props: any){
        super(props);
        this.state = {
            assets: null,
            loading: true
        }
    }

    async componentDidMount(){
        this.setState({
            assets: await this.assetsController.getAssets(),
            loading: false
        });

        console.log(this.state.assets);
    }

    numField(asset: any, field: string){
        return (
            <InputNumber value={asset[field]} showButtons min={1} max={10} style={{width: '100%'}}
            onValueChange={(e) => {
                let i = this.state.assets.findIndex((a: Asset) => a.id === asset.id);
                let assets = [...this.state.assets];
                let ass = {...assets[i]};
                ass[field] = e.value;
                assets[i] = ass;
                this.setState({assets: assets});
                this.assetsController.updateAsset(ass);
            }} />
        );
    }

    confCalc(asset: Asset){
        const conf = this.assetsController.getConfidentialityScore(asset)
        return (
            <span className={this.cellClass(conf) + " e-res"}>
                {conf}
            </span>
        );
    }

    intCalc(asset: Asset){
        let int = this.assetsController.getIntegrityScore(asset);
        return (
            <span className={this.cellClass(int) + " e-res"}>
                {int}
            </span>
        );
    }

    avCalc(asset: Asset){
        const av = this.assetsController.getAvailabilityScore(asset);
        return (
            <span className={this.cellClass(av) + " e-res"}>
                {av}
            </span>
        );
    }

    overallCalc(asset: Asset){
        const overall = this.assetsController.getOverallScore(asset);
        return (
            <span className={this.cellClass(overall) + " e-res"}>
                {overall}
            </span>
        );
    }

    cellClass(level: number){
        if(level <= 2){
            return 'e-none';
        }
        else if(level <= 4){
            return 'e-low';
        }
        else if(level <= 6){
            return 'e-mid';
        }
        else if(level <= 8){
            return 'e-imp';
        }
        else{
            return 'e-cat';
        }
    }

    render(){
        const header = (
            <h1 className="p-text-light p-m-0">Asset Evaluation tool</h1>
        )

        const headerGroup =(
            <ColumnGroup>
                <Row>
                    <Column header="Impact Scenarios" colSpan={10}/>
                    <Column header="Final Grade" colSpan={4} rowSpan={2}/>
                </Row>
                <Row>
                    <Column header="Loss of Confidentiality" colSpan={2}/>
                    <Column header="Loss of Integrity" colSpan={2}/>
                    <Column header="Loss of Availability" colSpan={6}/>
                </Row>
                <Row>
                    <Column header="Internal Reveal" field="confInternal" sortable/>
                    <Column header="External Reveal" field="confExternal" sortable/>
                    <Column header="Toral Destruction" sortable />
                    <Column header="Some Destruction" sortable />
                    <Column header="30 minutes loss" sortable />
                    <Column header="1 hour loss" sortable />
                    <Column header="1 day loss" sortable />
                    <Column header="2 day loss" sortable />
                    <Column header="1 week loss" sortable />
                    <Column header="1 month loss" sortable />
                    <Column header="Confidentiality" sortable />
                    <Column header="Integrity" sortable />
                    <Column header="Availability" sortable />
                    <Column header="Overall" sortable />
                </Row>
            </ColumnGroup>
        );

        const rowClass = (asset: Asset) => {
            return {
                ' e-high ': this.assetsController.getOverallScore(asset) > 7
            };
        }; 

        return(
            <div style={{width:"100%", height:"100%"}} className="card">
                <DataTable loading={this.state.loading} value={this.state.assets}
                sortMode="multiple" className="p-datatable-striped p-datatable-gridlines p-datatable-sm p-card" selectionMode="single"
                header={header} headerColumnGroup={headerGroup} resizableColumns rowClassName={rowClass}
                scrollable frozenWidth="200px">
                    <Column field="name" header="Asset Name" headerStyle={{ width: '200px', height: '117px' }} style={{height: '56px'}} frozen sortable/>
                    <Column field="confInternal" body={(e: any)=>this.numField(e, 'confInternal')} headerStyle={{ width: '200px' }} />
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'confExternal')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'intTotal')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'intSome')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'av30m')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'av1h')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'av1d')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'av2d')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'av1w')} headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" body={(e: any)=>this.numField(e, 'av1m')} headerStyle={{ width: '200px' }}/>
                    <Column body={(e: Asset) => this.confCalc(e)} headerStyle={{ width: '200px' }}/>
                    <Column body={(e: Asset) => this.intCalc(e)} headerStyle={{ width: '200px' }}/>
                    <Column body={(e: Asset) => this.avCalc(e)} headerStyle={{ width: '200px' }}/>
                    <Column body={(e: Asset) => this.overallCalc(e)} headerStyle={{ width: '200px' }}/>
                </DataTable>
            </div>
        );
    }
}