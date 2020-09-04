export interface CounsellPostPndtRequest {
    userId: number;
    districtId: number;
    chcId: number;
    phcId: number;
    anmId: number;
}

export interface AddPostPndtCounsellingRequest{
    postPNDTSchedulingId: number;
    anwsubjectId: string;
    spouseSubjectId: string;
    counsellorId: number;
    counsellingRemarks: string;
    assignedObstetricianId: number;
    isMTPAgreeYes: boolean;
    isMTPAgreeNo: boolean;
    isMTPAgreePending: boolean;
    scheduleMTPDate: string;
    scheduleMTPTime: string;
    isFoetalDisease: boolean;
    userId: number
}
