export interface SampleCollectionRequest {
    userId?: number;
    fromDate: string;
    toDate: string;
    subjectType: number;
    registeredFrom?: number;
}

export interface SampleCollectionDateTimeRequest{

    uniqueSubjectId: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    reason: string;
    collectionFrom: number;
    collectedBy?: number;
}








