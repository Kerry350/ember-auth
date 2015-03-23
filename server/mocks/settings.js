module.exports = function(app) {
  var express = require('express');
  var settingsRouter = express.Router();

  settingsRouter.get('/', function(req, res) {
    if (req.headers.authorization) {
      var token = req.headers.authorization.split('Token ')[1];
      if (token === 'NEW_TOKEN') {
        res.status(200).send({settings: []});
      } else {
        res.status(401).send();
      }
    } else {
      res.status(401).send();
    }
  });

  app.use('/api/settings', settingsRouter);
};
