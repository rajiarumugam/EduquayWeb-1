
export interface authResponse {
  status: boolean,
  errors: string[],
  token: string,
  username: string,
  created: string,
  expiry: string,
  userDetail: user
}
export interface error {
  type: string,
  message: string
}

export interface errors {
  errors: Array<error>
}

export interface user {
  id: number,
  userTypeId: number,
  userRoleId: number,
  userRole: string,
  userRoleDescription: string,
  userRoleAccessModule:string,
  userGovCode: string,
  userName: string,
  stateId: number,
  districtId: number,
  blockId: number,
  chcId: number,
  chcName: string;
  centralLabId: number;
  centralLabName: string;
  phcId: number,
  scId: number,
  riId: string,
  name: string,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  registeredFrom: number,
  sampleCollectionFrom: number,
  shipmentFrom: number,
  pndtLocationId:number
}

export interface resetLoginResponse {
  message: string;
  success: boolean;
  errors: string;
}


