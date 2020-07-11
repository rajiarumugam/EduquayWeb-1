export interface UnsentSamplesResponse {

    status: string;
    message: string;
    unsentSamplesDetail: UnsentSampleList[];
}

export interface UnsentSampleList {
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    sampleSelected: boolean;
    gestationalAge: string;
    sampleAging:  string;
    //masterSelected:boolean;
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

export interface MoveTimeoutExpiryResponse {
    status: string;
    message: string;
}

