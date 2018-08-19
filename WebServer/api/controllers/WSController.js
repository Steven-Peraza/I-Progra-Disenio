


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
    res.json(status)
};

exports.positionMarked = function (req, res) {

    console.log("routedAccesed")
    console.log(req.body["row"]);
    console.log(req.body["column"]);
    this.status["status"][req.body["row"]][req.body["column"]] = "B";
    res.json(status);
}