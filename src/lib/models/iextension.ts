import ApiVersion from "./api-version";
import ResourceType from "./resource-type";

interface IExtension {
    id: string;
    apiVersion: ApiVersion;
    apiEndpoint: string;
    resourceType: ResourceType[];
}

export default IExtension;
