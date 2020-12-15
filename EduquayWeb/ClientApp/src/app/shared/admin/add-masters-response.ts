export class AddMastersResponse {
}

export interface RetrieveGvtIdTypeResponse{
    status: string;
    message: string;
    govIDTypes: GvtIdTypes[];
}

export interface GvtIdTypes{
    id: number;
    govIdTypeName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddGvtIdTypeResponse{
    status: string;
    message: string;
}

export interface RetrieveUserTypeResponse{
    status: string;
    message: string;
    userTypes: UserTypes[];
}

export interface UserTypes{
    id: number;
    userTypeName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddUserTypeResponse{
    status: string;
    message: string;
}
