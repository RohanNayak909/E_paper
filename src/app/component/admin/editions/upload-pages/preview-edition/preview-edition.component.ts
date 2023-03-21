import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-edition',
  templateUrl: './preview-edition.component.html',
  styleUrls: ['./preview-edition.component.css']
})
export class PreviewEditionComponent implements OnInit {

  constructor(private loginService: LoginService, private activatedRoute: ActivatedRoute, private editionService: EditionService,
    private spinnerService: LoaderService, private notify: NotificationService, private router: Router) { }

  eid:any
  cust_id:any
  currentuser:any
  imgarr:any = []
  category:any

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.category = routeParams.get('name');
    this.currentuser = this.loginService.getCurrentUser();
    this.cust_id = this.currentuser.customer_id;
    this.getAllImages();
  }

  edition_verified:Boolean = false;
  getAllImages() {
    this.editionService.getAllImages('', this.eid, this.cust_id, '').subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgarr = img.map((i: any) => JSON.parse(i));
        let chbval:any = document.getElementById("declaration");
        if(this.imgarr[0].edition_verified === 1) {
          this.edition_verified = true;
          chbval.checked = true;
        } else {
          this.edition_verified = false;
          chbval.checked = false;
        }
      } else {
        this.imgarr = [];
      }
    }, (err) => {
      console.log(err)
      this.imgarr = [];
    })
  }

  previewImage(data:any) {
    window.open(data.image_url);
  }

  publishEdition() {
    let chbval:any = document.getElementById("declaration");
    
    if(!chbval.checked) {
      this.notify.error("Please check the declaration");
      return;
    }

    if(this.eid === null || this.eid === "" || this.eid === undefined) {
      this.notify.error("Edition id required");
      return;
    }
    this.spinnerService.show();
    let obj:any = {};
    obj.edition_id = this.eid;
    obj.edition_name = this.category
    obj.createdby = this.currentuser.user_id;
    obj.customer_id = this.currentuser.customer_id;
    obj.flag = 'EV';

    this.editionService.createEdition(obj).subscribe(res => {
      if (res.code === "success") {
        this.spinnerService.hide();
        this.notify.success("Edition created sucessfully");
        this.router.navigate([`/admin/epaper/edition/upload-pages/${this.category}/${this.eid}`]);
      } else {
        this.spinnerService.hide();
        this.notify.error(res.message)
      }
    }, (err) => {
      this.spinnerService.hide();
      this.notify.error(err)
    });
  }

}
