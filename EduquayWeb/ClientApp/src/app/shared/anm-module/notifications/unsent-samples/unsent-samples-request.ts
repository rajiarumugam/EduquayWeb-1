export interface MoveTimeoutExpiryRequest {
    barcodeNo: string;
    anmId: number;
}

export interface AddUnsentSampleRequest{
    barcodeNo: string;
    shipmentFrom: number;
    anmId: number;
    riId: number;
    ilrId: number;
    avdId: number;
    avdContactNo: string;
    alternateAVD: string;
    alternateAVDContactNo: string;
    testingCHCId: number;
    dateOfShipment: string;
    timeOfShipment: string;
    createdBy: number;
    source: string
}




