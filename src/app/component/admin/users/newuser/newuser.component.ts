import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { UserService } from 'src/app/services/userservice/user.service';

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
    private notify: NotificationService, private masterService: MasterServiceService) { }

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
    // this.userService.createUser()
  }
  getRoles() {
    this.masterService.getRoles(this.currentuser.customer_id).subscribe((res: any) => {
      this.role = res.body;
      this.role = this.role.map((g: string) => JSON.parse(g));
      console.log(this.role);
    })
  }
}
