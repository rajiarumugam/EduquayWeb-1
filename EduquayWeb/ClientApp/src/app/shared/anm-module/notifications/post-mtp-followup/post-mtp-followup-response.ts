export interface PostMtpFollowupResponse {
    status: string;
    message: string;
    subjects: anmPostMTP[];
}

export interface anmPostMTP {
    mtpId: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    contactNo: string;
    mtpDateTime: string;
    obstetricianName: string;
    firstFollowUp: number;
    secondFollowUp: number;
    thirdFollowUp: number;   
}

export interface UpdatePostMtpFollowupResponse {
    status: string;
    message: string;
    result: string;   
}


