
export interface SubjectProfileResponse {
 status: string;
 message: string;
 primaryDetail: PrimaryDetail[];
 addressDetail: AddressDetail[];
 pregnancyDetail: PregnancyDetail[];
 parentDetail: ParentDetail[];
}

export class PrimaryDetail{
    id: number;
    subjectTypeId: number;
    subjectType: string;
    childSubjectTypeId: number;
    childSubjectType: string;
    uniqueSubjectId: string;
    registeredFrom: string;
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
    maritalStatus: boolean;
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

export class AddressDetail{
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

export class PregnancyDetail{
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

export class ParentDetail{
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

export interface prePndtCounselling{
    uniqueSubjectId: string;
    date: string;
    time: string;
    counsellorName: string;
    counsellingStatus: string;
    counsellingNotes: string;
    agreedForPndt: string;
}

export interface pndtTesting{
    uniqueSubjectId: string;
    date: string;
    time: string;
    counsellorName: string;
    obstetritionName: string;
    clinicalHistory: string;
    examination: string;
    procedureOfTesting: string;
    pndtDiagnosis: string;
    pndtresults: string;
    pndtSideEffects: string;
}
export interface postPndtCounselling{
    uniqueSubjectId  : string;
    date  : string;
    time  : string;
    counsellorName  : string;
    counsellingStatus  : string;
    counsellingNotes  : string;
    agreedForMtp : string;
}

export interface mtpService {
    uniqueSubjectId : string;
    date : string;
    time : string;
    counsellorName : string;
    obstetritionName : string;
    clinicalHistory : string;
    examination : string;
    procedureOfTesting : string;
    conditionAtDischarge : string;
    sideEffects : string;
    }

export interface RetrieveSubjectProfileList{
    status: string;
    message:string;
    subjectsDetail: SubjectProfileList[];
}

export interface SubjectProfileList{
    primaryDetail: PrimaryDetail;
    addressDetail: AddressDetail;
    pregnancyDetail: PregnancyDetail;
    parentDetail: ParentDetail;
    prePndtCounselling: prePndtCounselling;
    pndtTesting: pndtTesting;
    postPndtCounselling: postPndtCounselling;
    mtpService: mtpService;

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

export interface AddSubjectProfileResponse{
    status: boolean;
    message: string;
    uniqueSubjectId: string;
}

export interface trackingANWSubjectResponse{
    status: string;
    message: string;
    data: ANMSubject;
}

export interface ANMSubject{

    subjectName: string;
    spouseName: string;
    age: string;
    ga: string;
    gender: string;
    lmpDate: string;
    childSubjectTypeId: number;	
    subjectId: string;
    spouseSubjectId: string;
    dateofRegistration: string;
    samplingStatus: boolean;
    barcodeNo: string;
    sampleCollectionDateTime: string;
    shipmentToTestingCHCStatus: boolean;
    shipmentID: string;
    shipmentToTestingCHCDateTime: string;
    receivedAtTestingCHCStatus: boolean;
    receivedAtTestingCHCDateTime: string;
    cbcStatus: boolean;
    cbcResult: string;
    cbcDateTime: string;
    sstStatus: boolean;
    sstResult: string;
    sstDateTime: string;
    shipmentToCentralLabStatus: boolean;
    chcShipmentID: string;
    chcShipmentDateTime: string;
    receivedAtCentralLabStatus: boolean;
    receivedAtCentralLabDateTime: string;
    hplcTestStatus: boolean;
    hplcTestedDateTime: string;
    hplcPathoTestStatus: boolean;
    hplcResult: string;
    hplcDiagnosisDateTime: string;
    prePNDTCounsellingStatus: boolean;
    prePNDTCounsellingDateTime: string;
    pndTestStatus: boolean;
    pndtStatus: string;
    pndtDateTime: string;
    postPNDTCounsellingStatus: boolean;
    postPNDTCounsellingDateTime: string;
    mtpStatus: boolean;
    mtpDateTime: string;
}

export interface trackingSubjectResponse{
    status: string;
    message: string;
    data: SubjectTrack;
}

export interface SubjectTrack{
    subjectId: string;
    spouseSubjectId: string;
    dateofRegistration: string;
    samplingStatus: boolean;
    barcodeNo: string;
    sampleCollectionDateTime: string;
    shipmentToTestingCHCStatus: boolean;
    shipmentID: string;
    shipmentToTestingCHCDateTime: string;
    receivedAtTestingCHCStatus: boolean;
    receivedAtTestingCHCDateTime: string;
    cbcStatus: boolean;
    cbcResult: string;
    cbcDateTime: string;
    sstStatus: boolean;
    sstResult: string;
    sstDateTime: string;
    shipmentToCentralLabStatus: boolean;
    chcShipmentID: string;
    chcShipmentDateTime: string;
    receivedAtCentralLabStatus: boolean;
    receivedAtCentralLabDateTime: string;
    hplcTestStatus: boolean;
    hplcTestedDateTime: string;
    hplcPathoTestStatus: boolean;
    hplcResult: string;
    hplcDiagnosisDateTime: string;
}

