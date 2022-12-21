import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-section',
  templateUrl: './preview-section.component.html',
  styleUrls: ['./preview-section.component.css']
})
export class PreviewSectionComponent implements OnInit {

  img_id:any
  map_id:any
  cat:any
  dateval:any
  page:any
  category:any
  date:any
  new_img:any
  zoom:any = 1

  constructor(private activatedRoute: ActivatedRoute, private elementRef: ElementRef) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const img_id:any = routeParams.get('img_id');
    const map_id:any = routeParams.get('id');
    const cat:any = routeParams.get('cat');
    const dateval:any = routeParams.get('date');
    const page:any = routeParams.get('i');
    this.category = cat+" - "+page;
    this.date = dateval.substring(0,4)+"-"+dateval.substring(4,6)+"-"+dateval.substring(6,8)
    this.new_img = environment.PREVIEW_URL +'/'+ map_id +'.jpg';
  }

  zoomIn() {
    this.zoom += 0.1;
    var img:any = document.getElementById('preview-img');
    var currWidth = img.clientWidth;
    img.style.width = (currWidth + 100) + "px";
  }

  zoomOut() {
    this.zoom -= 0.1;
    var img:any = document.getElementById('preview-img');
    var currWidth = img.clientWidth;
    img.style.width = (currWidth - 100) + "px";
  }

}
