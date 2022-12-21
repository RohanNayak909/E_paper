import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.css']
})
export class HeaderCategoryComponent implements OnInit {
  cust_id: any;
  eid: any;
  currentuser: any;
  imgid: any = '';
  imgarr: any = [];
  currentIndex = 1;
  category: any;
  editionarr: any = [];
  headerarry: any
  editionDate: any
  datepicker: any;
  hide: Boolean = false
  constructor(private editionService: EditionService, private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute, private loginService: LoginService, private masterService: MasterServiceService,
    private notification: NotificationService, private masterAPI: MasterServiceService, private route: Router) {
    activatedRoute.params.subscribe(val => {
      let routeParams = this.activatedRoute.snapshot.paramMap;
      this.eid = Number(routeParams.get('id'));
      this.category = routeParams.get('category');
      this.cust_id = environment.CUSTOMER_ID
      this.currentuser = this.loginService.getCurrentUser();
      this.getAllEdition();

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "assets/js/preview.js";
      this.elementRef.nativeElement.appendChild(s);
    })
  }

  ngOnInit(): void {
    let routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.category = routeParams.get('category');
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllEdition();
    this.datepicker = document.getElementById('startDate');
    const today = new Date();
    let date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
    let month = today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
    let year = today.getFullYear();
    this.datepicker.setAttribute('max', `${year}-${month}-${date}`);
    this.hide = false

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/preview.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  getAllImages() {
    this.editionService.getAllImages(this.imgid, this.eid, environment.CUSTOMER_ID, this.category).subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgarr = img.map((i: any) => JSON.parse(i));
        this.currentIndex = 1;
        var i: any
        if (this.imgarr.length > 0) {
          var epaper: any = document.getElementById("epaper");

          for (i = 0; i < this.imgarr?.length; i++) {
            this.imgarr[i].index = i + 1
          }
          var img: any = document.createElement('img');
          img.id = 'map_area_img'
          img.src = this.imgarr[0].image_url
          var wrapper: any = document.getElementById('imagemap');
          wrapper.innerHTML = ""
          wrapper.appendChild(img);
          if (this.imgarr[0].area_details) {
            var dtarr = this.editionDate.split("-");
            var dt = dtarr[0] + '' + dtarr[1] + '' + dtarr[2]
            this.hide = true
            var t = this
            this.imgarr[0].area_details.forEach(function (data: any) {
              var coords = data.coordinates.split(',');
              var xcoords = [parseInt(coords[0]), parseInt(coords[2])];
              var ycoords = [parseInt(coords[1]), parseInt(coords[3])];
              xcoords = xcoords.sort(function (a, b) { return a - b });
              ycoords = ycoords.sort(function (a, b) { return a - b });
              var desc = 'height=' + (parseInt(data.height) + 50) + ',width=' + (parseInt(data.width) + 50) + ',modal=yes,alwaysRaised=yes,scrollbars=1';
              wrapper.innerHTML += "<a href='javascript:void(0)' onclick=openNewSection(" + t.imgarr[0].image_id + "," + data.map_id + "," + t.imgarr[0].index + ",'" + t.category + "','" + dt + "','" + desc + "') class='area' style='left: " + ((xcoords[0] / 1048) * 100).toFixed(2) + "%; top: " + ((ycoords[0] / parseInt(data.img_height)) * 100).toFixed(2) + "%; width: " + (((xcoords[1] - xcoords[0]) / 1048) * 100).toFixed(2) + "%; height: " + (((ycoords[1] - ycoords[0]) / parseInt(data.img_height)) * 100).toFixed(2) + "%;'></a>";
            });
          }
        }

      } else {
        this.imgarr = [];
      }
    }, (err: any) => {
      this.imgarr = []
    })
  }

  getAllEdition() {
    this.editionService.getEditionAll(this.eid, '', '', environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.editionarr = data.map((dt: any) => JSON.parse(dt));
        this.getAllImages();
        this.editionDate = this.editionarr[0].edition_date;
      } else {
        this.editionarr = []
      }
    }, (err: any) => {
      this.editionarr = []
    })
  }

  goToPage(img_id: any, img_url: any, area_details: any, i: any) {
    var img: any = document.createElement('img');
    img.id = 'map_area_img'
    img.src = img_url
    var wrapper: any = document.getElementById('imagemap');
    wrapper.innerHTML = ""
    wrapper.appendChild(img);
    if (area_details) {
      var dtarr = this.editionDate.split("-");
      var dt = dtarr[0] + '' + dtarr[1] + '' + dtarr[2]
      this.hide = true
      var t = this
      area_details.forEach(function (data: any) {
        var coords = data.coordinates.split(',');
        var xcoords = [parseInt(coords[0]), parseInt(coords[2])];
        var ycoords = [parseInt(coords[1]), parseInt(coords[3])];
        xcoords = xcoords.sort(function (a, b) { return a - b });
        ycoords = ycoords.sort(function (a, b) { return a - b });
        var desc = 'height=' + (parseInt(data.height) + 50) + ',width=' + (parseInt(data.width) + 50) + ',modal=yes,alwaysRaised=yes,scrollbars=1';
        wrapper.innerHTML += "<a href='javascript:void(0)' onclick=openNewSection(" + img_id + "," + data.map_id + "," + i + ",'" + t.category + "','" + dt + "','" + desc + "') class='area' style='left: " + ((xcoords[0] / 1048) * 100).toFixed(2) + "%; top: " + ((ycoords[0] / parseInt(data.img_height)) * 100).toFixed(2) + "%; width: " + (((xcoords[1] - xcoords[0]) / 1048) * 100).toFixed(2) + "%; height: " + (((ycoords[1] - ycoords[0]) / parseInt(data.img_height)) * 100).toFixed(2) + "%;'></a>";
      });
    }
  }

  onChangeDate(editionDate: any) {
    this.masterAPI.getAllheadersEdition(environment.CUSTOMER_ID, editionDate, this.category).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.headerarry = data.map((dt: any) => JSON.parse(dt));
        console.log(this.headerarry[0].category_url);

        this.route.navigate([this.headerarry[0].category_url]);
      } else {
        this.headerarry = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
}
