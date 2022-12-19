import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { NewsupplimentComponent } from './newsuppliment/newsuppliment.component';

@Component({
  selector: 'app-supplimentpages',
  templateUrl: './supplimentpages.component.html',
  styleUrls: ['./supplimentpages.component.css']
})
export class SupplimentpagesComponent implements OnInit {
  catid: any = '';
  categorySearch: any = '';
  catarr: any = [];
  currentuser: any;
  eid: any;
  supparr: any = [];
  supplementId: any;
  supplement: any = new editionModel();
  constructor(private categoryService: CategoryServiceService, private loginService: LoginService,
    private activatedRoute: ActivatedRoute, private editionService: EditionService, private notification: NotificationService,
    private masterService: MasterServiceService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.getallcategory();
    this.getSupplement();
  }

  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch, environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        console.log(this.catarr);
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  getSupplement() {
    this.editionService.getSupplementByEdition(this.eid, environment.CUSTOMER_ID).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.supparr = data.map((dt: any) => JSON.parse(dt));
        console.log(this.supparr);
      } else {
        this.supparr = []
      }
    }, (err) => {
      this.supparr = []
    })
  }

  addSuppliment() {
    this.supplement.createdby = this.currentuser.user_id;
    this.supplement.flag = 'I';
    this.supplement.customer_id = environment.CUSTOMER_ID;
    this.supplement.edition_id = this.eid;
    console.log(this.supplement);

    this.editionService.addSupplement(this.supplement).subscribe((res: any) => {
      if (res.code === "success") {
        document.getElementById("closeModalButton")?.click();
        this.notification.success("Supplement added successfully");
        this.getSupplement();
      } else {
        this.notification.error(res.message);
      }
    }, (err) => {
      this.notification.error(err.message);
    })
  }
  editSupplement(data:any){
    console.log(data);
    this.supplement = data;
  }
  supplementEdit(){
    console.log(this.supplement);
    this.supplement.createdby = this.currentuser.user_id;
    this.supplement.flag = 'U';
    this.supplement.customer_id = environment.CUSTOMER_ID;
    this.supplement.edition_id = this.eid;
    console.log(this.supplement);

    this.editionService.addSupplement(this.supplement).subscribe((res: any) => {
      if (res.code === "success") {
        document.getElementById("closeModalButton")?.click();
        this.notification.success("Supplement edited successfully");
        this.getSupplement();
        this.supplement = '';
      } else {
        this.notification.error(res.message);
      }
    }, (err) => {
      this.notification.error(err.message);
    })
  }
  closemodal(){
    document.getElementById("closeModalButton")?.click();
  }
  deleteSupplement(id: any) {
    this.supplementId = id;
  }
  supplementDelete() {
    var funct = 'SUPPLEMENT';
    this.masterService.bulkDeletion(funct, this.supplementId, 0, environment.CUSTOMER_ID).subscribe(res => {
      if (res.code === "success") {
        document.getElementById("closeDeleteModalButton")?.click();
        this.notification.success("Edition deleted successfully");
        this.getSupplement();
      } else {
        document.getElementById("closeDeleteModalButton")?.click();
        this.notification.error(res.message);
      }
    })
  }
  cancel() {
    document.getElementById("closeDeleteModalButton")?.click();
  }
  closeModal(){
    this.supplement = '';
    document.getElementById("closeModalButton")?.click();
   
  }
}
