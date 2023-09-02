import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notes } from 'src/app/models/notes';
import { StoreComponent } from 'src/app/store.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Notes> {    
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    //console.log("Using session getHistory(): " + StoreComponent.userSession);

    return this.http.get<Notes>(environment.apiServer + '/notes', options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  sendNotes(notes: Notes) {
    //POST the line
    let headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    //console.log("Using session sendLine(): " + StoreComponent.userSession);

    return this.http.post<Notes>(environment.apiServer + '/notes', notes, options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse)
  {
    console.log('Error: ' + err.message);
    return throwError('pepe: ' + err.message);
  }
}
