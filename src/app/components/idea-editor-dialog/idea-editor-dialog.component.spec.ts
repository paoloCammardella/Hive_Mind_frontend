import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaEditorDialogComponent } from './idea-editor-dialog.component';

describe('IdeaEditorDialogComponent', () => {
  let component: IdeaEditorDialogComponent;
  let fixture: ComponentFixture<IdeaEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaEditorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdeaEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
