import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {Component} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {OverlayPanel} from 'primereact/overlaypanel';
import { Card } from 'primereact/card';
import ThreatController from "../controller/ThreatController";
import Threat from "../model/Threat";
import AssetController from "../controller/AssetController";
import Asset from "../model/Asset";
import {Button} from "primereact/button";
import {ThreatLevels} from "../model/ThreatLevels";
import {VulLevels} from "../model/VulLevels";
import Scales from "../model/Scales";
import Category from '../model/Category';
import CategoryThreat from '../model/CategoryThreat';

export default class ResultTableView extends Component{
    private threatController: ThreatController = new ThreatController();
    private assetController: AssetController = new AssetController();
    private scales: Scales = new Scales();

    state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            threats: null,
            loading: true
        }

        this.assetEvac = this.assetEvac.bind(this);
        this.economicRisk = this.economicRisk.bind(this);
        this.hazardLevel = this.hazardLevel.bind(this);
    }

    async componentDidMount() {
        this.setState({
            threats: await this.threatController.getThreats(),
            assets: await this.assetController.getAssets(),
            loading: false
        })
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
        return ("dd")
    }

    threatLevel(threat: Threat){
        return ThreatLevels[threat.threatLevel];
    }

    vulLevel(threat: Threat){
        return VulLevels[threat.vulLevel];
    }

    economicRisk(asset: Asset){
        let risk = 0;
        for(let threat of asset.threats)
        {
            risk += this.scales.econLevelScale[this.assetController.getOverallScore(asset)] * this.threatController.getDangerLevel(threat)
        }
        return Math.round(risk);
    }

    hazardLevel(asset: Asset) {
        return this.scales.getHazardScale(this.economicRisk(asset));
    }

    rowExpansionTemplate(asset: Asset){
        return (
            <div className="p-m-2">
                {asset.threats.map((threat: Threat) => {
                    const categoryThreat = asset.category.threats.find((t: CategoryThreat) => t.id === threat.id) ?? new CategoryThreat();
                    const act: string[] = [];
                    const rec: string[] = [];
                    for(let control of categoryThreat.controls){
                        if(threat.controls.includes(control.id)){
                            act.push(control.name);
                        }
                        else{
                            rec.push(control.name);
                        }
                    }
                    const header = (
                        <div className="p-d-flex p-jc-between">
                            <span className="p-m-4">{`Threat: ${threat.name}`}</span>
                            <div className="p-m-4 p-d-flex p-flex-column" style={{textAlign:"end"}}>
                                <span>{`Threat Level: ${threat.threatLevel}`}</span>
                                <span>{`Vulnerability Level: ${threat.vulLevel}`}</span>
                            </div>
                        </div>
                    );
                    return (
                        <Card title={header} className="p-mb-4">
                            <div className="p-d-flex p-flex-column p-flex-md-row" style={{width: "100%"}}>
                                <Card title="Active Controls" className="p-mx-2" style={{width: "100%"}}>
                                    <ul>
                                        {act.map((control) => {
                                            return <li>{control}</li>
                                        })}
                                    </ul>
                                </Card>
                                <Card title="Recommended Controls" className="p-mx-2" style={{width: "100%"}}>
                                        {rec.map((control) => {
                                            return <li>{control}</li>
                                        })}
                                </Card>
                            </div>
                        </Card>
                    );
                })}
            </div>
        )
    }

    render(){
        return(
            <DataTable loading={this.state.loading} value={this.state.assets}
                        rowExpansionTemplate={this.rowExpansionTemplate} expandedRows={this.state.expandedRows}
                        onRowToggle={(e) => this.setState({expandedRows: e.data})}
                        className="p-datatable-sm p-datatable-striped">
                <Column expander style={{ width: '4em' }} />
                <Column field={"name"} header={"Asset Name"}/>
                <Column field={"description"} header={"Asset Description"}/>
                <Column body={this.assetEvac} header={"Asset Evaluation Score"}/>
                <Column body={this.economicRisk} header={"Overall economic Risk"}/>
                <Column body={this.hazardLevel} header={"Level of Risk"}/>
            </DataTable>
        );
    }
}
