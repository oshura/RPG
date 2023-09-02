import { Component, OnDestroy, OnInit } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  public model: Notes = { text: "" };

  private timeout = 0;

  ServerNotes$ = this.notesService.getNotes().subscribe({
    next: value => {
      this.ServerNotes.text = value.text;
      this.model.text = value.text;
    }
  })
  ServerNotes: Notes = { text: "" };

  constructor(private notesService: NotesService) { }
  
  ngOnInit(): void {    
    this.timeout = window.setInterval(() => { this.UpdateNotes() },2500);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timeout);
  }

  UpdateNotes()
  {
    if (this.ServerNotes.text == this.model.text) 
    {
      console.log("UpdateNotes discarded: " + this.model.text);
      
    }
    else
    {
      console.log("UpdateNotes efective: " + this.model.text);

      let newModel = { text: this.model.text };
      this.notesService.sendNotes(newModel).subscribe({
        complete: () => {
          console.log("UpdateNotes saved");
          this.ServerNotes.text = newModel.text;
        }
      });
    }
  }


}
