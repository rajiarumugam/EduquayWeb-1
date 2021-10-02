export class AddAvdpointRequest {
   
    ContactNo: number;
    avdName :string
    riId:string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
}

// S.[ID]
//   ,S.[ILRCode]
//   ,S.[ILRPoint]
//   ,S.[CHCID]  
//   ,C.[CHCname] 
//   ,S.[Isactive]  
//   ,S.[Comments]    
// CHCID
// 					,ILRCode					
// 					,ILRPoint
// 					,Isactive
// 					,Comments
// 					,Createdby
// 					,Updatedby