import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  error: any;
  hide = true;

  constructor( private router: Router, private activatedRoute: ActivatedRoute,
    private loginService: LoginService, private Notification: NotificationService) { }

  ngOnInit(): void {
    this.login = new ModeluserDetails();
    this.login.customer_id = environment.CUSTOMER_ID
  }

  loginuserj() {
    console.log(this.login)


  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  loginuser() {

    if(this.login.userName === null || this.login.userName === "" || this.login.userName === undefined) {
      this.Notification.error("Please input username");
      return
    }
    
    if(this.login.password === null || this.login.password === ""|| this.login.password === undefined) {
      this.Notification.error("Please input password");
      return
    }

    this.loginService
      .verifyUser(this.login)
      .subscribe(
        (res: any) => {
          if (res.code === 'success') {
            localStorage.removeItem("side_nav_index");
            localStorage.setItem('currentUser', JSON.stringify(res.body))
            this.Notification.success('Login Successful.');
            this.loginService.setLoginState('true', JSON.stringify(res.body));
            this.router.navigate(['/admin']).then((r: any) => { });
          } else {
            // this.spinnerService.hide()
           //  this.loginService.setLoggedInStatus(false);
            if (res.message == 'User in Blocked Status') {
              this.Notification.error("Your account has been locked.");
              return
            }
            this.Notification.error("The user name or password is incorrect.");
          }
        },
        (err: any) => {
          this.Notification.error(err.message);
        }
      );

  }
  // opendialog() {
  //   const dialogRef = this.dialog.open(ForgetpasswordComponent);
  // }

}
