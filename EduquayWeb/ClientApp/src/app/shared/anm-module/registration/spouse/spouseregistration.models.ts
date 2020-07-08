export interface PositiveSpouseResponse{
    status: string,
    message: string,
    anwSubjects: positiveSubject[]
}

export interface positiveSubject {
    address1: string,
    address2: string,
    address3: string,
    casteId: number,
    chcId: number,
    communityId: number,
    contactNo: string,
    districtId: number,
    ecNumber: string,
    firstName: string,
    id: number,
    lastName: string,
    middleName: string,
    phcId: number,
    pincode: string,
    rchId: string,
    religionId: number
    riId: number
    scId: number
    spouseContactNo: string,
    spouseFirstName: string,
    spouseLastName: string,
    spouseMiddleName: string,
    stateName: string,
    uniqueSubjectId: string,
}