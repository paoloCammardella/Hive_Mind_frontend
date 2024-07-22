import { Component, Input, signal } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Comment } from '../_services/idea/comment-request.type';
import { CommonModule } from '@angular/common';


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
getComments() {
  return this.comments
}
  comments: Comment[] = [{text: 'ciao', idea_id: 'dawdawdaw', username:'paolino'}];

  publishComment() {
    throw new Error('Method not implemented.');
  }
  readonly panelOpenState = signal(false);
  commentForm = new FormGroup({
    commentText: new FormControl('', Validators.required)
  })
  @Input() idea_id: string = '';
}
