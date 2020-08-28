export interface SchedulePrePndtcRequest {
    userId: number;
    districtId: number;
    chcId: number;
    phcId: number;
    anmId: number;    
}

export interface AddPrePndtcScheduleRequest{
    anwsubjectId: string;
    spouseSubjectId: string;
    counsellorId: number;
    counsellingDateTime: string;
    userId: number;
}


