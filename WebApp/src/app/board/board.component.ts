import { Component, OnInit, Input } from '@angular/core';
import {BoardServiceService, GameStatus} from '../services/board-service.service';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private _dataService:BoardServiceService, private _route:ActivatedRoute) {
    

   }
   ngOnInit(): void {
     this.bgColor = this._route.snapshot.paramMap.get('bgColor');
     this.player1= this._route.snapshot.paramMap.get('player1');
     this.player2 = this._route.snapshot.paramMap.get('player2');
     this.sprite1 = this._route.snapshot.paramMap.get('p1Sprite');
     this.sprite2 = this._route.snapshot.paramMap.get('p2Sprite');
     this.size = this._route.snapshot.paramMap.get('size');

    this.updateScreen();
   }
   currentStatus:GameStatus = { status: [],
   //dimension: 4,
   score: 200,
   stat: 1, 
   win: 0,
   player: 2 };

  bgColor = ""
  player1 = ""
  player2 = ""
  size = ""
  sprite1 =  "../../assets/img/mushroomsSprites/l.png";
  sprite2 =  "../../assets/img/mushroomsSprites/g.png";

   markPosition(j,k){
     console.log("Fila "+j+" "+"Columna "+k);
     //this.currentStatus["status"][j][k] = "W";
    this._dataService.positionMarked(j,k)
    .subscribe((res:GameStatus) => this.writeInfo(res));
   }

   updateScreen(){
    this._dataService.getStatus()
    .subscribe((data: GameStatus) => this.writeInfo(data));
   }

   writeInfo(data:GameStatus){
    this.currentStatus = {
      status: data['board'],
      score: data['score'],
      stat: data['stat'],
      win: data['win'],
      player: data['player']
    };
   }



  }
