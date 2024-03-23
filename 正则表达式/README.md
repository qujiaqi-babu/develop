1.匹配富文本中的<h1>标签，并给该标签添加一个样式<h1 class="tag">

答：实现代码如下所示，用浏览器打开 demo1.html 点击按钮即可查看效果。

```js
function addTag() {
  var richText = document.getElementById("richText");
  var htmlContent = richText.innerHTML;
  // 给<h1>标签添加样式<h1 class="tag">
  var modifiedContent = htmlContent.replace(
    /<h1([^>]*)>/gi,
    '<h1 class="tag"$1>'
  );
  richText.innerHTML = modifiedContent;
}
```



2.将如下 sql 语句中的\$param.paramName 和\$global.\_ID 参数替换为 vicent 和 11

```js
let str =
  "select * from XXX where field_name1=$param.paramName and field_name2=$global._ID";
```

答：实现代码如下所示，用浏览器打开 demo2.html 点击按钮即可查看效果。

```js
function sqlReplace() {
  var dom = document.getElementById("sql");
  var sql = dom.innerHTML;
  // 替换 $param.paramName
  sql = sql.replace(/\$param\.paramName/g, "vicent");
  // 替换 $global._ID
  sql = sql.replace(/\$global\._ID/g, "11");
  dom.innerHTML = sql;
}
```



3.谈谈 RegExp.exec() 和 matchAll() 的区别

答：二者均用于 JavaScript 中进行正则表达式匹配，匹配成功时返回匹配到的字符串、捕获组、匹配到的字符串索引、输入字符串和groups。如果匹配失败，则返回 null 。二者区别在于

- **RegExp.exec()** 是 RegExp 对象的方法，在每次调用时，从 RegExp 对象的 lastIndex 指示的位置开始搜索并返回下一个匹配项。若正则表达式设置了全局标志（g），则同时更新 RegExp 对象的 lastIndex 属性以指示下一次匹配的开始位置。因此，在实现全局匹配时需要与循环结合并反复调用它，直到所有匹配都被遍历完。若正则表达式没有设置全局标志（~~g~~），则 RegExp 对象的 lastIndex 属性不会被更新。
- **matchAll()** 是字符串对象的方法，在字符串中执行全局匹配，也是从 lastIndex 指示的位置开始搜索，且必须为正则表达式设置全局标志，否则会报错。返回的是一个迭代器对象，可以通过迭代器循环遍历所有匹配项。该调用该方法不会改变RegExp 对象的 lastIndex 属性。

因此，RegExp.exec() 适合在需要手动控制匹配过程的情况下使用，而 matchAll() 则更适合在需要一次性获取所有匹配项并对其进行遍历处理的情况下使用。（测试用例可运行 node demo3.js 查看效果）
