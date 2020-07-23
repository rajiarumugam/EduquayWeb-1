export class ChcShipmentlogResponse {
    status: string;
    message: string;
    shipmentLogs: ChcShipmentList[];
}

export class ChcShipmentList {
    id: number;
    shipmentId: string;
    collectionCHCName: string;
    chcLabTechnicianName: string;
    testingCHC: string;
    logisticsProviderName: string;
    deliveryExecutiveName: string;
    contactNo: string;
    shipmentDateTime: string;
    samplesDetail: ChcSamplesDetail[];
}

export class ChcSamplesDetail {
    shipmentId: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    associatedANM: string;
    sampleCollectionDateTime: string;
}


