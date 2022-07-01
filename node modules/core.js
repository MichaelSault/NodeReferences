const path = require("path");
const util = require("util");
const {getHeapStatistics} = require("v8");

util.log(getHeapStatistics());

util.log(" ^ The name of the current file");