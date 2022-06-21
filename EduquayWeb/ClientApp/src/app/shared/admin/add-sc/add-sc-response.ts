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

export class AddSCbyANMResponse {
    status: string;
    message: string;
    scbyanmDetails: ScbyAnmList[];
}
export interface ScbyAnmList {
    id: number;
    name: string;
}

export interface AddScDataresponse {
    status: string;
    message: string;
}
