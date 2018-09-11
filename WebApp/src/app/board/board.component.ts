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
    this.id= this._route.snapshot.paramMap.get('id');
    this._dataService.getConfig(this.id)
    .subscribe(
      (data)=>{
        this.config = data
      }
    )
    this.updateScreen();
   }
   currentStatus:GameStatus = { status: [],
   //dimension: 4,
   score: 200,
   stat: 1, 
   win: 0,
   player: 2 };
id:string = "-1"
config:any = {
  player1Sprite:"../../assets/img/mushroomsSprites/c.png",
player2Sprite:"../../assets/img/mushroomsSprites/b.png",
player1:"Jafeth",
player2:"Steven",
size:"8",
bgColor:"darkgreen"
}


   markPosition(j,k){
     console.log("Fila "+j+" "+"Columna "+k);
     //this.currentStatus["status"][j][k] = "W";
    this._dataService.positionMarked(j,k,this.id)
    .subscribe((res:GameStatus) => this.writeInfo(res));
   }

   updateScreen(){
    this._dataService.getStatus(this.id)
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
