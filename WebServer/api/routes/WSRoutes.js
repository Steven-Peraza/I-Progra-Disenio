'use strict';
module.exports = function(app) {
  var gameServer = require('../controllers/WSController');

  // todoList Routes
  app.route('/gameStatus')
  .get(gameServer.getAllGames)

};