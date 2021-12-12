export class AddChcResponse {
    status: string;
    message: string;
    chcDetails: ChcList[];
}
export class AddchcbyblockResponse {
  status: string;
  message: string;
  data: ChcList[];
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
}

export interface AddChcDataresponse {
    status: string;
    message: string;
}
