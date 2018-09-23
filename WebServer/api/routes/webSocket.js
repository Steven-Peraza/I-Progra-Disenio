'use strict';
module.exports = function(http){
//Dependencias
const io = require('socket.io')(http);
//Variables Globales 
var Conexiones = {}
var partidasPendientes = []
var partidasEnCurso = []


io.on('connection', (socket) => {

    console.log('user connected '+ socket.id);

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on("crear-partida",(nuevaPartida)=>{
        nuevaPartida.socketid = socket.id
        console.log(nuevaPartida)
        partidasPendientes.push(nuevaPartida)
    })

    socket.on("new-connection", (uid)=>{
        console.log("idSocket: "+socket.id + " uid: "+uid)
        Conexiones[uid]=socket.id
        io.sockets.connected[socket.id].emit("message",{type:'new-message',text:"su uid es: "+uid});
        console.log(Conexiones)
    })

});


}