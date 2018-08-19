import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import "../constants"
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  constructor(private http: HttpClient) { }

  defaultStatus = [
    ['B', 'W', 'B', 'W', 'B'],
    ['V', 'V', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'V', 'B'],
    ['V', 'W', 'V', 'W', 'B'],
    ['B', 'B', 'B', 'B', 'B'],
];

getStatus():Observable<Object>{
  return this.http.get(CONSTANTS.SERVER_ROUTE()+"/gameStatus");
}

positionMarked(j,k){
return this.http.post(CONSTANTS.SERVER_ROUTE()+"/positionMarked",{"row":j,"column":k});
}

}
export interface GameStatus{
    //dimension:number; // Number of rows and colums of the board
    score:number; //Response status code; if sucessful 200, if error -1
    status:Array<Array<string>>;
}
