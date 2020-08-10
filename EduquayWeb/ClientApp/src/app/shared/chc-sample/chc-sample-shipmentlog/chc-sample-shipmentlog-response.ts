export class ChcSampleShipmentlogResponse {
    status: string;
    message: string;
    shipmentLogs: ChcSampleShipmentList[];
}

export class ChcSampleShipmentList {
    id: number;
    shipmentId: string;
    labTechnicianName: string;
    testingCHC: string;
    receivingCentralLab: string;
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
    sampleCollectionDateTime: string;
}


