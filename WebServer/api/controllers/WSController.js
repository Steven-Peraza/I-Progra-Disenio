var sesiones = new Array();


exports.getGamesStatus = function(req, res) {
    var game2 = sesiones[parseInt(req.params.id)];
    res.json(game2.dataAct());
};

exports.getGameConfig = function(req, res) {
    var game2 = sesiones[parseInt(req.params.id)];
    res.json(game2.config);
}

exports.newGame = function(req, res) {
    var newGame = require('../../src/gameState');
    var config = req.body['config'];
    var newGameState = newGame["default"].nuevoJuego(parseInt(config['size']), parseInt(config['gameMode']), parseInt(config['dificultad']), config);
    sesiones.push(newGameState);
    res.json({ "id": sesiones.length - 1 });

}

exports.sayHello = function(req, res) {
    var nombre = req.body["nombre"];
    res.send({ saludo: "Hola " + nombre })
}

exports.positionMarked = function(req, res) {
    //console.log("Antes" + sd.tableroGS.cambioTurno);
    var game = sesiones[req.body["id"]];
    if (game.modoJuego == 1) {
        sesiones[req.body["id"]] = game.jugadaRealizada([req.body["row"], req.body["column"]]);
        //console.log(sd.turnoJugador);
    } else if (game.modoJuego == 2) {
        if (game.turnoJugador == 2) {
            sesiones[req.body["id"]] = game.jugadaRealizada([0, 0]);
        } else {
            sesiones[req.body["id"]] = game.jugadaRealizada([req.body["row"], req.body["column"]]);
        }
    } else {
        console.log("ACM1PT");
    }
    //console.log("Despues" + sd.tableroGS.cambioTurno);
    //console.log(sd.dataAct());
    res.json(game.dataAct());
}