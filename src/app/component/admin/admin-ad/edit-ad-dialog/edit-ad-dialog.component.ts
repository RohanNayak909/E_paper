import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdmodelTopContent } from 'src/app/models/adModel';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-ad-dialog',
  templateUrl: './edit-ad-dialog.component.html',
  styleUrls: ['./edit-ad-dialog.component.css']
})
export class EditAdDialogComponent implements OnInit {
  ads: any;

  @ViewChild('artThumbCheckTopSec')
  artThumbCheckTopSec!: ElementRef;
  @ViewChild('artThumbCheckRightUpperSec')
  artThumbCheckRightUpperSec!: ElementRef;
  @ViewChild('artThumbCheckLeftMiddleSec')
  artThumbCheckLeftMiddleSec!: ElementRef;
  @ViewChild('artThumbCheckMiddleSec')
  artThumbCheckMiddleSec!: ElementRef;
  currentuser: any = {}
  username: any

  adstopsec: any
  adsrightuppersec: any
  adsleftmiddlesec: any
  adsmiddlesec: any
  id: any

  constructor(public dialogRef: MatDialogRef<EditAdDialogComponent>, private spinnerService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any, private notify: NotificationService, private loginService: LoginService, private router: Router, private adsservice: AdserviceService) { }

  ngOnInit(): void {
    this.adstopsec = new AdmodelTopContent()
    this.adsrightuppersec = new AdmodelTopContent()
    this.adsleftmiddlesec = new AdmodelTopContent()
    this.adsmiddlesec = new AdmodelTopContent()
    this.currentuser = this.loginService.getCurrentUser();
    this.username = this.currentuser.user_nicename;

    this.id = this.data.ads_size;
    this.adstopsec = this.data.value
    this.adsrightuppersec = this.data.value
    this.adsleftmiddlesec = this.data.value
    this.adsmiddlesec = this.data.value

  }

  closeModal() {
    this.dialogRef.close()
  }

  onfileselectedtopsec(event: any) {
    this.adstopsec.ads_mulfile = <File>event.target.files[0];

    this.adstopsec.ads_ext = this.adstopsec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adstopsec.ads_mulfile.type != 'image/jpeg') && (this.adstopsec.ads_mulfile.type != 'image/png')) {
      this.notify.error('This is not valid file format. Please upload jpg/png file only.');
      this.adstopsec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_topsec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckTopSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adstopsec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 250 || width != 970) {
          this.notify.error('Please choose image with given height and width which mentioned above.');
          this.adstopsec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_topsec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckTopSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_topsec');
          bannerImg.src = URL.createObjectURL(this.adstopsec.ads_mulfile);
        }
      }
    }
  }

  onfileselectedrightuppersec(event: any) {
    this.adsrightuppersec.ads_mulfile = <File>event.target.files[0];

    this.adsrightuppersec.ads_ext = this.adsrightuppersec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adsrightuppersec.ads_mulfile.type != 'image/jpeg') && (this.adsrightuppersec.ads_mulfile.type != 'image/png')) {
      this.notify.error('This is not valid file format. Please upload jpg/png file only.');
      this.adsrightuppersec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_rightuppersec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckRightUpperSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adsrightuppersec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 250 || width != 300) {
          this.notify.error('Please choose image with given height and width which mentioned above.');
          this.adsrightuppersec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_rightuppersec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckRightUpperSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_rightuppersec');
          bannerImg.src = URL.createObjectURL(this.adsrightuppersec.ads_mulfile);
        }
      }
    }
  }

  onfileselectedleftmiddlesec(event: any) {
    this.adsleftmiddlesec.ads_mulfile = <File>event.target.files[0];

    this.adsleftmiddlesec.ads_ext = this.adsleftmiddlesec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adsleftmiddlesec.ads_mulfile.type != 'image/jpeg') && (this.adsleftmiddlesec.ads_mulfile.type != 'image/png')) {
      this.notify.error('This is not valid file format. Please upload jpg/png file only.');
      this.adsleftmiddlesec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_leftmiddlesec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckLeftMiddleSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adsleftmiddlesec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 600 || width != 300) {
          this.notify.error('Please choose image with given height and width which mentioned above.');
          this.adsleftmiddlesec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_leftmiddlesec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckLeftMiddleSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_leftmiddlesec');
          bannerImg.src = URL.createObjectURL(this.adsleftmiddlesec.ads_mulfile);
        }
      }
    }
  }

  onfileselectedmiddlesec(event: any) {
    this.adsmiddlesec.ads_mulfile = <File>event.target.files[0];

    this.adsmiddlesec.ads_ext = this.adsmiddlesec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adsmiddlesec.ads_mulfile.type != 'image/jpeg') && (this.adsmiddlesec.ads_mulfile.type != 'image/png')) {
      this.notify.error('This is not valid file format. Please upload jpg/png file only.');
      this.adsmiddlesec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_middlesec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckMiddleSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adsmiddlesec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 90 || width != 728) {
          this.notify.error('Please choose image with given height and width which mentioned above.');
          this.adsmiddlesec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_middlesec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckMiddleSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_middlesec');
          bannerImg.src = URL.createObjectURL(this.adsmiddlesec.ads_mulfile);
        }
      }
    }
  }


  addtopsec() {
    this.spinnerService.show()

    if (this.adstopsec.ads_mulfile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.adstopsec.ads_mulfile);
      reader.onload = function () {

      };
    }

    this.adstopsec.ads_img_size = '1';
    this.adstopsec.flag = 'U';
    this.adstopsec.createdby = this.currentuser.user_id

    setTimeout(() => {
      if (this.adstopsec.ads_mulfile) {
        this.adstopsec.base64file = reader.result
      }

      this.adsservice.addAd(this.adstopsec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.dialogRef.close()
          // this.router.navigate(['/admin/ads/view']);
          location.reload()
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()
        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()
      })
    }, 1000);
  }

  addrightuppersec() {
    this.spinnerService.show()


    if (this.adsrightuppersec.ads_mulfile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.adsrightuppersec.ads_mulfile);
      reader.onload = function () {

      };
    }

    this.adsrightuppersec.ads_img_size = '2';
    this.adsrightuppersec.flag = 'U';
    this.adsrightuppersec.createdby = this.currentuser.user_id

    setTimeout(() => {
      if (this.adsrightuppersec.ads_mulfile) {
        this.adsrightuppersec.base64file = reader.result
      }

      this.adsservice.addAd(this.adsrightuppersec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.dialogRef.close()
          // this.router.navigate(['/admin/ads/view']);
          location.reload()
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()
        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()
      })
    }, 1000);
  }

  addleftmiddlesec() {
    this.spinnerService.show()


    if (this.adsleftmiddlesec.ads_mulfile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.adsleftmiddlesec.ads_mulfile);
      reader.onload = function () {

      };
    }

    this.adsleftmiddlesec.ads_img_size = '3';
    this.adsleftmiddlesec.flag = 'U';
    this.adsleftmiddlesec.createdby = this.currentuser.user_id

    setTimeout(() => {
      if (this.adsleftmiddlesec.ads_mulfile) {
        this.adsleftmiddlesec.base64file = reader.result
      }

      this.adsservice.addAd(this.adsleftmiddlesec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.dialogRef.close()
          // this.router.navigate(['/admin/ads/view']);
          location.reload()
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()
        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()
      })
    }, 1000);
  }

  addmiddlesec() {
    this.spinnerService.show()


    if (this.adsmiddlesec.ads_mulfile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.adsmiddlesec.ads_mulfile);
      reader.onload = function () {

      };
    }

    this.adsmiddlesec.ads_img_size = '4';
    this.adsmiddlesec.flag = 'U';
    this.adsmiddlesec.createdby = this.currentuser.user_id

    setTimeout(() => {
      if (this.adsmiddlesec.ads_mulfile) {
        this.adsmiddlesec.base64file = reader.result
      }

      this.adsservice.addAd(this.adsmiddlesec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.dialogRef.close()
          // this.router.navigate(['/admin/ads/view']);
          location.reload()
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()
        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()
      })
    }, 1000);
  }
}
