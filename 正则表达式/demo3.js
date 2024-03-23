var str = "babu baku kabu kaku";
var regex = /(b)a(.)u/g;

console.log("-------String.matchAll()-------");
var matches = str.matchAll(regex);
for (const match of matches) {
  console.log(match);
}
console.log("regex.lastIndex =", regex.lastIndex);

console.log("-------RegExp.exec()-------");
// regex = /(b)a(.)u/;
console.log(regex.exec(str));
console.log("regex.lastIndex =", regex.lastIndex);
console.log(regex.exec(str));
console.log("regex.lastIndex =", regex.lastIndex);

console.log("-------String.matchAll()-------");
regex.lastIndex = 4;
console.log("预设 regex.lastIndex = 4");
var matches = str.matchAll(regex);
for (const match of matches) {
  console.log(match);
}
console.log("regex.lastIndex =", regex.lastIndex);
