import { Injectable } from "@angular/core";
import { merge, Observable, Subject } from "rxjs";
import { scan, tap } from "rxjs/operators";
import { HistoryLine } from "src/app/models/historyline";
import { environment } from "src/environments/environment";
import { ChatService } from "./chat.service";

@Injectable({
    providedIn: 'root'
  })
export class ChatDataManager {

    private refreshing: boolean = false;
    private chatCurrentLine: number = 0;

    constructor(private chatService: ChatService) { }

    private HistoryStream$: Observable<HistoryLine[]> = this.chatService.getHistory();
    
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
          if (value[value.length -1].lineId! > this.chatCurrentLine)
          {
            this.chatCurrentLine = value[value.length -1].lineId!;
            //console.log("New Line ID: " + this.chatCurrentLine);
          }
        }
      })
    )

    SendLine(newLine: string): Observable<HistoryLine>
    {
        return this.chatService.sendLine(newLine);
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
          setInterval( ()=>{ this.Refresh() }, environment.chatRefreshTimer);
        }
    }
    
    Refresh(): void {
        //console.log('Call Refresh with line ID: ' + this.chatCurrentLine);
        this.chatService.refreshHistory(this.chatCurrentLine).subscribe({
          next: newLines => this.NewLinesSubject.next(newLines),
          error: err => console.log('Erroneous something:' + err)
        })
    }
}
