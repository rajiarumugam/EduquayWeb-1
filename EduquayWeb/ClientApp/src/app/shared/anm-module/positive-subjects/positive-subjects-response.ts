export interface PositiveSubjectsResponse {
    status: string;
    message: string;
    positiveSubjects: positiveSubjects[];
}

export interface positiveSubjects{

    id: number;
    subjectTypeId: number;
    childSubjectTypeId: number;
    uniqueSubjectId: string;
    subjectName: string;
    districtId: number;
    chcId: number;
    phcId: number;
    scId: number;
    riId: number;
    contactNo: string;
    gestationalAge: string;
    spouseFirstName: string;
    spouseMiddleName: string;
    spouseLastName: string;
    spouseContactNo: string;
    religionId: number;
    casteId: number;
    communityId: number;
    address1: string;
    address2: string;
    address3: string;
    pincode: string;
    stateName: string;
    rchId: string;
    ecNumber: string;
    notifiedStatus: boolean;
    registerSpouse: number;
    barcodeNo: string;
    hplcResult:string;

}

export interface UpdatePositiveSubjectsResponse{
    status: string;
    message: string;
    result: string;
}
