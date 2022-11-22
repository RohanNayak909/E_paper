import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditPagesComponent } from './edit-pages/edit-pages.component';

@Component({
  selector: 'app-upload-pages',
  templateUrl: './upload-pages.component.html',
  styleUrls: ['./upload-pages.component.css']
})
export class UploadPagesComponent implements OnInit {

  constructor(private router: Router,private matDialog: MatDialog) { }

  ngOnInit(): void {
  }
  edit(){
    const dialogRef = this.matDialog.open(EditPagesComponent,{
      height: '450px',
      width: '800px',
   });
   dialogRef.afterClosed().subscribe(result=>{
    console.log(result);
  })
}
}
