import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { CategoryDialogComponent } from '../../categories/newcategory/category-dialog.component';

@Component({
  selector: 'app-newedition',
  templateUrl: './newedition.component.html',
  styleUrls: ['./newedition.component.css']
})
export class NeweditionComponent implements OnInit {
  currentuser: any
  edition: any
  catid: any = '';
  categorySearch: any = '';
  catarr: any = []
  constructor(private loginService: LoginService, private categoryService: CategoryServiceService,
    private notification: NotificationService, private router: Router, private editionService: EditionService,
    private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.edition = new editionModel();
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch, environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  onfileselected(event: any) {
    this.edition.Multiimage = <File>event.target.files[0];
    let postImg!: any;
    if ((this.edition.Multiimage.type != 'image/jpeg') && (this.edition.Multiimage.type != 'image/png')) {
      // this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.edition.Multiimage = ''

      postImg = document.querySelector('#uploadAds')
      postImg.src = 'assets/img/image-preview-icon-picture-placeholder-vector-31284806.jpg';

    }
    else {
      this.edition.ads_img = this.edition.Multiimage.type
      postImg = document.querySelector('#uploadAds');
      postImg.src = URL.createObjectURL(this.edition.Multiimage);
    }
  }
  addEdition() {
    this.spinnerService.show();
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'I';
    this.edition.customer_id = environment.CUSTOMER_ID;
    if (this.edition.ads_img) {
      this.edition.media_ext = this.edition.ads_img.split("/")[1];
    }
    if (this.edition.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.edition.Multiimage)
      reader.onload = function () {

      };
    }
    setTimeout(() => {
      if (this.edition.Multiimage) {
        this.edition.base64file = reader.result
      }
      this.editionService.createEdition(this.edition).subscribe(res => {
        if (res.code === "success") {
          window.location.reload();
          this.notification.success("Edition created sucessfully");
          this.router.navigate(['/admin/epaper/category']);
        } else {
          this.notification.error(res.message)
          this.spinnerService.hide();
        }
      },(err) => {
        this.spinnerService.hide();
      });
    }, 1000)
  }
  onNoClick(): void {
    // this.matDialogRef.close();
  };
}
