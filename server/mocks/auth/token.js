module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var authTokenRouter = express.Router();

  authTokenRouter.post('/', function(req, res) {
    if (req.body.refreshToken && (req.body.refreshToken === 'REFRESH_TOKEN' || req.body.refreshToken === 'NEW_REFRESH_TOKEN')) {
      res.status(201).send({
        token: 'NEW_TOKEN',
        refreshToken: 'NEW_REFRESH_TOKEN'
      });
    } else {
      res.status(201).send({
        token: 'TOKEN',
        refreshToken: 'REFRESH_TOKEN'
      });
    }
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/auth/token', authTokenRouter);
};
