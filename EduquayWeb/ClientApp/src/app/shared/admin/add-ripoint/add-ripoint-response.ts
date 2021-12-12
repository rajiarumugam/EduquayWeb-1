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
    riGovCode: string;
    riSite: string;
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
    ilrDetails: IlrList[];
}

export interface IlrList {
    id: number;
    ilrPoint: string;
    ilrCode: string;
    chcId: number;
    createdBy: number;
    updatedBy: number;
    comments: string;
    isActive: string;
    chcName:string;
  
   
    
}

export interface AddIlrResponse {
    status: "string",
    message: "string",
    ilrDetails: IlrList[];
}