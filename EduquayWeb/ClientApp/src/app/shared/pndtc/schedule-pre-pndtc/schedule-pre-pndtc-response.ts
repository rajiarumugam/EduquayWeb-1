export interface SchedulePrePndtcResponse {
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
}

export interface ScheduledPrePndtcResponse {
    status: string;
    message: string;
    data: ScheduledList[]; 
}

export interface ScheduledList {
    anwSubjectId: string;
    subjectName: string;
    spouseSubjectId: string;
    spouseName: string;
    rchId: string;
    contactNo: string;
    ga: string;
    obstetricScore: string;
    counsellorId: number;
    counsellorName: string;
    counsellingDateTime: string;
    schedulingId: number;
}

export interface AddPrePndtcScheduleResponse{
    status: string;
    message: string;
    data: ScheduledDateTime;
}

export interface ScheduledDateTime{
    counsellingDate: string;
    counsellingTime: string;
}


