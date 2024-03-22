import {
  Input,
  Button,
  View,
  Picker,
  Checkbox,
  Text,
} from "@tarojs/components";
import React, { useState, useRef } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import "./todolist.css";

export default () => {
  const isWeapp = process.env.TARO_ENV === "weapp"; // 判断是否为小程序端
  const [toDoInput, setToDoInput] = useState(""); // 输入框状态
  const [toDoList, setToDoList] = useState([]); // 待办列表状态
  // ref对象只有current属性 利用元素的ref属性 把ref对象绑定在DOM元素上以通过.current获取DOM元素
  const $InputRef = useRef();

  // 分享给好友
  const onShare = () => {
    if (isWeapp) {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  };

  // 获取系统当前日期
  const getToday = () => {
    var time = new Date();
    var year, month, date, day;
    year = time.getFullYear();
    month = time.getMonth();
    date = time.getDate();
    const week = ["日", "一", "二", "三", "四", "五", "六", "七"];
    day = week[time.getDay()];
    return `${year}年${month + 1}月${date}日，周${day}`;
  };

  const today = getToday();

  useLoad(() => {
    // 读取本地存储，更新toDoList
    setToDoList(Taro.getStorageSync("todo") || []);
  });

  // 新待办项
  const createToDo = (text) => {
    return {
      text,
      checked: false,
      priority: 0,
    };
  };

  // 更新输入框状态
  const onInputChange = (e) => {
    setToDoInput(e.target.value);
  };

  // 添加待办项
  const onAddToDo = () => {
    const targetValue = $InputRef.current?.value;
    // 拦截已添加备忘录事项
    if (toDoList.find((toDoItem) => toDoItem.text === targetValue)) {
      return Taro.showToast({ title: "已经添加过啦！", icon: "none" });
    }
    // 拦截空的备忘录事项
    if (targetValue === "") {
      return Taro.showToast({ title: "请输入待办事项！", icon: "none" });
    }
    // 更新列表
    const newToDoList = [...toDoList, createToDo(targetValue)];
    setToDoList(newToDoList);
    Taro.setStorageSync("todo", newToDoList);
    // 清空输入框
    setToDoInput("");
  };

  // 删除待办项
  const onDelToDo = (key) => {
    toDoList.splice(key, 1);
    setToDoList([...toDoList]);
    Taro.setStorageSync("todo", toDoList);
  };

  // 勾选或取消勾选待办项
  const onChecked = (key) => {
    toDoList[key].checked = !toDoList[key].checked;
    setToDoList([...toDoList]);
    Taro.setStorageSync("todo", toDoList);
  };

  const valueToText = ["不紧急", "一般", "紧急", "非常紧急"];

  // 修改待办项优先级
  const onPriorityChange = (value, key) => {
    const newToDoList = [...toDoList];
    newToDoList[key].priority = Number(value);

    // 对toDoList重新排序
    newToDoList.sort((a, b) => {
      return b.priority - a.priority;
    });

    setToDoList(newToDoList);
    Taro.setStorageSync("todo", newToDoList);
  };

  // 根据待办项优先级改变背景色
  const getBackgroundColor = (priority) => {
    switch (priority) {
      case 0:
        return "#90ee90";
      case 1:
        return "#ffffe0";
      case 2:
        return "#ffa07a";
      case 3:
        return "#f08080";
      default:
        return "white";
    }
  };

  // 根据待办项完成状态改变当前项文字样式
  const getTextDecoration = (checked) => {
    switch (checked) {
      case false:
        return { textDecoration: "none", backgroundColor: "#eee" };
      case true:
        return { textDecoration: "line-through", backgroundColor: "#aaa" };
    }
  };

  return (
    <View>
      <View className="todo-title">
        <View style={{ fontSize: "20px", marginBottom: "5px" }}>
          巴布的备忘录
        </View>
        <View style={{ fontSize: "16px", marginBottom: "5px" }}>{today}</View>

        <View className="input-box">
          <Input
            className="todo-input"
            ref={$InputRef}
            placeholder="输入待办事项"
            value={toDoInput}
            onInput={onInputChange}
          />
          <View className="add-btn" onClick={onAddToDo}>
            Add
          </View>
        </View>
      </View>

      <View className="todo-container">
        {toDoList.map((todo, key) => {
          return (
            <View
              key={key}
              className="todo-item"
              style={{
                ...getTextDecoration(todo.checked),
              }}
            >
              <Picker
                className="todo-priority"
                mode="selector"
                range={valueToText}
                onChange={(e) => onPriorityChange(e.detail.value, key)}
                style={{ backgroundColor: getBackgroundColor(todo.priority) }}
              >
                <View>{valueToText[todo.priority]}</View>
              </Picker>
              <View
                checked={todo.checked}
                onClick={() => {
                  onChecked(key);
                }}
                style={{
                  flex: 1,
                }}
              >
                <Checkbox checked={todo.checked} />
                <Text
                  style={{
                    margin: "0px 20px",
                  }}
                >
                  {todo.text}
                </Text>
              </View>
              <View
                className="delete-btn"
                onClick={() => {
                  onDelToDo(key);
                }}
              >
                {"\u00D7"}
              </View>
            </View>
          );
        })}
      </View>
      {isWeapp && <Button onClick={onShare}>转发给好友</Button>}
    </View>
  );
};
