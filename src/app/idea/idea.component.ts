import { Component, Input, Sanitizer } from '@angular/core';
import { Idea } from '../_model/Idea';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule, MatIconModule],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  constructor(private sanitizer: DomSanitizer){
    console.log(`Qua siamo dentro il componente Idea ${this.cardItems}`);
  }
  
  changeSelected($event: any, chip: string) {
    if (chip === 'Upvote') {
      console.log("Hai fatto upvote")
    }
    else if(chip === 'Downvote'){
      console.log("Hai fatto downvote")
    }
  }

  // this.ideaText = this.sanitizer.bypassSecurityTrustHtml(this.markdownEditor.value.editorContent as string);
  getSafeHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
  @Input() cardItems!: Idea[];

}
