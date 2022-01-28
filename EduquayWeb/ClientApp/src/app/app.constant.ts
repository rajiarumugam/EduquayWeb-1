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
        "RETRIVEMOLECULARRESULT":"api/v1/WebMaster/RetrieveMolecularResult",
        "RETRIVERIBYCHC":"api/v1/WebMaster/RetrieveRIByCHC/",
        "RETRIVEALLPNDTLOCATION":"api/v1/WebMaster/RetrieveAllPNDTLocation" ,
        "RETRIEVECHCBYBLOCK":"api/v1/WebMaster/RetrieveCHCByBlock/",
        "RETRIEVEPHCBYCHC":"api/v1/WebMaster/RetrievePHCByCHC/",
        "RETRIVESCBYPHC":"api/v1/WebMaster/RetrieveSCByPHC/",
        "RETRIVEANMBYPHC":"api/v1/WebMaster/RetrieveANMByPHC/",
        "RETRIVESCBYANM":"api/v1/WebMaster/RetrieveSCByANM/",
        "RETRIVERIBYANM":"api/v1/WebMaster/RetrieveRIByANM/"

    },
    "SUBJECT":
    {
        "ADD":"api/v1/Subject/Add",
        "RETRIVE":"api/v1/Subject/RetrieveANWSubjects",
        "RETRIVECHCANWPOSITIVESUBJECTS":"Subject/RetrieveCHCANWPositiveSubjects",
        "AddMOLECULARBLOODTESTRESULT":"api/v1/MLResultProcess/AddMolecularBloodTestResult",
        "ADDMOLECULARSPECIMENTESTRESULT":"api/v1/MLResultProcess/AddMolecularSpecimenTestResult"
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
        "RETRIVECHCBYTESTINGCHC":"api/v1/WebMaster/RetrieveCHCByTestingCHC/",
        "RETRIVECBCTEST":"api/v1/CHCReceiptProcessing/RetrieveCBCTest/",
        "ADDCHCTESTRESULT":"api/v1/CHCReceiptProcessing/AddCBCTestResults",
        "RETRIVEPICKANDPACK":"api/v1/CHCReceiptProcessing/RetrievePickandPack/"
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
        "RETRIVECHCBYCENTRALLAB":"api/v1/WebMaster/RetrieveCHCByCentralLab/",
        "RETRIVEHPLCTEST":"api/v1/CentralLab/RetrieveHPLCTest/",
        "ADDHPLCTETRESULT":"api/v1/CentralLab/AddHPLCTestResult",
        "UPDATEHPLCTESTRESULT":"api/v1/CentralLab/UpdateHPLCTestResult",
        "UPDATEPROCESSEDHPLCTESTRESULT":"api/v1/CentralLab/UpdateProcessedHPLCTestResult",
        "DOWNLOADHPLCGRAPH":"api/v1/CentralLab/DownloadHPLCGraph?fileName=",
        "RETRIVESRPATHOHPLCDIAGNOSISDETAILS":​"api/v1/Pathologist/RetrieveSrPathoHPLCDiagnosisDetail/"
    },
    "PATHOLOGIST":
    {
        "RETRIVEHPLC":"api/v1/Pathologist/RetrieveHPLCTestDetail/",
        "RETRIVEHPLCRESULTMASTER":"api/v1/Pathologist/HPLCResultMaster",
        "RETRIVEEDITHPLCDIAGOSIS":"api/v1/Pathologist/RetrieveEditHPLCDiagnosisDetail/",
        "ADDHPLCRESULT":"api/v1/Pathologist/AddHPLCDiagnosisResult",
        "RETRIEVEPATHOLOGISTREPORTS":"api/v1/Pathologist/RetrievePathologistReports",
        "RETRIVEDIAGNOSISSAMPLESTATUS":"api/v1/Pathologist/RetrieveDiagnosisSampleStatus",
        "RETRIEVEDIAGNOSISREPORTS":"api/v1/SPC/RetrieveDiagnosisReports"
    }
    ,
    "PNDT":
    {
        "RETRIVEPNDTPENDING":"api/v1/PNDTObstetrician/RetrievePNDTPending",
        "ADDPNDTEST":"api/v1/PNDTObstetrician/ADDPNDT",
        "RETRIVEPNDTCOMPLETEDSUMMARY":"api/v1/PNDTObstetrician/RetrievePNDTCompletedSummary",
        "RETRIVEPNDTNOTCOMPLETED":"api/v1/PNDTObstetrician/RetrievePostPNDTNotCompleted",
        "RETRIVEPNDTPICKANDPACK":"api/v1/PNDTC/RetrievePNDTPickAndPack/",
        "ADDPNDTSHIPMENT":"api/v1/PNDTC/AddPNDTShipment",
        "RETRIVEPNDTCSHIPMENTLOG":"api/v1/PNDTC/RetrievePNDTShipmentLog/"
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
        "RETRIVEMTPDISCHARECONDITION":"api/v1/PNDTMTPMaster/RetrieveMTPDischargeConditions",
        "RETRIVEBLOCKBYDISTRICT":"api/v1/WebMaster/RetrieveBlockByDistrict/",
        "RETRIVECHCBYBLOCK":"api/v1/WebMaster/RetrieveCHCByBlock/",
        "RETRIVEANMBYCHC":"api/v1/WebMaster/RetrieveANMByCHC/",
        "RETRIVEDISTRICTBYPNDTLOCTION":"api/v1/PNDTMTPMaster/RetrieveDistrictByPNDTLocation/"
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
        "RETRIVEMOLECULARREPORTS":"api/v1/MolecularLab/RetrieveMolecularReports",
        "RETRIVEMOLECULARSAMPLESTATUS":"api/v1/MolecularLab/RetrieveMolecularSampleStatus",
        "RETRIVEMOLECULARREPORTS1":"api/v1/MolecularLab/RetrieveMolecularReports",
        "RETRIVEMOBPNDTRECEIPT":"api/v1/MolecularLab/RetrieveMolPNDTReceipt/",
        "ADDRECEIVEDSPECIMENTSHIPMENT":"api/v1/MolecularLab/AddReceivedSpecimenShipments"
    },
    "NHM":{
        "GETNHMREPORTS":"api/v1/NHMReports/NHMReportsDetail",
        "CHCRECEIPTREPORTSDETAIL":"api/v1/CHCReceiptProcessing/CHCReceiptReportsDetail",
        "CLRECEIPTREPORTSDETAIL":"api/v1/CentralLab/CLReceiptReportsDetail"
    },
    "REPORTS":
    {
        "ANMREPORTDETAIL":"api/v1/ANMReport/ANMReportsDetail",
        "CHCREPORTSDETAIL":"api/v1/CHCReport/CHCReportsDetail",
        "RETRIVEPARTICULARCHC":"api/v1/Subject/RetrieveParticularCHCSubjectList",
        "RETRIVEPARTICULARPATHOLOGIST":"api/v1/Pathologist/RetrievePathologistReportsDetail",
        "MTPReportsDetail":"api/v1/ANMReport/MTPReportsDetail",
        "PNDTREPORTDETAIL":"api/v1/NHMReports/PNDTReportsDetail",
    },
    "ERRORCORRECTION":
    {
        "RETRIVEBARCODEFORERRORCORRECTION":"api/v1/Support/RetrieveBarcodeDetailsForErrorCorrection/",
        "CHECKBARCODEEXIST":"api/v1/Support/CheckBarcodeExist/",
        "UPDATEBARCODEERROR":"api/v1/Support/UpdateBarcodeError",
        "RETRIVEERRORBARCODE":"api/v1/Support/RetrieveErrorBarcodeDetails",
        "RETRIVEFORRCHIDERRORCORRECTION":"api/v1/Support/RetrieveDetailsForRCHIdErrorCorrection/",
        "CHECKRCHIDEXIST":"api/v1/Support/CheckRCHIDExist/",
        "UPDATERCHIDERROR":"api/v1/Support/UpdateRCHIDError",
        "RETRIEVELMPERRORCORRECTION":"api/v1/Support/RetrieveDetailsForLMPErrorCorrection",
        "UPDATELMP":"api/v1/Support/UpdateLMP",
        "RETRIEVESSTERRORCORRECTION":"api/v1/Support/RetrieveDetailsForSSTCorrection",
        "UPDATESST":"api/v1/Support/UpdateSST"
    },
    "ERRORREPORT":{
      "BARCODEERRORREPORT" : "api/v1/Support/RetrieveBarcodeErrorReport",
      "RCHERRORREPORT":"api/v1/Support/RetrieveRCHIdErrorReport",
      "LMPERRORREPORT":"api/v1/Support/RetrieveLMPErrorReport",
      "SSTERRORREPORT":"api/v1/Support/RetrieveSSTResultErrorReport"

    },
    "Search":{
        "retrieveDistrictApi":"api/v1/SA/RetrieveAllDistricts",
        "RetrieveCHCbyDistrict":"api/v1/WebMaster/RetrieveCHCByDistrict/",
        "RetrievePHCByCHC":"api/v1/WebMaster/RetrievePHCByCHC/",
        "RetrieveANMByPHC":"api/v1/WebMaster/RetrieveANMByCHC/"
    },
    "UPLOAD":{
        "UploadCBCHPLCFiles":"api/v1/Support/UploadCBCHPLCFiles",
        "UploadSAFiles":"api/v1/Support/BulkUpload",
        "ValidateBulkUpload":"api/v1/Support/ValidateBulkUpload",
        "CreateBulkUpload":"api/v1/Support/CreateBulkUpload"
    }


}