const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'secret-folder');

function getFileStat(file) {
  return new Promise((res, rej) => {
    fs.lstat(path.join(directoryPath, file), (err, stat) => {
      if (err) {
        console.log(err);
        res(false);
      } else {
        res(stat);
      }
    });
  })
}

fs.readdir(directoryPath, function (err, files) {

    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(async file => {
      const fileStat = await getFileStat(file);

      if (fileStat && fileStat.isFile()) {
        const fileInfo = path.parse(file);
        console.log(`${fileInfo.name} - ${fileInfo.ext.substring(1)} - ${fileStat.size / 1024}kb`);
      };
    });
});




// 1. список файлов в папке
// 2. вывести шаблонную строку циклом
// 3.