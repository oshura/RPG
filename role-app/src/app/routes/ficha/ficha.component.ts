import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaData } from 'src/app/models/ficha-data';
import { FichaService } from './ficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  fichaImage: Observable<FichaData> = this.fichaService.getFicha();
  sourceFicha: string = "";

  constructor(private fichaService: FichaService) { }

  ngOnInit(): void {
    this.fichaImage.subscribe({
      next: value => this.sourceFicha = value.imagePath
    })
  }

}
