// Componente de Creacion de Partida


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardServiceService } from '../services/board-service.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { MultiplayerService } from '../services/web-socket.service';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {

  // representacion de los distintos sprites de eleccion para el user
  letters = [
    ["Rojo", "../../assets/img/mushroomsSprites/a.png"],
    ["Verde", "../../assets/img/mushroomsSprites/b.png"],
    ["Azul", "../../assets/img/mushroomsSprites/c.png"],
    ["Rosa/Purpura", "../../assets/img/mushroomsSprites/d.png"],
    ["Signo Pregunta", "../../assets/img/mushroomsSprites/f.png"],
    ["Purpura", "../../assets/img/mushroomsSprites/g.png"],
    ["Corazon", "../../assets/img/mushroomsSprites/h.png"],
    ["Amarillo/Rojo", "../../assets/img/mushroomsSprites/i.png"],
    ["Amarillo/Verde", "../../assets/img/mushroomsSprites/j.png"],
    ["Estrellado", "../../assets/img/mushroomsSprites/k.png"],
    ["Purpura/Fucsia", "../../assets/img/mushroomsSprites/l.png"],
    ["Abejorro", "../../assets/img/mushroomsSprites/m.png"],
  ];

  player1M = "";
  player2M = "";

  started: boolean;

  // configuracion por defecto de partida
  public gameConfig = {
  gameMode: 1,
  dificultad: 1,
  player1Sprite:'../../assets/img/mushroomsSprites/a.png',
  player2Sprite:'../../assets/img/mushroomsSprites/a.png',
  player1:'player 1',
  player1uid:'hostia',
  player2uid:'En Espera',
  player2:'Jugador en Espera',
  size:'6',
  bgColor:'green'
};

connection;

// se requiere de la utilizacion de ciertos servicios como lo son el de multiplayer, router, autenficiacion, etc
  constructor(private sck: MultiplayerService , private _router: Router, private _dataService: BoardServiceService,
    private _authService: ProfilesServiceService, private afs: AngularFirestore) {
      // se obtienen los datos del user mediante un subscribe
      this._authService._firebaseAuth.authState.subscribe(user => {

        if (!user) {
          return;
        }
        this.gameConfig.player1uid = user.uid;
        this.gameConfig.player1 = user.displayName;
      });
     }

  ngOnInit() {
    this.started = false;
  }

// los onchange dependen de las opciones del user, uno por opcion de juego

// cambio de sprites
onChange(player, route) {
  if (player == 1) {
    this.gameConfig.player1Sprite = route;
  }
  else
  {
    this.gameConfig.player2Sprite = route;
  }
}

// cambio de dimension de tablero
onChangeBs(boardSize) {
  this.gameConfig.size = boardSize;
}

// cambio de color de tablero
onChangeBg(backgroundColor) {
  this.gameConfig.bgColor = backgroundColor;
}

// cambio de modo de juego
onChangeGM(gamemode) {
  this.gameConfig.gameMode = gamemode;
  if (gamemode == 2) {
    this.gameConfig.player2 = 'AI Dificultad EZ';
    this.gameConfig.player2uid = 'AIPlayer';
  } else{
    this.gameConfig.player2 = 'Jugador en Espera';
    this.gameConfig.player2uid = 'En Espera';
  }

}

// cambio de dificultad, en caso de que sea modo de juego PVE
onChangeDif(dificultad) {
  this.gameConfig.dificultad = dificultad;
  if (this.gameConfig.gameMode == 2) {
    if (this.gameConfig.dificultad == 1) {
        this.gameConfig.player2 = 'AI Dificultad EZ';
    } else if (this.gameConfig.dificultad == 2) {
      this.gameConfig.player2 = 'AI Dificultad Normalin';
    } else if (this.gameConfig.dificultad == 3) {
      this.gameConfig.player2 = 'AI Dificultad GG';
    }
    this.gameConfig.player2uid = 'AIPlayer';
  }
}

// si todos los datos son correctos, se inicia un request para el inicio de juego
startGame() {
  if (this.gameConfig.gameMode == 3) {
  this.sck.createMatch(this.gameConfig);
  this._router.navigate(["board","mp"]);
  } else {
  console.log(this.gameConfig);
  this._dataService.createNewGame({'config': this.gameConfig})
  .subscribe((data) => { this._router.navigate(["board", data['id']]); });
  }
}



}
