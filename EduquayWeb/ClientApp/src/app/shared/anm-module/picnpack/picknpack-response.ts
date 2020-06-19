export interface PicknpackResponse {
    status: string;
    message: string;
    sampleList: SampleList[];
}

export interface SampleList{
    subjectId: number;
    uniqueSubjectId: string;
    sampleCollectionId: number;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleDateTime: string;
}
