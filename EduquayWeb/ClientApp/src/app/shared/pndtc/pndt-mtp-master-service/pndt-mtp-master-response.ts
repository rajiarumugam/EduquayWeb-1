export class PndtMtpMasterResponse {
    status: string;
    message: string;
    data: dataModel[];
}

export interface dataModel {
    id: number;
    name: string;
}
