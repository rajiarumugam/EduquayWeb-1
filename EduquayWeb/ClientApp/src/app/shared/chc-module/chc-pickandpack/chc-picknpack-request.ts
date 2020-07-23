export interface ChcPicknpackRequest {
    userId: number;
    collectionFrom: number;
}

export interface AddChcShipmentRequest{
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

export interface chcMoveTimeoutExpiryRequest {
    barcodeNo: string;
    anmId: number;
}


