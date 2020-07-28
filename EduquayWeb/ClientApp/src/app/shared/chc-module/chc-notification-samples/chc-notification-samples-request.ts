export interface ChcNotificationSamplesRequest {
    userId: number;
    collectionFrom: number;
    notification: number;
}

export interface AddChcSampleRecollectionRequest{
    uniqueSubjectId: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    reason: string;
    collectionFrom: number;
    collectedBy: number;
}
