console.log("utils.js被引入了");
//   alert("欢迎光临");
console.log("主页展示");

// 获取系统当前时间并展示
var time = new Date();
console.log(time);
var year, month, date, day;
year = time.getFullYear();
month = time.getMonth();
date = time.getDate();
const week = ["日", "一", "二", "三", "四", "五", "六", "七"];
day = week[time.getDay()];
document.getElementById("date").innerHTML = `${year}年${
  month + 1
}月${date}日，周${day}`;
// year + "年" + (month + 1) + "月" + date + "日，周" + day;

// 为列表中的每一项创建删除键
var myNodelist = document.getElementsByTagName("li");
for (let i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7"); // "×"
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// 为每个删除键绑定事件，点击后使其父节点不可见
var close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// 为列表添加事件监听器，点击目标为li标签则修改其class="checked"
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    // 获取的标记都以大写表示
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// 根据当前输入框的value创建相应列表项加入列表，并将输入框value置空
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
