import { Component } from '@angular/core';
import { ProfilesServiceService } from './services/profiles-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  constructor( public _authService: ProfilesServiceService ) {

  }
  salir() {
    this._authService.salir();
  }
}
