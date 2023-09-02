import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreComponent } from 'src/app/store.component';
import { FichaData } from 'src/app/models/ficha-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient) {     
  }

  getFicha(): Observable<FichaData> {    
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    console.log("Using session getFicha(): " + StoreComponent.userSession);

    return this.http.get<FichaData>(environment.apiServer + '/ficha', options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse)
  {
    return throwError('pepe');
  }
}
