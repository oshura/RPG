import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { StoryComponent } from './story/story.component';
import { SelectorComponent } from './selector/selector.component';
import { MenustripComponent } from './menustrip/menustrip.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import { DocsComponent } from './docs/docs.component';
import { NotesSelectorComponent } from './notesselector/notes-selector.component';


@NgModule({  
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [ChatComponent, StoryComponent, SelectorComponent, MenustripComponent, NotesComponent, DocsComponent, NotesSelectorComponent],
  exports: [ChatComponent, StoryComponent, SelectorComponent, MenustripComponent, NotesComponent, DocsComponent, NotesSelectorComponent]
})
export class ControlsModule { }
