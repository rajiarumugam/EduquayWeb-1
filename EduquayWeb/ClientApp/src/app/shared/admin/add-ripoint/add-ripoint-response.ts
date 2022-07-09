export class AddRipointResponse {
    status: string;
    message: string;
    userRoles: RiList[];
}

export interface RiList {
    districtId:number;
    id: number;
    testingCHCId: number;
    testingCHCName: string;
    chcId: number;
    chcName: string;
    phcId: number;
    phcName: string;
    scId: number;
    scName: string;
    avdId:number;
    anmId:number;
    avdName:string;
    ANMName:string;
    riGovCode: string;
    riSite: string;
    name: string;
    userId: number;
    pincode: string;
    ilrId: number;
    ilrPoint: string;
    isActive: string;
    comments: string;
    latitude: string;
    longitude: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddRiPtDataresponse {    
    status: string;
    message: string;
    userRoles: RiList[];
}


export interface IlrResponse {
    status: string;
    message: string;
    data: IlrList[];
}

export interface IlrList {
    id: number;
    name: string;
    
}

export interface AddIlrResponse {
    status: "string",
    message: "string",
    ilrDetails: IlrList[];
}

export class AddtestingchcbydistrictResponse {
    status: string;
    message: string;
    data: tcbydisList[];
}
export interface tcbydisList {
    id: number;
    name: string;  
}