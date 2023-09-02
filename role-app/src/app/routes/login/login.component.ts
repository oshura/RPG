import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { StoreComponent } from 'src/app/store.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: Login = {
    partida: "",
    user: ""
  };

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  DoLogin(): void
  {
    this.loginService.doLogin(this.model).subscribe({
      next: value => {
        StoreComponent.userSession = value?.token;
        //console.log("value?.token: " + value?.token);
        //console.log("StoreComponent.UserSession: " + StoreComponent.userSession);
        this.loginService.isAuthenticated = (value?.token != '');
      },
      complete: () => this.router.navigate(['/main'])
    })
  }

}
