import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { HistoryLine } from 'src/app/models/historyline';
import { StoryStaticComponent } from './sotry-static.component';
import { StoryDataManager } from './story-data-manager';
import { StoryService } from './story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, OnDestroy {

  static counter: number = 0;
  storyComponentId: string = "storyHistoricContent" + StoryComponent.counter++;
  intervalUpdate: number = 0;
  intervalLocked: number = 0;

  public model: HistoryLine = {
    text: ""
  };

  textActive: boolean = true;

  public storyDM?: StoryDataManager;

  constructor(private chatStaticComponent: StoryStaticComponent) { }

  ngOnInit(): void {
    console.log('Initialize story');
    this.storyDM = StoryStaticComponent.storyDataManager;

    this.intervalUpdate = window.setInterval(() => { this.UpdateScroll() },1000);
    this.intervalLocked = window.setInterval(() => { this.CheckLocked() },5000);
  }

  ngOnDestroy(): void {
    console.log('Destroying story');
    window.clearInterval(this.intervalUpdate);
    window.clearInterval(this.intervalLocked);
  }

  SendLine(): void
  {
    this.textActive = false;
    this.storyDM!.SendLine(this.model.text).subscribe({
      complete: () => {
        this.model.text = "";
        this.textActive = true;
        //console.log("Line sent!")
      }
    });
  }

  ActiveState()
  {
    return {
      active: this.textActive
    }
  }

  static docked: boolean = true;
  
  UpdateScroll(): void
  {
    if ( StoryComponent.docked ) 
    {
      var element = document.getElementById(this.storyComponentId);      
      var scrollHeight = element?element.scrollHeight:0; 
      var clientHeight = element?element.clientHeight:0;
      if (element)
        element.scrollTop = scrollHeight - clientHeight;
    }
  }

  ScrollClick(): void
  {
    var element = document.getElementById(this.storyComponentId);
    var scrollTop = element?element.scrollTop:0;
    var scrollHeight = element?element.scrollHeight:0;    
    var clientHeight = element?element.clientHeight:0; 
    StoryComponent.docked = ((scrollTop + clientHeight) == scrollHeight);
  }

  lockedClass: string = "hidden";
  textLockedClass: string = "textctl";
  buttonLockedClass: string = "buttonctl";

  CheckLocked(): void
  {
    if (this.storyDM?.lockedState)
    {
      this.lockedClass = "";
      this.textLockedClass = "hidden";
      this.buttonLockedClass = "hidden";
    }
    else
    {
      this.lockedClass = "hidden";
      this.textLockedClass = "textctl";
      this.buttonLockedClass = "buttonctl";
    }    
  }

  GetLines(text: string): string[]
  {
    return text.split('\n');
  }
}
