import { Injectable } from "@angular/core";
import { merge, Observable, Subject } from "rxjs";
import { scan, tap } from "rxjs/operators";
import { HistoryLine } from "src/app/models/historyline";
import { environment } from "src/environments/environment";
import { StoryService } from "./story.service";

@Injectable({
    providedIn: 'root'
  })
export class StoryDataManager {

    private refreshing: boolean = false;
    private storyCurrentLine: number = 0;
    public lockedState: boolean = false;

    constructor(private sotryService: StoryService) { }

    private HistoryStream$: Observable<HistoryLine[]> = this.sotryService.getHistory();
    
    private NewLinesSubject = new Subject<HistoryLine[]>();
    private NewLinesInsertedAction$ = this.NewLinesSubject.asObservable();
    
    public HistoryStreamWithNewLines$: Observable<HistoryLine[]> = merge(this.HistoryStream$,this.NewLinesInsertedAction$).pipe(
      scan(
        (existingLines: HistoryLine[], newLines: HistoryLine[]) => [...existingLines, ...newLines]
      )
    ).pipe(
      tap( value => {
        //console.log('valor' + JSON.stringify(value));
        if ((value.length > 0) && (value[value.length - 1].lineId))
        {
          if (value[value.length -1].lineId! > this.storyCurrentLine)
          {
            this.storyCurrentLine = value[value.length -1].lineId!;
            //console.log("New Line ID: " + this.storyCurrentLine);
          }
        }
      })
    )

    SendLine(newLine: string): Observable<HistoryLine>
    {
        return this.sotryService.sendLine(newLine);
    }

    Initialize()
    {
        this.HistoryStream$.subscribe({
            next: a => true,
            error: e => true,
            complete: () => this.StartRefreshing()
        })
    }

    StartRefreshing(): void {
        if (!this.refreshing) {
          this.refreshing = true;
          setInterval( ()=>{ this.Refresh() }, environment.storyRefreshTimer);
          //setTimeout( ()=>{ this.Refresh() }, environment.storyRefreshTimer);
          setInterval( ()=>{ this.RefreshLockedState() }, environment.storyLockRefreshTimer);
          //setTimeout( ()=>{ this.RefreshLockedState() }, environment.storyLockRefreshTimer);
         
        }
    }
    
    Refresh(): void {
        //console.log('Call Refresh with line ID: ' + this.storyCurrentLine);
        this.sotryService.refreshHistory(this.storyCurrentLine).subscribe({
          next: newLines => this.NewLinesSubject.next(newLines),
          error: err => console.log('Erroneous something:' + err),
          //complete: () => setTimeout( ()=>{ this.Refresh() }, environment.storyRefreshTimer)
        })
    }

    RefreshLockedState(): void {
        //console.log('Call RefreshLockedState');
        this.sotryService.checkLocked().subscribe({
          next: value => this.lockedState = value.locked,
          error: err => console.log('Erroneous something:' + err),
          //complete: () => setTimeout( ()=>{ this.RefreshLockedState() }, environment.storyLockRefreshTimer)
        })
    }
}
