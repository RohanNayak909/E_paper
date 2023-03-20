import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-edition',
  templateUrl: './preview-edition.component.html',
  styleUrls: ['./preview-edition.component.css']
})
export class PreviewEditionComponent implements OnInit {

  constructor(private loginService: LoginService, private activatedRoute: ActivatedRoute, private editionService: EditionService) { }

  eid:any
  cust_id:any
  currentuser:any
  imgarr:any = []

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllImages();
  }

  getAllImages() {
    this.editionService.getAllImages('', this.eid, this.cust_id, '').subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgarr = img.map((i: any) => JSON.parse(i));
        // var i: any
        // for (i = 0; i < this.imgarr?.length; i++) {
        //   this.imgarr[i].index = i + 1;
        // }
        console.log(this.imgarr)
      } else {
        this.imgarr = [];
      }
    }, (err) => {
      console.log(err)
      this.imgarr = [];
    })
  }

}
