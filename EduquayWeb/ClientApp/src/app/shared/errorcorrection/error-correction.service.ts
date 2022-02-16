import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class errorCorrectionService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }


  addShipment(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.ADDSHIPMENT);
    return this.http.post<any>({url:apiUrl, body: obj });

  }

  addPNDTShipment(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDT.ADDPNDTSHIPMENT);
    return this.http.post<any>({url:apiUrl, body: obj });

  }
  getErrorCorrectionDetails(value)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIVEBARCODEFORERRORCORRECTION+value);
    return this.http.get<any>({url:apiUrl});
  }
  checkBarcodeExist(value)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.CHECKBARCODEEXIST+value);
    return this.http.post<any>({url:apiUrl, body: {}});
  }
  updateBarcodeError(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.UPDATEBARCODEERROR);
    return this.http.post<any>({url:apiUrl, body: obj});
  }

  getErrorDetails()
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIVEERRORBARCODE);
    return this.http.get<any>({url:apiUrl});
  }

  getRCHErrorDetails(rchid)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIVEFORRCHIDERRORCORRECTION+rchid);
    return this.http.get<any>({url:apiUrl});
  }
  getLMPErrorDetails(obj){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')

    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIEVELMPERRORCORRECTION)
    return this.http.post<any>({url:apiUrl,body:obj});
  }

  updateLMP(obj){


    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.UPDATELMP)
    console.log(apiUrl);
    return this.http.post<any>({url:apiUrl,body:obj});
  }
  getSSTErrorDetails(obj){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIEVESSTERRORCORRECTION)

    return this.http.post<any>({url:apiUrl,body:obj});

  }
  updateSST(obj){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.UPDATESST)
    return this.http.post<any>({url:apiUrl,body:obj});
  }
  getBarcodeErrorReport(obj){

      let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORREPORT.BARCODEERRORREPORT)
      return this.http.post<any>({url:apiUrl,body:obj});
    }

  getRCHErrorReport(obj){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORREPORT.RCHERRORREPORT)
    return this.http.post<any>({url:apiUrl,body:obj});

  }
  getLMPErrorReport(obj){

    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORREPORT.LMPERRORREPORT)
    return this.http.post<any>({url:apiUrl,body:obj});

  }
  getSSTErrorReport(obj){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.ERRORREPORT.SSTERRORREPORT)
    return this.http.post<any>({url:apiUrl,body:obj});

  }
  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.Search.retrieveDistrictApi);
    return this.http.get<any>({url: apiUrl});
  }

  getCHCByDis(id){
    console.log(id);
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.Search.RetrieveCHCbyDistrict+id);
    return this.http.get<any>({url: apiUrl});
  }


  getPHCByCHC(id){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.Search.RetrievePHCByCHC+id);
    return this.http.get<any>({url: apiUrl});
  }
  getANMbyPHC(id){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.Search.RetrieveANMByPHC+id);
    return this.http.get<any>({url: apiUrl});
  }

  uploadCHCHPLCFiles(obj){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.UPLOAD.UploadCBCHPLCFiles)
    return this.http.post<any>({url:apiUrl,body:obj});
  }

  uploadSAFiles(obj){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.UPLOAD.UploadSAFiles)
    return this.http.post<any>({url:apiUrl,body:obj});
  }

  validateuploadSAFilesOld(){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.UPLOAD.ValidateBulkUpload)
    return this.http.post<any>({url:apiUrl,body:{}});
  }
  validateuploadSAFiles(){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.UPLOAD.ValidateBulkUploadNew)
    return this.http.post<any>({url:apiUrl,body:{}});
  }
  createuploadSAFiles(){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.UPLOAD.CreateBulkUpload)
    return this.http.post<any>({url:apiUrl,body:{}});
  }
}

