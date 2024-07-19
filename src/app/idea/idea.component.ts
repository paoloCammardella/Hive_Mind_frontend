import { Component, Input, inject } from '@angular/core';
import { Idea } from '../_model/Idea';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LikeIdea } from '../_model/Idea';
import { UserService } from '../_services/user/user.service';
import { IdeaService } from '../_services/idea/idea.service';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule, MatIconModule, MatDividerModule],
  providers: [DatePipe],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {

  userService = inject(UserService);
  ideaService = inject(IdeaService);

  constructor(private sanitizer: DomSanitizer, private datePipe: DatePipe) {
  }


  voteIdea(chip: string, idea: Idea) {
    let ideaRequest: LikeIdea = {
      user_id: idea.user,
      idea_id: idea._id,
      downVote: false,
      upVote: false, 
    }

    //TODO: aggiorna la lista al like.
    let observable = this.ideaService.getIdeas("popular");
    observable.subscribe({
      next: (ideas) => {
        this.cardItems = ideas;
      }
    })
    let userUpvoted: Boolean = false;
    
    if (chip === 'Upvote') {
      ideaRequest.upVote = true;
      ideaRequest.downVote = false;
      this.userService.likeIdea(ideaRequest).subscribe({
        next: () => {
          userUpvoted = true;
          idea.upvote++;
          idea.userUpvoted = true;
          idea.userDownvoted = false;
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (chip === 'Downvote') {
      ideaRequest.upVote = false;
      ideaRequest.downVote = true;
      this.userService.likeIdea(ideaRequest).subscribe({
        next: () => {
          idea.downvote++;
          if(userUpvoted){
            idea.upvote--;
          }
          idea.userUpvoted = false;
          idea.userDownvoted = true;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  getSafeHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  parseDate(isoDate: Date) {
    return this.datePipe.transform(isoDate, 'dd/MM/yyyy');
  }

  @Input() cardItems!: Idea[];

}
