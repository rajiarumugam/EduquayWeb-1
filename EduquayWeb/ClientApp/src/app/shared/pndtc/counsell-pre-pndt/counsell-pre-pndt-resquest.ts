export interface CounsellPrePndtResquest {
    userId: number;
    districtId: number;
    chcId: number;
    phcId: number;
    anmId: number;  
}

export interface AddPrePndtCounsellingRequest{
    prePNDTSchedulingId: number;
    anwsubjectId: string;
    spouseSubjectId: string;
    counsellorId: number;
    counsellingRemarks: string;
    assignedObstetricianId: number;
    isPNDTAgreeYes: boolean;
    isPNDTAgreeNo: boolean;
    isPNDTAgreePending: boolean;
    schedulePNDTDate: string;
    schedulePNDTTime: string;
    userId: number
}
