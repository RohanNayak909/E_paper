import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    constructor(private SnackBar: MatSnackBar) { }

    options = {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
    };

    success(message: string, options = this.options) {
        this.SnackBar.open(message, 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-primary'],
        });
    }

    error(message: string, options = this.options) {
        this.SnackBar.open(message, 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-warn'],
        });
    }
}
