'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
// 转化css抽象语法树
var classList = [];

// 遍历匹配正则，符合则传入到数组中
nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

// 导出 icon.json 文件
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList));
