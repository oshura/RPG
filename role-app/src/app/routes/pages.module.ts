import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ControlsModule } from '../controls/controls.module';
import { FichaComponent } from './ficha/ficha.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { EquipoComponent } from './equipo/equipo.component';
import { NotasComponent } from './notas/notas.component';

@NgModule({
  declarations: [
    MainComponent, 
    LoginComponent, 
    FichaComponent, 
    EquipoComponent, NotasComponent
  ],  
  imports: [    
    CommonModule,
    ControlsModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
