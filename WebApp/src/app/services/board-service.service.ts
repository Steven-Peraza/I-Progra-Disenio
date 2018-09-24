// Servicio de tablero de juego

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import '../constants';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  constructor(private http: HttpClient) { }

// se realizan todos los requests necesarios para la comunicacion con el backend

// request de configuraciones
getConfig(id: string): Observable<Object> {

  return this.http.get(CONSTANTS.SERVER_ROUTE()+"/getGameConfig/"+id);

}
// request de status
getStatus(id: string): Observable<Object> {
  return this.http.get(CONSTANTS.SERVER_ROUTE()+"/getGameStatus/"+id);
}
// request de movimiento
positionMarked(j, k, id) {
return this.http.post(CONSTANTS.SERVER_ROUTE()+"/positionMarked",{"row":j,"column":k,"id":id});
}
// request de nuevo juego
createNewGame(gameConfig: any) {
return this.http.post(CONSTANTS.SERVER_ROUTE()+"/newGame",gameConfig);
}
// request de turno automatico
turnoAI(id) {
  return this.http.post(CONSTANTS.SERVER_ROUTE()+"/moveAI",{"id":id});
  }

}

// interfaz de los datos del estodo de juego actual
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
