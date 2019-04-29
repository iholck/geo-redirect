
const express = require('express')
const resolve_location = require('./resolve_location');
const fs = require('fs');
const redirectPathMap = JSON.parse(fs.readFileSync('pathMap.json'));
const app = express();
const port = 8080;



  app.get(/.*/, (req, res) => {
    const ip = req.connection.remoteAddress;
    const path = req.originalUrl;
   // var ip = '192.168.20.10';
    console.log(`Ip: ${ip}, path ${path}`);
    resolve_location.resolve_location(ip)
      .then(response => {
        var host = redirectPathMap[response],
        host = host === null || typeof host === 'undefined' ? redirectPathMap['EU'] : host;
        console.log(`Ip: ${ip}, path: ${path}, host:${host}`);
        res.redirect(host+path);
      })
      .catch(error => {
        res.send(error);
      })
  })

  app.listen(port, () => console.log(`App listening on port ${port}!`));