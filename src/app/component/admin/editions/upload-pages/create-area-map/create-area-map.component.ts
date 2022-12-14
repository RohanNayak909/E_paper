import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fabric } from 'fabric';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';

@Component({
  selector: 'app-create-area-map',
  templateUrl: './create-area-map.component.html',
  styleUrls: ['./create-area-map.component.css']
})
export class CreateAreaMapComponent implements OnInit {

  img_url: any
  img_id:any

  canvas: any
  canvas_cls: any
  rectangle: any
  visible:Boolean = true
  canvas_val:any
  ctx: any

  currentuser:any = {}

  savedCoordinates:any = {}

  data:any = [
    {
      'left': 105, 'top': 147, 'width': 193, 'height': 160
    },
    {
      'left': 210, 'top': 4, 'width': 267, 'height': 135
    },
    {
      'left': 507, 'top': 5, 'width': 178, 'height': 131
    },
    {
      'left': 5, 'top': 5, 'width': 179, 'height': 131
    }
  ]

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private editionService: EditionService, private spinnerService: LoaderService,
    private notification: NotificationService) { }

  ngOnInit(): void {

    this.currentuser = this.loginService.getCurrentUser();

    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.img_id = Number(routeParams.get('id'));

    this.img_url = localStorage.getItem('img_url')
    this.canvas = new fabric.Canvas("canvas");

    this.rectangle = new fabric.Rect({
      width: 150,
      height: 150,
      fill: '',
      stroke: 'green',
      strokeWidth: 2
    });
  }

  saveAreaMap() {
    console.log(this.rectangle);
    this.spinnerService.show();

    this.savedCoordinates.img_id = this.img_id;
    this.savedCoordinates.x_coord = Math.round(this.rectangle.lineCoords.bl.x * 100) / 100;
    this.savedCoordinates.y_coord = Math.round(this.rectangle.lineCoords.tl.y * 100) / 100;
    this.savedCoordinates.width = Math.round((this.rectangle.lineCoords.br.x - this.rectangle.lineCoords.bl.x) * 100) / 100;
    this.savedCoordinates.height = Math.round((this.rectangle.lineCoords.br.y - this.rectangle.lineCoords.tr.y) * 100) / 100;
    this.savedCoordinates.customer_id = this.currentuser.customer_id;
    this.savedCoordinates.created_by = this.currentuser.user_id;
    this.savedCoordinates.flag = 'I';
    console.log(this.savedCoordinates);

    this.editionService.createAreaMap(this.savedCoordinates).subscribe(res => {
      if (res.code === "success") {
        window.location.reload();
        this.notification.success("Map area created sucessfully");
        location.reload()
      } else {
        this.notification.error(res.message)
        this.spinnerService.hide();
      }
    },(err) => {
      this.spinnerService.hide();
    });
    
  }

  deleteMapArea() {
    this.canvas.remove(this.rectangle);
  }

  backToMain() {
    this.visible = true
  }

  createAreaMap() {
    this.visible = false
    // Render the Rect in canvas
    this.canvas.add(this.rectangle);

    // for(var i = 0; i < this.data.length; i++) {
    //   var rect = new fabric.Rect({
    //     left: this.data[i].left,
    //     top: this.data[i].top,
    //     width: this.data[i].width,
    //     height: this.data[i].height,
    //     fill: '',
    //     stroke: 'green',
    //     strokeWidth: 2
    //   });
    //   this.canvas.add(rect);
    // }
    
  }

}
