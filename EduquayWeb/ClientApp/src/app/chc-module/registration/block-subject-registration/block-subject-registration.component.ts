import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-block-subject-registration',
  templateUrl: './block-subject-registration.component.html',
  styleUrls: ['./block-subject-registration.component.css']
})
export class  BlockSubjectRegistrationComponent implements OnInit {
  currentPage;
  allowPageRidirect = true;
  constructor(private router: Router,private DataService:DataService) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  tabClick(page)
  {
      console.log(page);
      console.log(this.DataService.getdata().chcCurrentPageCount);
      if(this.DataService.getdata().chcCurrentPageCount)
      {
        if(this.DataService.getdata().chcCurrentPageCount.pagenumbr > 0)
        {
          Swal.fire({ allowOutsideClick: false,icon:'success', title: 'You may lose data collected earlier.  Do you still want to leave this page  ?',
            showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No' })
               .then((result) => {
                 if (result.value) {
                  if(page)
                  {
                    this.router.navigate(['/app/block-subregn/'+page]);
                    this.currentPage = page;
                  }
                    else
                    {
                      this.router.navigate(['/app/block-subregn']);
                      this.currentPage = "block-subregn";
                    }
                      
                 }
                 else{
                  
                 }
               });
        }
      }
      else{
        if(page)
        {
          this.router.navigate(['/app/block-subregn/'+page]);
          this.currentPage = page;
        }
        else
        {
          this.router.navigate(['/app/block-subregn']);
          this.currentPage = "block-subregn";
        }
          
      }
      
      
  }

  onActivate(componentReference) {
    console.log(componentReference)
    //componentReference.anyFunction();
 }
    ondeActivate($event) {
      console.log($event);
      this.allowPageRidirect = false;
    }
}
