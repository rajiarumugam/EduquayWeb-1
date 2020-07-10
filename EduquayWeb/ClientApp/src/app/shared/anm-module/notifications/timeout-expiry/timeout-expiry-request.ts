export interface TimeoutExpiryRequest {
    anmId: number;
    notification: number;
}

export interface AddtimeoutSampleRecollectionRequest{
    uniqueSubjectId: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    reason: string;
    collectionFrom: number;
    collectedBy: number;
}

export interface TimeoutUpdateStatusRequest{
    barcodeNo: string;
    anmId: number;
}