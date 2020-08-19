import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class FunctionsService {
  constructor(private snackBar: MatSnackBar) {
  }

  numberWithSpaces(x) {
    if (typeof x === 'number') {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    }

    return '-';
  }

  showInfoSnack(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000
    });
  }
}
