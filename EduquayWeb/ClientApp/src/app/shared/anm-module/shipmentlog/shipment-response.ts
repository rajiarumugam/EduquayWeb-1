export interface ShipmentResponse {
    status: string;
    message: string;
    shipmentLogs: ShipmentList[];
}

export interface ShipmentList {
    id: number;
    shipmentId: string;
    anmName: string;
    testingCHC: string;
    avdName: string;
    contactNo: string;
    ilrPoint: string;
    riPoint: string;
    shipmentDateTime: string;
    samplesDetail: SamplesDetail[];
}

export interface SamplesDetail {
    shipmentId: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleCollectionDateTime: string;    
}
