export class AddDistrictResponse {
    status: string;
    message: string;
    districts: DistrictList[];
}

export interface DistrictList {
    id: number;
    stateId: string;
    stateName: string;
    districtGovCode: string;
    districtName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddDistrictDataresponse {
    string;
}

