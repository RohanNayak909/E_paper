import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fabric } from 'fabric';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-area-map',
  templateUrl: './create-area-map.component.html',
  styleUrls: ['./create-area-map.component.css']
})
export class CreateAreaMapComponent implements OnInit {

  img_url: any
  img_id: any

  canvas: any
  canvas_cls: any
  rectangle: any
  visible: Boolean = true
  canvas_val: any
  ctx: any
  img!: HTMLImageElement
  img1!: HTMLImageElement
  currentuser: any = {}

  savedCoordinates: any = {}

  map_arr: any = []

  saveIcon = "assets/img/save.png";
  deleteIcon = "assets/img/remove.png"

  page_type: any

  imgobj:any = {}

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private editionService: EditionService, private spinnerService: LoaderService,
    private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();

    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.img_id = Number(routeParams.get('id'));

    this.getImageDetails(this.img_id);

    this.img_url = localStorage.getItem('img_url')
    this.page_type = localStorage.getItem('page_type')

    this.canvas = new fabric.Canvas("canvas", { uniformScaling: false });

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'black';

    this.img = document.createElement('img');
    this.img1 = document.createElement('img');
    this.img.src = this.deleteIcon;
    this.img1.src = this.saveIcon;

    fabric.Object.prototype.controls.updateControl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetX: 25,
      cursorStyle: 'pointer',
      mouseUpHandler: this.saveObject,
      render: this.renderIcon(this.saveIcon)
    });

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetX: 50,
      cursorStyle: 'pointer',
      mouseUpHandler: this.deleteObject,
      render: this.renderIcon(this.deleteIcon)
    });

    this.getAreaMapByImgId()

  }

  getImageDetails(id:any) {
    this.editionService.getImageDetails(id, this.currentuser.customer_id).subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgobj = img.map((i: any) => JSON.parse(i))[0];
        console.log('this.imgobj===',this.imgobj);
        
      } else {
        this.imgobj = {};
      }
    })
  }

  //   this.canvas.on('object:selected', function(){
  //     drawingMode = false;         
  // });

  saveAreaMap() {
    this.spinnerService.show();

    this.savedCoordinates.img_id = this.img_id;
    this.savedCoordinates.x_coord = Math.round(this.rectangle.lineCoords.bl.x * 100) / 100;
    this.savedCoordinates.y_coord = Math.round(this.rectangle.lineCoords.tl.y * 100) / 100;
    this.savedCoordinates.width = Math.round((this.rectangle.lineCoords.br.x - this.rectangle.lineCoords.bl.x) * 100) / 100;
    this.savedCoordinates.height = Math.round((this.rectangle.lineCoords.br.y - this.rectangle.lineCoords.tr.y) * 100) / 100;
    this.savedCoordinates.customer_id = this.currentuser.customer_id;
    this.savedCoordinates.created_by = this.currentuser.user_id;
    this.savedCoordinates.flag = 'I';

    this.editionService.createAreaMap(this.savedCoordinates).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Map area created sucessfully");
        location.reload()
      } else {
        this.notification.error(res.message)
        this.spinnerService.hide();
      }
    }, (err) => {
      this.notification.error(err.message)
      this.spinnerService.hide();
    });

  }

  getAreaMapByImgId() {
    this.editionService.getAreaMapByImgId(this.img_id, environment.CUSTOMER_ID).subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.map_arr = img.map((i: any) => JSON.parse(i));
        console.log(this.map_arr);
        if (this.map_arr.length > 0) {
          for (var i = 0; i < this.map_arr.length; i++) {
            var rect = new fabric.Rect({
              left: parseFloat(this.map_arr[i].x_coord),
              top: parseFloat(this.map_arr[i].y_coord),
              width: parseFloat(this.map_arr[i].width),
              height: parseFloat(this.map_arr[i].height),
              fill: 'rgba(110, 152, 219, 0.2)',
              stroke: 'green',
              strokeWidth: 1,
              cornerSize: 10,
              borderColor: 'green',
              name: this.map_arr[i].map_id
            });
            this.canvas.add(rect);
          }
          // console.log(this.canvas.getObjects());
        }

      } else {
        this.map_arr = [];
      }
    })
  }

  deleteObject = (eventData: any, transform: any) => {
    var target = transform.target;

    if (target) {
      var obj = { img_id: 0, x_coord: '', y_coord: '', width: '', height: '', customer_id: null, created_by: null, flag: '', map_id: null }

      obj.img_id = this.img_id;
      obj.x_coord = target.left.toString();
      obj.y_coord = target.top.toString();
      obj.width = target.width.toString();
      obj.height = target.height.toString();
      obj.created_by = this.currentuser.user_id;
      obj.customer_id = this.currentuser.customer_id;
      obj.flag = 'D';
      obj.map_id = target.name;

      this.editionService.createAreaMap(obj).subscribe(res => {
        if (res.code === "success") {
          var canvas = target.canvas;
          canvas.remove(target);
          canvas.requestRenderAll();
        } else {
          this.notification.error(res.message)
          this.spinnerService.hide();
        }
      }, (err) => {
        this.notification.error(err.message)
        this.spinnerService.hide();
      });
    }
    return false;
  }

  renderIcon(icon: any) {
    return function renderIcon(ctx: any, left: any, top: any, styleOverride: any, fabricObject: any) {
      var size = 24;
      var img = document.createElement('img');
      img.src = icon;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  backToHistory() {
    history.back();
  }

  saveObject = (eventData: any, transform: any) => {

    var target = transform.target;

    if (target) {
      var map_id: any = null;
      if (target.name) {
        map_id = parseInt(target.name)
        this.savedCoordinates.flag = 'U';
      } else {
        this.savedCoordinates.flag = 'I';
      }

      var img: any = document.getElementById('fp-img');
      // var img_height = img.naturalWidth
      // var img_width = img.naturalHeight

      var src = img.src
      var img_name = src.split("/")[6]

      this.savedCoordinates.img_id = this.img_id;
      this.savedCoordinates.x_coord = Math.round(target.left * 100) / 100;
      this.savedCoordinates.y_coord = Math.round(target.top * 100) / 100;
      this.savedCoordinates.width = Math.round((target.lineCoords.br.x - target.lineCoords.bl.x) * 100) / 100;
      this.savedCoordinates.height = Math.round((target.lineCoords.br.y - target.lineCoords.tr.y) * 100) / 100;
      this.savedCoordinates.customer_id = this.currentuser.customer_id;
      this.savedCoordinates.created_by = this.currentuser.user_id;
      this.savedCoordinates.map_id = map_id

      if (this.page_type === '0') {
        this.savedCoordinates.img_width = '963'
        this.savedCoordinates.img_height = '1479'

        this.savedCoordinates.original_width = 2339
        this.savedCoordinates.original_height = 3593
      } else {
        this.savedCoordinates.img_width = '963'
        this.savedCoordinates.img_height = '700'

        this.savedCoordinates.original_width = 6300
        this.savedCoordinates.original_height = 4015
      }

      this.savedCoordinates.image = img_name

      // console.log(this.savedCoordinates);

      this.editionService.createAreaMap(this.savedCoordinates).subscribe(res => {
        if (res.code === "success") {
          if (map_id) {
            this.notification.success("Map area updated sucessfully");
          } else {
            this.notification.success("Map area created sucessfully");
          }
          this.removeAll();
          this.getAreaMapByImgId();

        } else {
          this.notification.error(res.message)
          this.spinnerService.hide();
        }
      }, (err) => {
        this.notification.error(err.message)
        this.spinnerService.hide();
      });
    }

    return false;
  }

  removeAll() {
    var o = this.canvas.getObjects();
    this.canvas.getObjects().forEach((x: any) => this.canvas.remove(x))
    this.canvas.renderAll();
  }

  cancel() {
    document.getElementById("closeDeleteModalButton")?.click();
  }

  deleteMapArea() {
    this.canvas.remove(this.rectangle);
  }

  backToMain() {
    this.visible = true
  }

  createAreaMap() {
    this.visible = false
    var top = window.pageYOffset;
    this.rectangle = new fabric.Rect({
      left: 0,
      top: top,
      width: 150,
      height: 150,
      fill: 'rgba(0,0,0,0.2)',
      // stroke: 'green',
      strokeWidth: 0,
      cornerSize: 10,
      borderColor: 'green',
      originX: 'left',
      originY: 'top',
      centeredRotation: true,


    });
    // this.canvas.uniformScaling=true
    this.canvas.add(this.rectangle);
    this.canvas.setActiveObject(this.rectangle);
  }

}
