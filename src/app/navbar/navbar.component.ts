import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatProgressBar, ProgressBarMode} from '@angular/material/progress-bar'
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatProgressBar],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  bufferValue: number = 100;
  mode: ProgressBarMode = "query";
  color: ThemePalette = "#F8B828" as ThemePalette;
}
