import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { editionModel } from 'src/app/models/editionmodel';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { FileQueueObject, FileUploaderService } from 'src/app/services/fileservice/file-uploader.service';
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
  imageId: any;
  page_style: any = '0'
  merge_pdf: Boolean = true
  upload_image: Boolean = false

  is_merged_pdf_upload: Boolean = true
  is_image_upload: Boolean = true

  @ViewChild('pdf_file_upload')
  pdf_file_upload!: ElementRef;
  @ViewChild('image_file_upload')
  image_file_upload!: ElementRef;
  success_url: any = [];
  failed_url: any = [];

  queue!: Observable<FileQueueObject[]>;

  uploadqueuediv: Boolean = false
  @Output() onCompleteItem = new EventEmitter();

  is_response: Boolean = false

  constructor(private matDialog: MatDialog, private editionService: EditionService,
    private activatedRoute: ActivatedRoute, private loginService: LoginService, private masterService: MasterServiceService,
    private notification: NotificationService, private router: Router, private spinnerService: LoaderService,
    private uploader: FileUploaderService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.eid = Number(routeParams.get('id'));
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.getAllImages();
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  addPdf() {
    let btn = document.getElementById('pdf-file');
    if (btn) {
      btn.click();
    }
  }
  onUpload(event: any) {
    this.is_merged_pdf_upload = false
    this.edition.input = <File>event.target.files[0];
  }

  onUploadMultipleImages(event: any) {
    this.is_image_upload = false
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

  showTabSection(id: any) {
    this.page_style = '0'
    if (id === 1) {
      this.merge_pdf = true
      this.upload_image = false
    } else {
      this.merge_pdf = false
      this.upload_image = true
    }
  }

  update() {
    this.spinnerService.show();
    var image_id_arr = this.imgarr.map((x: any) => x.image_id);
    // console.log(image_id_arr);
    this.editionService.updateImageSerial(image_id_arr).subscribe(res => {
      if (res.code === "success") {
        this.spinnerService.hide()
        this.getAllImages();
      } else {
        this.spinnerService.hide()
      }
    }, (err) => {
      this.spinnerService.hide()
    });
  }
  getBase64(fileData: any) {
    // console.log('inside===',fileData.name);

    return function (resolve: any) {
      var reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = function () {
        var encryptData: any = reader.result
        var fileName: any = fileData.name.split('.')[0]
        var fullName: any = fileData.name
        // console.log(fileName);

        var obj = { encryptData: encryptData, fileName: fileName, fullName: fullName }
        resolve(obj);
      }
    }
  }
  async startUpload() {
    this.spinnerService.show()
    this.edition.type = 'IMAGE';
    this.edition.edition_id = this.eid;
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'I';
    this.edition.customer_id = this.cust_id;
    this.edition.page_type = this.page_style
    if (this.edition.images_arr) {

      for (var i = 0; i < this.edition.images_arr.length; i++) {
        // console.log(this.edition.images_arr[i].name);

        var promise: any = new Promise(await this.getBase64(this.edition.images_arr[i]));
        promise.then((data: any) => {
          // setTimeout(() => {
          this.edition.base64_arr.push({
            base64arr: data.encryptData,
            file_name: data.fileName,
            full_name: data.fullName
          })
          // }, 250)
        });
      }
    }

    setTimeout(() => {
      this.editionService.saveUploadImage(this.edition).subscribe(res => {
        if (res.code === "success") {
          // console.log(res.body);
          this.success_url = res.body.success_url
          this.failed_url = res.body.fail_url
          this.spinnerService.hide()
          this.openModal()
          this.getAllImages();
          // window.location.reload();
          this.is_image_upload = true
          this.image_file_upload.nativeElement.value = '';
          this.page_style = '0'
        } else {
          this.is_image_upload = false
          this.spinnerService.hide()
        }
      }, (err) => {
        this.is_image_upload = false
        this.spinnerService.hide()
      });
    }, 1000);
  }

  getpdfToJpegImage() {
    this.spinnerService.show()
    this.edition.type = 'PDF';
    this.edition.edition_id = this.eid;
    this.edition.createdby = this.currentuser.user_id;
    this.edition.flag = 'I';
    this.edition.customer_id = this.cust_id;
    this.edition.page_type = this.page_style
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
          this.is_merged_pdf_upload = true
          this.spinnerService.hide()
          this.getAllImages();
          this.pdf_file_upload.nativeElement.value = '';
          this.page_style = '0'
        } else {
          this.spinnerService.hide()
          this.is_merged_pdf_upload = false
        }
      }, (err) => {
        this.spinnerService.hide()
        this.is_merged_pdf_upload = false
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
      // console.log(result);
    })
  }
  deletePages(data: any) {
    this.imageId = data;
  }
  pageDelete() {
    var funct = 'UPLOADPAGE';
    this.masterService.bulkDeletion(funct, this.imageId, 0, environment.CUSTOMER_ID).subscribe(res => {
      if (res.code === "success") {
        document.getElementById("closeDeleteModalButton")?.click();
        this.notification.success("Page deleted successfully");
        this.getAllImages();
      } else {
        this.notification.error(res.message);
      }
    })
  }
  cancel() {
    document.getElementById("closeDeleteModalButton")?.click();
  }
  closeRangeModal() {
    // document.getElementById("closeRangeModalButton")?.click();
    var doc: any = document.getElementById("rangemodal");
    doc.style.display = "none"
    doc.classList.remove("show")
  }
  edit(index: any, id: any, eid: any) {
    localStorage.setItem('index', index)
    this.router.navigate([`/admin/epaper/edition/upload-pages/edit/${eid}/${id}`]);
  }
  createAreaMap(id: any, image_url: any, page_type: any) {
    localStorage.setItem('img_url', image_url)
    localStorage.setItem('page_type', page_type)
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/admin/epaper/edition/map/${id}`])
    );
    window.open(url, '_blank');
  }
  openModal() {
    var doc: any = document.getElementById("rangemodal");
    doc.style.display = "block"
    doc.classList.add("show")
  }

  browseClick() {
    var fileupload = document.getElementById("image_file_upload");
    fileupload?.click();
  }

  addToQueue() {
    const fileBrowser = this.image_file_upload.nativeElement;
    var obj = { edition_id: null, createdby: null, customer_id: null, page_type: null }
    obj.edition_id = this.eid;
    obj.createdby = this.currentuser.user_id;
    obj.customer_id = this.cust_id;
    obj.page_type = this.page_style
    
    this.uploadqueuediv = true
    this.is_image_upload = false
    this.editionService.getSerialNo(obj.edition_id,obj.customer_id).subscribe(res => {
        this.uploader.addToQueue(fileBrowser.files, obj, res);
    }, (err) => {
      this.uploader.addToQueue(fileBrowser.files, obj, 0);
    })
  }

  uploadAll() {
    this.uploader.uploadAll();
  }

  clearAll() {
    this.uploadqueuediv = false
    this.is_image_upload = true
    this.uploader.clearQueue();
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.getAllImages();
    this.is_image_upload = true
    this.image_file_upload.nativeElement.value = '';
    this.page_style = '0'
    this.is_response = true
  }
}
