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
  getEditionAll(eid:any,ename:any,category_id:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-edition-details?edition_id=${eid}&edition_name=${ename}&category_id=${category_id}&customer_id=${customer_id}`);
  }
  saveUploadImage(pdfDetails:any) {
    return this.HTTP.post<any>(Masterapi + `/save-upload-image`,{ ...pdfDetails });
  }
  getAllImages(imgid:any,eid:any,custid:any,category:any){
    return this.HTTP.get<any>(Masterapi + `/get-image-details?image_id=${imgid}&edition_id=${eid}&customer_id=${custid}&category=${category}`);
  }
  saveCompressedImage(imgdetails:any) {
    return this.HTTP.post<any>(Masterapi + `/save-compressed-image`,{ ...imgdetails});
  }
  getEditionByCategory(pageno:any,catid:any,custid:any) {
    return this.HTTP.get<any>(Masterapi + `/get-edition-by-category?page_no=${pageno}&category_id=${catid}&customer_id=${custid}`);
  }
  getEditionByFeaturedCategory(custid:any,category:any) {
    return this.HTTP.get<any>(Masterapi + `/get-edition-by-featured-category?cust_id=${custid}&category=${category}`);
  }
  addSupplement(details:any) {
    return this.HTTP.post<any>(Masterapi + `/add-supplement`,{ ...details });
  }
  getSupplementByEdition(edition_id:any,custid:any) {
    return this.HTTP.get<any>(Masterapi + `/get-supplement-by-edition?edition_id=${edition_id}&cust_id=${custid}`);
  }
}
