import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featuredcategories',
  templateUrl: './featuredcategories.component.html',
  styleUrls: ['./featuredcategories.component.css']
})
export class FeaturedcategoriesComponent implements OnInit {
  catid:any = '';
  catarr:any = [];
  currentuser:any
  p: any = 1;
  constructor(private categoryService: CategoryServiceService,private loginService : LoginService,
    private notification:NotificationService,private router:Router) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  getallcategory() {
    this.categoryService.getFeaturedCategory(this.catid,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        console.log(this.catarr)
      } else {
        this.catarr = []
      }
    }, (err:any) => {
      this.catarr = []
    })
  }
  removeFromHome(data:any){
    console.log(data,'data')
    data.createdby = this.currentuser.user_id;
    data.flag = 'U';
    data.addToHome = 0;
    data.ads_img = data.ads_image;
    console.log(data,'data')
    this.categoryService.createCategory(data).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Category removed from home.");
        window.location.reload();
      } else {
        this.notification.error(res.message)
      }
    })
  }
}
