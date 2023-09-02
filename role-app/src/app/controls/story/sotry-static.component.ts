import { Injectable } from "@angular/core";
import { StoryDataManager } from "./story-data-manager";

@Injectable({
  providedIn: 'root'
})
export class StoryStaticComponent {  
  public static storyDataManager: StoryDataManager;
  
  constructor(private storyDM: StoryDataManager)
  {
    if (!StoryStaticComponent.storyDataManager) {
      storyDM.Initialize();
      StoryStaticComponent.storyDataManager = storyDM;
    }
  }
}
