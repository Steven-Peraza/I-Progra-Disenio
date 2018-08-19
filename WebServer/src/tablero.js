"use strict";
exports.__esModule = true;
var pieza_1 = require("./pieza");
var tablero = /** @class */ (function () {
    function tablero(size) {
        this.Directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
        this.tableroJuego = new Array(size);
        this.tamanyo = size;
        for (var row = 0; row < this.tamanyo; row++) {
            this.tableroJuego[row] = new Array(this.tamanyo);
        }
        for (var row = 0; row < this.tamanyo; row++) {
            for (var col = 0; col < this.tamanyo; col++) {
                this.tableroJuego[row][col] = null;
            }
        }
        this.tableroJuego[Math.round((this.tamanyo / 2) - 1)][Math.round((this.tamanyo / 2) - 1)] = new pieza_1["default"](1, /*'img player 1',*/ Math.round((this.tamanyo / 2) - 1), Math.round((this.tamanyo / 2) - 1));
        this.tableroJuego[Math.round((this.tamanyo / 2) - 1)][Math.round(this.tamanyo / 2)] = new pieza_1["default"](2, /*'img player 2',*/ Math.round((this.tamanyo / 2) - 1), Math.round(this.tamanyo / 2));
        this.tableroJuego[Math.round(this.tamanyo / 2)][Math.round((this.tamanyo / 2) - 1)] = new pieza_1["default"](2, /*'img player 2',*/ Math.round(this.tamanyo / 2), Math.round((this.tamanyo / 2) - 1));
        this.tableroJuego[Math.round(this.tamanyo / 2)][Math.round(this.tamanyo / 2)] = new pieza_1["default"](1, /*'img player 1',*/ Math.round(this.tamanyo / 2), Math.round(this.tamanyo / 2));
    }
    /*clone() {
    const clonedBoard = new tablero(this.tamanyo);
    for (let row = 0; row < this.tamanyo; row++) {
      for (let col = 0; col < this.tamanyo; col++) {
        clonedBoard.tableroJuego[row][col] = this.tableroJuego[row][col];
      }
    }
    return clonedBoard;
    }*/
    /*getScore() {
        const pieceCount: { [player: number]: number; } = {
          [PlayerColors.BLACK]: 0,
          [PlayerColors.WHITE]: 0
        };
        for (let row = 0; row < Board.SIZE; row++) {
          for (let col = 0; col < Board.SIZE; col++) {
            if (!this.isTileEmpty(row, col)) {
              pieceCount[this.tiles[row][col]]++;
            }
          }
        }
        return new Score(pieceCount[PlayerColors.BLACK], pieceCount[PlayerColors.WHITE]);
    }*/
    tablero.prototype.getLegalMoves = function (player) {
        var legalMoves = [];
        for (var row = 0; row < this.tamanyo; row++) {
            for (var col = 0; col < this.tamanyo; col++) {
                var move = new pieza_1["default"](player, row, col);
                if (this.isMoveLegal(move)) {
                    legalMoves.push(move);
                }
            }
        }
        return legalMoves;
    };
    tablero.prototype.performMove = function (newMovi, player) {
        //const clonedBoard = this.clone();
        var nuevaPieza = new pieza_1["default"](player, newMovi[0], newMovi[1]);
        // place piece
        this.tableroJuego[newMovi[0]][newMovi[1]] = nuevaPieza;
        // flip other pieces
        var tilesToBeFlipped = this.getTilesToBeFlipped(nuevaPieza);
        for (var _i = 0, tilesToBeFlipped_1 = tilesToBeFlipped; _i < tilesToBeFlipped_1.length; _i++) {
            var tile = tilesToBeFlipped_1[_i];
            this.tableroJuego[tile.row][tile.col] = new pieza_1["default"](nuevaPieza.getPlayer(), tile.row, tile.col);
        }
        //return clonedBoard;
    };
    tablero.prototype.getTilesToBeFlipped = function (newPieza) {
        var result = [];
        for (var _i = 0, _a = this.Directions; _i < _a.length; _i++) {
            var direction = _a[_i];
            if (this.isMoveLegalInDirection(newPieza, direction[0], direction[1])) {
                var currentRow = newPieza.getPos()[0];
                var currentCol = newPieza.getPos()[1];
                do {
                    currentRow += direction[0];
                    currentCol += direction[1];
                    if (currentRow < 0 || currentRow > this.tamanyo - 1 || currentCol < 0 || currentCol > this.tamanyo - 1) {
                        break;
                    }
                    if (this.tableroJuego[currentRow][currentCol].getPlayer() === newPieza.getPlayer()) {
                        break;
                    }
                    result.push({ row: currentRow, col: currentCol });
                } while (true);
            }
        }
        return result;
    };
    tablero.prototype.isMoveLegal = function (newPieza) {
        if (!this.isTileEmpty(newPieza.getPos()[0], newPieza.getPos()[1])) {
            return false;
        }
        for (var _i = 0, _a = this.Directions; _i < _a.length; _i++) {
            var direction = _a[_i];
            if (this.isMoveLegalInDirection(newPieza, direction[0], direction[1])) {
                return true;
            }
        }
        return false;
    };
    tablero.prototype.isTileEmpty = function (row, col) {
        return this.tableroJuego[row][col] === null;
    };
    tablero.prototype.isMoveLegalInDirection = function (newPieza, rowDirection, colDirection) {
        var fichaOtroColor = false;
        var row = newPieza.getPos()[0];
        var col = newPieza.getPos()[1];
        do {
            row += rowDirection;
            col += colDirection;
            if (row < 0 || row > this.tamanyo - 1 || col < 0 || col > this.tamanyo - 1) {
                return false;
            }
            if (this.isTileEmpty(row, col)) {
                return false;
            }
            else if (this.tableroJuego[row][col].getPlayer() === newPieza.getPlayer()) {
                return fichaOtroColor;
            }
            else {
                fichaOtroColor = true;
            }
        } while (true);
    };
    return tablero;
}());
exports["default"] = tablero;
