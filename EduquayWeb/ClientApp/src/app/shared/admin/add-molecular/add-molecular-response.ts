export interface AddMolecularResponse {
    status: string;
    message: string;
    Moleculars:MolecularList[];
}

export interface MolecularList {
    id: number;
    districtId: string;
    districtName: string;
    molecularCode: string;
    molecularName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddMolecularDataresponse {
    status: string;
    message: string;
}
