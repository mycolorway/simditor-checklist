# Simditor Checkbox
[![Circle CI](https://circleci.com/gh/mycolorway/simditor-checkbox.png?style=badge)](https://circleci.com/gh/mycolorway/simditor-checkbox)

Simditor 的官方扩展，为工具栏添加一个 checkbox 按钮，用于插入 checkbox。

## 如何使用

在 Simditor 的基础上额外引入 simditor-checkbox 的脚本和样式

````
<link rel="stylesheet" type="text/css" href="/path/to/simditor-checkbox.css" />
<script src="/path/to/simditor-checkbox.js"></script>
````

在初始化 simditor 的时候，在 `toolbar` 选项中加入 `checkbox` 即可，如：

````
var simditor = new Simditor({
  textarea: '#textarea',
  toolbar: ['checkbox', 'title', 'bold', 'italic', 'underline', 'strikethrough', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', ]
});

````
