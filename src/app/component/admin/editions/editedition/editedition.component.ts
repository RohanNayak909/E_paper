import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editedition',
  templateUrl: './editedition.component.html',
  styleUrls: ['./editedition.component.css']
})
export class EditeditionComponent implements OnInit {
  edition:any;
  currentuser:any;
  catid:any='';
  categorySearch:any='';
  catarr:any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private loginService: LoginService,private categoryService:CategoryServiceService,
  private notification: NotificationService, private router: Router,private editionService: EditionService,
  public matDialogRef: MatDialogRef<EditeditionComponent>) { }

  ngOnInit(): void {
    this.edition = this.data;
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }
  getallcategory() {
    this.categoryService.getAllCategory(this.catid, this.categorySearch,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        var i:any
        for(i=0;i<this.catarr?.length;i++){
          this.catarr[i].category_id= this.catarr[i].category_id.toString();
        }
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  onfileselected(event:any){
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
  editEdition(){
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
    }
    setTimeout(() => {
      if (this.edition.Multiimage) {
        this.edition.base64file = reader.result
      }
      this.editionService.createEdition(this.edition).subscribe(res => {
        if (res.code === "success") {
          this.notification.success("Edition edited sucessfully");
          window.location.reload();
        } else {
          this.notification.error(res.message)
        }
      });
    }, 1000)
  }
  onNoClick(): void {
    this.matDialogRef.close();
  };
}
