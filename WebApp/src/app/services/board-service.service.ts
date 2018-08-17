import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  constructor(private http: HttpClient) { }

  defaultStatus = [
    ["B","W","B","W","B"],
    ["V","V","B","B","B"],
    ["B","B","B","V","B"],
    ["V","W","V","W","B"],
    ["B","B","B","B","B"],
]

getStatus():Observable<Object>{
  return this.http.get("http://localhost:3000/gameStatus");
}



}
export interface GameStatus{
    dimension:number; // Number of rows and colums of the board
    code:number; //Response status code; if sucessful 200, if error -1
    status:Array<Array<string>>;
}
