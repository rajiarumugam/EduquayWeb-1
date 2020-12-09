export interface AddBlockResponse {
    status: string;
    message: string;
    blocks: BlockList[];
}

export interface BlockList {
    id: number;
    districtId: string;
    districtName: string;
    blockGovCode: string;
    blockName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

export interface AddBlockDataresponse {
    status: string;
    message: string;
}
