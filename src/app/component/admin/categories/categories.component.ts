import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { AddtohomeComponent } from './addtohome/addtohome.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { CategoryDialogComponent } from './newcategory/category-dialog.component';
import { SupplimentpagesComponent } from './supplimentpages/supplimentpages.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  currentuser:any;
  catarr: any[] = []
  catadata: any[] = []
  catid: any = ''
  categorySearch: any = '';
  p: any = 1;
  category:any = new categoryModel();
  constructor(private loginService:LoginService,private matDialog: MatDialog,
    private categoryService : CategoryServiceService,private masterService: MasterServiceService,
    private notification:NotificationService,private router:Router) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  onKeydown(event: any) {
    event.preventDefault();
  }
 
  addCategory(){
    const dialogRef = this.matDialog.open(CategoryDialogComponent, {
      height: '580px',
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch,environment.CUSTOMER_ID).subscribe((res: any) => {
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
  editCategory(data:any){
    this.router.navigate([`/admin/epaper/category/edit/${data.category_id}`]);
    
  }
  deleteCategory(data:any){
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result:any) => {      
      if(result){
        this.categoeyDelete(data);
      }
    });
    return;
  }
  categoeyDelete(data:any){
  var funct = 'CATEGORY';
  this.masterService.bulkDeletion(funct,data,0,environment.CUSTOMER_ID).subscribe(res=>{
    if(res.code === "success"){
      this.notification.success("Category deleted successfully");
      this.getallcategory();
    }else {
      this.notification.error(res.message);
    }
  })
  }
  searchCategory() {
    this.categoryService.getAllCategory('', this.categorySearch,this.currentuser.customer_id).subscribe((res: any) => {
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
  addSupplimentPages(data:any){
    const dialogRef = this.matDialog.open(SupplimentpagesComponent,{
      height: '500px',
      width: '50vw',
      data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  addToFront(data:any){
    this.category = data;
  }
  addToHome(){
    this.category.createdby = this.category.createdby;
    this.category.flag = 'U';
    this.category.addToHome = 1;
    this.category.ads_img = this.category.ads_image;
    this.categoryService.createCategory(this.category).subscribe(res => {
      if (res.code === "success") {
       document.getElementById("closeModalButton")?.click();
        this.notification.success("Category added to home.");
      } else {
        this.notification.error(res.message)
      }
    })
  }
  removeFromHome(){
    this.category.createdby = this.category.user_id;
    this.category.flag = 'U';
    this.category.addToHome = 0;
    this.category.ads_img = this.category.ads_image;
    this.categoryService.createCategory(this.category).subscribe(res => {
      if (res.code === "success") {
        document.getElementById("closeModalButton")?.click();
        this.notification.success("Category removed from home.");
      } else {
        this.notification.error(res.message)
      }
    })
  }
}
