import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
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
  currDate = new Date();
  currentDate:any;
  headerarry:any = [];
  constructor(private categoryService: CategoryServiceService,private masterAPI:MasterServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getallFeaturedcategory();
    this.currentDate = this.currDate.getFullYear()+"-"+(this.currDate.getMonth()+1)+"-"+this.currDate.getDate();
   
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

  previewEdition(data:any){
    this.masterAPI.getAllheadersEdition(environment.CUSTOMER_ID,this.currentDate,data).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.headerarry = data.map((dt: any) => JSON.parse(dt));
        console.log(this.headerarry)
        this.router.navigate([this.headerarry[0].category_url]);
      } else {
        this.headerarry = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
}
