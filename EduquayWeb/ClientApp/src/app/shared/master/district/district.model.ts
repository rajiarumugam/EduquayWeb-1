export class DistrictResponse {
    status: string;
    message: string;
    districts: District[];
}


export class District {
    id: number;
    stateId: string;
    stateName: string;
    districtGovCode: number;
    districtName: string;
    comments: string;
    isActive: boolean;
}