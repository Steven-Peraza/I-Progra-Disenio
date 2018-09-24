import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  constructor(private http: HttpClient) { }

getConfig(id: string): Observable<Object> {

  return this.http.get(environment.ws_url+"getGameConfig/"+id);

}

getStatus(id: string): Observable<Object> {
  return this.http.get(environment.ws_url+"getGameStatus/"+id);
}

positionMarked(j, k, id) {
return this.http.post(environment.ws_url+"positionMarked",{"row":j,"column":k,"id":id});
}

createNewGame(gameConfig: any) {
return this.http.post(environment.ws_url+"newGame",gameConfig);
}

}
export interface GameStatus {
    // dimension:number;
    // Number of rows and colums of the board
    score: number; // Response status code; if sucessful 200, if error -1
    status: Array<Array<string>>;
    stat: number;
   win: number;
   player: number;
   uids: String[];
}
