import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close(false);
  }

  submit(){
    this.dialogRef.close(true);
  }

}
