'use strict';
module.exports = function(){
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.send('Ejemplo de que se pueden hacer endpoints')
    io.emit('message', {type: 'message',text: "jagger"},{for:'everyone'})
})




io.on('connection', (socket) => {

    console.log('user connected '+ socket.id);

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        console.log(message)
        io.emit('message', { type: 'new-message', text: message });
    });

});



http.listen(5000, () => {
    console.log('Server started on port 5000');
});

}