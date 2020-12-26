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
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import AssetController from '../controller/AssetController';
import CategoryController from '../controller/CategoryController';
import Owner from '../model/Owner';
import OwnerContrller from '../controller/OwnerController';

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

        return(
            <div style={{width:"100%", height:"100%"}} className="card">
                <DataTable loading={this.state.loading} value={this.state.assets} editMode="row" 
                sortMode="multiple" className="p-datatable-striped p-datatable-gridlines" selectionMode="single"
                header={header} headerColumnGroup={headerGroup} 
                scrollable frozenWidth="200px">
                    <Column field="name" header="Asset Name" headerStyle={{ width: '200px', height: '165px' }} frozen sortable/>
                    <Column field="confInternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                    <Column field="confExternal" headerStyle={{ width: '200px' }}/>
                </DataTable>
            </div>
        );
    }
}