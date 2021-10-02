export class AddIlrpointResponse {
    status: string;
    message: string;
    ilrDetails: IlrList[];
}

export interface IlrList {
    id: number;
    chcId: number;
    chcName: string;
    ilrCode: string;
    ilrPoint: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddIlrPtDataresponse {
    status: string;
    message: string;
}
