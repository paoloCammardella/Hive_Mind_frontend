import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, inject, signal, viewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommentComponent } from "../comment/comment.component";
import { PaginatorIntlService } from '../_services/paginator/paginator-intl.service';
import { SnackBarService } from '../_services/snackBar/snack-bar.service';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatFormField,
    MatLabel,
    CommentComponent],
  providers: [DatePipe, { provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent implements AfterViewInit {

  userService = inject(UserService);
  ideaService = inject(IdeaService);
  snackBarService = inject(SnackBarService);

  @Output() pageNumber = new EventEmitter<number>();
  @Input() cardItems!: Idea[];
  @Input() totalElements!: number;
  @Input() pageIndex!: number;
  @ViewChild('paginator') paginator!: MatPaginator;
  currPage: number = 0;
  userUpvoted: boolean = false;
  userDownvoted: boolean = false;

  constructor(private sanitizer: DomSanitizer, private datePipe: DatePipe) {

  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.paginator.firstPage();
  }

  onPageChange($event: PageEvent) {
    this.pageNumber.emit($event.pageIndex);
    this.currPage = $event.pageIndex;
    console.log($event);
  }

  resetPaginator() {
    this.paginator.firstPage();
  }

  voteIdea(chip: string, idea: Idea) {
    let ideaRequest: LikeIdea = {
      user_id: localStorage.getItem('user') as string,
      idea_id: idea._id,
      downVote: false,
      upVote: false,
    }


    if (chip === 'Upvote') {
      if (idea.userUpvoted) {
        ideaRequest.upVote = false;
        ideaRequest.downVote = false;
      } else {
        ideaRequest.upVote = true;
      }
      this.userService.likeIdea(ideaRequest).subscribe({
        next: () => {
          if (idea.userUpvoted) {
            idea.upvote--;
          } else if (idea.userDownvoted) {
            idea.upvote++;
            idea.downvote--;
          } else {
            idea.upvote++;
          }
          console.log('User upvoted;');
        },
        error: (err) => {
          if (ideaRequest.user_id === localStorage.getItem('user')) {
            this.snackBarService.showSnackBar("You can't vote your own ideas");
          } else {
            console.error(err);
          }
        }
      });
    } else if (chip === 'Downvote') {
      if (idea.userDownvoted) {
        ideaRequest.upVote = false;
        ideaRequest.downVote = false;
      } else {
        ideaRequest.downVote = true;
      }
      this.userService.likeIdea(ideaRequest).subscribe({
        next: () => {
          if (idea.userDownvoted) {
            idea.userDownvoted = false;
            idea.downvote--;
          } else if (idea.userUpvoted) {
            idea.upvote--;
            idea.downvote++;
          } else {
            idea.userDownvoted = true;
            idea.downvote++;
          }
          console.log('User downvoted;')
        },
        error: (err) => {
          if (ideaRequest.user_id === localStorage.getItem('user')) {
            this.snackBarService.showSnackBar("You can't vote your own ideas");
          } else {
            console.error(err);
          }
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
}
