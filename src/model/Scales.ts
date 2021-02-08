import {ThreatLevels} from "./ThreatLevels";
import {VulLevels} from "./VulLevels";
import {HazardScale} from "./HazardScale";

export default class Scales{
    public readonly threatLevelScale: { [val: number]: number} = {};
    public readonly vulLevelScale: { [val: number]: number} = {};
    public readonly econLevelScale: { [val: number]: number} = {};

    constructor() {
        this.threatLevelScale[ThreatLevels.VeryLow] = 0.1;
        this.threatLevelScale[ThreatLevels.Low] = 0.34;
        this.threatLevelScale[ThreatLevels.Medium] = 1;
        this.threatLevelScale[ThreatLevels.High] = 3.33;
        this.threatLevelScale[ThreatLevels.VeryHigh] = 10;

        this.vulLevelScale[VulLevels.Low] = 0.1;
        this.vulLevelScale[VulLevels.Medium] = 0.5;
        this.vulLevelScale[VulLevels.High] = 1;

        this.econLevelScale[0] = 1;
        this.econLevelScale[1] = 1000;
        this.econLevelScale[2] = 10000;
        this.econLevelScale[3] = 30000;
        this.econLevelScale[4] = 100000;
        this.econLevelScale[5] = 300000;
        this.econLevelScale[6] = 1000000;
        this.econLevelScale[7] = 3000000;
        this.econLevelScale[8] = 10000000;
        this.econLevelScale[9] = 30000000;
        this.econLevelScale[10] = 100000000;
    }

    getHazardScale(danger: number){
        if(danger < 1000){
            return HazardScale.VeryLittleDanger;
        }
        else if(danger < 10000){
            return HazardScale.LittleDanger;
        }
        else if(danger < 100000){
            return HazardScale.MediumDanger;
        }
        else if(danger < 1000000){
            return HazardScale.MediumHighDanger;
        }
        else if(danger < 10000000){
            return HazardScale.HighDanger;
        }
        else if(danger < 100000000){
            return HazardScale.VeryHighDanger;
        }
        else{
            return HazardScale.CriticalDanger;
        }
    }
}