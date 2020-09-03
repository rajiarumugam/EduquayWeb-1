export class SchedulePostPndtcRequest {
    userId: number;
    districtId: number;
    chcId: number;
    phcId: number;
    anmId: number;
}

export interface AddPostPndtcScheduleRequest{
    anwsubjectId: string;
    spouseSubjectId: string;
    counsellorId: number;
    counsellingDateTime: string;
    userId: number;
}

