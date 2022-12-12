import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  catid:any = '';
  categorySearch:any = '';
  catarr:any = [];
  category:any;
  currentuser:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private categoryService:CategoryServiceService,private loginService : LoginService,
    private notification:NotificationService,private router:Router,
    public matDialogRef: MatDialogRef<EditcategoryComponent>) { }
 
  ngOnInit(): void {
    this.category = this.data;
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        var i:any
        for(i=0;i<this.catarr?.length;i++){
          this.catarr[i].category_id= this.catarr[i].category_id.toString();
        }
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  onfileselected(event: any) {
    this.category.Multiimage = <File>event.target.files[0];
    let postImg!: any;
    if ((this.category.Multiimage.type != 'image/jpeg') && (this.category.Multiimage.type != 'image/png')) {
      // this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.category.Multiimage = ''
      
      postImg = document.querySelector('#uploadAds')
      postImg.src = 'assets/img/image-preview-icon-picture-placeholder-vector-31284806.jpg';
     
    }
    else {
      this.category.ads_img = this.category.Multiimage.type
      postImg = document.querySelector('#uploadAds');
      postImg.src = URL.createObjectURL(this.category.Multiimage);
    }
  }
  editCategory(){
    this.category.createdby = this.currentuser.user_id;
    this.category.flag = 'U';
    this.category.customer_id = environment.CUSTOMER_ID;
    this.category.category_id = this.data.category_id;
    this.category.addToHome = this.category.add_to_home;
    console.log(this.category.ads_image,'image');
    console.log(this.category.ads_img,'img');
    if (this.category.ads_image) {
      if (this.category.ads_image != null){
        var media_ext = this.category.ads_image.split("media/")[1];
        this.category.media_ext = media_ext.split(".")[1];
      }
    }
    if (this.category.ads_img) {
      this.category.media_ext = this.category.ads_img.split("/")[1];
    }
 
    if (this.category.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.category.Multiimage)
      reader.onload = function () {

      };
    }
     setTimeout(() => {
      if (this.category.Multiimage) {
        this.category.base64file = reader.result
      }
      if(this.category.ads_image) {
        this.category.ads_img = this.category.ads_image
      }
    this.categoryService.createCategory(this.category).subscribe(res=>{
      if (res.code === "success") {
        this.matDialogRef.close(this.category.category_id);
        this.notification.success("Category Updated Successfully");
        window.location.reload();
      } else {
        this.notification.error(res.message)
      }
    });
    }  , 1000)
  }
  onNoClick(): void {
    this.matDialogRef.close();
  }
}
