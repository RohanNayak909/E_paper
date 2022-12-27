import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { editionModel } from 'src/app/models/editionmodel';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { environment } from 'src/environments/environment';
import { CompressImageComponent } from './compress-image/compress-image.component';
import { EditPagesComponent } from './edit-pages/edit-pages.component';

@Component({
  selector: 'app-upload-pages',
  templateUrl: './upload-pages.component.html',
  styleUrls: ['./upload-pages.component.css']
})
export class UploadPagesComponent implements OnInit {
  input: any
  edition: any = new editionModel();
  dataarr: any = [];
  imgid = '';
  imgarr: any = [];
  eid: any;
  cust_id: any;
  currentuser: any;
  category: any = '';
  imageId:any;

  merge_pdf:Boolean = true
  upload_image:Boolean = false

  constructor(private matDialog: MatDialog, private editionService: EditionService,
    private activatedRoute: ActivatedRoute, private loginService: LoginService, private masterService: MasterServiceService,
    private notification: NotificationService, private router: Router,private spinnerService: LoaderService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllImages();
  }

  addPdf() {
    let btn = document.getElementById('pdf-file');
    if (btn) {
      btn.click();
    }
  }
  onUpload(event: any) {
    this.edition.input = <File>event.target.files[0];
  }

  onUploadMultipleImages(event: any) {
    this.edition.images_arr = <File>event.target.files;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  showTabSection(id:any) {
    if(id === 1) {
      this.merge_pdf = true
      this.upload_image = false
    } else {
      this.merge_pdf = false
      this.upload_image = true
    }
  }

  update() {
    alert("Here")
  }

  startUpload() {
    this.spinnerService.show()
    this.edition.type = 'IMAGE';
    this.edition.edition_id = this.eid;
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'I';
    this.edition.customer_id = this.cust_id;
    if (this.edition.images_arr) {
      for(var i = 0; i < this.edition.images_arr.length; i++) {
        const reader = new FileReader(); 
        reader.onload = (e: any) => {
          this.edition.base64_arr.push(e.target.result);
        };
        reader.readAsDataURL(this.edition.images_arr[i])
      }
    }
    setTimeout(() => {
      this.editionService.saveUploadImage(this.edition).subscribe(res => {
        if (res.code === "success") {
          this.spinnerService.hide()
          this.getAllImages();
        } else {
          this.spinnerService.hide()
        }
      }, (err) => {
        this.spinnerService.hide() 
      });
    },1000);
  }

  getpdfToJpegImage() {
    this.spinnerService.show()
    this.edition.type = 'PDF';
    this.edition.edition_id = this.eid;
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'I';
    this.edition.customer_id = this.cust_id;

    if (this.edition.input) {
      var reader = new FileReader();
      reader.readAsDataURL(this.edition.input)
      reader.onload = function () {
      };
    }
    setTimeout(() => {
      if (this.edition.input) {
        this.edition.base64file = reader.result
      }
      this.editionService.saveUploadImage(this.edition).subscribe(res => {
        if (res.code === "success") {
          this.spinnerService.hide()
          this.getAllImages();
        } else {
          this.spinnerService.hide()
        }
      }, (err) => {
        this.spinnerService.hide() 
      });
    }, 1000)
  }

  getAllImages() {
    this.editionService.getAllImages(this.imgid, this.eid, environment.CUSTOMER_ID, this.category).subscribe(res => {
      if (res.code === "success") {
        var img = res.body;
        this.imgarr = img.map((i: any) => JSON.parse(i));
        var i: any
        for (i = 0; i < this.imgarr?.length; i++) {
          this.imgarr[i].index = i + 1;
        }
      } else {
        this.imgarr = [];
      }
    })
  }
  compress(data: any) {
    const dialogRef = this.matDialog.open(CompressImageComponent, {
      height: '350px',
      width: '600px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  deletePages(data: any) {
    this.imageId = data;
  }
  pageDelete() {
    var funct = 'UPLOADPAGE';
    this.masterService.bulkDeletion(funct,this.imageId, 0, environment.CUSTOMER_ID).subscribe(res => {
      if (res.code === "success") {
        document.getElementById("closeDeleteModalButton")?.click();
        this.notification.success("Page deleted successfully");
        this.getAllImages();
      } else {
        this.notification.error(res.message);
      }
    })
  }
  cancel(){
    document.getElementById("closeDeleteModalButton")?.click();
  }
  edit(index:any,id: any,eid:any) {
    localStorage.setItem('index',index)
    this.router.navigate([`/admin/epaper/edition/upload-pages/edit/${eid}/${id}`]);
  }
  createAreaMap(id: any,image_url: any) {
    localStorage.setItem('img_url',image_url)
    this.router.navigate([`/admin/epaper/edition/map/${id}`]);
  }
}
