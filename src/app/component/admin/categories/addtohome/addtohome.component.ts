import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { EditcategoryComponent } from '../editcategory/editcategory.component';

@Component({
  selector: 'app-addtohome',
  templateUrl: './addtohome.component.html',
  styleUrls: ['./addtohome.component.css']
})
export class AddtohomeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private categoryService:CategoryServiceService,private loginService : LoginService,
    private notification:NotificationService,private router:Router,
    public matDialogRef: MatDialogRef<EditcategoryComponent>) { }

  category:any
  currentuser:any
  ngOnInit(): void {
    this.category = this.data;
    this.currentuser = this.loginService.getCurrentUser();
    // this.addToHome();
    // this.removeFromHome();
  }
  addToHome(){
    this.category.createdby = this.currentuser.user_id;
    this.category.flag = 'U';
    this.category.addToHome = 1;
    this.category.ads_img = this.category.ads_image;
    this.categoryService.createCategory(this.category).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Category added to home.");
        this.matDialogRef.close();
      } else {
        this.notification.error(res.message)
      }
    })
  
  }
  removeFromHome(){
    this.category.createdby = this.currentuser.user_id;
    this.category.flag = 'U';
    this.category.addToHome = 0;
    this.category.ads_img = this.category.ads_image;
    this.categoryService.createCategory(this.category).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Category removed from home.");
        this.matDialogRef.close();
      } else {
        this.notification.error(res.message)
      }
    })
  }
}
