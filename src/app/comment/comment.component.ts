import { Component, Input, inject, signal } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CommentRequest } from '../_services/idea/comment-request.type';
import { IdeaService } from '../_services/idea/idea.service';


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
  comments: CommentRequest[] = [{ text: 'ciao', idea_id: 'dawdawdaw', username: 'paolino' }];

  readonly panelOpenState = signal(false);
  commentForm = new FormGroup({
    commentText: new FormControl('', Validators.minLength(2))
  })
  @Input() idea_id: string = '';


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

  getComments() {
    this.ideaService.getComments(this.idea_id).subscribe({
      next: (comments) => {
        this.comments = comments;
      }
    })
    return this.comments
  }

  clearCommentSection() {
    this.comments = [];
  }

}
