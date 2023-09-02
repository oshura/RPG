import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notesselector',
  templateUrl: './notes-selector.component.html',
  styleUrls: ['./notes-selector.component.css']
})
export class NotesSelectorComponent implements OnInit {

  notesselected: string = "visible";
  docsselected: string = "hidden";

  @Input() selected: string = "notes";

  constructor() { }

  ngOnInit(): void {
    this.RefreshVisibility();
  }

  RefreshVisibility()
  {
    this.notesselected = (this.selected == "notes")?"visible":"hidden";
    this.docsselected = (this.selected == "docs")?"visible":"hidden";
  }

  Select(value: string): void {
    this.selected = value;
    this.RefreshVisibility();
  }

}
