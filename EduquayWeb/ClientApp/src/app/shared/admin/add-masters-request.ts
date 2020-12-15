export class AddMastersRequest {
}

export interface AddGvtIdTypeRequest{
    govIdTypeName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddUserTypeRequest{
    userTypeName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}
