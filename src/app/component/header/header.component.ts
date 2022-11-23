import { Component, OnInit } from '@angular/core';
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

  constructor(private masterAPI: MasterServiceService) { }

  ngOnInit(): void {
    this.getallheaders();
  }
  getallheaders() {
    this.masterAPI.getAllheaders(environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        //console.log(res.body);
        this.headerarry = data.map((dt: any) => JSON.parse(dt));

        console.log(this.headerarry);
      } else {
        this.headerarry = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
}
