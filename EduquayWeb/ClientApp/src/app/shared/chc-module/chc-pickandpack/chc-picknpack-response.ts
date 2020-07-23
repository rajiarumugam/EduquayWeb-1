export interface ChcPicknpackResponse {
    status: string;
    message: string;
    sampleList: ChcSampleList[];
}

export interface ChcSampleList {
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    sampleSelected: boolean;
    sampleAging: string;
}

export interface ChcResponse {
    status: string;
    message: string;
    chc: ChcModel[];
}

export interface ChcModel {
    id: number;
    chcName: string;
}

export interface ProviderNameResponse{
    status: string,
    message: string,
    logisticsProvider: logisticsProviderModel[];
}

export interface logisticsProviderModel{
    id: number;
    providerName: string;
}

export interface AddChcShipmentResponse{
    status: string;
    message: string;
    shipment: ShipmentID;
}

export interface ShipmentID {
    shipmentId: string;
    errorMessage: string;
}

export interface chcMoveTimeoutExpiryResponse {
    status: string;
    message: string;
}

