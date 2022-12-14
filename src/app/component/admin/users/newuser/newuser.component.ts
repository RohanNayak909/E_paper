import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  userData = new ModeluserDetails();
  currentuser:any
  role:any = []
  dropdownSettings: IDropdownSettings = {};
  constructor(private userService: UserService,private loginService:LoginService, private router: Router, 
    private notify: NotificationService, private masterService: MasterServiceService,private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getRoles();
    this.userData.customer_id = this.currentuser.customer_id

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
  }
  addUser(){
    this.userData.flag = 'I';
    this.userData.customer_id = environment.CUSTOMER_ID
    this.userData.user_nicename = this.userData.user_login 

    if(this.userData.user_email) {
      var mail_format = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      if (!this.userData.user_email.match(mail_format)) {
        this.notify.error('Please input valid email')
        return
      }
    }

    if(this.userData.role !== null && this.userData.role !== undefined && this.userData.role !== '') {
      var result = this.userData.role.map(function(val: any) {
        return val.id;
      }).join(',');
      this.userData.role = result;
    }
    this.userService.createUser(this.userData).subscribe((res: any) => {
      if (res.code == "success") {
        this.notify.success(res.message);
        this.router.navigate([`/admin/user/view`]);
      }else{
        this.notify.error(res.message);
      }
    })
  }
  getRoles() {
    this.masterService.getRoles(this.currentuser.customer_id).subscribe((res: any) => {
      this.role = res.body;
      this.role = this.role.map((g: string) => JSON.parse(g));
    })
  }
}
