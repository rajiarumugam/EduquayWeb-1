export class AddAvdpointResponse {
    status: string;
    message: string;
    avdDetails: AvdList[];
}

export interface AvdList {
    id: number;
    contactNo: number;
    avdName: string;
    riId: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddAvdPtDataresponse {
    status: string;
    message: string;
}
