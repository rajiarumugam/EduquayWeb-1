export interface ChcNotificationSamplesResponse {
    status: string;
    message: string;
    sampleList: ChcNotifiedSampleList[];
}

export interface ChcNotifiedSampleList {
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
    sampleCollectionDateTime: string; 
   
}

export interface AddChcSampleRecollectionResponse{
    status: string;
    message: string;
    result: string;
}

