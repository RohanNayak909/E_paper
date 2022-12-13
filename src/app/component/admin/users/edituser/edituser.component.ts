import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
 
  userData:any=[];
  dropdownSettings: IDropdownSettings = {};
  role:any;
  allUser:any;
  userid:any;
  constructor(private masterService: MasterServiceService,
    private userService: UserService,private notification: NotificationService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userData = new ModeluserDetails();
    this.userData.user_status = this.userData.user_status.toString();
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.userid = Number(routeParams.get('id'));
     this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
  
    this.getRoles();
   
  }
  
  getRoles() {
    this.masterService.getRoles(environment.CUSTOMER_ID).subscribe((res: any) => {
      this.role = res.body;
      this.role = this.role.map((g: string) => JSON.parse(g));
 
      if(this.userData.role !== null && this.userData.role !== undefined) {
        let arr:any = [];
        let split_arr = this.userData.role.split(",");
        for(var i = 0; i < split_arr.length; i++) {
          let obj:any = {};
          obj.id = parseInt(split_arr[i]);
          arr.push(obj)
        }

        let value = this.role.filter((d:any) => arr.map((v:any) => v.id).includes(d.id));
        this.userData.role = value;
      }
    })
  }

  editUser(){
    this.userData.flag = 'U';
    this.userData.customer_id = environment.CUSTOMER_ID
    this.userData.user_nicename = this.userData.user_login 

    if(this.userData.user_email) {
      var mail_format = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      if (!this.userData.user_email.match(mail_format)) {
        this.notification.error('Please input valid email')
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
        this.notification.success("User data updated sucessfully");
        // form.reset();
        window.location.reload();
      }else{
        this.notification.error(res.message);
      }
    })
  }
}
