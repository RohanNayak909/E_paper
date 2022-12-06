import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { DeleteConfirmationModalComponent } from '../../common/delete-confirmation-modal/delete-confirmation-modal.component';
import { AddtohomeeditionComponent } from './addtohomeedition/addtohomeedition.component';
import { EditeditionComponent } from './editedition/editedition.component';
import { NeweditionComponent } from './newedition/newedition.component';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.css']
})
export class EditionsComponent implements OnInit {
  eid:any = '';
  currentuser:any;
  editionarr:any = [];
  p:any = 1;
  editionSearch:any = '';
  catid:any = '';
  catarr:any = [];
  categorysearch:any = '';
  constructor(private matDialog: MatDialog,private editionService: EditionService,private notification: NotificationService,
    private loginService: LoginService,private masterService: MasterServiceService,private router: Router,private categoryService: CategoryServiceService) { }


  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllEdition();
    this.getallcategory();
  }
  
  newEdition(){
    const dialogRef = this.matDialog.open(NeweditionComponent, {
      height: '580px',
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  getAllEdition(){
    this.editionService.getEditionAll(this.eid,this.editionSearch,this.currentuser.customer_id).subscribe(res=>{
      if(res.code = 'sucess'){
        var data = res.body;
        this.editionarr = data.map((dt:any) => JSON.parse(dt));
        console.log(this.editionarr,'edition');
      }else{
        this.editionarr = [];
       }
      },(err) => {
        this.editionarr = []
      })
  }
  editEdition(data:any){  
    const dialogRef = this.matDialog.open(EditeditionComponent,{
      height: '550px',
      width: '50vw',
      data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  deleteEdition(data:any){
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result:any) => {      
      if(result){
        this.editionDelete(data);
      }
    });
    return;
  }
  editionDelete(id:any){
    console.log(id,'data');
    var funct = 'EDITION';
    this.masterService.bulkDeletion(funct,id,0,environment.CUSTOMER_ID).subscribe(res=>{
      if(res.code === "success"){
        this.notification.success("Category deleted successfully");
        this.getAllEdition();
      }else {
        this.notification.error(res.message);
      }
    })
  }
  addToHome(data:any){
    const dialogRef = this.matDialog.open(AddtohomeeditionComponent,{
      data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  upload(eid:any){
    this.router.navigate([`/admin/epaper/edition/upload-pages/${eid}`]);
  }
  onKeydown(event: any) {
    event.preventDefault();
  }
  searchEdition(){
    this.editionService.getEditionAll('',this.editionSearch,this.currentuser.customer_id).subscribe(res=>{
      console.log('hi',this.eid, this.editionSearch,this.currentuser.customer_id)
      if(res.code = 'sucess'){
        var data = res.body;
        this.editionarr = data.map((dt:any) => JSON.parse(dt));
        console.log(this.editionarr,'edition');
      }else{
        this.editionarr = [];
       }
      },(err) => {
        this.editionarr = []
      })
  }
  getallcategory() {
    this.categoryService.getAllCategory('', '',environment.CUSTOMER_ID).subscribe((res: any) => {
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
}
