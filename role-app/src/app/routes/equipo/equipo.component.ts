import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoData } from 'src/app/models/equipo-data';
import { EquipoService } from './equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  fichaImage: Observable<EquipoData> = this.equipoService.getEquipo();
  sourceEquipo: string = "";

  constructor(private equipoService: EquipoService) { }

  ngOnInit(): void {
    this.fichaImage.subscribe({
      next: value => this.sourceEquipo = value.imagePath
    })
  }

}
