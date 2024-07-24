import { Component, Input, inject, signal } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CommentRequest } from '../../_services/idea/comment-request.type';
import { IdeaService } from '../../_services/idea/idea.service';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  ideaService = inject(IdeaService);
  comments: CommentRequest[] = [];

  readonly panelOpenState = signal(false);
  commentForm = new FormGroup({
    commentText: new FormControl('', Validators.minLength(2))
  })
  @Input() idea_id: string = '';
  commentRange: number = 0;


  publishComment() {
    let commentText = this.commentForm.get('commentText');
    if (this.commentForm.valid) {
      console.log("Button clicked " + commentText?.value);
      let comment: CommentRequest = { text: commentText?.value as string, username: localStorage.getItem('user') as string, idea_id: this.idea_id };
      this.ideaService.commentIdea(comment).subscribe({
        next: () => {
          commentText?.setValue('');
          this.comments.push(comment);
        }
      });

    } else {
      console.error("Sorry, insert a valid comment")
    }
  }

  loadMoreComments(){
    this.commentRange += 3;
    this.getComments();
  }

  getComments() {
    this.ideaService.getComments(this.idea_id, this.commentRange).subscribe({
      next: (comments) => {
        console.log('This is what I fetched ' + comments);
        this.comments = comments;
      },
      error: (err) =>{
        console.error('Something wrong: ' + err);
      }
    })
    return this.comments
  }

  clearCommentSection() {
    this.commentRange = 0;
    this.comments = [];
  }

}
