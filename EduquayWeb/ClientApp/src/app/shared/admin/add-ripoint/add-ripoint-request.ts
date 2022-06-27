export class AddRipointRequest {
    testingCHCId: number;
    chcId: number;
    phcId: number;
    scId: number;
    riGovCode: string;
    riSite: string;
    avdId:number;
    anmId:number;
    pincode: string;
    ilrId: number;
    isActive: string;
    comments: string; 
    createdBy: number;
    updatedBy: number;
}


export class AddRipointRequest2 {
    testingCHCId: number;
    chcId: number;
    phcId: number;
    scId: number;
    riGovCode: string;
    avdId:number;
    anmId:number;
    name: string;
    pincode: string;
    ilrId: number;
    isActive: boolean;
    comments: string;
    userId: number;
    id:number
   
}

export class RipoinitFilterRequest{
    DistrictId:number;
    ChcId:number;
    PhcId: number;
    ScId:number;
}