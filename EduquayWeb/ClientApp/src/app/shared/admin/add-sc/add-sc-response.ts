export class AddScResponse {
    status: string;
    message: string;
    scDetails: ScList[];
}

export interface ScList {
    id: number;
    chcId: number;
    chcName: string;
    phcId: number;
    phcName: string;
    hninId: string;
    scGovCode: string;
    scName: string;
    scAddress: string;
    pincode: string;
    isActive: string;
    comments: string;
    latitude: string;
    longitude: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddScDataresponse {
    status: string;
    message: string;
}
