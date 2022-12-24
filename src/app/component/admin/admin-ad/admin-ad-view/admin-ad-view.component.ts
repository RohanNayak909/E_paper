import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { environment } from 'src/environments/environment';
import { EditAdDialogComponent } from '../edit-ad-dialog/edit-ad-dialog.component';

@Component({
  selector: 'app-admin-ad-view',
  templateUrl: './admin-ad-view.component.html',
  styleUrls: ['./admin-ad-view.component.css']
})
export class AdminAdViewComponent implements OnInit {

  customer_id: any
  ads_id: any
  img_size: any
  allAdsList: any = []
  ads_top: any = []
  ads_rightupper: any = []
  ads_leftmiddle: any = []
  ads_middle: any = []

  constructor(private adsService: AdserviceService, public dialog: MatDialog, private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID
    this.getAllAdsList();
  }

  getAllAdsList() {
    this.spinnerService.show()
    this.ads_id = ''
    this.img_size = ''
    this.adsService.getAllAds(this.ads_id, this.img_size, this.customer_id, 'A').subscribe((res: any) => {
      this.spinnerService.hide();
      this.allAdsList = res.body;
      if(this.allAdsList != null) {
        this.allAdsList = this.allAdsList.map((dt: any) => JSON.parse(dt));

        /** Top Section */
        this.ads_top = this.allAdsList.filter((data: any) => data.ads_img_size === "1");
        /** Right Upper */
        this.ads_rightupper = this.allAdsList.filter((data: any) => data.ads_img_size === "2");
        /** Left Middle */
        this.ads_leftmiddle = this.allAdsList.filter((data: any) => data.ads_img_size === "3");
        /** Middle */
        this.ads_middle = this.allAdsList.filter((data: any) => data.ads_img_size === "4");
      }
    })
  }
  openDialog(event: any, id: any) {
    const dialogRef = this.dialog.open(EditAdDialogComponent, {
      height: '540px',
      width: '900px',
      data: { value: event, ads_size: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
