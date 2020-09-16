export class SchedulePostPndtcResponse {
    status: string;
    message: string;
    data: SchedulingList[]; 
}

export interface SchedulingList {
    anwSubjectId: string;
    subjectName: string;
    spouseSubjectId: string;
    spouseName: string;
    rchId: string;
    ga: string;
    contactNo: string;
    obstetricScore: string;
    pndtDateTime: string;
}

export interface AddPostPndtcScheduleResponse{
    status: string;
    message: string;
    data: ScheduledDateTime;
}

export interface ScheduledDateTime{
    counsellingDate: string;
    counsellingTime: string;
}
