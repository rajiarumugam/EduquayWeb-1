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
}

export interface SampleCollectionSubjectDetailResponse  {
    status: string;
    message: string;
    subjectDetail: subjectDetail[];
}
export interface subjectDetail {
      uniqueSubjectId: string,
      subjectName: string,
      rchId: string,
      reason: string
}