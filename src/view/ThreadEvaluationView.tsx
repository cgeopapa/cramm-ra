import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import CategoryController from '../controller/CategoryController';
import Owner from '../model/Owner';
import OwnerContrller from '../controller/OwnerController';
import ThreatController from "../controller/ThreatController";
import AssetController from "../controller/AssetController";
import Threat from "../model/Threat";
import {ThreatLevels} from "../model/ThreatLevels";
import {VulLevels} from "../model/VulLevels";

export default class ThreatEvaluationView extends Component{
    private threatController = new ThreatController();
    private assetController = new AssetController();
    state: any;

    constructor(props: any){
        super(props);

        this.state = {
            threats: null,
            assets: null,
            loading: true
        }
        this.assetDropdown = this.assetDropdown.bind(this);
        this.threatNameTemplate = this.threatNameTemplate.bind(this);
        this.threatLevelTemplate = this.threatLevelTemplate.bind(this);
        this.vulLevelTemplate = this.vulLevelTemplate.bind(this);
    }

    async componentDidMount(){
        this.setState({
            threats: await this.threatController.getThreatsForTable(),
            assets: await this.assetController.getAssets(),
            loading: false
        });
    };

    assetDropdown(threat: Threat){
        return (
            <div>
                <Dropdown appendTo={document.body} options={this.state.assets} optionLabel="name"
                          placeholder={"Select an Asset"} value={threat.asset} onChange={e => {
                    let i = this.state.threats.findIndex((t: Threat) => t.id === threat.id);
                    let threatsCopy = [...this.state.threats];
                    let threatCopy: Threat = {...threatsCopy[i]};
                    threatCopy.asset = e.value;
                    threatsCopy[i] = threatCopy;
                    this.setState({threats: threatsCopy});
                    this.threatController.updateThreat(threatCopy).then(n => {
                        if (n)
                            this.refreshThreats();
                    });
                }}/>
            </div>
        );
    }

    threatNameTemplate(threat: Threat){
        return (
            <InputTextarea placeholder={"Threat Description"} value={threat.name} onChange={e =>{
                let i = this.state.threats.findIndex((t: Threat) => t.id === threat.id);
                let threatsCopy = [...this.state.threats];
                let threatCopy: Threat = {...threatsCopy[i]};
                threatCopy.name = e.currentTarget.value;
                threatsCopy[i] = threatCopy;
                this.setState({threats: threatsCopy});
                this.threatController.updateThreat(threatCopy);
            }}/>
        )
    }

    threatLevelTemplate(threat: Threat){
        return(
            <div>
                <InputNumber value={threat.threatLevel} showButtons buttonLayout="horizontal" min={0} max={4} style={{width: "100%"}} suffix={" " + ThreatLevels[threat.threatLevel]}
                             decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                             onChange={e => {
                                 let i = this.state.threats.findIndex((t: Threat) => t.id === threat.id);
                                 let threatsCopy = [...this.state.threats];
                                 let threatCopy: Threat = {...threatsCopy[i]};
                                 threatCopy.threatLevel = e.value;
                                 threatsCopy[i] = threatCopy;
                                 this.setState({threats: threatsCopy});
                                 this.threatController.updateThreat(threatCopy);
                             }}/>
            </div>
        )
    }

    vulLevelTemplate(threat: Threat){
        return(
            <div>
                <InputNumber value={threat.vulLevel} showButtons buttonLayout="horizontal" min={0} max={2} style={{width: "100%"}} suffix={" " + VulLevels[threat.vulLevel]}
                             decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                             onChange={e => {
                                 let i = this.state.threats.findIndex((t: Threat) => t.id === threat.id);
                                 let threatsCopy = [...this.state.threats];
                                 let threatCopy: Threat = {...threatsCopy[i]};
                                 threatCopy.vulLevel = e.value;
                                 threatsCopy[i] = threatCopy;
                                 this.setState({threats: threatsCopy});
                                 this.threatController.updateThreat(threatCopy);
                             }}/>
            </div>
        )
    }

    async refreshThreats(){
        await this.setState({loading: true});
        await this.setState({
            threats: await this.threatController.getThreatsForTable(),
            loading: false
        });
    }

    render(){
        const header = (
            <h1 className="p-text-light p-m-0">Threat Evaluation Tool</h1>
        )
        return (
            <div style={{width:"100%", height:"100%"}} className="p-card">
                <DataTable loading={this.state.loading} value={this.state.threats} sortMode="multiple"
                           className="p-datatable-striped" resizableColumns columnResizeMode="fit" header={header}>
                    <Column field="assetName" header="Asset Name" body={this.assetDropdown}/>
                    <Column field="name" header="Threat Name" sortable body={this.threatNameTemplate}/>
                    <Column field="name" header="Threat Level" sortable body={this.threatLevelTemplate}/>
                    <Column field="name" header="Vulnerability Level" sortable body={this.vulLevelTemplate}/>
                </DataTable>
            </div>
        );
    }
}