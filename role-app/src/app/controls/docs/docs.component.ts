import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Docu } from 'src/app/models/docu';
import { DocsService } from './docs.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  Documents$: Observable<Docu[]> = this.docsService.getDocuments();
  DocumentList: Docu[] | undefined;
  selectedDocument: Docu | undefined;

  constructor(private docsService: DocsService) { }

  ngOnInit(): void {
    this.Documents$.subscribe({
      next: value => this.DocumentList = value
    })
  }

  SelectDocument(value: Docu): void
  {
    this.selectedDocument = value;
  }

}
