export interface AddHPLCResponse {
    status: string;
    message: string;
    HPLCs:HPLCList[];
}

export interface HPLCList {
    id: number;
    districtId: string;
    districtName: string;
    HPLCCode: string;
    HPLCName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddHPLCDataresponse {
    status: string;
    message: string;
}
