export class AddUserroleResponse {
    status: string;
    message: string;
    userRoles: UserroleList[];
}


export interface UserroleList {
    id: number;
    userTypeId: number;
    userTypeName: string;
    userRoleName: string;
    isActive: string,  
    comments: string;
    createdBy: number;
    updatedBy: number
}

export interface AddUserroleDataresponse {
    status: string;
    message: string;
   
}

