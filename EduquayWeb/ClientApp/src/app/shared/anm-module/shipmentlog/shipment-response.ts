export interface ShipmentResponse {
    status: string;
    message: string;
    shipmentList: ShipmentList[];
}

export interface ShipmentList {
    shipmentId: string;
    anmName: string;
    testingCHC: string;
    avdName: string;
    ilrPoint: string;
    shipmentDate: string;
    shipmentTime: string;
}
