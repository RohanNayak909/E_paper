import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const MasterAPI: string = environment.BASE_URL + '/user';

const Masterapi: string = environment.BASE_URL + '/master';

@Injectable({
  providedIn: 'root'
})
export class AdserviceService {

  constructor(private HTTP: HttpClient) { }

  addAd(ads: any) {
    return this.HTTP.post<any>(Masterapi + `/add-ads`, { ...ads });
  }

  getAllAds(ads_id: any, img_size: any, customer_id: any, type: any) {
    return this.HTTP.get<any>(Masterapi + `/get-ads-details?ads_id=${ads_id}&img_size=${img_size}&customer_id=${customer_id}&type=${type}`);
  }
}
