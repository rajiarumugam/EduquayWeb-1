import { Component, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from './../../shared/loader/loader.service';
import { pathoHPLCService } from "./../../shared/pathologist/patho-hplc.service";
declare var $: any;
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';

@Component({
    selector: 'monthly-reports-form',
    templateUrl: './form.model.component.html',
    styleUrls: ['./form.model.component.css']
})
export class weeklyReportFormComponent {
  id: any;
  weekId:any;
  blockId:any;
  user;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  monthlyActualData;
  currentDate;
  constructor(private _formBuilder: FormBuilder,private tokenService: TokenService,private loaderService: LoaderService,private pathoHPLCService:pathoHPLCService,
    private _mdr: MatDialogRef<weeklyReportFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id = data.id;
    this.weekId = data.weekId;
    this.blockId = data.blockId;
    this.monthlyActualData = data.monthlyActualData;
  }
  CloseDialog(bool) {
    this._mdr.close(bool)
  }
  ngOnInit() {
    console.log(this.id);
    console.log(this.weekId);
    console.log(this.blockId);
    this.loaderService.display(false);
    this.currentDate = moment(new Date()).format("DD-MM-YYYY");
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    console.log(this.user)
    if(this.id === '1') {
      this.initCollectionForm();
    } else if(this.id === '2') {
      this.initScreeningForm();
    } else if(this.id === '3') {
      this.initConfirmatoryTestingForm();
    } else if(this.id === '4') {
      this.initMolecularLabForm();
    } else if(this.id === '5') {
      this.initPrenatalDiagnosisForm();
    }
    
  }

  initCollectionForm() {
    this.firstFormGroup = this._formBuilder.group({
      noofANM: [(this.monthlyActualData.anMsCollectedSamples) ? this.monthlyActualData.anMsCollectedSamples : 0, Validators.required],
      totalEnrolled: [(this.monthlyActualData.totalSampledANMSpouse) ? this.monthlyActualData.totalSampledANMSpouse : 0, Validators.required],
      totalSamplesCollected: [this.monthlyActualData.totalSamplesCollected ? this.monthlyActualData.totalSamplesCollected : 0, Validators.required],
      noOfPregnantWomenEnrolled: ['', Validators.required],
      noOfPregnantWomenSampled: [this.monthlyActualData.pregnantWomenSampled ? this.monthlyActualData.pregnantWomenSampled : 0, Validators.required],
      noofSpousesEnrolled: [this.monthlyActualData.spousesEnrolled ? this.monthlyActualData.spousesEnrolled : 0, Validators.required],
      noofSpousesSampled: [this.monthlyActualData.spousesSampled ? this.monthlyActualData.spousesSampled : 0, Validators.required],
      totalSampled: [this.monthlyActualData.totalSampledANMSpouse ? this.monthlyActualData.totalSampledANMSpouse : 0, Validators.required],
      noofspousescontactedbyANM: [this.monthlyActualData.spousesContactedbyANMs ? this.monthlyActualData.spousesContactedbyANMs : 0, Validators.required],
      noOfSamplesRecollected: [this.monthlyActualData.samplesRecollected ? this.monthlyActualData.samplesRecollected : 0, Validators.required],
      totalNoofSamplesReceived: [this.monthlyActualData.samplesRecollectedAGG ? this.monthlyActualData.samplesRecollectedAGG : 0, Validators.required],
      noofSamplesReceivedTimedMissing: [this.monthlyActualData.samplesReceivedTimedMissing ? this.monthlyActualData.samplesReceivedTimedMissing : 0, Validators.required],
      noOfSamplesReceivedInsufficient: [this.monthlyActualData.samplesReceivedInsufficient ? this.monthlyActualData.samplesReceivedInsufficient : 0, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      noofANM: [this.monthlyActualData.anMsCollectedSamplesAGG ? this.monthlyActualData.anMsCollectedSamplesAGG : 0, Validators.required],
      totalEnrolled: [this.monthlyActualData.totalSampledANMSpouseAGG ? this.monthlyActualData.totalSampledANMSpouseAGG : 0, Validators.required],
      totalSamplesCollected: [this.monthlyActualData.totalSamplesCollectedAGG ? this.monthlyActualData.totalSamplesCollectedAGG : 0, Validators.required],
      noOfPregnantWomenEnrolled: ['', Validators.required],
      noOfPregnantWomenSampled: [this.monthlyActualData.pregnantWomenSampledAGG ? this.monthlyActualData.pregnantWomenSampledAGG : 0, Validators.required],
      noofSpousesEnrolled: [this.monthlyActualData.spousesEnrolledAGG ? this.monthlyActualData.spousesEnrolledAGG : 0, Validators.required],
      noofSpousesSampled: [this.monthlyActualData.spousesSampledAGG ? this.monthlyActualData.spousesSampledAGG : 0, Validators.required],
      totalSampled: [this.monthlyActualData.totalSampledANMSpouseAGG ? this.monthlyActualData.totalSampledANMSpouseAGG : 0, Validators.required],
      noofspousescontactedbyANM: [this.monthlyActualData.spousesContactedbyANMsAGG ? this.monthlyActualData.spousesContactedbyANMsAGG : 0, Validators.required],
      noOfSamplesRecollected: [this.monthlyActualData.samplesRecollectedAGG ? this.monthlyActualData.samplesRecollectedAGG : 0, Validators.required],
      totalNoofSamplesReceived: [this.monthlyActualData.samplesRecollectedAGG ? this.monthlyActualData.samplesRecollectedAGG : 0, Validators.required],
      noofSamplesReceivedTimedMissing: [this.monthlyActualData.samplesReceivedTimedMissingAGG ? this.monthlyActualData.samplesReceivedTimedMissingAGG : 0, Validators.required],
      noOfSamplesReceivedInsufficient: [this.monthlyActualData.samplesReceivedInsufficientAGG ? this.monthlyActualData.samplesReceivedInsufficientAGG : 0, Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      reasons1: [this.monthlyActualData.reason1 ? this.monthlyActualData.reason1 : ''],
      reasons1No: [this.monthlyActualData.reason1 ? this.monthlyActualData.reason1 : 0],
      reasons2: [this.monthlyActualData.reason2 ? this.monthlyActualData.reason2 : ''],
      reasons2No: [this.monthlyActualData.reason2 ? this.monthlyActualData.reason2 : 0],
      reasons3: [this.monthlyActualData.reason3 ? this.monthlyActualData.reason3 : ''],
      reasons3No: [this.monthlyActualData.reason3 ? this.monthlyActualData.reason3 : 0],
      reasons4: [this.monthlyActualData.reason4 ? this.monthlyActualData.reason4 : ''],
      reasons4No: [this.monthlyActualData.reason4 ? this.monthlyActualData.reason4 : 0],
      reasons5: [this.monthlyActualData.reason5 ? this.monthlyActualData.reason5 : ''],
      reasons5No: [this.monthlyActualData.reason5 ? this.monthlyActualData.reason5 : 0]
    });
  }
  initScreeningForm() {
    this.firstFormGroup = this._formBuilder.group({
      noofCBCtestsdoneatCHC: [this.monthlyActualData.cbcTestsdoneCHCs ? this.monthlyActualData.cbcTestsdoneCHCs : 0, Validators.required],
      noCBCpositive: [this.monthlyActualData.cbcPositive ? this.monthlyActualData.cbcPositive : 0, Validators.required],
      noofSSTtestsdoneatCHC: [this.monthlyActualData.sstTestsDoneCHCs ? this.monthlyActualData.sstTestsDoneCHCs : 0, Validators.required],
      noSSTpositive: [this.monthlyActualData.sstPositive ? this.monthlyActualData.sstPositive : 0, Validators.required],
      totalsamplessenttoHPLClab: [this.monthlyActualData.samplesSentHPLClab ? this.monthlyActualData.samplesSentHPLClab : 0, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      noofCBCtestsdoneatCHC: [this.monthlyActualData.cbcTestsdoneCHCsAGG ? this.monthlyActualData.cbcTestsdoneCHCsAGG : 0, Validators.required],
      noCBCpositive: [this.monthlyActualData.cbcPositiveAGG ? this.monthlyActualData.cbcPositiveAGG : 0, Validators.required],
      noofSSTtestsdoneatCHC: [this.monthlyActualData.sstTestsDoneCHCsAGG ? this.monthlyActualData.sstTestsDoneCHCsAGG : 0, Validators.required],
      noSSTpositive: [this.monthlyActualData.sstPositiveAGG ? this.monthlyActualData.sstPositiveAGG : 0, Validators.required],
      totalsamplessenttoHPLClab: [this.monthlyActualData.samplesSentHPLClabAGG ? this.monthlyActualData.samplesSentHPLClabAGG : 0, Validators.required]
    });
  }
  initConfirmatoryTestingForm() {
    this.firstFormGroup = this._formBuilder.group({
      totalNoofANWsamplestestedatHPLClab: [this.monthlyActualData.anwSamplesTestedHPLClab ? this.monthlyActualData.anwSamplesTestedHPLClab : 0, Validators.required],
      totalNoofANWpositivebyHPLC: [this.monthlyActualData.anwPositivebyHPLC ? this.monthlyActualData.anwPositivebyHPLC : 0, Validators.required],
      noofHPLCpositiveANW: [this.monthlyActualData.hplCpositiveANWgestation ? this.monthlyActualData.hplCpositiveANWgestation : 0, Validators.required],
      totalNoofSpouseSamplesTestedAtHPLClab: [this.monthlyActualData.spouseSamplesTestedHPLClab ? this.monthlyActualData.spouseSamplesTestedHPLClab : 0, Validators.required],
      totalNoofSpousePositiveByHPLC: [this.monthlyActualData.spousePositiveByHPLC ? this.monthlyActualData.spousePositiveByHPLC : 0, Validators.required],
      noofPairsOfSamplesForwardedToMolecularLab: ['', Validators.required],
      noOfHPLCReportsGeneratedAndPostedToANM: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      totalNoofANWsamplestestedatHPLClab: [this.monthlyActualData.anwSamplesTestedHPLClabAGG ? this.monthlyActualData.anwSamplesTestedHPLClabAGG : 0, Validators.required],
      totalNoofANWpositivebyHPLC: [this.monthlyActualData.anwPositivebyHPLCAGG ? this.monthlyActualData.anwPositivebyHPLCAGG : 0, Validators.required],
      noofHPLCpositiveANW: [this.monthlyActualData.hplCpositiveANWgestationAGG ? this.monthlyActualData.hplCpositiveANWgestationAGG : 0, Validators.required],
      totalNoofSpouseSamplesTestedAtHPLClab: [this.monthlyActualData.spouseSamplesTestedHPLClabAGG ? this.monthlyActualData.spouseSamplesTestedHPLClabAGG : 0, Validators.required],
      totalNoofSpousePositiveByHPLC: [this.monthlyActualData.spousePositiveByHPLCAGG ? this.monthlyActualData.spousePositiveByHPLCAGG : 0, Validators.required],
      noofPairsOfSamplesForwardedToMolecularLab: ['', Validators.required],
      noOfHPLCReportsGeneratedAndPostedToANM: ['', Validators.required]
    });
  }
  initMolecularLabForm() {
    this.firstFormGroup = this._formBuilder.group({
      totalNoofANWsamplestestedatHPLClab: [this.monthlyActualData.anwSamplesTestedHPLClab ? this.monthlyActualData.anwSamplesTestedHPLClab : 0, Validators.required],
      totalNoofANWpositivebyHPLC: [this.monthlyActualData.anwPositivebyHPLC ? this.monthlyActualData.anwPositivebyHPLC : 0, Validators.required],
      noofHPLCpositiveANW: [this.monthlyActualData.hplCpositiveANWgestation ? this.monthlyActualData.hplCpositiveANWgestation : 0, Validators.required],
      totalNoofSpouseSamplesTestedAtHPLClab: [this.monthlyActualData.spouseSamplesTestedHPLClab ? this.monthlyActualData.spouseSamplesTestedHPLClab : 0, Validators.required],
      totalNoofSpousePositiveByHPLC: [this.monthlyActualData.spousePositiveByHPLC ? this.monthlyActualData.spousePositiveByHPLC : 0, Validators.required],
      noofPairsOfSamplesForwardedToMolecularLab: ['', Validators.required],
      noOfHPLCReportsGeneratedAndPostedToANM: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      totalNoofANWsamplestestedatHPLClab: [this.monthlyActualData.anwSamplesTestedHPLClabAGG ? this.monthlyActualData.anwSamplesTestedHPLClabAGG : 0, Validators.required],
      totalNoofANWpositivebyHPLC: [this.monthlyActualData.anwPositivebyHPLCAGG ? this.monthlyActualData.anwPositivebyHPLCAGG : 0, Validators.required],
      noofHPLCpositiveANW: [this.monthlyActualData.hplCpositiveANWgestationAGG ? this.monthlyActualData.hplCpositiveANWgestationAGG : 0, Validators.required],
      totalNoofSpouseSamplesTestedAtHPLClab: [this.monthlyActualData.spouseSamplesTestedHPLClabAGG ? this.monthlyActualData.spouseSamplesTestedHPLClabAGG : 0, Validators.required],
      totalNoofSpousePositiveByHPLC: [this.monthlyActualData.spousePositiveByHPLCAGG ? this.monthlyActualData.spousePositiveByHPLCAGG : 0, Validators.required],
      noofPairsOfSamplesForwardedToMolecularLab: ['', Validators.required],
      noOfHPLCReportsGeneratedAndPostedToANM: ['', Validators.required]
    });
  }
  initPrenatalDiagnosisForm() {
    this.firstFormGroup = this._formBuilder.group({
      noofCouplesUnderGoingPrePNDCounselling: [this.monthlyActualData.couplesprePNDcounsellingSCB ? this.monthlyActualData.couplesprePNDcounsellingSCB : 0, Validators.required],
      noOfPNDTestingDone: [this.monthlyActualData.pndTestingdoneSCB ? this.monthlyActualData.pndTestingdoneSCB : 0, Validators.required],
      noOfPNDTestPositives: ['', Validators.required],
      noOfCouplesUnderGoingPostPNDCounselling: [this.monthlyActualData.couplespostPNDCounsellingSCB ? this.monthlyActualData.couplespostPNDCounsellingSCB : 0, Validators.required],
      noOfMTPPerformed: [this.monthlyActualData.mtPsPerformedSCB ? this.monthlyActualData.mtPsPerformedSCB : 0, Validators.required],
      noofWomenContactedByANMAfterMTP: [this.monthlyActualData.womenContactedANMSCB ? this.monthlyActualData.womenContactedANMSCB : 0, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      noofCouplesUnderGoingPrePNDCounselling: [this.monthlyActualData.couplesprePNDcounsellingSCBAGG ? this.monthlyActualData.couplesprePNDcounsellingSCBAGG : 0, Validators.required],
      noOfPNDTestingDone: [this.monthlyActualData.pndTestingdoneSCBAGG ? this.monthlyActualData.pndTestingdoneSCBAGG : 0, Validators.required],
      noOfPNDTestPositives: ['', Validators.required],
      noOfCouplesUnderGoingPostPNDCounselling: [this.monthlyActualData.couplespostPNDCounsellingSCBAGG ? this.monthlyActualData.couplespostPNDCounsellingSCBAGG : 0, Validators.required],
      noOfMTPPerformed: [this.monthlyActualData.mtPsPerformedSCBAGG ? this.monthlyActualData.mtPsPerformedSCBAGG : 0, Validators.required],
      noofWomenContactedByANMAfterMTP: [this.monthlyActualData.womenContactedANMSCBAGG ? this.monthlyActualData.womenContactedANMSCBAGG : 0, Validators.required]
    });
  }
  returnPopupName() {
    if(this.id === '1') {
      return 'Collection & Registration';
    } else  if(this.id === '2') {
      return 'Screening Tests(SST & CBC)';
    } else  if(this.id === '3') {
      return 'Confirmatory testing(HPLC)';
    } else  if(this.id === '4') {
      return 'Molecular Lab (HPLC and CVS)';
    } else  if(this.id === '5') {
      return 'Prenatal diagnosis and testing';
    }
  }
  submitForm(id) {
    console.log("id::::",id);
      if(id === '1') {
          this.buildSampleCollectionParams();
      } else if(id === '2') {
        this.buildScreeningTestParams();
      } else if(id === '3') {
        this.buildConfirmatoryTestingParams();
      } else if(id === '4') {
        this.buildMolecularLabdataParams();
      } else if(id === '5') {
        this.buildPrenataldiagnosisParams();
      }
      //this.firstFormGroup.get('district').value
  }
    buildSampleCollectionParams() {
      var _obj = {};
      _obj['weekId'] = Number(this.weekId);
      _obj['blockID'] = Number(this.blockId);
      _obj['anMsCollectedSamples'] = this.firstFormGroup.get('noofANM').value;
      _obj['anMsCollectedSamplesAGG'] = this.secondFormGroup.get('noofANM').value;
      _obj['totalSamplesCollected'] = this.firstFormGroup.get('totalEnrolled').value;
      _obj['totalSamplesCollectedAGG'] = this.secondFormGroup.get('totalEnrolled').value;
      _obj['pregnantWomenSampled'] = this.firstFormGroup.get('totalSamplesCollected').value;
      _obj['pregnantWomenSampledAGG'] = this.secondFormGroup.get('totalSamplesCollected').value;
      _obj['spousesEnrolled'] = this.firstFormGroup.get('noofSpousesEnrolled').value;
      _obj['spousesEnrolledAGG'] = this.secondFormGroup.get('noofSpousesEnrolled').value;
      _obj['spousesSampled'] = this.firstFormGroup.get('noofSpousesSampled').value;
      _obj['spousesSampledAGG'] = this.secondFormGroup.get('noofSpousesSampled').value;
      _obj['totalSampledANMSpouse'] = this.firstFormGroup.get('totalSampled').value;
      _obj['totalSampledANMSpouseAGG'] = this.secondFormGroup.get('totalSampled').value;
      _obj['samplesRecollected'] = this.firstFormGroup.get('noOfSamplesRecollected').value;
      _obj['samplesRecollectedAGG'] = this.secondFormGroup.get('noOfSamplesRecollected').value;
      _obj['noofSamplesReceived'] = this.firstFormGroup.get('totalNoofSamplesReceived').value;
      _obj['noofSamplesReceivedAGG'] = this.secondFormGroup.get('totalNoofSamplesReceived').value;
      _obj['samplesReceivedTimedMissing'] = this.firstFormGroup.get('noofSamplesReceivedTimedMissing').value;
      _obj['samplesReceivedTimedMissingAGG'] = this.secondFormGroup.get('noofSamplesReceivedTimedMissing').value;
      _obj['samplesReceivedInsufficient'] = this.firstFormGroup.get('noOfSamplesReceivedInsufficient').value;
      _obj['samplesReceivedInsufficientAGG'] = this.secondFormGroup.get('noOfSamplesReceivedInsufficient').value;
     
      _obj['reason1'] = this.thirdFormGroup.get('reasons1').value;
      _obj['reason2'] = this.thirdFormGroup.get('reasons2').value;
      _obj['reason3'] = this.thirdFormGroup.get('reasons3').value;
      _obj['reason4'] = this.thirdFormGroup.get('reasons4').value;
      _obj['reason5'] = this.thirdFormGroup.get('reasons5').value;
      _obj['userId'] = this.user.id;


      this.loaderService.display(true);
     
      this.pathoHPLCService.createReportData(_obj,ENDPOINT.WEEKREPORT.ADDSAMPLECOLLECTIONDATA).subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.CloseDialog(true);
      },
      (err: HttpErrorResponse) =>{
        this.loaderService.display(false);
      });
      
    }
    buildScreeningTestParams() {
      var _obj = {};
      _obj["weekId"] = Number(this.weekId);
      _obj["blockID"] = Number(this.blockId);
      _obj["cbcTestsdoneCHCs"] = this.firstFormGroup.get('noofCBCtestsdoneatCHC').value;
      _obj["cbcTestsdoneCHCsAGG"] = this.secondFormGroup.get('noofCBCtestsdoneatCHC').value;
      _obj["cbcPositive"] = this.firstFormGroup.get('noCBCpositive').value;
      _obj["cbcPositiveAGG"] = this.secondFormGroup.get('noCBCpositive').value;
      _obj["sstTestsDoneCHCs"] = this.firstFormGroup.get('noofSSTtestsdoneatCHC').value;
      _obj["sstTestsDoneCHCsAGG"] = this.secondFormGroup.get('noofSSTtestsdoneatCHC').value;
      _obj["sstPositive"] = this.firstFormGroup.get('noSSTpositive').value;
      _obj["sstPositiveAGG"] = this.secondFormGroup.get('noSSTpositive').value;
      _obj["samplesSentHPLClab"] = this.firstFormGroup.get('totalsamplessenttoHPLClab').value;
      _obj["samplesSentHPLClabAGG"] = this.secondFormGroup.get('totalsamplessenttoHPLClab').value;
      _obj["userId"] = this.user.id;
     
      this.loaderService.display(true);
     
      this.pathoHPLCService.createReportData(_obj,ENDPOINT.WEEKREPORT.ADDSCREENINGTESTDATA).subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.CloseDialog(true);
      },
      (err: HttpErrorResponse) =>{
        this.loaderService.display(false);
      });
    }

    buildConfirmatoryTestingParams() {
      var _obj = {};
      _obj["weekId"] = Number(this.weekId);
      _obj["blockID"] = Number(this.blockId);

      _obj["anwSamplesTestedHPLClab"] = this.firstFormGroup.get('totalNoofANWsamplestestedatHPLClab').value;
      _obj["anwSamplesTestedHPLClabAGG"] = this.secondFormGroup.get('totalNoofANWsamplestestedatHPLClab').value;
      _obj["anwPositivebyHPLC"] = this.firstFormGroup.get('totalNoofANWpositivebyHPLC').value;
      _obj["anwPositivebyHPLCAGG"] = this.secondFormGroup.get('totalNoofANWpositivebyHPLC').value;
      _obj["spouseSamplesTestedHPLClab"] = this.firstFormGroup.get('totalNoofSpouseSamplesTestedAtHPLClab').value;
      _obj["spouseSamplesTestedHPLClabAGG"] = this.secondFormGroup.get('totalNoofSpouseSamplesTestedAtHPLClab').value;
      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('totalNoofSpousePositiveByHPLC').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('totalNoofSpousePositiveByHPLC').value;

      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('noofPairsOfSamplesForwardedToMolecularLab').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('noofPairsOfSamplesForwardedToMolecularLab').value;
      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('noOfHPLCReportsGeneratedAndPostedToANM').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('noOfHPLCReportsGeneratedAndPostedToANM').value;

      _obj["userId"] = this.user.id;
      this.loaderService.display(true);
     
      this.pathoHPLCService.createReportData(_obj,ENDPOINT.WEEKREPORT.ADDCONFIRMATORYTESTINGDATA).subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.CloseDialog(true);
      },
      (err: HttpErrorResponse) =>{
        this.loaderService.display(false);
      });
    }

    buildMolecularLabdataParams() {
      var _obj = {};
      _obj["weekId"] = Number(this.weekId);
      _obj["blockID"] = Number(this.blockId);

      _obj["anwSamplesTestedHPLClab"] = this.firstFormGroup.get('totalNoofANWsamplestestedatHPLClab').value;
      _obj["anwSamplesTestedHPLClabAGG"] = this.secondFormGroup.get('totalNoofANWsamplestestedatHPLClab').value;
      _obj["anwPositivebyHPLC"] = this.firstFormGroup.get('totalNoofANWpositivebyHPLC').value;
      _obj["anwPositivebyHPLCAGG"] = this.secondFormGroup.get('totalNoofANWpositivebyHPLC').value;
      _obj["spouseSamplesTestedHPLClab"] = this.firstFormGroup.get('totalNoofSpouseSamplesTestedAtHPLClab').value;
      _obj["spouseSamplesTestedHPLClabAGG"] = this.secondFormGroup.get('totalNoofSpouseSamplesTestedAtHPLClab').value;
      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('totalNoofSpousePositiveByHPLC').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('totalNoofSpousePositiveByHPLC').value;

      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('noofPairsOfSamplesForwardedToMolecularLab').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('noofPairsOfSamplesForwardedToMolecularLab').value;
      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('noOfHPLCReportsGeneratedAndPostedToANM').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('noOfHPLCReportsGeneratedAndPostedToANM').value;

      _obj["userId"] = this.user.id;
      this.loaderService.display(true);
     
      this.pathoHPLCService.createReportData(_obj,ENDPOINT.WEEKREPORT.ADDMOLECULARLABDATA).subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.CloseDialog(true);
      },
      (err: HttpErrorResponse) =>{
        this.loaderService.display(false);
      });
    }

    buildPrenataldiagnosisParams() {
      var _obj = {};
      _obj["weekId"] = Number(this.weekId);
      _obj["blockID"] = Number(this.blockId);


      _obj["couplesprePNDcounsellingSCB"] = this.firstFormGroup.get('noofCouplesUnderGoingPrePNDCounselling').value;
      _obj["couplesprePNDcounsellingSCBAGG"] = this.secondFormGroup.get('noofCouplesUnderGoingPrePNDCounselling').value;
      _obj["pndTestingdoneSCB"] = this.firstFormGroup.get('noOfPNDTestingDone').value;
      _obj["pndTestingdoneSCBAGG"] = this.secondFormGroup.get('noOfPNDTestingDone').value;
      _obj["couplespostPNDCounsellingSCB"] = this.firstFormGroup.get('noOfPNDTestPositives').value;
      _obj["couplespostPNDCounsellingSCBAGG"] = this.secondFormGroup.get('noOfPNDTestPositives').value;
      _obj["mtPsPerformedSCB"] = this.firstFormGroup.get('noOfCouplesUnderGoingPostPNDCounselling').value;
      _obj["mtPsPerformedSCBAGG"] = this.secondFormGroup.get('noOfCouplesUnderGoingPostPNDCounselling').value;

      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('noOfMTPPerformed').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('noOfMTPPerformed').value;
      _obj["spousePositiveByHPLC"] = this.firstFormGroup.get('noofWomenContactedByANMAfterMTP').value;
      _obj["spousePositiveByHPLCAGG"] = this.secondFormGroup.get('noofWomenContactedByANMAfterMTP').value;

      _obj["userId"] = this.user.id;
      this.loaderService.display(true);
     
      this.pathoHPLCService.createReportData(_obj,ENDPOINT.WEEKREPORT.ADDPRENATALDIAGNOSIS).subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.CloseDialog(true);
      },
      (err: HttpErrorResponse) =>{
        this.loaderService.display(false);
      });
    }
}
