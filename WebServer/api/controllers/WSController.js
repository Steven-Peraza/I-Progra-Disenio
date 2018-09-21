var sesiones = new Array();


exports.getGamesStatus = function(req, res) {
    console.log("hola?");
    var game2 = sesiones[parseInt(req.params.id)];
    res.json(game2.dataAct());
    //console.log("player" + game2.dataAct().player);
    console.log("Uids" + game2.dataAct().uids);
};

exports.getGameConfig = function(req, res) {
    var game2 = sesiones[parseInt(req.params.id)];
    res.json(game2.config);
    console.log("Config" + game2.config);
}

exports.newGame = function(req, res) {
    var newGame = require('../../src/gameState');
    var config = req.body['config'];
    console.log('New' + config['player1uid']);
    //console.log('Size' + config['size']);
    var newGameState = newGame["default"].nuevoJuego(parseInt(config['size']), parseInt(config['gameMode']), parseInt(config['dificultad']), config);
    console.log('New#2 ' + newGameState);
    sesiones.push(newGameState);
    res.json({ "id": sesiones.length - 1 });
    //console.log("Sesiones" + sesiones[sesiones.length - 1].tableroGS.tableroJuego);

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