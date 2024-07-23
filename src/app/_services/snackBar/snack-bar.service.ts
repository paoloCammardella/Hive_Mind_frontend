import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private defaultConfig: MatSnackBarConfig<any> = {
    duration: 1500,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: ['centered-snackbar']
    };

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string = '', config?: MatSnackBarConfig<any>, type: 'success' | 'error' = 'success') {
    const finalConfig = { ...this.defaultConfig, ...config };

    if (!finalConfig.panelClass) {
      finalConfig.panelClass = [];
    } else if (typeof finalConfig.panelClass === 'string') {
      finalConfig.panelClass = [finalConfig.panelClass];
    }

    finalConfig.panelClass.push(type === 'success' ? 'success-snackbar' : 'error-snackbar');
    this.snackBar.open(message, action, finalConfig);
  }
}
