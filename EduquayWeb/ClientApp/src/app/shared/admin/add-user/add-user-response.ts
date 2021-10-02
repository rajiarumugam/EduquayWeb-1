export class AddUserResponse {
    status: string;
    message: string;
    users: UserList[];
}

export interface UserList {
   
     id : number,
     userTypeName :  string ,
     isActive :  string ,
     comments :  string ,
     createdBy : number,
     updatedBy : number

}

export interface AddUserDataresponse {
    status: string;
    message: string;
}
