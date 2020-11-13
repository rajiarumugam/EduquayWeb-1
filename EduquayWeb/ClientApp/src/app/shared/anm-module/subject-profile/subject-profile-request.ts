export class SubjectProfileRequest {
    userId: number;
    fromDate: string;
    toDate: string;     
}

export class ParticularSubjectProfileRequest {
    userId: number;
    userInput: string;    
}



export class AddSubjectprofileRequest {
    subjectPrimaryRequest: subjectPrimaryRequest;
    subjectAddressRequest: subjectAddressRequest;
    subjectPregnancyRequest: subjectPregnancyRequest;
    subjectParentRequest: subjectParentRequest;    
}

export class subjectPrimaryRequest {
    subjectTypeId: number;
    childSubjectTypeId: number;
    uniqueSubjectId: string;
    districtId: number;
    chcId: number;
    phcId: number;
    scId: number;
    riId: number;
    subjectTitle: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    age: number;
    gender: string;
    maritalStatus: boolean;
    mobileNo: string;
    emailId: string;
    govIdTypeId: number;
    govIdDetail: string;
    spouseSubjectId: string;
    spouseFirstName: string;
    spouseMiddleName: string;
    spouseLastName: string;
    spouseContactNo: string;
    spouseGovIdTypeId: number;
    spouseGovIdDetail: string;
    assignANMId: number;
    dateOfRegister: string;
    registeredFrom: number;
    createdBy: number;
    source: string;
}

export class subjectAddressRequest {
    religionId: number;
    casteId: number;
    communityId: number;
    address1: string;
    address2: string;
    address3: string;
    pincode: string;
    stateName: string;
    updatedBy: number;
}

export class subjectPregnancyRequest {
    rchId: string;
    ecNumber: string;
    lmpDate: string;
    g: number;
    p: number;
    l: number;
    a: number;
    updatedBy: number;
}

export class subjectParentRequest {
    motherFirstName: string;
    motherMiddleName: string;
    motherLastName: string;
    motherGovIdTypeId: number;
    motherGovIdDetail: string;
    motherContactNo: string;
    fatherFirstName: string;
    fatherMiddleName: string;
    fatherLastName: string;
    fatherGovIdTypeId: number;
    fatherGovIdDetail: string;
    fatherContactNo: string;
    gaurdianFirstName: string;
    gaurdianMiddleName: string;
    gaurdianLastName: string;
    gaurdianGovIdTypeId: number;
    gaurdianGovIdDetail: string;
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
    rollNo: string;
    updatedBy: number;
}

export class anmSubjectTrackerRequest {
    uniqueSubjectId: string;
}

export class subjectTrackerRequest {
    uniqueSubjectId: string;
}



