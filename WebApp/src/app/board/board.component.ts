import { Component, OnInit } from '@angular/core';
import {BoardServiceService, GameStatus} from '../services/board-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  constructor(private _dataService:BoardServiceService) {

   }
   ngOnInit(): void {
    this.updateScreen();
   }
   currentStatus:GameStatus = { status: [],
   //dimension: 4,
   score: 200};

   markPosition(j,k){
     console.log("Fila "+j+" "+"Columna "+k)
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
      score: data['score']
    }
   }



  }
