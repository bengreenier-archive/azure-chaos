import ITrigger from "../models/itrigger";
import TriggerType from "../models/trigger-type";

export class ScheduledTrigger implements ITrigger {
    public type = TriggerType.OnTimer;

    public date: Date;

    constructor(date: Date) {
        this.date = date;
    }
}
