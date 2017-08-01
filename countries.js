/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsenv = require("@sap/xsenv");
var services = xsenv.getServices({ hana:"hana" });

$.response.setBody("Using HANA " + services.hana.host + ":" + services.hana.port);
