'use strict';

var fs = require('fs');
var path = require('path');

// Constants
var includePattern = /^#include\s"(.+\/|\/|\w|-|\/)+\.(md|markdown)"/gm;
var includePatternFileStart = 10;
var frontMatterString = "---";
var frontMatterStringLength = 3;
var newLine = "\n";
var constantsPrefix = "{:";
var constantsEnd = "}";

function removeNewLinesAndMetadata(data) {
  if (data.startsWith(frontMatterString)) {
    return removeNewLinesAndMetadata(data.substring(data.indexOf(frontMatterString, frontMatterStringLength) + frontMatterStringLength));
  } else if (data.startsWith(newLine+newLine)) {
    return removeNewLinesAndMetadata(data.substring(2));
  } else if (data.startsWith(newLine)) {
    return removeNewLinesAndMetadata(data.substring(1));
  } else if (data.startsWith(constantsPrefix)) {
    return removeNewLinesAndMetadata(data.substring(data.indexOf(constantsEnd) + 1));
  }
  return data;
}

function replaceIncludeData(matches, fileData, dir, includeDir) {
  for (let i = 0; i < matches.length; i++) {
    var includeFileSuffix = "/" + matches[i].substring(includePatternFileStart, matches[i].length - 1);
    var includeFile = includeDir + includeFileSuffix;
    if (!fs.existsSync(includeFile)) {
       includeFile = dir + includeFileSuffix;
    }
    var includeData = fs.readFileSync(includeFile).toString();
    includeData = removeNewLinesAndMetadata(includeData);

    fileData = fileData.replace(matches[i], includeData);

    var recursiveMatches = includeData.match(includePattern);
    if (recursiveMatches && recursiveMatches.length > 0) {
      fileData = replaceIncludeData(recursiveMatches, fileData, dir, path.dirname(includeFile));
    } 
  }
  return fileData; 
}

function parseInclude(filePath, file, dir, output, includeDir) {
  var data = fs.readFileSync(filePath).toString();
  var matches = data.match(includePattern);
  if (matches && matches.length > 0) {
    data = replaceIncludeData(matches, data, dir, includeDir);
  }
  var fileOutName = output + '/' + file;
  fs.writeFileSync(fileOutName, data);
}

function readFiles(dir, output, files, includeDir) {
  files.forEach(file => {
    var filePath = dir + '/' + file;
    if (fs.lstatSync(filePath).isDirectory()) {
      var files = fs.readdirSync(filePath);
      var outputFolder = output + '/' + file;
      fs.mkdirSync(outputFolder);
      readFiles(filePath, outputFolder, files, includeDir + '/' + file)
    } else {
      parseInclude(filePath, file, dir, output, includeDir);
    }
  });
}

function mdIncludes(dir, output, options) {
  var includeDir = dir;
  if (options.includeDir) {
    includeDir = options.includeDir;
  }

  if (fs.existsSync(output)) {
    fs.rmdirSync(output, { recursive: true });
  }

  fs.mkdirSync(output);

  var files = fs.readdirSync(dir);
  readFiles(dir, output, files, includeDir);  

}

module.exports = mdIncludes;
