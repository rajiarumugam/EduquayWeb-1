export interface DcNotificationResponse {
    status: string;
    message: string;
    samples: dcSamplesList[];
}

export interface dcSamplesList {

    sampleCollectionId: number;
    subjectId: string;
    subjectName: string;
    anmName: string;
    anmContactNo: string;
    subjectType: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    gender: string;
    gestationalAge: string;
    districtName: string;
    chcName: string;
    phcName: string;
    scName: string;
    riPoint: string;
    age: string;
    dob: string;
    religion: string;
    caste: string;
    community: string;
    contactNo: string;
    rchId: string;
    ecNumber: string;
    address: string;
    lmpDate: string;
    gpla: string;
    followUpStatus: string;

}

export interface dcUpdateSamples{
    status: string;
    message: string;
    result: string;
}

export interface dcPositiveSubjectsResponse {
    status: string;
    message: string;
    samples: dcPositiveSubjectsList[];
}

export interface dcPositiveSubjectsList {

    sampleCollectionId: number;
    subjectId: string;
    subjectName: string;
    anmName: string;
    anmContactNo: string;
    subjectType: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    gender: string;
    gestationalAge: string;
    districtName: string;
    chcName: string;
    phcName: string;
    scName: string;
    riPoint: string;
    age: string;
    dob: string;
    religion: string;
    caste: string;
    community: string;
    contactNo: string;
    rchId: string;
    ecNumber: string;
    address: string;
    lmpDate: string;
    gpla: string;
    followUpStatus: string;
    cbcTestResult: string;
    ssTestResult: string;
    hplcTestResult: string;
}

export interface dcpndtReferralResponse {
    status: string;
    message: string;
    samples: dcpndtReferral[];
}

export interface dcpndtReferral {
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

export interface dcmtpReferralResponse {
    status: string;
    message: string;
    samples: dcmtpReferral[];
}

export interface dcmtpReferral {
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
    followUpStatus: string;
}


export interface DcUpdatePndtMtpReferralResponse{
    status: string;
    message: string;
    result: string;
}
