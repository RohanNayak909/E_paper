import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {DataUrl, NgxImageCompressService,} from 'ngx-image-compress';
import { editionModel } from 'src/app/models/editionmodel';
import { EditionService } from 'src/app/services/editionservice/edition.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
@Component({
  selector: 'app-compress-image',
  templateUrl: './compress-image.component.html',
  styleUrls: ['./compress-image.component.css']
})
export class CompressImageComponent implements OnInit {
  imgResultAfterCompress: DataUrl = '';
  imgResultBeforeCompress:any;
  sizeOfOriginalImage!:number;
  sizeOFCompressedImage!:number;
  localCompressedURl:any;
  file: any;
  localUrl: any;
  fileName!:string;
  beforecompressed:boolean = false;
  aftercompressed:boolean = false;
  edition = new editionModel(); 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private imageCompress: NgxImageCompressService,
  private editionService: EditionService,private router: Router,private notify:NotificationService) { }

  ngOnInit(): void {
  console.log(this.data,'data')
  this.toDataURL(this.data.image_url)
  }
  
    toDataURL = async (url:any) => {
      console.log("Downloading image...");
      var res = await fetch(url);
      var blob = await res.blob();
  
      const result = await new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          resolve(reader.result);
        }, false);
  
        reader.onerror = () => {
          return reject(this);
        };
        reader.readAsDataURL(blob);
      })
      this.localUrl = result;
      console.log(result,'result');
      return result;

    };
    
    compress(){
      this.compressFile(this.localUrl, this.data.image_name);
    }
    compressFile(localUrl:any,fileName:any){
    console.log(localUrl,'',fileName)
  
    var orientation = -1;
      this.sizeOfOriginalImage = this.imageCompress.byteCount(localUrl)/(1024*1024);
        console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
        
        this.imageCompress.compressFile(localUrl, orientation, 50, 50).then(
          result => {
            this.imgResultAfterCompress = result;
            this.localCompressedURl = result;
            this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
            console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
            // create file from byte
            const imageName = fileName;
            // call method that creates a blob from dataUri
            // const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
            const imageFile = new File([result], imageName, { type: 'image/jpeg' });
            console.log("file size:",imageFile['size']/(1024*1024));
          }
        );
      }
      uploadImgType:any
      saveCompressedImage(){
        console.log(this.data,'data');
        this.edition.customer_id = this.data.customer_id;
        this.edition.createdby = this.data.createdby;
        this.edition.edition_id = this.data.edition_id;
        this.edition.image_id = this.data.image_id;
        this.edition.flag = 'U';
        console.log(this.edition,'data');
        setTimeout(() => {
          this.edition.base64file = this.imgResultAfterCompress;
          this.editionService.saveCompressedImage(this.edition).subscribe((res: any) => {
            if (res.code == "success") {
              this.notify.success("Image compressed successfully.");
              window.location.reload();
            } else {
              this.notify.error(res.message)
    
            }
          }, (err: any) => {
            this.notify.error(err.message)
          })
        }, 1000);
      
      }
      
}
