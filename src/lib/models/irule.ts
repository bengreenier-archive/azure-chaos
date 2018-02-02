import ApiVersion from "./api-version";
import ITrigger from "./itrigger";

interface IRule {
    apiVersion: ApiVersion;
    extensionId: string;
    trigger: ITrigger;
}

export default IRule;
