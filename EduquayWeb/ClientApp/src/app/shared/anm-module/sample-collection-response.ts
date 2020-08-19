export interface SampleCollectionResponse  {
    status: string;
    message: string;
    subjectList: SubjuctList[];
}

export interface SampleCollectionPostResponse  {
    status: string;
    message: string;
    result: string;
}


export interface SubjuctList {
    id: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    subjectTypeID: number;
    subjectType: string;
    spouseName: string;
    dateOfRegister: string;
    contactNo: string;
    gestationalAge: string;
    sampleType: string;
    reason: string;
    oldSampleCollectionDate: string;
    date: Date;
    diffDays: number;
}

export interface subjectTypesResponse{
    status: string;
    message: string;
    subjectTypes: subjuctType[];
}

export interface subjuctType{
     id: number;
     subjectTypeName: string;
     comments: string;

}


