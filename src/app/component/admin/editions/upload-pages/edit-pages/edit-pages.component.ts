import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.css']
})
export class EditPagesComponent implements OnInit {
  image_id:any;
  imgarr:any;
  eid:any;
  index:any;
  currentuser:any;
  input:any
  imgData = new editionModel(); 
  constructor(private activatedRoute:ActivatedRoute,private editionService: EditionService,
    private spinnerService: LoaderService,private loginService: LoginService,private notification: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.image_id = Number(routeParams.get('id'));
    this.eid = Number(routeParams.get('eid'));
    this.index = localStorage.getItem('index')
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllImages();
  }
  getAllImages() {
    this.editionService.getAllImages(this.image_id,this.eid, environment.CUSTOMER_ID, '').subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgarr = img.map((i: any) => JSON.parse(i));
        this.imgData = this.imgarr[0]
        this.imgData.index = this.index;
        console.log(this.imgData,'data')

      } else {
        this.imgarr = [];
      }
    })
  }
  onUpload(event: any) {
    this.imgData.input = <File>event.target.files[0];

  }
  getpdfToJpegImage() {
    this.spinnerService.show()

    this.imgData.edition_id = this.eid;
    this.imgData.createdby = this.currentuser.user_id;
    this.imgData.flag = 'U';
    this.imgData.customer_id = environment.CUSTOMER_ID;

    if (this.imgData.input) {
      var reader = new FileReader();
      reader.readAsDataURL(this.imgData.input)
      reader.onload = function () {
      };
    }
    setTimeout(() => {
      if (this.imgData.input) {
        this.imgData.base64file = reader.result
      }
      console.log(this.imgData,'data');
      this.editionService.saveUploadImage(this.imgData).subscribe(res => {
        if (res.code === "success") {
          this.spinnerService.hide();
          this.notification.success("Image updated successfully");
          this.router.navigate([`/admin/epaper/edition/upload-pages/${this.eid}`])
          this.getAllImages();
        } else {
          // this.dataarr = []
          this.spinnerService.hide()
        }
      }, (err) => {
        this.spinnerService.hide() 
      });
    }, 1000)
  }
}
