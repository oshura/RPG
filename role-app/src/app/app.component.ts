import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ControlsModule } from './controls/controls.module';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'role-app';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get NavigationStart events
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart)).subscribe(e => {
          const navigation = this.router.getCurrentNavigation();
          console.log('NAVIGATION: ' + navigation?.initialUrl + ' --> ' + navigation?.extractedUrl);
    });
  }
}
