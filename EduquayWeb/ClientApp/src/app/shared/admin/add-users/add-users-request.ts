export class AddUsersRequest {
    id: number;
    userTypeId: number;
    userType: string;
    userRoleId: number;
    userRole: string;
    userRoleDescription: string;
    userRoleAccessModule: string;
    userGovCode: string;
    userName: string;
    stateId: number;
    centralLabId: number;
    centralLabName: string;
    molecularLabId: number;
    molecularLabName: string;
    districtId: number;
    districtName: string;
    blockId: number;
    blockName: string;
    chcId: number;
    chcName: string;
    phcId: number;
    phcName: string;
    scId: number;
    scName: string;
    riId: string;
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    registeredFrom: number;
    sampleCollectionFrom: number;
    shipmentFrom: number;
    pndtLocationId: number;
    comments: string;
    isActive:string;
}

export class AddUsersFilterRequest {
    userTypeId :number;
    DistrictId :number;
    BlockId: number;
    ChcId :number;
    PhcId :number;
    ScId : number;
}
