#!/usr/bin/env node

'use strict';

var ARG_OUTPUT_DIR = "--output";
var ARG_INCLUDE_DIR = "--include";

var sourceDir, outputDir, includeDir;

process.argv.forEach(function(arg) {
	if (arg.indexOf(ARG_OUTPUT_DIR) === 0 && arg.indexOf("=") !== -1) {
		outputDir = arg.substring(arg.indexOf("=") + 1);
	} else if (arg.indexOf(ARG_INCLUDE_DIR) === 0 && arg.indexOf("=") !== -1) {
		includeDir = arg.substring(arg.indexOf("=") + 1);;
	} else if (arg.indexOf("-") !== 0) {
		sourceDir = arg;
	} 
});

if (!sourceDir || !outputDir) {
  outputHelp();
  return;
} else {
  const mdIncludes = require('./md-includes');

  var options = {
    includeDir: includeDir
  };

  mdIncludes(sourceDir, outputDir, options);
}

function outputHelp() {
  console.log("\nUsage:\n\tmd-includes <sourceDirectory> " + ARG_OUTPUT_DIR + "=<outputDirectory> [OPTIONS]");
	console.log("\nRequired Arguments:\n");
	console.log("<sourceDirectory>");
	console.log("\tThe path of the directory containing source Markdown files");
  	console.log(ARG_OUTPUT_DIR + "=<outputDirectory>");
  	console.log("\tThe path of the directory to write generated files to");
  	console.log("\nOptions:\n");
	console.log(ARG_INCLUDE_DIR);
	console.log("\tThe path of the directory where additional include files should be looked for");
}