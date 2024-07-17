import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IdeaService } from '../_services/idea/idea.service';
import { AuthService } from '../_services/auth/auth.service';
import { SnackBarService } from '../_services/snackBar/snack-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-idea-editor-dialog',
  templateUrl: './idea-editor-dialog.component.html',
  styleUrls: ['./idea-editor-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxEditorModule,
    CommonModule
  ]
})
export class IdeaEditorDialogComponent implements OnInit, OnDestroy {

  ideaService = inject(IdeaService);
  authService = inject(AuthService);
  snackBarService = inject(SnackBarService);

  constructor(public dialogRef: MatDialogRef<IdeaEditorDialogComponent>, private sanitizer: DomSanitizer) {
  }

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  markdownEditor = new FormGroup({
    editorContent: new FormControl('', [Validators.required(), Validators.maxLength(400)]),
    ideaTitle: new FormControl('', [Validators.required(), Validators.maxLength(50)])
  });
  editor: Editor = new Editor();
  cDate = new Date();

  ngOnInit(): void {
    // Monitora i cambiamenti nel FormControl per il contenuto dell'editor
    const editorContentControl = this.markdownEditor.get('editorContent');
    if (editorContentControl) {
      editorContentControl.valueChanges.subscribe((value: string | null) => { 
        if (value) {
          const textWithoutTags = this.stripHtmlTags(value);
          if (textWithoutTags.length > 400) {
            editorContentControl.setErrors({ maxLengthExceeded: true });
          } else {
            editorContentControl.setErrors(null);
          }
        }
      });
    }
  }

  stripHtmlTags(str: string): string {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  get editorContentControl() {
    return this.markdownEditor.get('editorContent');
  }

  // Getter per accedere al FormControl ideaTitle
  get ideaTitleControl() {
    return this.markdownEditor.get('ideaTitle');
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createIdea() {
    if (this.markdownEditor.valid) {
      this.ideaService.saveIdea({
        text: this.markdownEditor.get('editorContent')?.value as string,
        title: this.markdownEditor.get("ideaTitle")?.value as string,
        upvote: 0,
        downvote: 0,
        date: this.cDate
      }).subscribe({
        next: (response) => {
          console.log('idea succesfully created: ', response);
          this.snackBarService.showSnackBar("Idea sucesfully saved!");
          this.onClose()
        },
        error: (err) => {
          this.snackBarService.showSnackBar("Unable to save the Idea", 'error');
          console.log(err);
        }
      });
    } else if (this.markdownEditor.get('editorContent')?.value?.length as number > 400 || this.markdownEditor.get('ideaTitle')?.value?.length as number > 50) {
      if (this.markdownEditor.get('editorContent')?.value?.length as number > 400) {
        this.snackBarService.showSnackBar("You can insert up to 400 characters in your idea");
      } else {
        this.snackBarService.showSnackBar("The idea title can't be longer than 50 characters");
      }
    } else {
      this.snackBarService.showSnackBar("Invalid Idea");
    }
  }

}
