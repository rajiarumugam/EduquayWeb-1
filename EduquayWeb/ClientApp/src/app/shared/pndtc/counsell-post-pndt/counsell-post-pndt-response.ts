export interface CounsellPostPndtResponse {
    status: string;
    message: string;
    data: PostCounsellingList[]; 
}

export interface PostCounsellingList {
    anwSubjectId: string;
    subjectName: string;
    spouseSubjectId: string;
    spouseName: string;
    rchId: string;
    contactNo: string;
    age: number;
    ecNumber: string;
    ga: number;
    obstetricScore: string;
    lmpDate: string;
    anwCBCTestResult: string;
    anwSSTestResult: string;
    anwHPLCTestResult: string;
    spouseCBCTestResult: string;
    spouseSSTestResult: string;
    spouseHPLCTestResult: string;
    prePNDTCounsellingDateTime: string;
    prePNDTCounsellorName: string;
    prePNDTCounsellingRemarks: string;
    prePNDTCounsellingStatus: string;
    schedulePrePNDTDate: string;
    schedulePrePNDTTime: string;
    pndtDateTime: string;
    pndtObstetrician: string;
    pndtResults: string;
    foetalDisease: boolean;
    pndtCounsellorName: string;
    pndtDiagnosis: string;
    poatPNDTCounsellorName: string;
    postPNDTCounsellingDateTime: string;
    postPNDTCounsellorId: number;
    postPNDTSchedulingId: number;
    anwMCV: string;
    anwRDW: string;
    anwRBC: string;
    anwHbA0: string;
    anwHbA2: string;
    anwHbF: string;
    anwHbS: string;
    anwHbD: string;
    spouseMCV: string;
    spouseRDW: string;
    spouseRBC: string;
    spouseHbA0: string;
    spouseHbA2: string;
    spouseHbF: string;
    spouseHbS: string;
    spouseHbD: string;
}

export interface AddPostPndtcCounsellingResponse{
    status: string;
    message: string;
    data: ScheduledPostPndtDateTime;
}

export interface ScheduledPostPndtDateTime{
    scheduleMTPDate: string;
    scheduleMTPTime: string;
}

export interface CounselledpostpndtResponse {
    status: string;
    message: string;
    data: PostCounselledList[]; 
}

export interface PostCounselledList {
    anwSubjectId: string;
    subjectName: string;
    spouseSubjectId: string;
    spouseName: string;
    rchId: string;
    contactNo: string;
    age: number;
    ecNumber: string;
    ga: number;
    obstetricScore: string;
    lmpDate: string;
    anwCBCTestResult: string;
    anwSSTestResult: string;
    anwHPLCTestResult: string;
    spouseCBCTestResult: string;
    spouseSSTestResult: string;
    spouseHPLCTestResult: string;
    prePNDTCounsellingDateTime: string;
    prePNDTCounsellorName: string;
    prePNDTCounsellingRemarks: string;
    prePNDTCounsellingStatus: string;
    schedulePrePNDTDate: string;
    schedulePrePNDTTime: string;
    pndtDateTime: string;
    pndtObstetrician: string;
    pndtResults: string;
    foetalDisease: boolean;
    pndtCounsellorName: string;
    pndtDiagnosis: string;
    postPNDTCounsellingDateTime: string;
    postPNDTCounsellorId: number;
    postPNDTCounsellorName: string;
    postPNDTSchedulingId: number;
    postPNDTCounsellingId: number;
    postPNDTObstetricianId: number;
    mtpScheduleDate: string;
    mtpScheduleTime: string;
    postPNDTCounsellingRemarks: string;
    fileName: string;
    fileLocation: string;
    isMTPAgreeYes: boolean;
    isMTPAgreeNo: boolean;
    isMTPAgreePending: boolean;
    anwMCV: string;
    anwRDW: string;
    anwRBC: string;
    anwHbA0: string;
    anwHbA2: string;
    anwHbF: string;
    anwHbS: string;
    anwHbD: string;
    spouseMCV: string;
    spouseRDW: string;
    spouseRBC: string;
    spouseHbA0: string;
    spouseHbA2: string;
    spouseHbF: string;
    spouseHbS: string;
    spouseHbD: string;
}

export interface postPndtFileUploadResponse{
    status: string;
    message: string;
    data: PostFileDetails;
}

export interface PostFileDetails{
   fileName: string;
   fileLocation: string;
}


