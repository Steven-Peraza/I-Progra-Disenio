"use strict";
exports.__esModule = true;
var pieza = /** @class */ (function () {
    function pieza(playo, /*pack: string,*/ row, col) {
        // this.img = pack;
        this.player = playo;
        this.pos = new Array(2);
        this.pos = [row, col];
    }
    /*getImg() {
        return this.img;
    }*/
    pieza.prototype.getPlayer = function () {
        return this.player;
    };
    pieza.prototype.getPos = function () {
        return this.pos;
    };
    return pieza;
}());
exports["default"] = pieza;
