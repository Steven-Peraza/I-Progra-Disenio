'use strict';
module.exports = function(app) {
  var gameServer = require('../controllers/WSController');
  //var CONSTANTS = require('../CONSTANTS')
  // todoList Routes
  app.route('/gameStatus')
  .get(gameServer.getAllGames)

  app.route('/positionMarked')
  .post(gameServer.positionMarked)

};