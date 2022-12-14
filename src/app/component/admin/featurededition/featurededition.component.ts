import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featurededition',
  templateUrl: './featurededition.component.html',
  styleUrls: ['./featurededition.component.css']
})
export class FeaturededitionComponent implements OnInit {
  eid:any='';
  editionarr:any = [];
  currentuser:any;
  p:any = 1;
  constructor(private notification:NotificationService,private router:Router,private editionService: EditionService,
    private loginService:LoginService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllEdition();
  }
  getAllEdition(){
    this.editionService.getEditionAll(this.eid,'','',environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
        this.editionarr = this.editionarr.filter((d:any)=>{ if(d.add_to_home == 1){ return d;}})
      } else {
        this.editionarr = []
      }
    }, (err:any) => {
      this.editionarr = []
    })
  }
  removeFromHome(data:any){
    data.createdby = this.currentuser.user_id;
    data.flag = 'U';
    data.add_to_home = 0;
    this.editionService.createEdition(data).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Edition removed from home.");
        this.getAllEdition();
      } else {
        this.notification.error(res.message)
      }
    })
  }
}
