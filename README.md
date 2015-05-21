# Simditor Checklist
[![Circle CI](https://circleci.com/gh/mycolorway/simditor-checklist.png?style=badge)](https://circleci.com/gh/mycolorway/simditor-checklist)

Simditor 的官方扩展，为工具栏添加一个 checklist 按钮，用于插入 checklist。

![Demo Gif](https://raw.githubusercontent.com/mycolorway/simditor-checklist/master/demo.gif)

## 如何使用

在 Simditor 的基础上额外引入 simditor-checklist 的脚本和样式

````
<link rel="stylesheet" type="text/css" href="/path/to/simditor-checklist.css" />
<script src="/path/to/simditor-checklist.js"></script>
````

在初始化 simditor 的时候，在 `toolbar` 选项中加入 `checklist` 即可，如：

````
var simditor = new Simditor({
  textarea: '#textarea',
  toolbar: ['checklist', 'strikethrough', 'ol', 'ul']
});

````
