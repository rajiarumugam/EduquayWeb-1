export class AddChcResponse {
    status: string;
    message: string;
    chcDetails: ChcList[];
}

export interface ChcList {
    id: number;
    districtId: number;
    districtName: string;
    blockId: number;
    blockName: string;
    hninId: string;
    pincode: string;
    chcGovCode: string;
    chcName: string;
    testingCHCId: number;
    testingCHC: string;
    centralLabId: number;
    centralLabName: string;
    isTestingFacility: string;
    isActive: string;
    comments: string;
    latitude: string;
    longitude: string;
    createdBy: number;
    updatedBy: number;
    name:string;
}

export interface AddChcDataresponse {
    status: string;
    message: string;
}
