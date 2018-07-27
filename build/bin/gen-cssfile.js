var fs = require('fs');
var path = require('path');
var Components = require('../../components.json'); // 引入所有组件
var themes = ['theme-chalk'];
Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../packages/'); // 定义组件根目录

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

// 循环主题
themes.forEach(theme => {
  var isSCSS = theme !== 'theme-default'; // true  如果不是默认主题
  var indexContent = isSCSS
    ? '@import "./base.scss";\n'
    : '@import "./base.css";\n'; // 引入scss

  // 循环组件
  Components.forEach(function(key) {
    // 如果有'icon', 'option', 'option-group'组件 就退出
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;

    var fileName = key + (isSCSS ? '.scss' : '.css');
    // 引用各组件的scc或者css
    indexContent += '@import "./' + fileName + '";\n';
    var filePath = path.resolve(basepath, theme, 'src', fileName);

    // 创建css文件
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
    }
  });
  // 创建index.scss组件并引用各组件的css
  fs.writeFileSync(
    path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'),
    indexContent
  );
});
