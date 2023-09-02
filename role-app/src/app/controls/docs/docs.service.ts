import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Docu } from 'src/app/models/docu';
import { StoreComponent } from 'src/app/store.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Docu[]>
  {
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    //console.log("Using session checkLocked(): " + StoreComponent.userSession);

    return this.http.get<Docu[]>(environment.apiServer + '/docs', options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse)
  {
    console.log('Error: ' + err.message);
    return throwError('pepe: ' + err.message);
  }
}
