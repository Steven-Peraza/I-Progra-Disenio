import { Component, OnInit } from '@angular/core';
import {BoardServiceService, GameStatus} from '../services/board-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  constructor(private _dataService:BoardServiceService) {

   }
   ngOnInit(): void {
     this.currentStatus = this._dataService.getStatus();
   }
   currentStatus:GameStatus;


  }
