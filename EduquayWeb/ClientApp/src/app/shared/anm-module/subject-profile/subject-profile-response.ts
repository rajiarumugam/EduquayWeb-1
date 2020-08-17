
export interface SubjectProfileResponse {
 status: string;
 message: string;
 primaryDetail: PrimaryDetail[];
 addressDetail: AddressDetail[];
 pregnancyDetail: PregnancyDetail[];
 parentDetail: ParentDetail[];
}

export interface PrimaryDetail{
    id: number;
    subjectTypeId: number;
    subjectType: string;
    childSubjectTypeId: number;
    childSubjectType: string;
    uniqueSubjectId: string;
    districtId: number;
    districtName: string;
    chcId: number;
    chcName: string;
    phcId: number;
    phcName: string;
    scId: number;
    scName: string;
    riId: number;
    riSite: string;
    subjectTitle: string;
    firstName: string;
    middleName: string;
    lastName: string;
    subjectName: string;
    dob: string;
    age: number;
    gender: string;
    maritalStatus: string;
    mobileNo: string;
    emailId: string;
    dateOfRegister: string;
    spouseSubjectId: string;
    spouseFirstName: string;
    spouseMiddleName: string;
    spouseLastName: string;
    spouseContactNo: string;
    govIdTypeId: number;
    govIdType: string;
    govIdDetail: string;
    assignANMId: number;
    anmName: string;
    isActive: true;
    cbcTestResult: string;
    ssTestResult: string;
    hplcTestResult: string;
}

export interface AddressDetail{
    id: number;
    subjectId: number;
    uniqueSubjectId: string;
    religionId: number;
    religionName: string;
    casteId: number;
    casteName: string;
    communityId: number;
    communityName: string;
    address1: string;
    address2: string;
    address3: string;
    pincode: string;
    stateName: string;
    selectedreligion: string;
}

export interface PregnancyDetail{
    id: number;
    subjectId: number;
    uniqueSubjectId: string;
    rchId: string;
    ecNumber: string;
    lmpDate: string;
    gestationalperiod: number;
    g: number;
    p: number;
    l: number;
    a: number;
    barcodes: string;
}

export interface ParentDetail{
    id: number;
    subjectId: number;
    uniqueSubjectId: string;
    motherFirstName: string;
    motherMiddleName: string;
    motherLastName: string;
    motherContactNo: string;
    fatherFirstName: string;
    fatherMiddleName: string;
    fatherLastName: string;
    fatherContactNo: string;
    gaurdianFirstName: string;
    gaurdianMiddleName: string;
    gaurdianLastName: string;
    gaurdianContactNo: string;
    rbskId: string;
    schoolName: string;
    schoolAddress1: string;
    schoolAddress2: string;
    schoolAddress3: string;
    schoolPincode: string;
    schoolCity: string;
    schoolState: string;
    standard: string;
    section: string;
    rollNo: string   
}

export interface ReligionResponse{
    status: string;
    message: string;
    religion: Religion[];
}

export interface Religion{
    id: number;
    religionName: string;
}

export interface GovtIDTypeResponse{
    status: string;
    message: string;
    govIdType: GovIdType[];
}

export interface GovIdType{
    id: number;
    govIdTypeName: string;
}

export interface CasteResponse{
    status: string;
    message: string;
    caste: CasteList[];
}

export interface CasteList{
    id: number;
    casteName: string;
}

export interface CommunityeResponse{
    status: string;
    message: string;
    community: CommunityList[];
}

export interface CommunityList{
    id: number;
    communityName: string;
}