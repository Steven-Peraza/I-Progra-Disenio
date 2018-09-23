import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardServiceService } from '../services/board-service.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { Profile } from '../interface/profile.interface';
import { MultiplayerService } from '../services/web-socket.service';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {

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

  constructor(private sck:MultiplayerService ,private _router: Router, private _dataService: BoardServiceService,
    private _authService: ProfilesServiceService, private afs: AngularFirestore) {
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
    this.connection = this.sck.getMessages()
    .subscribe((message)=>{
        console.log("hola")
    })
  }


onChange(player, route) {
  if (player == 1) {
    this.gameConfig.player1Sprite = route;
  }
  else
  {
    this.gameConfig.player2Sprite = route;
  }
}
onChangeBs(boardSize) {
  this.gameConfig.size = boardSize;
}
onChangeBg(backgroundColor) {
  this.gameConfig.bgColor = backgroundColor;
}
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

startGame() {
  if(this.gameConfig.gameMode == 3){
  this.sck.createMatch(this.gameConfig);
  }else{
  console.log(this.gameConfig);
  this._dataService.createNewGame({'config': this.gameConfig})
  .subscribe((data) => { this._router.navigate(["board", data['id']]); });
  }
}



}
