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
  categorySearch:any = '';
  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.getallFeaturedcategory();
  }
  getallFeaturedcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));  
        this.catarr =  this.catarr.filter((d:any)=> { if(d.add_to_home == 1){  
          return d;  
        }});
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
}
