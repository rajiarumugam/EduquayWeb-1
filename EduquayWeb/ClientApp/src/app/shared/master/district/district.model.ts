export class DistrictResponse {
    status: string;
    message: string;
    districts: District[];
}


export class District {
    id: number;
    stateId: string;
    stateName: string;
    district_gov_code: number;
    districtname: string;
    comments: string;
    isActive: boolean;
}