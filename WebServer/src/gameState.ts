// imports necesarios para el correcto funcionamiento de la clase

import tablero from './tablero';
import pieza from './pieza';

export default class GameState {
  tableroGS: tablero;
  turnoJugador: number;
  puntaje: Array<number>;
  posiblesJugadas: pieza[];
  gameStatus: number; // 1 = jugando 2 = gameover
  winner: number; // player 1/2 o empate 3

  // funcion que crea una nueva partida con un tamanyo variable, comenzando con el jugador 1
  static nuevoJuego(tamanyo: number): GameState {
    return new GameState(new tablero(tamanyo), 1);
  }
  // cada vez que se realiza un movimiento se crea un nuevo estado de juego
  constructor(tablero: tablero, turn: number) {
    this.tableroGS = tablero;
    this.turnoJugador = turn;
    this.puntaje = tablero.getScore();
    this.posiblesJugadas = tablero.getPosiblesJugadas(turn);
  // si no hay posibles jugadas, game over... si no, se continua jugando...
    if (this.posiblesJugadas.length > 0) {
      this.gameStatus = 1;
    } else {
      console.log('No hay jugadas posibles... C mamo!');
      this.gameStatus = 2;
      this.turnoJugador = null;
      // se determina cual jugador es el ganador
      if (this.puntaje[0] > this.puntaje[1]) {
        this.winner = 1;
      } else if (this.puntaje[0] < this.puntaje[1]) {
        this.winner = 2;
      } else {
        this.winner = 3;
      }
    }
  }
  
  // funcion que se encarga de realizar la jugada y crear un nuevo estado de juego
  jugadaRealizada(movimiento:Array<number>): GameState {
    if (this.gameStatus !== 1) {
      throw new Error('El juego termino...');
    }
    // cuando se crea el nuevo estado de juego, se cambia el juegador...
    if ((this.turnoJugador == 1) && (this.tableroGS.cambioTurno)){
      return new GameState(
        this.tableroGS.movida(movimiento,this.turnoJugador),
        2
      )
    } else if ((this.turnoJugador == 2) && (this.tableroGS.cambioTurno)) {
      return new GameState(
        this.tableroGS.movida(movimiento,this.turnoJugador),
        1
      )
    }

  }

  dataAct() {
    return { board: this.tableroGS.tableroJuego, score: this.puntaje };
  }
};
