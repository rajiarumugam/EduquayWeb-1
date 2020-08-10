// export class ChcSamplePickpackRequest {
// }

export interface ChcSampleAddShipmentRequest{
    barcodeNo: string;
    labTechnicianName: string;
    chcUserId: number;
    testingCHCId: number;
    receivingCentralLabId: number;
    logisticsProviderId: number;
    deliveryExecutiveName: string;
    executiveContactNo: string;
    dateOfShipment: string;
    timeOfShipment: string;
    createdBy: number;
    source: string;
   
}
