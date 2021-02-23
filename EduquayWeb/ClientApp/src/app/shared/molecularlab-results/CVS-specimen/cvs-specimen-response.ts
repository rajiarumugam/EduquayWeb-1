export interface CvsSpecimenResponse {
    status: string;
    message: string;
    subjects: updateSpecimenSamples[];
}

export interface updateSpecimenSamples {
    subjectName: string;
    uniqueSubjectId: string;
    rchId: string;
    foetusName: string;
    sampleRefId: string;
    cvsSampleRefId: string;
    pndtFoetusId: number;
    sampleDamaged: boolean;
}

export interface CvsSpecimenEditResponse {
    status: string;
    message: string;
    subjects: editSpecimenSamples[];
}

export interface editSpecimenSamples {
    subjectName: string;
    uniqueSubjectId: string;
    rchId: string;
    foetusName: string;
    sampleRefId: string;
    cvsSampleRefId: string;
    pndtFoetusId: number;
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

export interface CvsSpecimenConfirmResponse {
    status: string;
    message: string;
    subjects: confirmSpecimenSamples[];
}

export interface confirmSpecimenSamples {
    subjectName: string;
    uniqueSubjectId: string;
    rchId: string;
    foetusName: string;
    sampleRefId: string;
    cvsSampleRefId: string;
    pndtFoetusId: number;
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
