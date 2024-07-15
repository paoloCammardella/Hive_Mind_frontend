import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private defaultConfig: MatSnackBarConfig<any> = {
    duration: 3000, // Durata in millisecondi
    verticalPosition: 'top', // Posizione verticale: 'top' o 'bottom'
    horizontalPosition: 'center', // Posizione orizzontale: 'start', 'center', 'end', 'left', 'right'
    panelClass: ['centered-snackbar'] // Inizializza come array di stringhe
  };

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string = '', config?: MatSnackBarConfig<any>, type: 'success' | 'error' = 'success') {
    const finalConfig = { ...this.defaultConfig, ...config };

    // Assicurati che panelClass sia un array di stringhe
    if (!finalConfig.panelClass) {
      finalConfig.panelClass = [];
    } else if (typeof finalConfig.panelClass === 'string') {
      finalConfig.panelClass = [finalConfig.panelClass];
    }

    // Aggiungi la classe specifica per successo o errore
    finalConfig.panelClass.push(type === 'success' ? 'success-snackbar' : 'error-snackbar');

    this.snackBar.open(message, action, finalConfig);
  }
}
