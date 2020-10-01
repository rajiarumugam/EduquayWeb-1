export interface CounsellPrePndtResponse {
    status: string;
    message: string;
    data: CounsellingList[]; 
}

export interface CounsellingList {
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
    counsellorId: number;
    counsellorName: string;
    counsellingDateTime: string;
    schedulingId: number;
    anwCBCTestResult: string;
    anwSSTestResult: string;
    anwHPLCTestResult: string;
    spouseCBCTestResult: string;
    spouseSSTestResult: string;
    spouseHPLCTestResult: string;
}

export interface CounselledprepndtResponse {
    status: string;
    message: string;
    data: CounselledList[]; 
}

export interface CounselledList {
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
    prePNDTCounsellingId: number;
    schedulingId: number;
    counsellorId: number;
    counsellorName: string;
    obstetricianId: number;
    obstetricianName: string;
    schedulePNDTDate: string;
    schedulePNDTTime: string;
    counsellingRemarks: string;
    counsellingDateTime: string;
    fileName: string;
    fileLocation: string;
    isPNDTAgreeYes: boolean;
    isPNDTAgreeNo: boolean;
    isPNDTAgreePending: boolean;
    confirmationSelected: boolean;
}

export interface AddPrePndtcCounsellingResponse{
    status: string;
    message: string;
    data: ScheduledPndtDateTime;
}

export interface ScheduledPndtDateTime{
    schedulePNDTDate: string;
    schedulePNDTTime: string;
}

export interface prePndtFileUploadResponse{
    status: string;
    message: string;
    data: FileDetails;
}

export interface FileDetails{
   fileName: string;
   fileLocation: string;
}


