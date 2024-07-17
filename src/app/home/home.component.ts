import { Component, inject } from '@angular/core';
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
  imports: [NavbarComponent, FooterComponent, IdeaComponent, RouterOutlet, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ideaService = inject(IdeaService);
  snackBarService = inject(SnackBarService);


  selectedIndex: number = 0;
  popIdeas!: Idea[];
  contIdeas!: Idea[];
  unpopIdeas!: Idea[];

  onTabChange(index: number): void {
    this.selectedIndex = index;
    if (index === 0) {
      this.ideaService.getIdeas("popular").subscribe({
        next: (ideas) => { // Use "ideas" for clarity
          this.popIdeas = ideas;
          console.log('Ideas successfully fetched:', ideas);
        },
        error: (err) => {
          this.snackBarService.showSnackBar("0 popular idea found", 'error');
          this.popIdeas = []
          console.log(err);
        }
      });
    } else if (index === 1) {
      this.ideaService.getIdeas("controversial").subscribe({
        next: (ideas) => {
          this.contIdeas = ideas;
          console.log('Controversial idea found: ', ideas);
        },
        error: (err) => {
          this.snackBarService.showSnackBar("0 controversial idea found.", 'error');
          this.contIdeas = []
          console.log(err);
        }
      });
    } else if (index === 2) {
      console.log(this.ideaService.getIdeas("unpopular").subscribe({
        next: (response) => {
          console.log('Controversial idea found: ', response);
        },
        error: (err) => {
          this.snackBarService.showSnackBar("0 unpopular idea found.", 'error');
          this.unpopIdeas = []
          console.log(err);
        }
      }));
    }
  }
}
