export interface ChcSamplePickpackResponse {
   status: string;
   message: string;
   pickandPack: SamplePickpack[];
}

export interface SamplePickpack {
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
    gestationalAge: string;
    tempCHCData: tempCHCData[];
}

export interface tempCHCData{
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
}

