

exports.getAllGames = function(req,res){
console.log("ruta funcionando");
res.setHeader('Access-Control-Allow-Origin', '*');
res.json({"dimension": 4,"code": 200, "status":[["B","W","B","W","B"],
["V","V","B","B","B"],
["B","B","B","V","B"],
["V","W","V","W","B"],
["B","B","B","B","B"]]
})};