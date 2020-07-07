export interface TimeoutExpiryResponse {
    status: string;
    message: string;
    sampleList: TimeoutSampleList[];
}

export interface TimeoutSampleList {
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

export interface AddtimeoutSampleRecollectionResponse{
    status: string;
    message: string;
    result: string;
}
