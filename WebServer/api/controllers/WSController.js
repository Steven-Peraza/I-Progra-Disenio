game = require('../../src/gameState')
var sd = game["default"].nuevoJuego(8);

exports.getAllGames = function(req, res) {
    console.log("ruta funcionando");
    res.json(sd.dataAct());
    //res.json(status)

};

exports.positionMarked = function(req, res) {
    sd = sd.jugadaRealizada([req.body["row"], req.body["column"]]);
    res.json(sd.dataAct());
}