import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
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
    private router: Router,private spinnerService: LoaderService,private editionService: EditionService) { }

  ngOnInit(): void {
    this.getallFeaturedcategory();
    this.currentDate = this.currDate.getFullYear()+"-"+(this.currDate.getMonth()+1)+"-"+this.currDate.getDate();
   
  }
  getallFeaturedcategory() {
    this.spinnerService.show()

    this.categoryService.getFeaturedCategory(this.catid, this.categorySearch,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));  
        this.catarr =  this.catarr.filter((d:any)=> { if(d.add_to_home == 1){  
          return d;  
        }});
        this.spinnerService.hide()

      } else {
        this.catarr = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.catarr = []
      this.spinnerService.hide()

    })
  }

  previewEdition(data:any){
    this.editionService.getEditionByFeaturedCategory(environment.CUSTOMER_ID,data).subscribe((res: any) => {
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
