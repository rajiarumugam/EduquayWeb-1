export interface PicknpackRequest {
    userId: number;
    collectionFrom: number;
}

export interface AnmAddShipmentRequest{
    barcodeNo: string;
    shipmentFrom?: number;
    anmId: number;
    riId: number;
    ilrId: number;
    avdId: number;
    avdContactNo: string;
    testingCHCId: number;
    dateOfShipment: string;
    timeOfShipment: string;
    createdBy: number;
    source: string
}



