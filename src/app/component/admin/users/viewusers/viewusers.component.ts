import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/userservice/user.service';
import { environment } from 'src/environments/environment';
import { NewuserComponent } from '../newuser/newuser.component';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  allUser:any
  uid:any = ''
  constructor(private userService: UserService,private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.getalluser();
  }
 
    getalluser() {
      this.userService.getUserDetails('', this.uid,environment.CUSTOMER_ID, 'N').subscribe((data: any) => {
        this.allUser = data.body
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
        console.log(this.allUser,'userssss')
      })
    }
    addUser(){
      const dialogRef = this.matDialog.open(NewuserComponent, {
        height: '400px',
        width: '50vw'
      });
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
      })
    }
}
