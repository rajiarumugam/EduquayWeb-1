export const ENDPOINT = {
    "MASTER":
    {
        "RETRIEVEDISTRICT":"api/v1/WebMaster/RetrieveDistrict/",
        "RETRIEVECHC":"api/v1/WebMaster/RetrieveCHC/",
        "RETRIEVEPHC":"api/v1/WebMaster/RetrievePHC/",
        "RETRIEVESC":"api/v1/WebMaster/RetrieveSC/",
        "RETRIEVERI":"api/v1/WebMaster/RetrieveRI/",
        "RETRIEVERELIGION":"api/v1/WebMaster/RetrieveReligion",
        "RETRIEVECASTE":"api/v1/WebMaster/RetrieveCaste",
        "RETRIEVECOMMUNITY":"api/v1/WebMaster/RetrieveCommunity",
        "RETRIEVE_GOV_ID_TYPE":"api/v1/WebMaster/RetrieveGovIdType",
        "RETRIEVE_ASSOCIATED_ANM":"api/v1/WebMaster/RetrieveAssociatedANM/",
        "RETRIVESTATE":"api/v1/State/Retrieve"
    },
    "SUBJECT":
    {
        "ADD":"api/v1/Subject/Add",
        "RETRIVE":"api/v1/Subject/RetrieveANWSubjects",
        "RETRIVECHCANWPOSITIVESUBJECTS":"api/v1/Subject/RetrieveCHCANWPositiveSubjects"
    },
    "CHC_SAMPLE_REC":
    {
        "RETRIVECHCRECEIPT":"api/v1/CHCReceiptProcessing/RetrieveCHCReceipt/",
        "ADDRECEIVEDSHIPMENT":"api/v1/CHCReceiptProcessing/AddReceivedShipments",
        "RETRIVECBC":"api/v1/CHCReceiptProcessing/RetrieveCBC/",
        "ADDCBCTEST":"api/v1/CHCReceiptProcessing/AddCBCTest",
        "RETRIVESST":"api/v1/CHCReceiptProcessing/RetrieveSST/",
        "ADDSSTTEST":"api/v1/CHCReceiptProcessing/AddSSTest"
    },
    "CENTRALLAB":
    {
        "RETRIVECENTRALLABRECEIPT":"api/v1/CentralLab/RetrieveCentralLabReceipt/",
        "ADDRECEIVEDSHIPMENTS":"api/v1/CentralLab/AddReceivedShipments",
        "RETRIVEHPLC":"api/v1/CentralLab/RetrieveHPLC/",
        "ADDHPLCTEST":"api/v1/CentralLab/AddHPLCTest",
    }
}