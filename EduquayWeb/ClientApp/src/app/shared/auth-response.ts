
export interface authResponse {
  status: boolean,
  errors: string[],
  token: string,
  username: string
}
export interface error {
  type: string,
  message: string
}

export interface errors {
  errors: Array<error>
}

export interface Patient {
  id: string,
  govtId: string,
  firstName: string,
  lastName: string,
  location: string
}

export interface PatientResponse {
  status: string,
  message: string,
  patients: Patient[]
}
