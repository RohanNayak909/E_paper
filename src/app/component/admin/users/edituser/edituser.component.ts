import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private masterService: MasterServiceService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userData = this.data;
    this.userData.user_status = this.userData.user_status.toString();
  // this.userData.role = this.userData.role.toString()
     console.log(this.userData)

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
        console.log(this.userData.role,'roleee');
      }
    })
  }

  editUser(){

  }
}
