import { Component, Input } from '@angular/core';
import { Idea } from '../_model/Idea';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  
  changeSelected($event: any, chip: string) {
    if (chip === 'Upvote') {
      console.log("Hai fatto upvote")
    }
    else if(chip === 'Downvote'){
      console.log("Hai fatto downvote")
    }
  }


  ideaText: SafeHtml = 'prova';
  // this.ideaText = this.sanitizer.bypassSecurityTrustHtml(this.markdownEditor.value.editorContent as string);

   @Input() cardItems!: Idea[];

  trackById(index: number, item: Idea): string {
    return item.getId;
  }

  trackByChip(index: number, chip: string): string {
    return chip;
  }
}
