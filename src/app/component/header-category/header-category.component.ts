import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.css']
})
export class HeaderCategoryComponent implements OnInit {
  cust_id:any;
  eid:any;
  currentuser:any;
  imgid:any = '';
  imgarr:any = [];
  currentIndex = 1;
  category:any;
  editionarr:any = [];
  headerarry:any
  editionDate:any
  datepicker:any;
  constructor(private editionService:EditionService,
    private activatedRoute: ActivatedRoute,private loginService:LoginService,private masterService:MasterServiceService,
    private notification: NotificationService,private masterAPI:MasterServiceService,private route:Router) { 
      activatedRoute.params.subscribe(val => {
      let routeParams = this.activatedRoute.snapshot.paramMap;
      this.eid = Number(routeParams.get('id'));
      this.category = routeParams.get('category');
      this.cust_id = environment.CUSTOMER_ID
      this.currentuser = this.loginService.getCurrentUser();
      this.getAllImages();
      
      })
    }

  ngOnInit(): void {
    // let routeParams = this.activatedRoute.snapshot.paramMap;
    // this.eid = Number(routeParams.get('id'));
    // this.category = routeParams.get('category');
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllImages();
    this.getAllEdition();
    this.datepicker = document.getElementById('startDate');
      const today = new Date();
      let date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
      let month = today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
      let year = today.getFullYear(); 
      this.datepicker.setAttribute('max', `${year}-${month}-${date}`);
      
  }
  
  getAllImages(){
    this.editionService.getAllImages(this.imgid,this.eid,environment.CUSTOMER_ID,this.category).subscribe(res=>{
      if(res.code === "success"){
        var img = res.body;
        this.imgarr = img.map((i:any)=> JSON.parse(i));
        this.currentIndex = 1;
        var i:any
        for(i=0;i<this.imgarr?.length;i++){
          this.imgarr[i].index=i+1;
        }
      }else{
        this.imgarr = [];
      }
    })
  }
  getAllEdition(){
    this.editionService.getEditionAll(this.eid,'',environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
        this.editionDate = this.editionarr[0].edition_date;
      } else {
        this.editionarr = []
      }
    }, (err:any) => {
      this.editionarr = []
    })
  }
  goToPage(event:any){  
    if(event){
      this.currentIndex = event;
    }
  }
 
  onChangeDate(editionDate:any){
      this.masterAPI.getAllheadersEdition(environment.CUSTOMER_ID,editionDate).subscribe((res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.headerarry = data.map((dt: any) => JSON.parse(dt));
          this.route.navigate([this.headerarry[0].category_url]);
        } else {
          this.headerarry = []
        }
      }, (err) => {
        this.headerarry = []
      })
  }
}
