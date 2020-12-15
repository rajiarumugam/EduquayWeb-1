export class AddPhcResponse {
        status: string;
        message: string;
        phcDetails: PhcList[];
    }
    
    export interface PhcList {
        id: number;
        chcId: number;
        chcName: string;
        hninId: string;
        phcGovCode: string;
        phcName: string;
        pincode: string;
        isActive: string;
        comments: string;
        latitude: string;
        longitude: string;
        createdBy: number;
        updatedBy: number
    }
    
    export interface AddPhcDataresponse {
        status: string;
        message: string;
    }
    
