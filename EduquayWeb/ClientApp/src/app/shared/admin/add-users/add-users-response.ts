export class AddUsersResponse {
    status: string;
    message: string;
    users: UsersList[];
}

export interface UserroleResponse {
    status: string;
    message: string;
    userRoles: Userrolelist[];
}
export interface Userrolelist {
    id: number;
    userTypeId: string;
    userTypeName: string;
    userRoleName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface UsersList {
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
    comments:string;
    isActive:string;
}

export interface AddUsersDataresponse {
    status: string;
    message: string;
    users: UsersList[];

}
