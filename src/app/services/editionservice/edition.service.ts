import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const Masterapi: string = environment.BASE_URL + '/master';
@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor(private HTTP: HttpClient) { }

  createEdition(edition: any) {
    return this.HTTP.post<any>(Masterapi + `/add-edition`, { ...edition });
  }
  getEditionAll(eid:any,ename:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-edition-details?edition_id=${eid}&edition_name=${ename}&customer_id=${customer_id}`);
  }
  saveUploadImage(pdfDetails:any) {
    return this.HTTP.post<any>(Masterapi + `/save-upload-image`,{ ...pdfDetails });
  }
  getAllImages(imgid:any,eid:any,custid:any){
    return this.HTTP.get<any>(Masterapi + `/get-image-details?image_id=${imgid}&edition_id=${eid}&customer_id=${custid}`);
  }
  saveCompressedImage(imgdetails:any) {
    return this.HTTP.post<any>(Masterapi + `/save-compressed-image`,{ ...imgdetails});
  }
}
