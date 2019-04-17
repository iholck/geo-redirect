
const express = require('express')
const resolve_location = require('./resolve_location');
const fs = require('fs');
const redirectPathMap = JSON.parse(fs.readFileSync('pathMap.json'));
const app = express();
const port = 8080;



  app.get('/resolve', (req, res) => {
    var ip = req.connection.remoteAddress;
  //  var ip = '::1';
    console.log(`Ip: ${ip}`);
    resolve_location.resolve_location(ip)
      .then(response => {
        res.redirect(redirectPathMap[response]);
      })
      .catch(error => {
        res.send(error);
      })
  })

  app.listen(port, () => console.log(`App listening on port ${port}!`));