export interface DamagedSamplesResponse {
    status: string;
    message: string;
    sampleList: DamagedSampleList[];
}

export interface DamagedSampleList {
    sampleCollectionId: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchID: string;
    barcodeNo: string;
    contactNo: string;
    gestationalAge: string;
    notifiedStatus: string;
    sampleType: string;
    reason: string;    
   
}

export interface AddSampleRecollectionResponse{
    status: string;
    message: string;
    result: string;
}

export interface DamagedUpdateStatusResponse{
    status: string;
    message: string;
    result: string;
}