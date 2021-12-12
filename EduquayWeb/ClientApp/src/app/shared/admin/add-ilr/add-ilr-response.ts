export class AddIlrResponse {
        status: string;
        message: string;
        data: IlrList[];
    }
    

    
    export interface IlrList {
    id: number;
    districtId: number;
    districtName: string;
    chcId: number;
    chcName: string;
    ilrCode: string;
    name: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    }
    
    export interface AddIlrDataresponse {
        status: string;
        message: string;
    }
    
