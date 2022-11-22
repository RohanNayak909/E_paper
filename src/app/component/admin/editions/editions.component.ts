import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { EditeditionComponent } from './editedition/editedition.component';
import { NeweditionComponent } from './newedition/newedition.component';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.css']
})
export class EditionsComponent implements OnInit {
  eid:any = '';
  currentuser:any;
  editionarr:any = [];
  constructor(private matDialog: MatDialog,private editionService: EditionService,private notification: NotificationService,
    private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllEdition();
  }
  newEdition(){
    const dialogRef = this.matDialog.open(NeweditionComponent, {
      height: '500px',
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  getAllEdition(){
    this.editionService.getEditionAll(this.eid,this.currentuser.customer_id).subscribe(res=>{
      if(res.code = 'sucess'){
        var data = res.body;
        this.editionarr = data.map((dt:any) => JSON.parse(dt));
        console.log(this.editionarr,'edition');
      }else{
        this.editionarr = [];
       }
      },(err) => {
        this.editionarr = []
      })
  }
  editEdition(data:any){
    
    const dialogRef = this.matDialog.open(EditeditionComponent,{
      height: '500px',
      width: '50vw',
      data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
  upload(){
    this.router.navigate(['admin/epaper/edition/upload-pages']);
  }
}
