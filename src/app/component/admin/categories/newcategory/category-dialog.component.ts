import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {
  catid: any = ''
  catarr: any[] = []
  categorySearch: any = '';

  category: any;
  currentuser: any;

  constructor(private loginService: LoginService, private categoryService: CategoryServiceService,
    private notification: NotificationService, private router: Router,
    public matDialogRef: MatDialogRef<CategoryDialogComponent>,private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.category = new categoryModel();
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch, environment.CUSTOMER_ID).subscribe((res: any) => {
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
  addCategory() {
    this.spinnerService.show();
    this.category.createdby = this.currentuser.user_id;
    this.category.flag = 'I';
    this.category.customer_id = environment.CUSTOMER_ID;
    this.category.category_id = null;
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
      this.categoryService.createCategory(this.category).subscribe(res => {
        if (res.code === "success") {
          this.notification.success(res.message);
          window.location.reload();
        } else {
          this.notification.error(res.message)
          this.spinnerService.hide();
        }
      },(err)=>{
        console.log(err);
        this.spinnerService.hide();
      });
    }, 1000)
  }
  onNoClick(): void {
    this.matDialogRef.close();
  }
}
