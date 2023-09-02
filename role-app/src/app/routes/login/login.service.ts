import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreComponent } from 'src/app/store.component';
import { HistoryLine } from 'src/app/models/historyline';
import { Login } from 'src/app/models/login';
import { LoginResult } from 'src/app/models/login-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isAuthenticated: Boolean = false;
  /* static user: string = ''; */
  /*LoggedInn = new EventEmitter<boolean>();*/

  constructor(private http: HttpClient) {     
  }

  doLogin(logininfo: Login): Observable<LoginResult>
  {
    //POST the line
    let headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    });
    let options = { headers: headers };

    return this.http.post<LoginResult>(environment.apiServer + '/login', logininfo, options).pipe(        
        catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse)
  {
    return throwError('pepe');
  }
}
