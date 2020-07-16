export interface ShipmentResponse {
    status: string;
    message: string;
    shipmentLogs: ShipmentList[];
}

export class ShipmentList {
    id: number;
    shipmentId: string;
    anmName: string;
    testingCHC: string;
    avdName: string;
    alternateAVD:string;
    alternateAVDContactNo:string;
    contactNo: string;
    ilrPoint: string;
    riPoint: string;
    shipmentDateTime: string;
    samplesDetail: SamplesDetail[];
}

export class SamplesDetail {
    shipmentId: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleCollectionDateTime: string;    
}
