import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';

@Component({
  selector: 'app-addtohomeedition',
  templateUrl: './addtohomeedition.component.html',
  styleUrls: ['./addtohomeedition.component.css']
})
export class AddtohomeeditionComponent implements OnInit {
  edition:any
  currentuser:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private loginService : LoginService,
  private notification:NotificationService,private router:Router,private editionService:EditionService,
  public matDialogRef: MatDialogRef<AddtohomeeditionComponent>) { }

  ngOnInit(): void {
    this.edition = this.data;
    this.currentuser = this.loginService.getCurrentUser();
  }
  
  addToHome(){
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'U';
    this.edition.add_to_home = 1;
    this.editionService.createEdition(this.edition).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Category added to home.");
        this.matDialogRef.close();
      } else {
        this.notification.error(res.message)
      }
    })
  }
  removeFromHome(){
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'U';
    this.edition.add_to_home = 0;
    this.editionService.createEdition(this.edition).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Category removed from home.");
        this.matDialogRef.close();
      } else {
        this.notification.error(res.message)
      }
    })
  }
}
