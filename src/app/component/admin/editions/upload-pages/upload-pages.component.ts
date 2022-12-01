import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { environment } from 'src/environments/environment';
import { EditPagesComponent } from './edit-pages/edit-pages.component';

@Component({
  selector: 'app-upload-pages',
  templateUrl: './upload-pages.component.html',
  styleUrls: ['./upload-pages.component.css']
})
export class UploadPagesComponent implements OnInit {
  input:any
  edition:any = new editionModel();
  dataarr:any = [];
  imgid = '';
  imgarr:any = [];
  eid:any;
  cust_id:any;
  currentuser:any;
  constructor(private router: Router,private matDialog: MatDialog,private editionService:EditionService,
    private activatedRoute: ActivatedRoute,private loginService:LoginService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllImages();
    console.log(this.eid);
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
addPdf() {
  let btn = document.getElementById('pdf-file');
  if(btn) {
    btn.click();
  }
 }
 onUpload(event:any){
  this.edition.input = <File>event.target.files[0];
 
 }
 getpdfToJpegImage(){
   this.edition.edition_id = this.eid;
   this.edition.createdby = this.currentuser.user_id;
   this.edition.flag = 'I';
   this.edition.customer_id = this.cust_id;

  if (this.edition.input) {
    var reader = new FileReader();
    reader.readAsDataURL(this.edition.input)
    reader.onload = function () {
    };
  }
  setTimeout(() => {
    if (this.edition.input) {
      this.edition.base64file = reader.result
    }
    console.log('this.category==',this.edition);
  this.editionService.saveUploadImage(this.edition).subscribe(res=>{
    if (res.code === "success") {
      var data = res.body;
      this.dataarr = data.map((dt: any) => JSON.parse(dt)); 
      console.log(this.dataarr) 
    } else {
      this.dataarr = []
    }
  });
  }  , 1000)
 }
 
 getAllImages(){
   this.editionService.getAllImages(this.imgid,this.eid,environment.CUSTOMER_ID).subscribe(res=>{
     if(res.code === "success"){
       var img = res.body;
       this.imgarr = img.map((i:any)=> JSON.parse(i));
       console.log(this.imgarr);
     }else{
       this.imgarr = [];
     }
   })
 }
}
