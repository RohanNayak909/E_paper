import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { editionModel } from 'src/app/models/editionmodel';
import { EditionService } from 'src/app/services/editionservice/edition.service';
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
  imgData = new editionModel(); 
  constructor(private activatedRoute:ActivatedRoute,private editionService: EditionService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.image_id = Number(routeParams.get('id'));
    this.eid = Number(routeParams.get('eid'));
    this.getAllImages();
  }
  getAllImages() {
    this.editionService.getAllImages(this.image_id,this.eid, environment.CUSTOMER_ID, '').subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgarr = img.map((i: any) => JSON.parse(i));
        var i:any
        for(i=0;i<this.imgarr?.length;i++){
          this.imgarr[i].index=i+1;
        }
        this.imgData = this.imgarr[0]
        console.log(this.imgarr,'data')

      } else {
        this.imgarr = [];
      }
    })
  }
}
