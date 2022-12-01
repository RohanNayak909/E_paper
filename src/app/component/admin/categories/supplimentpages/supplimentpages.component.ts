import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsupplimentComponent } from './newsuppliment/newsuppliment.component';

@Component({
  selector: 'app-supplimentpages',
  templateUrl: './supplimentpages.component.html',
  styleUrls: ['./supplimentpages.component.css']
})
export class SupplimentpagesComponent implements OnInit {

  constructor(private matDialog : MatDialog) { }

  ngOnInit(): void {
  }
  addSupplimentPages(){
    const dialogRef = this.matDialog.open(NewsupplimentComponent,{
      height: '300px',
      width: '40vw',
      // data: { ...data },
   });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
}
