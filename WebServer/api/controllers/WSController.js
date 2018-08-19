
game = require('../../src/gameState')

status = {
    "dimension": 4, "code": 200, "status":
        [['V', 'V', 'V', 'V', 'V'],
        ["V", "V", "V", "V", "V"],
        ["V", "V", "V", "V", "V"],
        ["V", "V", "V", "V", "V"],
        ["V", "V", "V", "V", "V"]]
}
exports.getAllGames = function (req, res) {
    console.log("ruta funcionando");
    var sd = game["default"].nuevoJuego(8);
    res.json(sd);
    //res.json(status)
    
};

exports.positionMarked = function (req, res) {

    console.log("routedAccesed")
    console.log(req.body["row"]);
    console.log(req.body["column"]);
    this.status["status"][req.body["row"]][req.body["column"]] = "B";
    res.json(status);
}