export class AddPNDTResponse {
    status: string;
    message: string;
    data: PndtList[];
}

export interface PndtList {
    id: number;
    
    pndtCode: string;
    pndtlocationName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;

}

export interface AddPNDTDataresponse {
    string;
}

