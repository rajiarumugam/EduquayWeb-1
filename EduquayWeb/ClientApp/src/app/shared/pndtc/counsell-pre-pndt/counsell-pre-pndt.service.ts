import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { CounsellPrePndtResquest, AddPrePndtCounsellingRequest } from './counsell-pre-pndt-resquest';
import { CounsellPrePndtResponse, AddPrePndtcCounsellingResponse, CounselledprepndtResponse, prePndtFileUploadResponse } from './counsell-pre-pndt-response';

@Injectable({
  providedIn: 'root'
})
export class CounsellPrePndtService {

  retrieveprepndtCounsellingApi: string = "api/v1/PNDTC/RetrievePrePNDTCounselling";
  prePndtcFileUploadApi: string = "api/v1/PNDTC/PrePNDTFileUpload";
  //prePndtcFileUploadApi: string ="api/v1/PNDTC/TestingPurpose";
  addprepndtCounsellingeApi: string = "api/v1/PNDTC/ADDPrePNDTCounselling";
  retrieveprepndtCounselledYesApi: string ="api/v1/PNDTC/RetrievePrePNDTCounselledYes";
  retrieveprepndtCounselledNoApi: string ="api/v1/PNDTC/RetrievePrePNDTCounselledNo";
  retrieveprepndtCounselledPendingApi: string ="api/v1/PNDTC/RetrievePrePNDTCounselledPending";
  retrieveprepndtPickandPackApi: string ="api/v1/PNDTC/RetrievePNDTPickAndPack/";

  //formData: any;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getcounsellingLists(counsellingList: CounsellPrePndtResquest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtCounsellingApi);
    return this.http.post<CounsellPrePndtResponse>({url: apiUrl, body: counsellingList});
  }

  getcounselledYesLists(counselledYesList: CounsellPrePndtResquest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtCounselledYesApi);
    return this.http.post<CounselledprepndtResponse>({url: apiUrl, body: counselledYesList});
  }

  getcounselledNoLists(counselledNoList: CounsellPrePndtResquest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtCounselledNoApi);
    return this.http.post<CounselledprepndtResponse>({url: apiUrl, body: counselledNoList});
  }

  getcounselledPendingLists(counselledPendingList: CounsellPrePndtResquest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtCounselledPendingApi);
    return this.http.post<CounselledprepndtResponse>({url: apiUrl, body: counselledPendingList});
  }

  AddprepndtCounselling(addCounselling: AddPrePndtCounsellingRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.addprepndtCounsellingeApi);
    return this.http.post<AddPrePndtcCounsellingResponse>({url: apiUrl, body: addCounselling});
  }

  prePNDTuploadFile( formData: FormData){
    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
      // 'Content-Type': 'application/pdf',
    });
    let headoptions = {
      headers: httpHeaders
    };
    let apiUrl = this.genericServices.buildApiUrl(this.prePndtcFileUploadApi);
    return this.http.post<prePndtFileUploadResponse>({url: apiUrl, header: headoptions, body: formData});
  }

  add(addCounselling: AddPrePndtCounsellingRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.addprepndtCounsellingeApi);
    return this.http.post<AddPrePndtcCounsellingResponse>({url: apiUrl, body: addCounselling});
  }
 
  retrievePNDTPickAndPack()
  {
    let user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtPickandPackApi+user.pndtLocationId);
    return this.http.get<any>({url: apiUrl});
  }
}
