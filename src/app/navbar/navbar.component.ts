import { Component, inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressBar, ProgressBarMode } from '@angular/material/progress-bar'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { SnackBarService } from '../_services/snackBar/snack-bar.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IdeaEditorDialogComponent } from '../idea-editor-dialog/idea-editor-dialog.component';
import { AuthService } from '../_services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatProgressBar, 
    MatButtonModule,
    MatDialogModule, 
    MatMenuModule, 
    MatIconModule, 
    MatTabsModule, 
    RouterOutlet, 
    RouterLink, 
    MatTooltipModule, 
    MatCardModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  bufferValue: number = 100;
  mode: ProgressBarMode = "determinate";
  color: ThemePalette = "#F8B828" as ThemePalette;

  constructor(public dialog: MatDialog) { }
  
  snackBar = inject(SnackBarService);
  authService = inject(AuthService);

  currentUser = localStorage.getItem('user') as string;


  openIdeaEditor(): void { 
    const dialogRef = this.dialog.open(IdeaEditorDialogComponent, {
      width: '500px',
      backdropClass: 'blur-background'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  performLogout() {
    this.authService.logout();
  }
}
