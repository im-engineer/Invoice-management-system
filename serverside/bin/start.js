'use strict'
require('@babel/register');
require('@babel/polyfill');
const app = require('../app').default;
var http = require('http');
var server = http.createServer(app);
const config = require('../config').get('staging').port_no;
server.listen(config);
server.on("listening", () => {
    console.log(`successfully listening ${config}`);
});
