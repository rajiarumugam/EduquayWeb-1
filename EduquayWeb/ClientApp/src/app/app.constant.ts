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
        "RETRIVESTATE":"api/v1/State/Retrieve",

        "RETRIVECLINICALDIAGNOSIS":"api/v1/ClinicalDiagnosis/Retrieve",

        "RETRIEVEMOLECULARLAB":"api/v1/WebMaster/RetrieveMolecularLab/",
        "RETRIVEANM":"api/v1/WebMaster/RetrieveANM/",
        "RETRIVEMOLECULARRESULT":"api/v1/WebMaster/RetrieveMolecularResult"
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
        "ADDSSTTEST":"api/v1/CHCReceiptProcessing/AddSSTest",
        "RETRIVECHCSAMPLEREPORT":"api/v1/CHCReceiptProcessing/RetrieveCHCSampleStatusReports",
        "RETRIVECHCSAMPLESTATUS":"api/v1/CHCReceiptProcessing/RetrieveCHCSampleStatus",
        "RETRIVECHCBYTESTINGCHC":"api/v1/WebMaster/RetrieveCHCByTestingCHC/"
    },
    "CENTRALLAB":
    {
        "RETRIVECENTRALLABRECEIPT":"api/v1/CentralLab/RetrieveCentralLabReceipt/",
        "ADDRECEIVEDSHIPMENTS":"api/v1/CentralLab/AddReceivedShipments",
        "RETRIVEHPLC":"api/v1/CentralLab/RetrieveHPLC/",
        "ADDHPLCTEST":"api/v1/CentralLab/AddHPLCTest",
        "RETRIVESHIPMENTLOG":"api/v1/CentralLab/RetrieveShipmentLog/",
        "RETRIVEPICKANDPACK":"api/v1/CentralLab/RetrievePickandPack/",
        "ADDSHIPMENT":"api/v1/CentralLab/AddShipment",
        "RETRIVECENTRALLABREPORT":"api/v1/CentralLab/RetrieveCentralLabReports",
        "RETRIVECENTRALLABSAMPLESTATUS":"api/v1/CentralLab/RetrieveCentralLabSampleStatus",
        "RETRIVECHCBYCENTRALLAB":"api/v1/WebMaster/RetrieveCHCByCentralLab/"
    },
    "PATHOLOGIST":
    {
        "RETRIVEHPLC":"api/v1/Pathologist/RetrieveHPLCTestDetail/",
        "RETRIVEHPLCRESULTMASTER":"api/v1/Pathologist/HPLCResultMaster",
        "RETRIVEEDITHPLCDIAGOSIS":"api/v1/Pathologist/RetrieveEditHPLCDiagnosisDetail/",
        "ADDHPLCRESULT":"api/v1/Pathologist/AddHPLCDiagnosisResult"
    }
    ,
    "PNDT":
    {
        "RETRIVEPNDTPENDING":"api/v1/PNDTObstetrician/RetrievePNDTPending",
        "ADDPNDTEST":"api/v1/PNDTObstetrician/ADDPNDTest",
        "RETRIVEPNDTCOMPLETEDSUMMARY":"api/v1/PNDTObstetrician/RetrievePNDTCompletedSummary",
        "RETRIVEPNDTNOTCOMPLETED":"api/v1/PNDTObstetrician/RetrievePostPNDTNotCompleted"
    },
    "PNDTMASTER":
    {
        "RETRIVEALLDISTRICT":"api/v1/PNDTMTPMaster/RetrieveAllDistrict",
        "RETRIVECHCBASEDDISTRICT":"api/v1/PNDTMTPMaster/RetrieveCHC/",
        "RETRIVEPHCBASEDPHC":"api/v1/PNDTMTPMaster/RetrievePHC/",
        "RETRIVEPHCBASEDANM":"api/v1/PNDTMTPMaster/RetrieveANM/",
        "RETRIVEPROCEDUREOFTESTING":"api/v1/PNDTMTPMaster/RetrieveProcedureOfTesting",
        "RETRIVEPNDTCCOMPLECATIONS":"api/v1/PNDTMTPMaster/RetrievePNDTComplecations",
        "RETRIVEPNDTCDIAGNOSIS":"api/v1/PNDTMTPMaster/RetrievePNDTDiagnosis",
        "RETRIVEPNDTRESULT":"api/v1/PNDTMTPMaster/RetrievePNDTResult",
        "RETRIVEMTPCOMPLICATIONS":"api/v1/PNDTMTPMaster/RetrieveMTPComplications",
        "RETRIVEMTPDISCHARECONDITION":"api/v1/PNDTMTPMaster/RetrieveMTPDischargeConditions"
    },
    "MTP":
    {
        "RETRIVEMTPPENDING":"api/v1/MTPObstetrician/RetrieveMTPPending",
        "RETRIVEMTPCOMPLETED":"api/v1/MTPObstetrician/RetrieveMTPCompleted",
        "RETRIVEMTPSUMMARY":"api/v1/MTPObstetrician/RetrieveMTPSummary",
        "ADDMTPTEST":"api/v1/MTPObstetrician/ADDMTPTest"
    },
    "MOLECULARLAB":
    {
        "RETRIVEMOLECULARLABRECEPIT":"api/v1/MolecularLab/RetrieveMolecularLabReceipt/",
        "ADDRECEIVEDSHIPMENT":"api/v1/MolecularLab/AddReceivedShipments",
        "RETRIVERECEIVEDSUBJECTS":"api/v1/MolecularLab/RetrieveReceivedSubjects/",
        "ADDMOLECULARRESULT":"api/v1/MolecularLab/AddMolecularResult",
        "RETRIVEMOLECULARREPORTS":"api​/v1​/MolecularLab​/RetrieveMolecularReports",
        "RETRIVEMOLECULARSAMPLESTATUS":"api/v1/MolecularLab/RetrieveMolecularSampleStatus",
        "RETRIVEMOLECULARREPORTS1":"api​/v1​/MolecularLab​/RetrieveMolecularReports",
    }

}