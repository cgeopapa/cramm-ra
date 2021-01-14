import {ThreatLevels} from "./ThreatLevels";
import {VulLevels} from "./VulLevels";

export default class Threat
{
    constructor(
        public name: string = "",
        public threatLevel: ThreatLevels = 0,
        public vulLevel: VulLevels = 0,
        public assetName: string = "",
        public id: string = "",
    ) {
    }
}
