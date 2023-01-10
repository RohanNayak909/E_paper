import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
// import { NotificationService } from 'src/app/services/notification/notification.service';
import {MatDialog} from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
// import { PasswordComponent } from 'src/app/password/password.component';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  showFiller = false
  currentuser: any;
  sidenav_details: any;
  currentRoute: any
  headers_details:any = []
  
  constructor(private dialog:MatDialog,private loginService: LoginService, private router: Router, private Notification: NotificationService) { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.url; 
      }
    });
  }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    if (this.currentuser) {
      this.sidenav_details = this.currentuser.sidenav_details;
      this.sidenav_details.forEach((val: any) => {
        const headers_details = val.function_details.filter((record: any) => record.func_header === 1).map((i: any) => new Object({ module_name: val.module_name, func_url: i.func_url }))
        if(headers_details.length > 0) {
          this.headers_details.push(headers_details[0])
        }
      });
    }
  }

  ngAfterViewInit() {
    let side_nav_index:any = localStorage.getItem("side_nav_index");
    if(side_nav_index) {
      this.openSideNav(parseInt(side_nav_index))
    }
  }

  toggleSideNav(e: any) {
    e.preventDefault();
    let element: any = document.getElementById("sidebar");
    element.classList.toggle("active");
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
    this.Notification.success('Logged out Successfully')
  }

  openSubSideNav(i:any) {
    this.openSideNav(i);
  }

  viewSite() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/`])
    );
    window.open(url, '_blank');
  }

  openSideNav(i: any) {
    localStorage.setItem("side_nav_index",i);
    let a: any = document.getElementById("collapse_" + i);
    let li: any = document.getElementById("ul_"+i);
    if(li.classList.contains("show")) {
      a.classList.add('collapsed');
      li.classList.remove('show');
    } else {
      let contentlist: any = document.getElementsByClassName("dropdown-toggle");
      let contentlist1: any = document.getElementsByClassName("list-unstyled");
      if (contentlist.length > 0) {
        for (var p = 0; p < contentlist.length; p++) {
          contentlist[p].classList.add('collapsed');
        }
      }
      if (contentlist1.length > 0) {
        for (var p = 0; p < contentlist1.length; p++) {
          contentlist1[p].classList.remove('show');
        }
      }
      a.classList.remove('collapsed');
      li.classList.add('show');
    }

  }
  // openchangepass(){
  //   const dialogRef = this.dialog.open(PasswordComponent);
  // }

}
