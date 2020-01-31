var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

var stream = fs.createWriteStream("webcomponent.js");
readFiles('components/', function(filename, content) {
    stream.write("\r\n");
    stream.write("// <------------- Start "+filename+"------------>");
    stream.write("\r\n");
    stream.write(content);
    stream.write("\r\n");
    stream.write("// <------------- End "+filename+"------------>");
    stream.write("\r\n");
}, function(err) {
  throw err;
});
