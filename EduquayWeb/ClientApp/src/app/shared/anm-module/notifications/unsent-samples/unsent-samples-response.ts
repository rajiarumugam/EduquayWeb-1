export class UnsentSamplesResponse {

    status: string;
    message: string;
    sampleList: UnsentSampleList[];
}

export interface UnsentSampleList {
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    sampleSelected: boolean;
    //masterSelected:boolean;
}

export interface RiPointResponse {
    status: string;
    message: string;
    riDetails: RIModel[];
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
    avd: AvdNameModel[];
}

export interface AvdNameModel {
    id: number;
    avdName: string;
}

export interface AddUnsentSampleResponse {
    status: string;
    message: string;
    shipment: AddUnsentSample;
}

export interface AddUnsentSample {
    shipmentId: string,
    errorMessage: string
}

