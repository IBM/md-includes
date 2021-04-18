# md-includes

A command-line interface or module for handling includes in markdown files. Markdown parsers don't add support for includes, but this project provides support for includes in markdown files without any other processing. This allows you to use your favorite markdown parsers after running md-includes to handle the includes in the markdown files.

## Install

``` bash
npm install -g md-includes
```

Depending on your setup you may need to put sudo in front of the command above to install it globally. 

## Usage

```bash
md-includes <sourceDirectory> --output=<outputDirectory> [OPTIONS]
```

### Required Arguments
```
<sourceDirectory>
	The path of the directory containing source Markdown files.
	
--output
	The path of the directory to write generated files to.
```

### Options
```
--includeDir
	The path of the directory where additional include files should be looked for. The source directory will always be looked at.
```

## Example
```
md-includes tests/simpleinclude --output=output
```