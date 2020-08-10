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
    startpickpackSelected: boolean;
    tempCHCData: tempCHCData[];
    startPickpack: startPickpack[];
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
}

