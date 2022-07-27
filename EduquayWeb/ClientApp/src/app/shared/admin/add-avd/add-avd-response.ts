export class AddAvdResponse {
    status: string;
    message: string;
    avdDetails: AvdList[]; 
}

export interface AvdList {
   
     id : number;
       riId : string;
       avdName : string;
       contactNo : number;
       createdBy : number;
       updatedBy : number;
       comments : string;
       isActive : boolean;
}

export interface AddAvdDataresponse {
    status: string;
    message: string;
}

export class AddRibyAvdResponse {
    status: string;
    message: string;
    data:ribyavdList[]; 
}

export interface ribyavdList {
   
       id : number;
       name : string;
    
}
