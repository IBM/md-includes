# md-includes

This project is a command-line interface or module for handling includes in markdown files. Since markdown parsers don't add support for includes, this project was created to provide the tools to support includes in markdown files without any other processing. With these tools, you can use your favorite markdown parsers after you run `md-includes` to handle the includes in the markdown files.

## Install

Run the following command to install the tools globally:

``` bash
npm install -g md-includes
```

Depending on your setup, you might need to put sudo in front of the command to install it globally. For example, ` sudo npm install -g md-includes`

## Usage

Run the following command before you run the markdown parser to substitute includes:

```bash
md-includes <sourceDirectory> --output=<outputDirectory> [OPTIONS]
```

### Required arguments

```
<sourceDirectory>
	The path of the directory containing source markdown files.

--output
	The path of the directory to write generated files to.
```

### Options
```
--includeDir
	The path of the directory where additional include files should be looked for. The source directory will always be looked at.
```

## Example

The following command is an example of running `md-includes` with the required arguments:
```
md-includes tests/simpleinclude --output=output
```