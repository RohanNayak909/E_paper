import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerarry: any[] = []
  customer_id: any;
  edate:any = '';
  currDate = new Date();
 
  constructor(private masterAPI: MasterServiceService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getallheaders();
  }
  getallheaders() {
    this.masterAPI.getAllheadersEdition(environment.CUSTOMER_ID,null,'').subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        //console.log(res.body);
        this.headerarry = data.map((dt: any) => JSON.parse(dt));
        console.log(this.headerarry);
        
        // this.headerarry = [...new Map(this.headerarry.map(item => [item.category_id, item])).values()]
      } else {
        this.headerarry = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
  
}
