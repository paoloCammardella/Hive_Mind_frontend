import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatProgressBar, ProgressBarMode} from '@angular/material/progress-bar'
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatProgressBar, MatButtonModule, MatMenuModule, MatIconModule, MatTabsModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  bufferValue: number = 100;
  mode: ProgressBarMode = "determinate";
  color: ThemePalette = "#F8B828" as ThemePalette;
}
