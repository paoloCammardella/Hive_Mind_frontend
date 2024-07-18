import { Component, Input } from '@angular/core';
import { Idea } from '../_model/Idea';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule, MatIconModule, MatDividerModule],
  providers: [DatePipe], 
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
  constructor(private sanitizer: DomSanitizer, private datePipe: DatePipe){
    console.log(`Qua siamo dentro il componente Idea ${this.cardItems}`);
  }
  
  voteIdea(chip: string) {
    if (chip === 'Upvote') {
      console.log("Hai fatto upvote")
    }
    else if(chip === 'Downvote'){
      console.log("Hai fatto downvote")
    }
  }

  getSafeHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  parseDate(isoDate: Date){
    return this.datePipe.transform(isoDate, 'dd/MM/yyyy');
  }

  @Input() cardItems!: Idea[];

}
