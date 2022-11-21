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
  getEditionAll(eid:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-edition-details?edition_id=${eid}&customer_id=${customer_id}`);
  }
}
