// html 注入 dll.js 文件
const fs = require('fs');

fs.readFile('./index.html', 'utf8', (err, data) => {
  if (!err) {
    var dataStr = data.toString(),
      timestamp = (new Date()).getTime();

    dataStr = dataStr
      .replace('bundle.js', 'bundle.js?v=' + timestamp)
      .replace('<!-- dll -->', '<script src="./dist/Dll.js?v=' + timestamp + '"></script>');

    fs.writeFile('./dist/index.html', dataStr, (error) => {
      if (!error) {
        console.log('HTML file copy successfully');
      } else {
        console.log(error);
      }
    });
  } else {
    console.log(err);
  }
});