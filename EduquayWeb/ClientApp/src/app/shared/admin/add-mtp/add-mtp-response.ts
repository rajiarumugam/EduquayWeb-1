export interface AddMTPResponse {
    status: string;
    message: string;
    MTPs:MTPList[];
}

export interface MTPList {
    id: number;
    districtId: string;
    districtName: string;
    mtpCode: string;
    mtpName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddMTPDataresponse {
    status: string;
    message: string;
}
