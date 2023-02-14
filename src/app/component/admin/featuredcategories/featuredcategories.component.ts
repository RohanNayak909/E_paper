import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featuredcategories',
  templateUrl: './featuredcategories.component.html',
  styleUrls: ['./featuredcategories.component.css']
})
export class FeaturedcategoriesComponent implements OnInit {
  catid: any = '';
  catarr: any = [];
  currentuser: any
  p: any = 1;
  categorySearch: any = '';
  category: any = new categoryModel();
  constructor(private categoryService: CategoryServiceService, private loginService: LoginService,
    private notification: NotificationService, private router: Router,private spinnerService:LoaderService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }

  getallcategory() {
    this.categorySearch = ''
    this.categoryService.getFeaturedCategory(this.catid, this.categorySearch, environment.CUSTOMER_ID).subscribe((res: any) => {
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

  onKeydown(event: any) {
    event.preventDefault();
  }

  searchCategory() {
    this.categoryService.getFeaturedCategory(this.catid, this.categorySearch, environment.CUSTOMER_ID).subscribe((res: any) => {
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

  updateFeaturedCategory() {
    this.spinnerService.show();
    this.catarr.forEach((e:any) => {
      e.createdby = this.currentuser.user_id;
    });
    this.categoryService.updateCategory(this.catarr).subscribe((res: any) => {
      if (res.code === "success") {
        this.notification.success(res.message);
        this.getallcategory();
        this.spinnerService.hide();
      } else {
        this.notification.error(res.message)
        this.spinnerService.hide();
      }
    }, (err: any) => {
      this.notification.error(err.message)
      this.spinnerService.hide();
    })
  }

  isViewOnFrontPage(data:any) {
    this.spinnerService.show();
    this.category = data;
    this.category.flag = 'FC';
    this.category.addToHome = 0;
    this.categoryService.createCategory(this.category).subscribe(res => {
      if (res.code === "success") {
        this.spinnerService.hide();
        this.getallcategory();
        this.notification.success("Category removed from front page.");
      } else {
        this.notification.error(res.message)
        this.spinnerService.hide();
      }
    },(err)=>{
      console.log(err);
      this.spinnerService.hide();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
