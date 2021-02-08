import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {OverlayPanel} from 'primereact/overlaypanel';
import {Button} from "primereact/button";
import {Checkbox} from 'primereact/checkbox';
import ThreatController from "../controller/ThreatController";
import AssetController from "../controller/AssetController";
import Threat from "../model/Threat";
import Asset from "../model/Asset";
import {ThreatLevels} from "../model/ThreatLevels";
import {VulLevels} from "../model/VulLevels";
import Category from '../model/Category';
import CategoryThreat from '../model/CategoryThreat';
import { waitFor } from '@testing-library/react';

export default class ThreatEvaluationView extends Component{
    private threatController = new ThreatController();
    private assetController = new AssetController();
    state: any;

    constructor(props: any){
        super(props);

        this.state = {
            threats: null,
            assets: [],
            loading: true,
            expandedRows: []
        }
        this.threatLevelTemplate = this.threatLevelTemplate.bind(this);
        this.vulLevelTemplate = this.vulLevelTemplate.bind(this);
        this.assetEvac = this.assetEvac.bind(this);
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    }

    async componentDidMount(){
        this.setState({
            threats: await this.threatController.getThreatsForTable(),
            assets: await this.assetController.getAssets(),
            loading: false
        });
    };

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

    ownerTemplate(asset: any){
        return (
            <div>
                <div className="p-text-normal">{asset.owner.name}</div>
                <div className="p-text-light">{asset.owner.email}</div>
            </div>
        );
    }

    assetEvac(asset: Asset){
        let op: any;
        return(
            <div className={"p-d-flex p-ai-center"}>
                {this.assetController.getOverallScore(asset)}
                <Button icon="pi pi-search" className="p-button-rounded p-button-text p-mx-2"
                        onClick={(e) => op.toggle(e)}/>
                <OverlayPanel showCloseIcon ref={(el) => op = el}>
                    <div className={"p-d-flex p-flex-column"}>
                        <table style={{width:"auto"}}>
                            <tr>
                                <th>Asset Evaluation Score</th>
                                <th>{this.assetController.getOverallScore(asset)}</th>
                            </tr>
                            <tr>
                                <td>Internal Reveal</td>
                                <td>{asset.confInternal}</td>
                            </tr>
                            <tr>
                                <td>External Reveal</td>
                                <td>{asset.confExternal}</td>
                            </tr>
                            <tr>
                                <th>Confidentiality Score</th>
                                <th>{this.assetController.getConfidentialityScore(asset)}</th>
                            </tr>
                            <tr>
                                <td>Some destruction</td>
                                <td>{asset.intSome}</td>
                            </tr>
                            <tr>
                                <td>Total destruction</td>
                                <td>{asset.intTotal}</td>
                            </tr>
                            <tr>
                                <th>Integrity Score</th>
                                <th>{this.assetController.getIntegrityScore(asset)}</th>
                            </tr>
                            <tr>
                                <td>30 minutes</td>
                                <td>{asset.av30m}</td>
                            </tr>
                            <tr>
                                <td>1 hour</td>
                                <td>{asset.av1h}</td>
                            </tr>
                            <tr>
                                <td>1 day</td>
                                <td>{asset.av1d}</td>
                            </tr>
                            <tr>
                                <td>2 days</td>
                                <td>{asset.av2d}</td>
                            </tr>
                            <tr>
                                <td>1 week</td>
                                <td>{asset.av1w}</td>
                            </tr>
                            <tr>
                                <td>1 month</td>
                                <td>{asset.av1m}</td>
                            </tr>
                            <tr>
                                <th>Availability Score</th>
                                <th>{this.assetController.getAvailabilityScore(asset)}</th>
                            </tr>
                        </table>
                    </div>
                </OverlayPanel>
            </div>
        );
    }

    rowExpansionTemplate(asset: Asset){
        const assetsCp = this.state.assets;
        const realAsset: Asset = assetsCp.find((a: Asset) => a.id === asset.id);
        const controlsList = (categoryThreat: CategoryThreat) => {
            const threat: any = realAsset.threats.find((t: Threat) => t.id === categoryThreat.id);
            return (
                <span>
                    {categoryThreat.controls.map((control) => {
                        return(
                        <div className="p-field-checkbox">
                            <Checkbox inputId={control.id} name="category" 
                                checked={threat.controls.includes(control.id)} onChange={() => {
                                    if(threat.controls.includes(control.id)){
                                        threat.controls.splice(threat.controls.indexOf(control.id), 1);
                                    }
                                    else {
                                        threat.controls.push(control.id);
                                    }
                                    this.assetController.updateAsset(realAsset);
                                    this.setState({assets: assetsCp});
                                }}/>
                            <label htmlFor={control.id}>{control.name}</label>
                        </div>
                    )})}
                </span>
            );
        }
        return(
            <DataTable value={realAsset.category.threats} className="p-card p-datatable-sm">
                <Column field="name" header="Threat" headerStyle={{"width": "15em"}}/>
                <Column header="Controls" body={controlsList}/>
            </DataTable>
        );
    }

    render(){
        const header = (
            <h1 className="p-text-light p-m-0">Threat Evaluation Tool</h1>
        )
        return (
            <div style={{width:"100%", height:"100%"}} className="p-card">
                <DataTable loading={this.state.loading} value={this.state.assets} sortMode="multiple"
                           rowExpansionTemplate={this.rowExpansionTemplate} expandedRows={this.state.expandedRows}
                           onRowToggle={(e) => this.setState({expandedRows: e.data})}
                           className="p-datatable-striped" resizableColumns columnResizeMode="fit" header={header}>
                    <Column expander style={{ width: '4em' }} />
                    <Column field="name" header="Asset"/>
                    <Column field="category.name" header="Category" sortable/>
                    <Column field="owner" header="Owner" body={this.ownerTemplate}/>
                    <Column body={this.assetEvac} header={"Asset Evaluation Score"}/>
                </DataTable>
            </div>
        );
    }
}