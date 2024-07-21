import { Component, Input, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MatExpansionModule, MatFormField, MatLabel],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  readonly panelOpenState = signal(false);

  @Input() idea_id: string = '';
}
