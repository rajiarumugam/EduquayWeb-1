import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { GenericService } from '../../../shared/generic.service';
declare var $: any 
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SpouseregistrationService } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.service';
import { PositiveSpouseResponse, positiveSubject } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.models';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { DataService } from 'src/app/shared/data.service';
import { PNDTCmasterService } from "src/app/shared/pndtc/pndtc-masterdata.service";
import { ENDPOINT } from 'src/app/app.constant';
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddScreenDataRequest } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-request';
import { AddScreenDataResponse } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';
import { LoaderService } from 'src/app/shared/loader/loader.service';


@Component({
  selector: 'app-nhm-bcc-registration',
  templateUrl: './nhm-bcc-registration.component.html',
  styleUrls: ['./nhm-bcc-registration.component.css']
})
export class NHMBCCRegistrationComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  @ViewChild('lmpdatePicker', { static: false }) LMPPicker;
  dtTrigger: Subject<any> = new Subject();
  
  pndPendingArray=[];
  DAY = 86400000;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  districts: District[] = [];
  erroMessage: string;
  firstFormGroup: FormGroup;
  firstFormCheck = false;
  selectedDistrict ;
  selecteda = null;
  selectedl = null;
  selectedp = null;
  issubmitted=false;
  
  religionData = [];
  casteData = [];
  communityData = [];
  governmentIDData = [];
  selecteddob;
  selectedage;
  GPLADATA = [{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
  GPLAADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat: 'F Y',
    defaultDate: new Date(Date.now()),
   disable:[
     function(date){
       return (date.getDate()>1)
     }
   ]
  };
 
 
  selecteddor = new Date(Date.now());

  user;
  createdSubjectId="";
  showentry:boolean=false;
  statelist = [];
  ageValidate = false;
  Blocksreached: any;
  MonthId: any;
  YearId: any;
  dateform:FormGroup;
  Gramapanchayath: any;
  Hoardings: any;
  Wallpainting: any;
  tinplate: any;
  Handouts: any;
  sunboard: any;
  stickers: any;
  poster: any;
  Flipbook: any;
  busbranding: any;
  printmedia: any;
  screenlistErrorMessage: string;
  addBCCResponse: AddScreenDataResponse;
  photography: any;
  postersforANM: any;
  additionalFlexBanners: any;
  comicStrip: any;
  ashAhandoutwithFAQs: any;
  shgHandoutswithFAQ: any;
  animatedVideos: any;
  socialMedia: any;
  matrimonial: any;
  communityMedia: any;
  television: any;
  radioSpots: any;
  constructor(private masterService: masterService,
     zone: NgZone,private _formBuilder: FormBuilder,
     private httpClientService:HttpClientService,
     private genericService: GenericService,
     private tokenService: TokenService,
     private router: Router,  
      private PNDTCmasterService: PNDTCmasterService, 
      private dataservice: DataService,
      private addbccservice: AddScreenService,
      private modalService: NgbModal,
      private loaderService:LoaderService
      ) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {   
    
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Registration", "page": "Antenatal Woman Registration"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    this.getDistrictData();

  }

  public callFromOutside(id, subject: any): any {
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
  }

  onChangeMonth(fromDate)
  {
    console.log(this.selectedDistrict,"selectedDistrict")
    if(this.dateform.value.fromDate!= null && this.dateform.value.fromDate!=''  && this.selectedDistrict!==undefined && this.selectedDistrict!=undefined)
    {
      var _subjectObj={
        MonthId: new Date(this.dateform.value.fromDate).getMonth()+1,
        YearId: new Date(this.dateform.value.fromDate).getFullYear(),
        districtId: +this.selectedDistrict
        }
        this.addbccservice.addbccreport(_subjectObj).subscribe(async response => {
          this.pndPendingArray = response.data;
          if(this.pndPendingArray.length>=0){
            this.Blocksreached=this.pndPendingArray[0].blocksReached,
            this.Gramapanchayath=this.pndPendingArray[0].gramaPanchayatReached,
            this.Hoardings=this.pndPendingArray[0].hoardings,
            this.Wallpainting=this.pndPendingArray[0].wallPainting,
            this.tinplate=this.pndPendingArray[0].tinPlate,
            this.Handouts=this.pndPendingArray[0].handouts,
            this.sunboard=this.pndPendingArray[0].sunBoard,
            this.stickers=this.pndPendingArray[0].stickers,
            this.poster=this.pndPendingArray[0].poster,
            this.Flipbook=this.pndPendingArray[0].flipbook,
            this.busbranding=this.pndPendingArray[0].busBranding,
            this.printmedia=this.pndPendingArray[0].printMedia,
            this.radioSpots=this.pndPendingArray[0].radioSpots,
            this.television=this.pndPendingArray[0].television,
            this.communityMedia=this.pndPendingArray[0].communityMedia,
            this.matrimonial=this.pndPendingArray[0].matrimonial
            this.socialMedia=this.pndPendingArray[0].socialMedia
            this.animatedVideos=this.pndPendingArray[0].animatedVideos
            this.shgHandoutswithFAQ=this.pndPendingArray[0].shgHandoutswithFAQ
            this.ashAhandoutwithFAQs=this.pndPendingArray[0].ashAhandoutwithFAQs
            this.comicStrip=this.pndPendingArray[0].comicStrip
            this.additionalFlexBanners=this.pndPendingArray[0].additionalFlexBanners
            this.postersforANM=this.pndPendingArray[0].postersforANM
            this.photography=this.pndPendingArray[0].photography
           this.loaderService.display(false);
          } 
        },
        (err: HttpErrorResponse) =>{
          this.loaderService.display(false);
        });
      this.showentry=true;
    }
    else
    {
      this.showentry=false;
    }
  }
 

  onchangedistrict(sd)
  {
 
console.log(sd,"test",sd!=="0: 0")
console.log(this.districts,'ttt')   
if (sd!=="0: 0" && this.dateform.value.fromDate!= null && this.dateform.value.fromDate!='' && this.dateform.value.fromDate!=undefined  ) {
  var _subjectObj={
    MonthId: new Date(this.dateform.value.fromDate).getMonth()+1,
    YearId: new Date(this.dateform.value.fromDate).getFullYear(),
    districtId: +this.selectedDistrict
    }
    this.addbccservice.addbccreport(_subjectObj).subscribe(async response => {
      this.pndPendingArray = response.data;
      if(this.pndPendingArray.length>=0){
        this.Blocksreached=this.pndPendingArray[0].blocksReached,
        this.Gramapanchayath=this.pndPendingArray[0].gramaPanchayatReached,
        this.Hoardings=this.pndPendingArray[0].hoardings,
        this.Wallpainting=this.pndPendingArray[0].wallPainting,
        this.tinplate=this.pndPendingArray[0].tinPlate,
        this.Handouts=this.pndPendingArray[0].handouts,
        this.sunboard=this.pndPendingArray[0].sunBoard,
        this.stickers=this.pndPendingArray[0].stickers,
        this.poster=this.pndPendingArray[0].poster,
        this.Flipbook=this.pndPendingArray[0].flipbook,
        this.busbranding=this.pndPendingArray[0].busBranding,
        this.printmedia=this.pndPendingArray[0].printMedia,
        this.radioSpots=this.pndPendingArray[0].radioSpots,
        this.television=this.pndPendingArray[0].television,
        this.communityMedia=this.pndPendingArray[0].communityMedia,
        this.matrimonial=this.pndPendingArray[0].matrimonial
        this.socialMedia=this.pndPendingArray[0].socialMedia
        this.animatedVideos=this.pndPendingArray[0].animatedVideos
        this.shgHandoutswithFAQ=this.pndPendingArray[0].shgHandoutswithFAQ
        this.ashAhandoutwithFAQs=this.pndPendingArray[0].ashAhandoutwithFAQs
        this.comicStrip=this.pndPendingArray[0].comicStrip
        this.additionalFlexBanners=this.pndPendingArray[0].additionalFlexBanners
        this.postersforANM=this.pndPendingArray[0].postersforANM
        this.photography=this.pndPendingArray[0].photography
       this.loaderService.display(false);
      } 
    },
    (err: HttpErrorResponse) =>{
      this.loaderService.display(false);
    });
      this.showentry=true;
    }
    else
    {
      this.showentry=false;
    }
if((this.checkNullOrUndefined (this.Blocksreached) || this.checkNullOrUndefined (this.Gramapanchayath) || this.checkNullOrUndefined (this.Hoardings)
|| this.checkNullOrUndefined (this.Wallpainting) || this.checkNullOrUndefined (this.tinplate) || this.checkNullOrUndefined (this.Handouts) 
|| this.checkNullOrUndefined (this.sunboard) || this.checkNullOrUndefined (this.stickers) || this.checkNullOrUndefined (this.poster)
|| this.checkNullOrUndefined (this.Flipbook) || this.checkNullOrUndefined (this.busbranding)|| this.checkNullOrUndefined (this.printmedia)
|| this.checkNullOrUndefined (this.radioSpots) || this.checkNullOrUndefined (this.television) || this.checkNullOrUndefined (this.communityMedia)
|| this.checkNullOrUndefined (this.matrimonial) || this.checkNullOrUndefined (this.socialMedia) || this.checkNullOrUndefined (this.animatedVideos) 
|| this.checkNullOrUndefined (this.shgHandoutswithFAQ)  ||  this.checkNullOrUndefined (this.ashAhandoutwithFAQs)  ||this.checkNullOrUndefined (this.comicStrip)  || this.checkNullOrUndefined (this.additionalFlexBanners)
||this.checkNullOrUndefined(this.postersforANM) ||this.checkNullOrUndefined (this.photography))){
  Swal.fire({
    title: 'Are you sure?',
   
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
     this.Blocksreached='null',
     this.Gramapanchayath='null',
     this.Handouts='null',
     this.Hoardings='null',
     this.LMPPicker='null',
     this.Wallpainting='null',
     this.ashAhandoutwithFAQs='null',
     this.busbranding='null',
     this.communityMedia='null',
     this.printmedia='null',
     this.radioSpots='null',
     this.tinplate='null',
     this.stickers='null',
     this.sunboard='null',
     this.television='null',
     this.poster='null',
     this.Flipbook='null',
     this.tinplate='null'
     this.matrimonial='null',
     this.socialMedia='null',
     this.animatedVideos='null',
     this.shgHandoutswithFAQ='null',
     this.ashAhandoutwithFAQs='null',
    this.comicStrip='null',
     this.additionalFlexBanners='null',
   this.postersforANM ='null',
   this.photography='null'
      
    }
  })
}
  
  }
  getDistrictData(){
    this.PNDTCmasterService.getPNDTCDistrict()
    .subscribe(response => {
      console.log(response);
      this.districts = response['data'];
      //this.selectedDistrict = this.user.districtId;
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      //this.erroMessage = err.toString();
    });
  }
  

checkNullOrUndefined(checkvariable)
{
  if(checkvariable!=null && checkvariable!=undefined && String(checkvariable)!=""){
    return true
  }
  else{
    return false
  }
}

onSubmit(){
  this.issubmitted=true;
  if(this.checkNullOrUndefined (this.Blocksreached) && this.checkNullOrUndefined (this.Gramapanchayath) && this.checkNullOrUndefined (this.Hoardings)
     && this.checkNullOrUndefined (this.Wallpainting) && this.checkNullOrUndefined (this.tinplate) && this.checkNullOrUndefined (this.Handouts) 
     && this.checkNullOrUndefined (this.sunboard) && this.checkNullOrUndefined (this.stickers) && this.checkNullOrUndefined (this.poster)
     && this.checkNullOrUndefined (this.Flipbook) && this.checkNullOrUndefined (this.busbranding)&& this.checkNullOrUndefined (this.printmedia)
     && this.checkNullOrUndefined (this.radioSpots) && this.checkNullOrUndefined (this.television) && this.checkNullOrUndefined (this.communityMedia)
     && this.checkNullOrUndefined (this.matrimonial) && this.checkNullOrUndefined (this.socialMedia) && this.checkNullOrUndefined (this.animatedVideos) 
     && this.checkNullOrUndefined (this.shgHandoutswithFAQ) && this.checkNullOrUndefined (this.ashAhandoutwithFAQs) && this.checkNullOrUndefined (this.comicStrip)  && this.checkNullOrUndefined (this.additionalFlexBanners)
     && this.checkNullOrUndefined (this.photography))
    
  {
    this.MonthId=new Date(this.dateform.value.fromDate).getMonth()+1;
    this.YearId=new Date(this.dateform.value.fromDate).getFullYear()

  var _obj = {
    districtId: +(this.selectedDistrict),
    MonthId: this.MonthId,
    YearId: this.YearId,
    blocksReached: +(this.Blocksreached),
    gramaPanchayatReached: +(this.Gramapanchayath),
    hoardings: +(this.Hoardings),
    wallPainting: +(this.Wallpainting),
    tinPlate: +(this.tinplate),
    handouts: +(this.Handouts),
    sunBoard: +(this.sunboard),
    stickers: +(this.stickers),
    poster:+(this.poster),
    flipbook: +(this.Flipbook),
    busBranding: +(this.busbranding),
    printMedia: +(this.printmedia),
    radioSpots: +(this.radioSpots),
    television: +(this.television),
    communityMedia: +(this.communityMedia),
    matrimonial: +(this.matrimonial),
    socialMedia: +(this.socialMedia),
    animatedVideos: +(this.animatedVideos),
    shgHandoutswithFAQ: +(this.shgHandoutswithFAQ),
    ashAhandoutwithFAQs: +(this.ashAhandoutwithFAQs),
    comicStrip: +(this.comicStrip),
    additionalFlexBanners: +(this.additionalFlexBanners),
    postersforANM:+(this.postersforANM),
    photography: +(this.photography),

    userId: this.user.id
   };
    console.log(_obj,"obj")
        let damagedsampleCollection = this.addbccservice.addbcc(_obj)
        .subscribe(response => {
          this.addBCCResponse = response;
          if(this.addBCCResponse !== null && this.addBCCResponse.status === "true"){
            this.showResponseMessage(this.addBCCResponse.message, 's')
          
          }
          else{
            this.showResponseMessage(this.addBCCResponse.message, 'e');
                    this.screenlistErrorMessage = response.message;
          }
          
         
        },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.screenlistErrorMessage = err.toString();
        });
      }
    
       
      }

      showResponseMessage(message: string, type: string){
        var messageType = '';
        if(type === 'e'){
          Swal.fire({icon:'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false, })
        }
        else{
          Swal.fire({icon:'success', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
          .then((result) => {
            if (result.value) {
              if(this.modalService.hasOpenModals){
                this.modalService.dismissAll();              
              }
              this.router.navigate(['/app/nhm-subregn']);
            }
          });

        }
      }

    prePopulateFormDetails()
    {
      setTimeout(()=>{    
          this.selectedDistrict = this.user.districtId;       
          this.communityData = [];
          this.selecteddor = new Date(Date.now());     
          this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.00025)));
          this.LMPPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*30.00025)));
          this.DOBPicker.flatpickr.setDate("");
        }, 100);
    }

    
}
