import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "../component/TaskItem.js";

const TaskStatus = {
  EDIT: "EDIT",
  SHOW: "SHOW",
  IDLE: "IDLE",
};

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(TaskStatus.IDLE);
  const [currtask, setCurrtask] = useState({});

  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(""); // 用于保存选中的状态

  const [errorMessage, setErrorMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post("http://localhost:5000/tasklist", {
          userId,
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [userId, tasks]);

  // 处理单选框变化
  const handleRadioChange = (event) => {
    setStatus(event.target.value);
  };

  // 调用任务编辑api
  const handleEdit = async (e) => {
    await axios
      .put("http://localhost:5000/tasks/taskId", {
        taskId,
        title,
        description,
        userId,
        status,
      })
      .then((response) => {
        alert(response.data.message);
        setCurrtask(response.data.task);
        setTaskStatus(TaskStatus.IDLE);
      })
      .catch((error) => {
        setErrorMessage(error.response.data); // 捕获并设置错误消息
      });
  };

  // 点击“查看任务”
  const onShow = (task) => {
    setTaskStatus(TaskStatus.SHOW);
    setCurrtask(task);
  };

  // 点击“编辑任务”
  const onEdit = (task) => {
    setTaskStatus(TaskStatus.EDIT);
    setTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  return (
    <>
      <div>
        <h2
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          任务列表
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task._id}
                task={task}
                onShow={onShow}
                onEdit={onEdit}
              />
            );
          })}
        </div>
      </div>
      {taskStatus === TaskStatus.EDIT && (
        <div>
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            任务编辑
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ width: "80%" }}>
              任务标题：
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </p>
            <p
              style={{
                display: "flex",
                width: "80%",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              任务描述：
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>
            <p style={{ width: "80%" }}>
              任务状态：
              <span>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Not Started"
                    checked={status === "Not Started"}
                    onChange={handleRadioChange}
                  />
                  Not Started
                </label>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="In Progress"
                    checked={status === "In Progress"}
                    onChange={handleRadioChange}
                  />
                  In Progress
                </label>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Completed"
                    checked={status === "Completed"}
                    onChange={handleRadioChange}
                  />
                  Completed
                </label>
              </span>
            </p>
            <form onSubmit={handleEdit}>
              <button type="submit">保存修改</button>
            </form>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
        </div>
      )}
      {taskStatus === TaskStatus.SHOW && (
        <div>
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            任务详情
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ width: "80%" }}>任务标题: {currtask.title}</p>
            <p style={{ width: "80%" }}>任务描述: {currtask.description}</p>
            <p style={{ width: "80%" }}>任务状态: {currtask.status}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;
