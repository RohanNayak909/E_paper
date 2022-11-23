import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  catid:any = '';
  catarr:any = [];
  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.getallFeaturedcategory();
  }
  getallFeaturedcategory() {
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
}
