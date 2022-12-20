import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  cust_id: any
  allUser: any
  currentuser: any = {}
  uid: any = ''
  newUser:any = []
  constructor(private loginservice:LoginService,private userservice: UserService,private router:Router,private userService: UserService,) { }

  ngOnInit(): void {
    this.currentuser = this.loginservice.getCurrentUser();
    this.getuserdetails()
  }
  navigate() {
    this.router.navigate(['admin/profile/edit/'+this.currentuser.user_id]);
  }

  getuserdetails() {
    this.userservice.getUserDetails('',this.currentuser.user_id, this.currentuser.customer_id,'N').subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        data = data.map((dt: any) => JSON.parse(dt));
        this.newUser = data[0]
      } else {
        this.newUser = []
      }
    }, (err) => {
      this.newUser = []
    })
  }


  // getalluser() {
  //   this.userService.getUserDetails(this.uid, this.cust_id).subscribe((data: any) => {
  //     this.allUser = data.body
  //     this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
  //   })
  // }
}
