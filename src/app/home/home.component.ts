import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Idea } from '../_model/Idea';
import { IdeaComponent } from '../idea/idea.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, IdeaComponent, RouterOutlet, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
}
