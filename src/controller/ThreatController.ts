import FirebaseDAO from "../dao/FirebaseDAO";
import Threat from "../model/Threat";
import Scales from "../model/Scales";
import AssetController from "./AssetController";

export default class ThreatController{
    private scales: Scales = new Scales();
    private assetController: AssetController = new AssetController();
    dao = new FirebaseDAO();

    public async getThreats(){
        return await this.dao.getThreats();
    }

    public async getThreatsForTable(){
        const threats: Threat[] = await this.dao.getThreats();
        threats.push(new Threat());
        return threats;
    }

    public async createThreat(threat: Threat){
        return await this.dao.addThreat(threat);
    }

    public async updateThreat(threat: Threat){
        if(threat.id === ""){
            return await this.createThreat(threat);
        }
        else{
            return await this.dao.updateThreat(threat);
        }
    }

    public getDangerLevel(threat: Threat){
        return (
            this.scales.econLevelScale[this.assetController.getOverallScore(threat.asset)] *
            this.scales.threatLevelScale[threat.threatLevel] *
            this.scales.vulLevelScale[threat.vulLevel]
        )
    }
}
