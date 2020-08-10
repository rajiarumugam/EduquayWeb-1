export interface ChcSamplePickpackResponse {
   status: string;
   message: string;
   pickandPack: SamplePickpack[];
   shipment: ShipmentID;
}

export interface SamplePickpack {
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    gestationalAge: string;
    startpickpackSelected: boolean;
    tempCHCData: tempCHCData[];
    //shipment: ShipmentID;
   
}

export interface tempCHCData{
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;

}
export interface startPickpack{
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    gestationalAge: string;
    startpickpackSelected: boolean;
    tempCHCData: tempCHCData[];
    //shipment: ShipmentID;
}

export interface chcsampleProviderNameResponse{
    status: string,
    message: string,
    logisticsProvider: logisticsProviderModel[];
}

export interface logisticsProviderModel{
    id: number;
    providerName: string;
}

export interface chcsampleCentrallabResponse{
    status: string,
    message: string,
    centalLab: centalLabModel[];
}

export interface centalLabModel{
    id: number;
    centralLabName: string;
}

export interface ChcSampleAddShipmentResponse{
    status: string;
    message: string;
    shipment: ShipmentID;
}

export class ShipmentID {
    shipmentId: string;
    errorMessage: string;
}

