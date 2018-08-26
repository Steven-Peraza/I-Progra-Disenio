game = require('../../src/gameState')
var sd = game["default"].nuevoJuego(8, 2, 3);
status = {
    "dimension": 4,
    "code": 200,
    "status": [
        ['V', 'V', 'V', 'V', 'V'],
        ["V", "V", "V", "V", "V"],
        ["V", "V", "V", "V", "V"],
        ["V", "V", "V", "V", "V"],
        ["V", "V", "V", "V", "V"]
    ]
}
exports.getAllGames = function(req, res) {
    console.log("ruta funcionando");
    res.json(sd.dataAct());
};

exports.positionMarked = function(req, res) {
    //console.log("Antes" + sd.tableroGS.cambioTurno);
    if (sd.modoJuego == 1) {
        sd = sd.jugadaRealizada([req.body["row"], req.body["column"]]);
        //console.log(sd.turnoJugador);
    } else if (sd.modoJuego == 2) {
        if (sd.turnoJugador == 2) {
            sd = sd.jugadaRealizada([0, 0]);
        } else {
            sd = sd.jugadaRealizada([req.body["row"], req.body["column"]]);
        }
    } else {
        console.log("ACM1PT");
    }
    //console.log("Despues" + sd.tableroGS.cambioTurno);
    //console.log(sd.dataAct());
    res.json(sd.dataAct());
}