import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  constructor() { }

  defaultStatus = [
    ["B","W","B","W","B"],
    ["V","V","B","B","B"],
    ["B","B","B","V","B"],
    ["V","W","V","W","B"],
    ["B","B","B","B","B"],
]

getStatus():GameStatus{
  return {dimension: 4,code: 200, status:this.defaultStatus}
}



}
export interface GameStatus{
    dimension:number; // Number of rows and colums of the board
    code:number; //Response status code; if sucessful 200, if error -1
    status:any;
}
