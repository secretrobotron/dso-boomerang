const fs = require('fs');

fs.readdir('media/', (err, files) => {
  var jsonData = [];
  files.forEach(file => {
    if (file.lastIndexOf('.gif') > -1 && file.lastIndexOf('.gif') === file.length - 4) {
      jsonData.push({
        src: 'media/' + file,
        x: 0,
        y: 0
      });
    }
  });
  fs.writeFile('images.json', JSON.stringify(jsonData, true, 2), function(err) {
    if (err) {
      console.error(err);
    }
  });
})