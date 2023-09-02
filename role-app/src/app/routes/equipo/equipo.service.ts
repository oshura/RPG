import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EquipoData } from 'src/app/models/equipo-data';
import { StoreComponent } from 'src/app/store.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) {     
  }

  getEquipo(): Observable<EquipoData> {    
    //POST the line
    let headers = new HttpHeaders({
      'Usuario': StoreComponent.userSession
    });
    let options = { headers: headers };

    console.log("Using session getFicha(): " + StoreComponent.userSession);

    return this.http.get<EquipoData>(environment.apiServer + '/equipo', options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse)
  {
    return throwError('pepe');
  }
}
