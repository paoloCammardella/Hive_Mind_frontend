import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Idea } from '../_model/Idea';
import { IdeaComponent } from '../idea/idea.component';
import { IdeaService } from '../_services/idea/idea.service';
import { SnackBarService } from '../_services/snackBar/snack-bar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, IdeaComponent, RouterOutlet, MatTabsModule, MatCardModule, MatChipsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ideaService = inject(IdeaService);
  snackBarService = inject(SnackBarService);

  selectedIndex: number = 0;
  popIdeas: Idea[] = [];
  contIdeas: Idea[] = [];
  unpopIdeas: Idea[] = [];

  ngOnInit() {
    this.onTabChange(this.selectedIndex);
  }

  onTabChange(index: number): void {
    this.selectedIndex = index;
    let observable = null;

    switch (index) {
      case 0:
        observable = this.ideaService.getIdeas("popular");
        break;
      case 1:
        observable = this.ideaService.getIdeas("controversial");
        break;
      case 2:
        observable = this.ideaService.getIdeas("unpopular");
        break;
      default:
        return;
    }

    observable.subscribe({
      next: (ideas) => {
        switch (index) {
          case 0: this.popIdeas = ideas; break;
          case 1: this.contIdeas = ideas; break;
          case 2: this.unpopIdeas = ideas; break;
        }
        console.log('Ideas fetched:', ideas);
      },
      error: (err) => {
        switch (index) {
          case 0: this.popIdeas = []; break;
          case 1: this.contIdeas = []; break;
          case 2: this.unpopIdeas = []; break;
        }
        this.snackBarService.showSnackBar("Error fetching ideas.", 'error');
        console.error('Error fetching ideas:', err);
      }
    });
  }
}
