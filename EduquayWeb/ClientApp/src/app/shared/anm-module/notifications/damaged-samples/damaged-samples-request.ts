export interface DamagedSamplesRequest {
    anmId: number;
    notification: number;
}

export interface AddSampleRecollectionRequest{
    uniqueSubjectId: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    reason: string;
    collectionFrom: number;
    collectedBy: number;
}

export interface DamagedUpdateStatusRequest{
    barcodeNo: string;
    anmId: number;
}

