export class AddScreenDataRequest {
    DistrictId: number;
	MonthId:  number;
	YearId: number;
	MonthOfOnSetOfActivities: number;
	TotalBlocks: number;
	BlocksCollectingSamples: number;
	CellCountersitesActive: number;
	TotalANCRegisteredHMActiveBlocks: number;	
	ANCsSampled: number;
	NoOfSamplesCollectedByANM: number;
	NumberShippedToTheTCHC: number;	
	DataEntryByANM:number;
	SamplesReceivedByCHCLT: number;	
	SamplesTestedByCHCLT: number;
	FoundCarrierDiseased: number;
	SpouseTested: number;	
	CoupleFoundBothCarrier: number;
	NumberOfMTP: number;	
	NumberOfCVS:number;		
    userId:number;
}

export class AddBCCDataRequest {
    DistrictId: number;
	MonthId:  number;
	YearId: number;
	BlocksReached: number;
	GramaPanchayatReached :number;
	Hoardings :number;
	WallPainting :number;
	TinPlate 	:number;
	Handouts :number;
	SunBoard :	number;
	Stickers: number;
	Poster:number;
	Flipbook :	number;
	BusBranding:number;
	PrintMedia :number;
	SocialMedia:number;
	AnimatedVideos: number;
	SHGHandoutswithFAQ :number;
	ASHAhandoutwithFAQs :number;
	ComicStrip :number;
	AdditionalFlexBanners: number;
	PostersforANM :number;
	Photography :	number;
    userId:number;
}



