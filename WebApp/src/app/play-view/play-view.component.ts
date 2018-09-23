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
    ["d", "../../assets/img/mushroomsSprites/d.png"],
    ["f", "../../assets/img/mushroomsSprites/f.png"],
    ["g", "../../assets/img/mushroomsSprites/g.png"],
    ["h", "../../assets/img/mushroomsSprites/h.png"],
    ["i", "../../assets/img/mushroomsSprites/i.png"],
    ["j", "../../assets/img/mushroomsSprites/j.png"],
    ["k", "../../assets/img/mushroomsSprites/k.png"],
    ["l", "../../assets/img/mushroomsSprites/l.png"],
    ["m", "../../assets/img/mushroomsSprites/m.png"],
  ];

  player1M = "";
  player2M = "";

  started: boolean;

  public gameConfig = {
  gameMode: 0,
  dificultad: 1,
  player1Sprite:'',
  player2Sprite:'',
  player1:'player 1',
  player1uid:'hostia',
  player2uid:'joder',
  player2:'player 2',
  size:'',
  bgColor:''
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
  if (gamemode == 1) {
    this.gameConfig.player2 = 'AI Player';
    this.gameConfig.player2uid = 'AIPlayer';
  } else{
    this.gameConfig.player2 = 'Jugador en Espera';
  }

}
onChangeDif(dificultad) {
  this.gameConfig.dificultad = dificultad;
  if (this.gameConfig.gameMode == 1) {
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
