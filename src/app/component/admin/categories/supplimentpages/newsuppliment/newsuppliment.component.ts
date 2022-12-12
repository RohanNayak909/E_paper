import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsuppliment',
  templateUrl: './newsuppliment.component.html',
  styleUrls: ['./newsuppliment.component.css']
})
export class NewsupplimentComponent implements OnInit {
 suppliment: any;
 currentuser: any;
 catarr: any[] = []
 catid: any = ''
 categorySearch: any = '';

  constructor( public matDialogRef: MatDialogRef<NewsupplimentComponent>,private categoryService:CategoryServiceService,private loginService: LoginService) { }

  ngOnInit(): void {
    this.suppliment = new categoryModel();
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
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
  addSuppliment(){
    this.suppliment.createdby = this.currentuser.user_id;
    this.suppliment.flag = 'I';
    this.suppliment.customer_id = environment.CUSTOMER_ID;
    this.suppliment.category_id =null;
    console.log(this.suppliment);
  }
  onNoClick(): void {
    this.matDialogRef.close();
  }
}
