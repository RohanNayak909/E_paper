import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  typeSelected: 'ball-fussion';

  constructor(private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }

  showHideSpinner(timeout=1000): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, timeout); // 5 seconds
  }

  show() {
    this.spinnerService.show();
  }

  hide() {
    this.spinnerService.hide();
  }

}
