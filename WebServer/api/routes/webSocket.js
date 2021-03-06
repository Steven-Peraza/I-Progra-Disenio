'use strict';
module.exports = function(http) {
    //Dependencias
    const io = require('socket.io')(http);
    //Variables Globales 
    var Conexiones = {}
    var partidasPendientes = []
    var partidasEnCurso = []
        // Import Admin SDK
    var admin = require("firebase-admin");

    var serviceAccount = require("../../api/stevensgamesdesign-firebase-adminsdk-r4fzg-d65f88f83d.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://stevensgamesdesign.firebaseio.com"
    });
    var db = admin.database();

    io.on('connection', (socket) => {

        console.log('user connected ' + socket.id);

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on("get-matches", () => {
            io.emit('pendingMatches', { matches: partidasPendientes })
        })

        socket.on('join-match', (data) => {
            console.log(data)
            var joined = partidasPendientes.pop(data.id)
            joined.player2 = data.user.displayName
            joined.player2uid = data.user.uid
            console.log(joined)
                //Se crea la nueva partida
            var newGame = require("../../src/gameState")
            var newGameState = newGame["default"].nuevoJuego(parseInt(joined['size']), 1, parseInt(joined['dificultad']), joined);
            partidasEnCurso.push({ gameState: newGameState, pActual: [joined.player1uid, joined.player2uid] })
            io.sockets.connected[Conexiones[joined.player1uid]].emit("match-created", { id: partidasEnCurso.length - 1, state: newGameState.dataAct(), config: newGameState.config })
            io.sockets.connected[Conexiones[joined.player2uid]].emit("match-created", { id: partidasEnCurso.length - 1, state: newGameState.dataAct(), config: newGameState.config })
        })

        socket.on("try-join", (data) => {
            Conexiones[data.user.uid] = socket.id
            var joined = partidasPendientes[data.id]
            io.sockets.connected[Conexiones[joined.player1uid]].emit("oponent-found", data)
        })

        socket.on("join-refused", (oponent) => {
            io.sockets.connected[Conexiones[oponent]].emit("join-refused")
        })

        socket.on("create-match", (nuevaPartida) => {
            Conexiones[nuevaPartida.player1uid] = socket.id
            nuevaPartida.socketid = socket.id
            nuevaPartida.id = partidasPendientes.length
            console.log(nuevaPartida)
            partidasPendientes.push(nuevaPartida)
            io.emit('pendingMatches', { matches: partidasPendientes })
        })

        socket.on("played", (data) => {
            var current = partidasEnCurso[data.id]
            if (Conexiones[current.pActual[0]] == socket.id) {
                var ant = current.gameState.turnoJugador
                current.gameState = current.gameState.jugadaRealizada([data.row, data.column])
                if (current.gameState.turnoJugador != ant) {
                    current.pActual.reverse()
                }
                partidasEnCurso[data.id] = current
                io.sockets.connected[Conexiones[current.pActual[0]]]
                    .emit("moved", current.gameState.dataAct())
                io.sockets.connected[Conexiones[current.pActual[1]]]
                    .emit("moved", current.gameState.dataAct())
            } else {
                console.log("no es correcto")
            }
        })

        socket.on("match-left", (data) => {
            var current = partidasEnCurso[data.id];
            console.log(current)
            //var ref = db.ref("partidasPausadas");
            //ref.push({ partida: current });
            if (current.gameState.config.player1uid == data.user.uid) {
                io.sockets.connected[Conexiones[current.gameState.config.player2uid]]
                    .emit("match-left")
            } else {
                io.sockets.connected[Conexiones[current.gameState.config.player1uid]]
                    .emit("match-left")
            }
        })

        socket.on("new-connection", (uid) => {
            console.log("idSocket: " + socket.id + " uid: " + uid)
            Conexiones[uid] = socket.id
            io.sockets.connected[socket.id].emit("message", { type: 'new-message', text: "su uid es: " + uid });
            console.log(Conexiones)
        })

    });


}