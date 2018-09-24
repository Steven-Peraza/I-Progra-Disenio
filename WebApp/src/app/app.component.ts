import { Component } from '@angular/core';
import { ProfilesServiceService } from './services/profiles-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  // utilizacion del servicio de autentificacion para el boton de deslogueo
  constructor( public _authService: ProfilesServiceService ) {

  }
  // funcion que realiza el logout del user actual
  salir() {
    this._authService.salir();
  }
}
