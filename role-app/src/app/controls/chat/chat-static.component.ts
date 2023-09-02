import { Injectable } from "@angular/core";
import { ChatDataManager } from "./chat-data-manager";

@Injectable({
  providedIn: 'root'
})
export class ChatStaticComponent {  
  public static chatDataManager: ChatDataManager;
  
  constructor(private chatDM: ChatDataManager)
  {
    if (!ChatStaticComponent.chatDataManager) {
      chatDM.Initialize();
      ChatStaticComponent.chatDataManager = chatDM;
    }
  }
}
