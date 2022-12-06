import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

const MasterAPI: string = environment.BASE_URL + '/master';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor(private HTTP: HttpClient) { }

  makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890*&^%$#@!";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getRoles(customer_id:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-roles?customer_id=${customer_id}`);
  }

  getDropDownList(dropdown_name:any,customer_id:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-dropdown-det?dropdown_name=${dropdown_name}&customer_id=${customer_id}`);
  }

  createMedia(media: any) {
    return this.HTTP.post<any>(MasterAPI + `/add-media`, {...media});
  }

  getAllheaders(customer_id:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-header-category?customer_id=${customer_id}`);
  }

  getAllheadersEdition(customer_id:any,edate:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-header-edition?customer_id=${customer_id}&edate=${edate}`);
  }

  getWithoutHeaderCategory(customer_id:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-without-header-category?customer_id=${customer_id}`);
  }

  updateheader(headerarry: any) {
    return this.HTTP.post<any>(MasterAPI + `/update-header`, {...headerarry});
  }

  bulkDeletion(functions: any, deleteids: any, userid: any, customerid: any) {
    return this.HTTP.get<any>(MasterAPI + `/bulk-deletion?function=${functions}&&deleteids=${deleteids}&&userid=${userid}&&customerid=${customerid}`);
  }
  
  getDashboardCount(customer_id:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-dashboard-count?customer_id=${customer_id}`);
  }
  
  getPublishingDetails(customer_id:any){
    return this.HTTP.get<any>(MasterAPI + `/get-publishing-details?customer_id=${customer_id}`);
  }

  getPublishedDetails(customer_id:any){
    return this.HTTP.get<any>(MasterAPI + `/get-published-details?customer_id=${customer_id}`);
  }
  getCommentDetails(customer_id:any){
    return this.HTTP.get<any>(MasterAPI + `/get-comment-details?customer_id=${customer_id}`);
  }
  deleteMedia(media: any) {
    return this.HTTP.post<any>(MasterAPI + `/delete-media`, {...media});
  }
}
