import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { DeleteConfirmationModalComponent } from '../../common/delete-confirmation-modal/delete-confirmation-modal.component';
import { AddtohomeeditionComponent } from './addtohomeedition/addtohomeedition.component';
import { EditeditionComponent } from './editedition/editedition.component';
import { NeweditionComponent } from './newedition/newedition.component';
import { SupplimentpagesComponent } from './supplimentpages/supplimentpages.component';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.css']
})
export class EditionsComponent implements OnInit {
  eid: any = '';
  currentuser: any;
  editionarr: any = [];
  p: any = 1;
  editionSearch: any = '';
  catid: any = '';
  catarr: any = [];
  categorySearch: any = '';
  headerarry:any = [];
  category:any;
  editionId:any;
  dateSearch:any
  edition:any = new editionModel();
  constructor(private matDialog: MatDialog, private editionService: EditionService, private notification: NotificationService,
    private loginService: LoginService, private masterService: MasterServiceService, private router: Router, private categoryService: CategoryServiceService,
    private masterAPI:MasterServiceService,private spinnerService: LoaderService) { }


  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllEdition();
    this.getallcategory();
  }

  getAllEditionByDate() {
    this.categorySearch = '';
    this.editionSearch = '';
    this.editionService.getEditionAllByDate(this.dateSearch,this.currentuser.customer_id).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.editionarr = [];
      }
    }, (err) => {
      this.editionarr = []
    })
  }
 
  getAllEdition() {
    this.categorySearch = '';
    this.editionSearch = '';
    this.dateSearch = ''
    this.editionService.getEditionAll(this.eid, this.editionSearch,'',this.currentuser.customer_id).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.editionarr = [];
      }
    }, (err) => {
      this.editionarr = []
    })
  }
  editEdition(data: any) {
    this.router.navigate([`/admin/epaper/edition/edit/${data.edition_id}`]);
  }
  deleteEdition(data: any) {
    this.editionId = data;
  }
  editionDelete() {
    var funct = 'EDITION';
    this.masterService.bulkDeletion(funct,this.editionId, 0, environment.CUSTOMER_ID).subscribe(res => {
      if (res.code === "success") {
        document.getElementById("closeDeleteModalButton")?.click();
        this.notification.success("Edition deleted successfully");
        this.getAllEdition();
      } else {
        document.getElementById("closeDeleteModalButton")?.click();
        this.notification.error(res.message);
      }
    })
  }
  cancel(){
    document.getElementById("closeDeleteModalButton")?.click();
  }
  upload(cat_name:any,eid: any) {
    this.router.navigate([`/admin/epaper/edition/upload-pages/${cat_name}/${eid}`]);
  }
  onKeydown(event: any) {
    event.preventDefault();
  }
  searchEdition() {
    this.dateSearch = ''
    if(this.editionSearch){
    this.editionService.getEditionAll('', this.editionSearch,'',this.currentuser.customer_id).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.editionarr = [];
      }
    }, (err) => {
      this.editionarr = []
    })
  }else if (this.categorySearch){
    this.editionService.getEditionAll('','',this.categorySearch,this.currentuser.customer_id).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.editionarr = [];
      }
    }, (err) => {
      this.editionarr = []
    }) 
  }else{
    this.getAllEdition();
  }
  }
  getallcategory() {
    this.categoryService.getAllCategory('', '', environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  preview(data:any){
    console.log(data);
    this.masterAPI.getAllheadersEdition(environment.CUSTOMER_ID,data.edition_date,data.category_name).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.headerarry = data.map((dt: any) => JSON.parse(dt));
        this.router.navigate([this.headerarry[0].category_url]);
      } else {
        this.headerarry = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
  
  isViewOnFrontPage(data:any,i:any) {
    this.spinnerService.show();
    this.edition = data;
    this.edition.flag = 'FC';
    this.edition.add_to_home = i;
    this.edition.createdby = this.currentuser.user_id;
    this.editionService.createEdition(this.edition).subscribe(res => {
      if (res.code === "success") {
        this.spinnerService.hide();
        this.getAllEdition();
        if(i === 1) 
        this.notification.success("Edition added to front page");
        else this.notification.success("Edition removed from front page");
      } else {
        this.notification.error(res.message)
        this.spinnerService.hide();
      }
    },(err)=>{
      console.log(err);
      this.spinnerService.hide();
    });
  }

  addSupplimentPages(data:any){
   this.router.navigate([`/admin/edition/supplement/view/${data.edition_id}`]);
  }
}
