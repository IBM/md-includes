const handleIncludes = require('./md-includes');

var fs = require('fs');

function compareFolderOutput(outputFolder, expectedOutputFolder) {
  var files = fs.readdirSync(expectedOutputFolder);
  files.forEach(file => {
    var fileExpectedPath = expectedOutputFolder + '/' + file;
    var fileOutputPath = outputFolder + '/' + file;
    if (fs.lstatSync(fileExpectedPath).isDirectory()) {
      compareFolderOutput(fileOutputPath, fileExpectedPath);
    } else {
      var expected = fs.readFileSync(fileExpectedPath).toString();
      var result = fs.readFileSync(fileOutputPath).toString();
      expect(result).toBe(expected);
    }
  });
}

test('test simpleinclude', () => {
  handleIncludes("tests/simpleinclude", "output", {});
  compareFolderOutput("output", "tests-expected-output/simpleinclude");
});

test('test simpleincludewithfrontmatter', () => {
  handleIncludes("tests/simpleincludewithfrontmatter", "output", {});
  compareFolderOutput("output", "tests-expected-output/simpleincludewithfrontmatter");
});

test('test simpleincludewithimage', () => {
  handleIncludes("tests/simpleincludewithimage", "output", {});
  compareFolderOutput("output", "tests-expected-output/simpleincludewithimage");
});

test('test multiincludes', () => {
  handleIncludes("tests/multiincludes", "output", {});
  compareFolderOutput("output", "tests-expected-output/multiincludes");
});

test('test recursiveincludes', () => {
  handleIncludes("tests/recursiveincludes", "output", {});
  compareFolderOutput("output", "tests-expected-output/recursiveincludes");
});

test('test simplesubfolderstest', () => {
  handleIncludes("tests/simplesubfolderstest", "output", {});
  compareFolderOutput("output", "tests-expected-output/simplesubfolderstest");
});

test('test complexsubfolderstest', () => {
  handleIncludes("tests/complexsubfolderstest", "output", {});
  compareFolderOutput("output", "tests-expected-output/complexsubfolderstest");
});

test('test separateincludefoldertest', () => {
  handleIncludes("tests/separateincludefoldertest", "output", { includeDir: "tests/exampleincludesfolder" });
  compareFolderOutput("output", "tests-expected-output/separateincludefoldertest");
});
