export class AddScRequest {
    chcId: number;
    phcId: number;
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

export class AddScFilterRequest {
DistrictId:number;
ChcId:number;
PhcId: number;
}
