import * as _ from 'lodash';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { editionModel } from 'src/app/models/editionmodel';
import { UploadImageModel } from 'src/app/models/uploadimagemodel';
import { EditionService } from '../editionservice/edition.service';
import { environment } from 'src/environments/environment';

export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress,
}

export class FileQueueObject {
  public file: any;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress: number = 0;
  public request!: any;
  public response!: any;

  constructor(file: any) {
    this.file = file;
  }

  // actions
  public upload = () => {
    /* set in service */
  };
  public cancel = () => {
    /* set in service */
  };
  public remove = () => {
    /* set in service */
  };

  // statuses
  public isPending = () => this.status === FileQueueStatus.Pending;
  public isSuccess = () => this.status === FileQueueStatus.Success;
  public isError = () => this.status === FileQueueStatus.Error;
  public inProgress = () => this.status === FileQueueStatus.Progress;
  public isUploadable = () =>
    this.status === FileQueueStatus.Pending ||
    this.status === FileQueueStatus.Error;
}

// tslint:disable-next-line:max-classes-per-file
@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  public url: string = environment.BASE_URL + '/master' + '/save-upload-single-image';

  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];

  edition: any = new UploadImageModel();

  constructor(private http: HttpClient) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>(
      new BehaviorSubject(this._files)
    );
  }

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public events
  public onCompleteItem(queueObj: FileQueueObject, response: any): any {
    return { queueObj, response };
  }

  // public functions
  public addToQueue(data: any, obj: any) {
    console.log(obj);

    this.edition.edition_id = obj.edition_id
    this.edition.createdby = obj.createdby
    this.edition.customer_id = obj.customer_id
    this.edition.page_type = obj.page_type

    console.log(this.edition);

    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public uploadAll() {
    // upload all except already successfull or in progress
    var c = 0;
    _.each(this._files, (queueObj: FileQueueObject) => {
      if (queueObj.isUploadable()) {
        setTimeout(() => {
          c = c + 1;
          this._upload(queueObj, this._files.length,c);
        }, 2000)
      }
    });
  }

  // private functions
  private _addToQueue(file: any) {
    const queueObj = new FileQueueObject(file);

    // set the individual object events
    // queueObj.upload = () => this._upload(queueObj);
    queueObj.remove = () => this._removeFromQueue(queueObj);
    queueObj.cancel = () => this._cancel(queueObj);

    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  private _removeFromQueue(queueObj: FileQueueObject) {
    _.remove(this._files, queueObj);
  }

  private _upload(queueObj: FileQueueObject, len: any, c:any) {
    // console.log(queueObj.file.name, ' ', len);

    var promise: any = new Promise(this.getBase64(queueObj.file));
    promise.then((data: any) => {
      this.edition.base64Img = data.encryptData
      this.edition.file_name = data.fileName
      this.edition.full_name = data.fullName
      var obj: any = {}
      obj.base64Img = this.edition.base64Img
      obj.file_name = this.edition.file_name
      obj.full_name = this.edition.full_name
      obj.edition_id = this.edition.edition_id;
      obj.createdby = this.edition.createdby;
      obj.customer_id = this.edition.customer_id;
      obj.page_type = this.edition.page_type
      obj.slno = c
      // console.log('Obj===', obj.full_name,' - - ',obj.slno);

      const req = new HttpRequest('POST', this.url, obj, {
        reportProgress: true,
      });

      queueObj.request = this.http.request(req).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this._uploadProgress(queueObj, event);
            } else if (event instanceof HttpResponse) {
              this._uploadComplete(queueObj, event);
            }
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this._uploadFailed(queueObj, err);
            } else {
              this._uploadFailed(queueObj, err);
            }
          }
        );

      return queueObj;
    });
    //   this.editionService.saveSingleUploadImage(obj).subscribe(res => {
    //     if (res.code === "success") {
    //       console.log(res.body);
    //       this._uploadComplete(queueObj, event);
    //       // this.success_url = res.body.success_url
    //       // this.failed_url = res.body.fail_url
    //       // this.spinnerService.hide()
    //       // this.openModal()
    //       // this.getAllImages();
    //       // window.location.reload();
    //       // this.is_image_upload = true
    //       // this.image_file_upload.nativeElement.value = '';
    //       // this.page_style = '0'
    //     } else {
    //       // this.is_image_upload = false
    //       // this.spinnerService.hide()
    //     }
    //   }, (err) => {
    //     // this.is_image_upload = false
    //     // this.spinnerService.hide()
    //   });

    // });

    // upload file and report progress
    // const req = new HttpRequest('POST', this.url, form, {
    //   reportProgress: true,
    // });

    // console.log('form==',form);


    // upload file and report progress
    // queueObj.request = this.http.request(req).subscribe(
    //   (event: any) => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this._uploadProgress(queueObj, event);
    //     } else if (event instanceof HttpResponse) {
    //       this._uploadComplete(queueObj, event);
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       // A client-side or network error occurred. Handle it accordingly.
    //       this._uploadFailed(queueObj, err);
    //     } else {
    //       // The backend returned an unsuccessful response code.
    //       this._uploadFailed(queueObj, err);
    //     }
    //   }
    // );

  }

  getBase64(fileData: any) {

    console.log(fileData.name);


    return function (resolve: any) {
      var reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = function () {
        var encryptData: any = reader.result
        var fileName: any = fileData.name.split('.')[0]
        var fullName: any = fileData.name
        var obj = { encryptData: encryptData, fileName: fileName, fullName: fullName }
        resolve(obj);
      }
    }
  }

  private _cancel(queueObj: FileQueueObject) {
    // update the FileQueueObject as cancelled
    queueObj.request.unsubscribe();
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Pending;
    this._queue.next(this._files);
  }

  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress
    const progress = Math.round((100 * event.loaded) / event.total);
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);
  }

  private _uploadComplete(
    queueObj: FileQueueObject,
    response: HttpResponse<any>
  ) {
    // update the FileQueueObject as completed
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    queueObj.response = response;
    this._queue.next(this._files);
    this.onCompleteItem(queueObj, response.body);
  }

  private _uploadFailed(
    queueObj: FileQueueObject,
    response: HttpErrorResponse
  ) {
    // update the FileQueueObject as errored
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    queueObj.response = response;
    this._queue.next(this._files);
  }
}
