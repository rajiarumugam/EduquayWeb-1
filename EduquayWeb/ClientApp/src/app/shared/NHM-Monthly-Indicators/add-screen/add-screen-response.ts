
export interface AddScreenReportResponse {
    subjects: any[];
    status: string;
    message: string;
    data: ScreenList[];
}

export interface ScreenList {

      id: number,
      districtId: number,
      monthId: number,
      yearId: number,
      monthOfOnSetOfActivities: number,
      totalBlocks: number,
      blocksCollectingSamples:number ,
      cellCountersitesActive: number,
      totalANCRegisteredHMActiveBlocks: number,
      anCsSampled: number,
      noOfSamplesCollectedByANM: number,
      numberShippedToTheTCHC: number,
      dataEntryByANM: number,
      samplesReceivedByCHCLT: number,
      samplesTestedByCHCLT: number,
      foundCarrierDiseased: number,
      spouseTested: number,
      coupleFoundBothCarrier: number,
      numberOfMTP: number,
      numberOfCVS: number,
      createdBy: number,
      updatedBy: number
}

export interface AddScreenDataResponse {
    status: string;
    message: string;
}



export interface AddTrainingReportResponse {
    status: string;
    message: string;
    data:TrainingList[];
}

export interface TrainingList {
    id: number,
    districtId: number,
    monthId: number,
    yearId: number,
 
    plannedDLO: number,
    heldDLO: number,
    totalParticipantsDLO: number,
    plannedTOT: number,
    heldTOT: number,
    totalParticipantsTOT: number,
    totalblockANM: number,
    heldANM: number,
    totalParticipantsANM: number,
    totalANMDistrictBLA: number,
    totalblockANMO: number,
    heldANMO: number,
    totalParticipantsANMO: number,
    totalANMDistrictBLAO: number,
    plannedLMT: number,
    heldLMT: number,
    totalParticipantsLMT: number,
    createdBy: number,
    updatedBy: number

}

export interface AddBCCReportResponse {
    status: string;
    message: string;
    data:BCCList[];
}

export interface BCCList {
    id: number,
    districtId: number,
    monthId: number,
    yearId: number,
    blocksReached: number,
    gramaPanchayatReached: number,
    hoardings: number,
    wallPainting: number,
    tinPlate: number,
    handouts: number,
    sunBoard: number,
    stickers: number,
    poster: number,
    flipbook: number,
    busBranding:number,
    printMedia: number,
    radioSpots: number,
    television: number,
    communityMedia: number,
    matrimonial: number,
    socialMedia: number,
    animatedVideos: number,
    shgHandoutswithFAQ: number,
    ashAhandoutwithFAQs: number,
    comicStrip: number,
    additionalFlexBanners: number,
    postersforANM: number,
    photography: number,
    createdBy: number,
    updatedBy: number

}
