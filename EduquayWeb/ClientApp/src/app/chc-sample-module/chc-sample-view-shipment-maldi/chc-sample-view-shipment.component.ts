import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { user } from 'src/app/shared/auth-response';
import { ChcSampleShipmentlogResponse, ChcSampleShipmentList, ChcSamplesDetail} from 'src/app/shared/chc-sample/chc-sample-shipmentlog/chc-sample-shipmentlog-response';
import { ChcSampleShipmentlogService } from 'src/app/shared/chc-sample/chc-sample-shipmentlog/chc-sample-shipmentlog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/shared/data.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-chc-sample-view-shipment',
  templateUrl: './chc-sample-view-shipment.component.html',
  styleUrls: ['./chc-sample-view-shipment.component.css']
})
export class ChcSampleViewShipmentMaldiComponent implements OnInit {

  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();

  user: user;
  chcSampleShipmentLogErrorMessage: string;
  chcshipmentviewResponse: ChcSampleShipmentlogResponse;
  chcsampleshipmentLogInitResponse: any; 

  shipmentList: ChcSampleShipmentList[]=[];
  id: number;
  shipmentId: string;
  labTechnicianName: string;
  receivingCentralLab: string;
  testingCHC: string;
  logisticsProviderName: string;
  deliveryExecutiveName: string;
  contactNo: string;
  shipmentDateTime: string;
  sampleDetails: ChcSamplesDetail[]=[];
  //shipmentId: number;
  uniqueSubjectId: string;
  subjectName: string;
  rchId: string;
  barcodeNo: string;
  associatedANM: string;
  sampleCollectionDateTime: string;
  shipmentItem: ChcSampleShipmentList;
  fileName: any;

  constructor(
    private ChcSampleShipmentviewService: ChcSampleShipmentlogService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Shipment Details"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.activatedRoute.queryParams.subscribe(params => {
      this.shipmentId = params['q'];
      this.chcsampleshipmentLog(this.user.chcId);
    });
  }

  chcsampleshipmentLog(chcId){
    //update the user id
    this.shipmentList = [];
    this.sampleDetails = [];
    this.shipmentItem = new ChcSampleShipmentList();
    //this.chcshipmentlogRequest = {userId: this.user.id, shipmentFrom: this.user.shipmentFrom };
    let shipmentLog = this.ChcSampleShipmentviewService.getmaldishipmentLog(this.user.chcId)
    .subscribe(response => {
      this.chcshipmentviewResponse = response;
      if(this.chcshipmentviewResponse !== null && this.chcshipmentviewResponse.status === "true"){
        if(this.chcshipmentviewResponse.shipmentLogs.length <= 0){
          this.chcSampleShipmentLogErrorMessage = response.message;
        }
        else{
          //this.shipmentList = this.shipmentResponse.shipmentLogs;
          this.shipmentItem = this.chcshipmentviewResponse.shipmentLogs.find(shipment => shipment.shipmentId === this.shipmentId);
          this.fileName= this.shipmentItem.shipmentId +'.xlsx';
          if(this.shipmentItem.samplesDetail.length > 0){
            this.sampleDetails = this.shipmentItem.samplesDetail;
          }
        }
      }
      else{
        this.chcSampleShipmentLogErrorMessage = response.message;
      }
    },
    (err: HttpErrorResponse) => {
      this.chcSampleShipmentLogErrorMessage = err.toString();
    });
    
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}
