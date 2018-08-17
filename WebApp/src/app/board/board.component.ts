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
    this._dataService.getStatus()
    .subscribe((data: GameStatus) => this.currentStatus = {
      status: data['status'],
      dimension: data['dimension'],
      code: data['code']
    });
   }
   currentStatus:GameStatus = { status: [],
   dimension: 4,
   code: 200};


  }
