export interface SampleCollectionResponse  {
    status: string;
    message: string;
    subjectList: SubjuctList[];
}

export interface SubjuctList {
    id: number;
    uniqueSubjectID: string;
    subjectName: string;
    subjectTypeID: number;
    subjectType: string;
    dateofRegister: string;
    contactNo: string;
    gestationalAge: string;
}