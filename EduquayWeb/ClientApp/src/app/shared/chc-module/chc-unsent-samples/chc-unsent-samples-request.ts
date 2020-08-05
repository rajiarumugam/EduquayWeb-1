export interface ChcUnsentSamplesRequest {
    userId: number;
    collectionFrom: number;
    notification: number;
}

export interface AddChcUnsentsamplesRequest{
    barcodeNo: string;
    shipmentFrom: number;
    chcUserId: number;
    collectionCHCId: number;
    logisticsProviderId: number;
    deliveryExecutiveName: string;
    executiveContactNo: string;
    testingCHCId: number;
    dateOfShipment: string;
    timeOfShipment: string;
    createdBy: number;
    source: string;
}

export interface unsentMoveTimeoutExpiryRequest {
    barcodeNo: string;
    userId: number;
}



