import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editedition',
  templateUrl: './editedition.component.html',
  styleUrls: ['./editedition.component.css']
})
export class EditeditionComponent implements OnInit {
  edition: any;
  currentuser: any;
  catid: any = '';
  categorySearch: any = '';
  catarr: any = [];
  editionarr: any = [];
  eid: any = ''
  editionSearch: any = ''
  constructor(private loginService: LoginService, private categoryService: CategoryServiceService,
    private notification: NotificationService, private router: Router, private editionService: EditionService,
    private spinnerService: LoaderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.edition = new editionModel();
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
    this.getAllEdition();
  }
  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch, environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        var i: any
        for (i = 0; i < this.catarr?.length; i++) {
          this.catarr[i].category_id = this.catarr[i].category_id.toString();
        }
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  getAllEdition() {
    this.editionService.getEditionAll(this.eid, this.editionSearch, '', this.currentuser.customer_id).subscribe(res => {
      if (res.code = 'sucess') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
        this.edition = this.editionarr[0];
        console.log(this.edition);
      } else {
        this.editionarr = [];
      }
    }, (err) => {
      this.editionarr = []
    })
  }
  onfileselected(event: any) {
    this.edition.Multiimage = <File>event.target.files[0];
    let postImg!: any;
    if ((this.edition.Multiimage.type != 'image/jpeg') && (this.edition.Multiimage.type != 'image/png') && (this.edition.Multiimage.type != 'application/pdf')) {
      this.edition.Multiimage = ''
      postImg = document.querySelector('#uploadAds')
      postImg.src = 'assets/img/image.png';

    } else {
      this.edition.ads_img = this.edition.Multiimage.type
      if (this.edition.Multiimage.type != 'application/pdf') {
        postImg = document.querySelector('#uploadAds');
        postImg.src = URL.createObjectURL(this.edition.Multiimage);
      } else {
        postImg = document.querySelector('#uploadAds')
        postImg.src = 'assets/img/image.png';
      }
    }
  }
  editEdition() {
    this.spinnerService.show();
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'U';
    this.edition.customer_id = environment.CUSTOMER_ID;
    if (this.edition.edition_image) {
      var media_ext = this.edition.edition_image.split("media/")[1];
      this.edition.media_ext = media_ext.split(".")[1];
    }
    if (this.edition.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.edition.Multiimage)
      reader.onload = function () {

      };

      if (this.edition.ads_img) {
        this.edition.media_ext = this.edition.ads_img.split("/")[1];
      }
    }
    setTimeout(() => {
      if (this.edition.Multiimage) {
        this.edition.base64file = reader.result
      }
      this.editionService.createEdition(this.edition).subscribe(res => {
        if (res.code === "success") {
          this.spinnerService.hide();
          this.notification.success("Edition edited sucessfully");
          this.router.navigate([`/admin/epaper/edition`]);
        } else {
          this.spinnerService.hide();
          this.notification.error(res.message);
        }
      }, (err) => {
        console.log(err);
        this.spinnerService.hide();
      });
    }, 1000)
  }
  onNoClick(): void {
    // this.matDialogRef.close();
  };
}
