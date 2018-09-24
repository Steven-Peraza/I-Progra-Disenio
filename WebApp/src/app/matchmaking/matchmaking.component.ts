// Componetne de Sesiones de Juego

import { Component} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable, Subject } from 'rxjs';
import { MultiplayerService } from '../services/web-socket.service';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent {

  // se requiere de las funcionalidades de ciertos servicios como el de chat, multijugador y perfiles
  constructor(public _cs: ChatService, private sck: MultiplayerService,
    private _profiles: ProfilesServiceService, private _router: Router) {
  }

  notifications: Subject<any>;
  public connection;
  public matches = [];


  // se obtienen las sesiones a la espera de players mediante un subscribe
  ngOnInit() {
    this.connection = this.sck.getPendingMatches().subscribe((matches: any) => {
      this.matches = matches.matches;
    });
    this._profiles.getUser().subscribe(
      (response) => {
        this.sck.newConnection(response.uid);
      }
    );
  }

  // funcion para unirse a una partida a la espera de jugadores
  joinMatch(id) {
    this._profiles.getUser()
    .subscribe((user) => {
      this.sck.joinMatch({id: id, user: user});
      this._router.navigate(["board","mp"]);
    });
  }


}
