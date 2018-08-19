"use strict";
// imports necesarios para el correcto funcionamiento de la clase
exports.__esModule = true;
var tablero_1 = require("./tablero");
var GameState = /** @class */ (function () {
    // cada vez que se realiza un movimiento se crea un nuevo estado de juego
    function GameState(tablero, turn) {
        this.tableroGS = tablero;
        this.turnoJugador = turn;
        this.puntaje = tablero.getScore();
        this.posiblesJugadas = tablero.getPosiblesJugadas(turn);
        // si no hay posibles jugadas, game over... si no, se continua jugando...
        if (this.posiblesJugadas.length > 0) {
            this.gameStatus = 1;
        }
        else {
            console.log('No hay jugadas posibles... C mamo!');
            this.gameStatus = 2;
            this.turnoJugador = null;
            // se determina cual jugador es el ganador
            if (this.puntaje[0] > this.puntaje[1]) {
                this.winner = 1;
            }
            else if (this.puntaje[0] < this.puntaje[1]) {
                this.winner = 2;
            }
            else {
                this.winner = 3;
            }
        }
    }
    // funcion que crea una nueva partida con un tamanyo variable, comenzando con el jugador 1
    GameState.nuevoJuego = function (tamanyo) {
        return new GameState(new tablero_1["default"](tamanyo), 1);
    };
    // funcion que se encarga de realizar la jugada y crear un nuevo estado de juego
    GameState.prototype.jugadaRealizada = function (movimiento) {
        if (this.gameStatus !== 1) {
            throw new Error('El juego termino...');
        }
        // cuando se crea el nuevo estado de juego, se cambia el juegador...
        if (this.turnoJugador == 1) {
            return new GameState(this.tableroGS.movida(movimiento, this.turnoJugador), 2);
        }
        else {
            return new GameState(this.tableroGS.movida(movimiento, this.turnoJugador), 1);
        }
    };
    return GameState;
}());
exports["default"] = GameState;
;
