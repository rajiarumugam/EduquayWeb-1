export interface HplcPosBloodsamplesResponse {
    status: string;
    message: string;
    subjects: updateBloodSamples[];
}

export interface updateBloodSamples {
    subjectName: string;
    uniqueSubjectId: string;
    subjectType: string;
    rchId: string;
    age: string;
    gender: string;
    dob: string;
    contactNo: string;
    ecNumber: string;
    lmpDate: string;
    ga: string;
    obstetricScore: string;
    barcodeNo: string;
    district: string;
    cbcResult: string;
    mcv: string;
    rdw: string;
    rbc: string;
    sstResult: string;
    hplcResult: string;
    hbA0: string;
    hbA2: string;
    hbC: string;
    hbD: string;
    hbF: string;
    hbS: string;
    hplcDiagnosis: string;
    sampleDamaged: boolean;
}

export interface HplcPosBloodsamplesEditResponse {
    status: string;
    message: string;
    subjects: editBloodSamples[];
}

export interface editBloodSamples {
    subjectName: string;
    uniqueSubjectId: string;
    subjectType: string;
    rchId: string;
    age: string;
    gender: string;
    dob: string;
    contactNo: string;
    ecNumber: string;
    lmpDate: string;
    ga: string;
    obstetricScore: string;
    barcodeNo: string;
    district: string;
    cbcResult: string;
    mcv: string;
    rdw: string;
    rbc: string;
    sstResult: string;
    hplcResult: string;
    hbA0: string;
    hbA2: string;
    hbC: string;
    hbD: string;
    hbF: string;
    hbS: string;
    hplcDiagnosis: string;
    sampleDamaged: true;
    sampleProcessed: true;
    zygosityId: number;
    mutation1Id: number;
    mutation2Id: number;
    mutation3: string;
    testResult: string;
    reasonForClose: string;
    testDate: string;
}

export interface HplcPosBloodsamplesConfirmedResponse {
    status: string;
    message: string;
    subjects: confirmedBloodSamples[];
}

export interface confirmedBloodSamples {
    subjectName: string;
    uniqueSubjectId: string;
    subjectType: string;
    rchId: string;
    age: string;
    gender: string;
    dob: string;
    contactNo: string;
    ecNumber: string;
    lmpDate: string;
    ga: string;
    obstetricScore: string;
    barcodeNo: string;
    district: string;
    cbcResult: string;
    mcv: string;
    rdw: string;
    rbc: string;
    sstResult: string;
    hplcResult: string;
    hbA0: string;
    hbA2: string;
    hbC: string;
    hbD: string;
    hbF: string;
    hbS: string;
    hplcDiagnosis: string;
    sampleDamaged: true;
    sampleProcessed: true;
    zygosityId: number;
    mutation1Id: number;
    mutation2Id: number;
    mutation3: string;
    testResult: string;
    reasonForClose: string;
    testDate: string
}
