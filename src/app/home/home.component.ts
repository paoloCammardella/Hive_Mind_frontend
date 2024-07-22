import { Component, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Idea } from '../_model/Idea';
import { IdeaComponent } from '../idea/idea.component';
import { IdeaService } from '../_services/idea/idea.service';
import { UserService } from '../_services/user/user.service';
import { SnackBarService } from '../_services/snackBar/snack-bar.service';
import { LikeIdea } from '../_model/Idea';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, IdeaComponent, RouterOutlet, MatTabsModule, MatCardModule, MatChipsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  ideaService = inject(IdeaService);
  userService = inject(UserService);
  snackBarService = inject(SnackBarService);

  totalElements: number = 0;
  selectedIndex: number = 0;
  page: number = 0;
  ideas: Idea[] = [];
  votedIdeas: LikeIdea[] = [];

  ngOnInit() {
    this.getIdeas(this.selectedIndex, 0);
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
    this.page = 0;
    this.getIdeas(index, this.page);
  }

  loadMoreIdeas(pageIndex: number) {
    this.page = pageIndex;
    this.getIdeas(this.selectedIndex, this.page);
  }

  getIdeas(index: number, page: number): void {
    this.selectedIndex = index;
    let observable = null;

    switch (index) {
      case 0:
        observable = this.ideaService.getIdeas("popular", page);
        break;
      case 1:
        observable = this.ideaService.getIdeas("controversial", page);
        break;
      case 2:
        observable = this.ideaService.getIdeas("unpopular", page);
        break;
      default:
        return;
    }

    observable.subscribe({
      next: (ideas) => {
        this.fetchUserVotes()
        this.ideas = ideas.content;
        this.totalElements = ideas.totalElements;
        console.log('fetched Ideas ' + ideas.content);
      },
      error: (err) => {
        this.ideas = [];
        this.snackBarService.showSnackBar("Error fetching ideas.", 'error');
        console.error('Error fetching ideas:', err);
      }
    });
  }

  fetchUserVotes(): void {
    const userId = localStorage.getItem('user');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    this.userService.getUserVotes(userId).subscribe({
      next: (votes: LikeIdea[]) => {
        console.log('User votes fetched:', votes);
        this.votedIdeas = votes;
        this.updateIdeasWithVotes();
      },
      error: (err) => {
        console.error('Error fetching user votes:', err);
      }
    });
  }

  updateIdeasWithVotes(): void {
    if (this.ideas) {
      this.ideas.forEach(idea => {
        const vote = this.votedIdeas.find(v => v.idea_id === idea._id);
        if (vote) {
          idea.userUpvoted = vote.upVote;
          idea.userDownvoted = vote.downVote;
          console.log(`Idea ID: ${idea._id}, Upvoted: ${idea.userUpvoted}, Downvoted: ${idea.userDownvoted}`);
        }
      });
    }
  }
}
