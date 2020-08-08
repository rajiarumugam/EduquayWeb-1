export interface PicknpackResponse {
    status: string;
    message: string;
    sampleList: SampleList[];
}

export interface SampleList {
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    sampleSelected: boolean;
    sampleAging: string;
}

export interface RiPointResponse {
    status: string;
    message: string;
    ri: RIModel[];
}

export interface RIModel {
    id: number;
    riSite: string;
}

export interface ILRpointResponse {
    status: string;
    message: string;
    ilr: IlrModel[];
}

export interface IlrModel {
    id: number;
    ilrPoint: string;
}

export interface TestingCHCResponse {
    status: string;
    message: string;
    testingCHC: TestingChcModel[];
}

export interface TestingChcModel {
    id: number;
    chcName: string;
}

export interface AvdNameResponse {
    status: string;
    message: string;
    avd: AvdNameModel;
}

export class AvdNameModel {
    id: number;
    avdName: string;
    contactNo: string;
}

export interface AnmAddShipmentResponse {
    status: string;
    message: string;
    shipment: Shipment;
}

export interface Shipment {
    shipmentId: string,
    errorMessage: string
}

export interface PickpackMoveTimeoutExpiryResponse {
    status: string;
    message: string;
}
