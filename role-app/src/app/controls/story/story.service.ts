import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HistoryLine } from 'src/app/models/historyline';
import { LockedState } from 'src/app/models/locked-state';
import { StoreComponent } from 'src/app/store.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  getHistory(): Observable<HistoryLine[]> {    
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    //console.log("Using session getHistory(): " + StoreComponent.userSession);

    return this.http.get<HistoryLine[]>(environment.apiServer + '/story', options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  refreshHistory(currentLine: number): Observable<HistoryLine[]> {
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    //console.log("Using session refreshHistory(): " + StoreComponent.userSession);
    //console.log("Using lineID refreshHistory(): " + currentLine);

    return this.http.get<HistoryLine[]>(environment.apiServer + '/story/' + currentLine, options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  sendLine(line: string) {
    //POST the line
    let headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    let newLine: HistoryLine = {
        text: line
    }

    //console.log("Using session sendLine(): " + StoreComponent.userSession);

    return this.http.post<HistoryLine>(environment.apiServer + '/story', newLine, options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  checkLocked(): Observable<LockedState> {
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    //console.log("Using session checkLocked(): " + StoreComponent.userSession);

    return this.http.get<LockedState>(environment.apiServer + '/locked', options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse)
  {
    console.log('Error: ' + err.message);
    return throwError('pepe: ' + err.message);
  }
}
