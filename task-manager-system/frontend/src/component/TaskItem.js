import React from "react";

export default function TaskItem({ task, onShow, onEdit }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "80%",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div style={{ flex: 6, marginRight: "10px" }}>
        <strong>{task.title}</strong>
      </div>
      <button
        onClick={() => onShow(task)}
        style={{ flex: 1, marginRight: "10px" }}
      >
        查看任务
      </button>
      <button onClick={() => onEdit(task)} style={{ flex: 1 }}>
        编辑任务
      </button>
    </div>
  );
}
