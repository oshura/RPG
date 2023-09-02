import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  chatselected: string = "visible";
  storyselected: string = "hidden";

  @Input() selected: string = "chat";

  constructor() { }

  ngOnInit(): void {
    this.RefreshVisibility();
  }

  RefreshVisibility()
  {
    this.chatselected = (this.selected == "chat")?"visible":"hidden";
    this.storyselected = (this.selected == "story")?"visible":"hidden";
  }

  Select(value: string): void {
    this.selected = value;
    this.RefreshVisibility();
  }

}
