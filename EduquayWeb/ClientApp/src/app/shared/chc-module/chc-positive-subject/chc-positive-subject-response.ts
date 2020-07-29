export interface ChcPositiveSubjectResponse {
    status: string;
    message: string;
    positiveSubjects: chcpositiveSubject[];
}
export interface chcpositiveSubject{
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
    spouseGovIdTypeId: number;
    spouseGovIdDetail: string;
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
    notifiedStatus: true;
    registerSpouse: number;
    barcodeNo: string;
    hplcResult: string;
}