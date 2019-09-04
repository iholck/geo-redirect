require('dotenv').config();
const http = require('http');
const rangeCheck = require('ip-range-check');
const fs = require('fs');
var addressJson = JSON.parse(fs.readFileSync('addressMap.json'));
const addressArray = Object.keys(addressJson);
const responseKey = process.env.RESPONSE_KEY || 'continent_code';


module.exports = {

    resolve_location: function (ip) {
        return new Promise((resolve) => {
            addressArray.forEach(function (item) {
                if (rangeCheck(ip, item)) {
                    resolve(addressJson[item]);

                }
            })
            http.get('http://api.ipapi.com/api/' + ip + '?access_key='+process.env.IPAPI_ACCESS_KEY, function (resp) {
                var body = ''
                resp.on('data', function (data) {
                    body += data;
                })
                resp.on('end', function () {
                    const result = JSON.parse(body)[responseKey];
                    resolve(result === null || typeof result === 'undefined' ? 'default' : result);
                });
            });


        });
    }
};
