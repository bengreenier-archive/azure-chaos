import ITrigger from "../models/itrigger";
import TriggerType from "../models/trigger-type";

export class OnDemandTrigger implements ITrigger {
    public type = TriggerType.OnDemand;
}
