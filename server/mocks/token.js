module.exports = function(app) {
  var express = require('express');
  var tokenRouter = express.Router();

  tokenRouter.post('/', function(req, res) {
    res.status(201).send({
      name: 'Kerry',
      access_token: 'TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      token_type: 'Bearer',
      expires_in: 120
    });
  });

  app.use('/api/token', tokenRouter);
};
