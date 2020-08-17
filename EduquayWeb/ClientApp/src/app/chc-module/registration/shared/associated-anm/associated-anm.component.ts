import { Component, OnInit, Pipe, NgZone, ViewChild, EventEmitter, Output } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HttpErrorResponse } from '@angular/common/http';
import {LoaderService} from '../../../../shared/loader/loader.service';
declare var $: any 
import Swal from 'sweetalert2';

@Component({
    selector: 'associated-ANM',
    templateUrl: './associated-anm.component.html',
    styleUrls: ['./associated-anm.component.css']
  })
  export class AssociatedANMComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
    @Output() associatedANMselected: EventEmitter<any> = new EventEmitter<any>(); 
    associatedANMData = [];
    associatedCount = 0;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    constructor(private masterService: masterService,private loaderService: LoaderService) { }
    ngOnInit() {
    
      this.loaderService.display(false);
        //this.user = JSON.parse(this.tokenService.getUser('lu'));
    }

    dataRefreash(chcid)
    {
      this.loaderService.display(true);
      console.log(chcid);
       this.masterService.getAssociatedANM(chcid)
        .subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.associatedANMData = response.associatedANMDetail;
        if(this.associatedCount === 0)
            this.dtTrigger.next();
        else
            this.rerender();
        this.associatedCount++;
        $('#fadeinModal1').modal('show');
        },
        (err: HttpErrorResponse) =>{
        });
    }

    associatedClick(i)
  {
      console.log(i);
      /*this.selectedAssociatedANMID = i;
      this.selectedassociatedANM = this.associatedANMData[i].anmName;
      this.selectedsc = this.associatedANMData[i].scName;
      this.selectedripoint = this.associatedANMData[i].riPoint;
      this.selectedTestingchc = this.associatedANMData[i].testingCHCId;*/

      Swal.fire({
        title: 'Are you sure?',
        text: "Confirm Associated ANM is "+this.associatedANMData[i].anmName,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ffffff'
      }).then((result) => {
        if (result.value) {
            this.associatedANMselected.emit(this.associatedANMData[i]);
            $('#fadeinModal1').modal('hide');
         }
         else{
          this.associatedANMData[i].click = undefined;
            $('#fadeinModal1').modal('show');
         }
        })
    
    }
    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
        dtInstance.clear();
        dtInstance.destroy();
        // Call the dtTrigger to rerender again       
        this.dtTrigger.next();
      });
    }   
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  }