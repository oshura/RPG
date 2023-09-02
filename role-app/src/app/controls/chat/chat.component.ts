import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatStaticComponent } from './chat-static.component';
import { HistoryLine } from 'src/app/models/historyline';
import { ChatDataManager } from './chat-data-manager';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  static counter: number = 0;
  chatComponentId: string = "chatHistoricContent" + ChatComponent.counter++;
  intervalUpdate: number = 0;

  public model: HistoryLine = {
    text: ""
  };

  textActive: boolean = true;

  public chatDM?: ChatDataManager;

  constructor(private chatStaticComponent: ChatStaticComponent) { }

  ngOnInit(): void {
    console.log('Initialize chat');
    this.chatDM = ChatStaticComponent.chatDataManager;
    this.intervalUpdate = window.setInterval(() => { this.UpdateScroll() },1000);
  }

  ngOnDestroy(): void {
    console.log('Destroying chat');
    window.clearInterval(this.intervalUpdate);
  }

  SendLine(): void
  {
    this.textActive = false;
    this.chatDM!.SendLine(this.model.text).subscribe({
      next: value => true,
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
    if ( ChatComponent.docked ) 
    {
      var element = document.getElementById(this.chatComponentId);      
      var scrollHeight = element?element.scrollHeight:0; 
      var clientHeight = element?element.clientHeight:0;
      if (element)
        element.scrollTop = scrollHeight - clientHeight;
    }
  }

  ScrollClick(): void
  {
    var element = document.getElementById(this.chatComponentId);
    var scrollTop = element?element.scrollTop:0;
    var scrollHeight = element?element.scrollHeight:0;    
    var clientHeight = element?element.clientHeight:0; 
    ChatComponent.docked = ((scrollTop + clientHeight) == scrollHeight);
  }

  GetLines(text: string): string[]
  {
    return text.split('\n');
  }

}
