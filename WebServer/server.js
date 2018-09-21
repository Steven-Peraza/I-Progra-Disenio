var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000

app.listen(port);
bodyParser = require('body-parser');
var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());

var routes = require('./api/routes/WSRoutes'); //importing route
routes(app); //register the route

var webSocket = require('./api/routes/webSocket')
webSocket()


console.log('Game API server started on: ' + port);
