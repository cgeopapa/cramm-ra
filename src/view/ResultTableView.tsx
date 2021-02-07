import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {Component} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {OverlayPanel} from 'primereact/overlaypanel';
import ThreatController from "../controller/ThreatController";
import Threat from "../model/Threat";
import AssetController from "../controller/AssetController";
import Asset from "../model/Asset";
import {Button} from "primereact/button";
import {ThreatLevels} from "../model/ThreatLevels";
import {VulLevels} from "../model/VulLevels";
import Scales from "../model/Scales";

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
        this.dangerLevel = this.dangerLevel.bind(this);
        this.hazardLevel = this.hazardLevel.bind(this);
    }

    async componentDidMount() {
        this.setState({
            threats: await this.threatController.getThreats(),
            loading: false
        })
    }

    assetEvac(threat: Threat){
        // let asset: Asset = threat.asset;
        // let op: any;
        // return(
        //     <div className={"p-d-flex p-ai-center"}>
        //         {this.assetController.getOverallScore(asset)}
        //         <Button icon="pi pi-search" className="p-button-rounded p-button-text p-mx-2"
        //                 onClick={(e) => op.toggle(e)}/>
        //         <OverlayPanel showCloseIcon ref={(el) => op = el}>
        //             <div className={"p-d-flex p-flex-column"}>
        //                 <table style={{width:"auto"}}>
        //                     <tr>
        //                         <th>Asset Evaluation Score</th>
        //                         <th>{this.assetController.getOverallScore(asset)}</th>
        //                     </tr>
        //                     <tr>
        //                         <td>Internal Reveal</td>
        //                         <td>{asset.confInternal}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>External Reveal</td>
        //                         <td>{asset.confExternal}</td>
        //                     </tr>
        //                     <tr>
        //                         <th>Confidentiality Score</th>
        //                         <th>{this.assetController.getConfidentialityScore(asset)}</th>
        //                     </tr>
        //                     <tr>
        //                         <td>Some destruction</td>
        //                         <td>{asset.intSome}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>Total destruction</td>
        //                         <td>{asset.intTotal}</td>
        //                     </tr>
        //                     <tr>
        //                         <th>Integrity Score</th>
        //                         <th>{this.assetController.getIntegrityScore(asset)}</th>
        //                     </tr>
        //                     <tr>
        //                         <td>30 minutes</td>
        //                         <td>{asset.av30m}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>1 hour</td>
        //                         <td>{asset.av1h}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>1 day</td>
        //                         <td>{asset.av1d}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>2 days</td>
        //                         <td>{asset.av2d}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>1 week</td>
        //                         <td>{asset.av1w}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>1 month</td>
        //                         <td>{asset.av1m}</td>
        //                     </tr>
        //                     <tr>
        //                         <th>Availability Score</th>
        //                         <th>{this.assetController.getAvailabilityScore(asset)}</th>
        //                     </tr>
        //                 </table>
        //             </div>
        //         </OverlayPanel>
        //     </div>
        // );
        return ("dd")
    }

    threatLevel(threat: Threat){
        return ThreatLevels[threat.threatLevel];
    }

    vulLevel(threat: Threat){
        return VulLevels[threat.vulLevel];
    }

    dangerLevel(threat: Threat){
        return this.threatController.getDangerLevel(threat);
    }

    hazardLevel(threat: Threat) {
        return this.scales.getHazardScale(this.threatController.getDangerLevel(threat));
    }

    render(){
        return(
            <DataTable loading={this.state.loading} value={this.state.threats}
                       className="p-datatable-sm p-datatable-striped">
                <Column field={"asset.name"} header={"Asset Name"}/>
                <Column field={"asset.description"} header={"Asset Description"}/>
                <Column body={this.assetEvac} header={"Asset Evaluation Score"}/>
                <Column field={"name"} header={"Threat Name"}/>
                <Column body={this.threatLevel} header={"Threat Level"}/>
                <Column body={this.vulLevel} header={"Vulnerability Level"}/>
                <Column body={this.dangerLevel} header={"Grade of Danger"}/>
                <Column body={this.hazardLevel} header={"Level of Danger"}/>
            </DataTable>
        );
    }
}