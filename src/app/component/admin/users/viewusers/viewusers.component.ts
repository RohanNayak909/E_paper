import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { environment } from 'src/environments/environment';
import { EdituserComponent } from '../edituser/edituser.component';
import { NewuserComponent } from '../newuser/newuser.component';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  allUser:any
  uid:any = ''
  p: any = 1;
  userSearch:any = '';
  constructor(private userService: UserService,private matDialog:MatDialog,private masterService: MasterServiceService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.getalluser();
  }
 
    getalluser() {
      this.userService.getUserDetails('', this.uid,environment.CUSTOMER_ID, 'N').subscribe((data: any) => {
        this.allUser = data.body
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
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
    editUser(data:any){  
      const dialogRef = this.matDialog.open(EdituserComponent,{
        height: '280px',
        width: '50vw',
        data: { ...data },
     });
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
      })
    }
    deleteUser(uid: any) {
        const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
        dialogRef.afterClosed().subscribe((result:any) => {      
          if(result){
            this.userDelete(uid);
          }
        });
        return;
      }
      userDelete(uid:any){
        var funct = 'USER';
        this.masterService.bulkDeletion(funct,uid,0,environment.CUSTOMER_ID).subscribe(res=>{
          if(res.code === "success"){
            this.notification.success("User deleted successfully");
          //  window.location.reload();
           this.getalluser();
  
          }else {
            this.notification.error(res.message);
          }
        })
      }
      searchUser(){
        this.userService.getUserDetails(this.userSearch, '',environment.CUSTOMER_ID, 'N').subscribe((data: any) => {
          if (data.code == 'success') {
            this.allUser = data.body;
            this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
          } else {
            this.allUser = []
          }
        }, (err) => {
          this.allUser = []
        })
      }
}
