export interface StateResponse {
    status: string;
    message: string;
    states: StateList[];
}

export interface StateList {
    id: number;
    stateGovCode: string;
    stateName: string;
    shortName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddStateResponse {
    status: "string",
    message: "string"
}
