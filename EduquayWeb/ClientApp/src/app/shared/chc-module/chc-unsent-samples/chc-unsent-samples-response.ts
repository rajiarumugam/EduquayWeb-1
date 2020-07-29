export interface ChcUnsentSamplesResponse {
    status: string;
    message: string;
    unsentSamplesDetail: ChcUnsentSampleList[];
}

export interface ChcUnsentSampleList {
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

export interface ChcUnsentResponse {
    status: string;
    message: string;
    chc: ChcModel[];
}

export interface ChcModel {
    id: number;
    chcName: string;
}

export interface UnsentProviderNameResponse{
    status: string,
    message: string,
    logisticsProvider: logisticsProviderModel[];
}

export interface logisticsProviderModel{
    id: number;
    providerName: string;
}

export interface UnsentTestingChcResponse {
    status: string;
    message: string;
    testingCHC: ChcTestingModel[];
}

export interface ChcTestingModel{
    id: string;
    chcName: string;
}

export interface AddChcUnsentSampleResponse {
    status: string;
    message: string;
    shipment: AddChcUnsentSample;
}

export interface AddChcUnsentSample {
    shipmentId: string,
    errorMessage: string
}

export interface ChcUnsentMoveTimeoutExpiryResponse {
    status: string;
    message: string;
}
