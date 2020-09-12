export class PndtMtpReferralResponse {
    
}
export class AnmPndtReferralResponse {
    status: string;
    message: string;
    samples: anmpndtReferral[];
}

export interface anmpndtReferral {
    anmName: string;
    anmContactNo: string;
    anwSubjectId: string;
    anwSubjectName: string;
    rchId: string;
    anwBarcodes: string;
    anwContactNo: string;
    anwAge: string;
    ecNumber: string;
    anwGender: string;
    address: string;
    gestationalAge: string;
    lmpDate: string;
    gpla: string;
    anwDOB: string;
    anwDistrictName: string;
    anwCHCName: string;
    anwPHCName: string;
    anwSCName: string;
    anwRIPoint: string;
    anwReligion: string;
    anwCaste: string;
    anwCommunity: string;
    spouseSubjectId: string;
    spouseSubjectName: string;
    spouseBarcodes: string;
    spouseContactNo: string;
    spouseAge: string;
    spouseGender: string;
    spouseDOB: string;
    spouseDistrictName: string;
    spouseCHCName: string;
    spousePHCName: string;
    spouseSCName: string;
    spouseRIPoint: string;
    spouseReligion: string;
    spouseCaste: string;
    spouseCommunity: string;
    anwCBCTestResult: string;
    anwSSTestResult: string;
    anwHPLCTestResult: string;
    spouseCBCTestResult: string;
    spouseSSTestResult: string;
    spouseHPLCTestResult: string;
    prePNDTCounsellingDate: string;
    pndtDate: string;
    pndtReferalId: number;
    followUpStatus: string;
}

export class AnmMtpReferralResponse {
    status: string;
    message: string;
    samples: anmmtpReferral[];
}

export interface anmmtpReferral {
    anmName: string;
    anmContactNo: string;
    anwSubjectId: string;
    anwSubjectName: string;
    rchId: string;
    anwBarcodes: string;
    anwContactNo: string;
    anwAge: string;
    ecNumber: string;
    anwGender: string;
    address: string;
    gestationalAge: string;
    lmpDate: string;
    gpla: string;
    anwDOB: string;
    anwDistrictName: string;
    anwCHCName: string;
    anwPHCName: string;
    anwSCName: string;
    anwRIPoint: string;
    anwReligion: string;
    anwCaste: string;
    anwCommunity: string;
    spouseSubjectId: string;
    spouseSubjectName: string;
    spouseBarcodes: string;
    spouseContactNo: string;
    spouseAge: string;
    spouseGender: string;
    spouseDOB: string;
    spouseDistrictName: string;
    spouseCHCName: string;
    spousePHCName: string;
    spouseSCName: string;
    spouseRIPoint: string;
    spouseReligion: string;
    spouseCaste: string;
    spouseCommunity: string;
    anwCBCTestResult: string;
    anwSSTestResult: string;
    anwHPLCTestResult: string;
    spouseCBCTestResult: string;
    spouseSSTestResult: string;
    spouseHPLCTestResult: string;
    pndtCounsellorName: string;
    pndtCounsellingRemarks: string;
    pndtCounsellingStatus: string;
    schedulePNDTDate: string;
    schedulePNDTTime: string;
    pndtDateTime: string;
    pndtObstetricianName: string;
    clinicalHistory: string;
    examination: string;
    pndtDiagnosisName: string;
    pndtResults: string;
    pndtProcedureOfTesting: string;
    pndtSideEffects: string;
    postPNDTCounsellingDate: string;
    mtpDate: string;
    mtpReferalId: number;
    followUpStatus: string
}

export interface AnmUpdatePndtMtpReferralResponse{
    status: string;
    message: string;
    result: string;
}
