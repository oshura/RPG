import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FichaComponent } from './ficha/ficha.component';
import { LoginGuard } from './login/login.guard';
import { EquipoComponent } from './equipo/equipo.component';
import { NotasComponent } from './notas/notas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent, canActivate: [LoginGuard]},
  { path: 'ficha', component: FichaComponent, canActivate: [LoginGuard]},
  { path: 'equipo', component: EquipoComponent, canActivate: [LoginGuard]},
  { path: 'notas', component: NotasComponent, canActivate: [LoginGuard]},
  { path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)    
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
