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
  constructor(private notification:NotificationService,private router:Router,private editionService: EditionService,
    private loginService:LoginService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllEdition();
  }
  getAllEdition(){
    this.editionService.getFeaturedEdition(this.eid,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
        console.log(this.editionarr)
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
    console.log(data)
    this.editionService.createEdition(data).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Category removed from home.");
        window.location.reload();
      } else {
        this.notification.error(res.message)
      }
    })
  }
}
