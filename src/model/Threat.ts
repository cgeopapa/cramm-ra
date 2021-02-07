import {ThreatLevels} from "./ThreatLevels";
import {VulLevels} from "./VulLevels";
import Asset from "./Asset";

export default class Threat
{
    constructor(
        public name: string = "",
        public threatLevel: ThreatLevels = 0,
        public vulLevel: VulLevels = 0,
        public asset: Asset = new Asset(),
        public controls: string[] = [],
        public id: string = "",
    ) {
    }
}
