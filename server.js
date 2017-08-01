/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var hdbext = require('@sap/hdbext');
var port  = process.env.PORT || 3000;
var services = xsenv.getServices({ hana: {tag: "hana"}});

var options = {
	anonymous : true, // remove to authenticate calls
	redirectUrl : "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);

var myClient = hdbext.middleware(services.hana);
myClient.db.exec("SELECT CURRENT_UTCTIMESTAMP FROM DUMMY", function (err, rows) {
	if (err) { 
		console.log("error when selecting"); 
	}
	console.log("Current HANA time (UTC): " + rows[0].CURRENT_UTCTIMESTAMP);
  });

console.log("Server listening on port %d", port);
console.log("Using HANA " + services.hana.host + ":" + services.hana.port);
