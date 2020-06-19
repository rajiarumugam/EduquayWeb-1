export interface SampleCollectionResponse  {
    status: string;
    message: string;
    subjectList: SubjuctList[];
}

export interface SubjuctList {
    id: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    subjectTypeID: number;
    subjectType: string;
    spouseName: string;
    dateofRegister: string;
    contactNo: string;
    gestationalAge: string;
    sampleType: string;
}