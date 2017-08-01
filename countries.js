/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

/*var xsenv = require("@sap/xsenv");
var services = xsenv.getServices({ hana:"hana" });

$.response.setBody("Using HANA " + services.hana.host + ":" + services.hana.port); */

var express = require('express');
var app = express();

var hdbext = require('@sap/hdbext');

var xsenv = require('@sap/xsenv');
var services = xsenv.getServices({ hana:'myhana' });

app.use('/', hdbext.middleware(services.hana));


app.get('/', function (req, res, next) {
	req.db.exec('SELECT NAME FROM COUNTRY', function (err, rows) {
	if (err) { return next(err); }
	res.send('Country: ' + rows[0].NAME);
  });
});
