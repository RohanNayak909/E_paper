import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { AddtohomeComponent } from './addtohome/addtohome.component';
import { EditcategoryComponent } from './editcategory/editcategory/editcategory.component';
import { CategoryDialogComponent } from './newcategory/category-dialog.component';


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
  constructor(private loginService:LoginService,private matDialog: MatDialog,
    private categoryService : CategoryServiceService,
    private notification:NotificationService,private router:Router) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  addCategory(){
    const dialogRef = this.matDialog.open(CategoryDialogComponent, {
      height: '500px',
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
  //  localStorage.setItem('data', JSON.stringify(data));
    console.log('editeddata',data)
    const dialogRef = this.matDialog.open(EditcategoryComponent,{
      data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
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
  console.log(data,'data');
  this.categoryService.deleteCategory(data.category_id,data.customer_id).subscribe(res=>{
    if(res.code === "success"){
      this.notification.success("Category deleted successfully");
     window.location.reload();
    }else {
      this.notification.error(res.message);
    }
  })
  }
  addToHome(data:any){
    const dialogRef = this.matDialog.open(AddtohomeComponent,{
      data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
}
