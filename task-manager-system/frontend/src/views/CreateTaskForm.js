import React, { useState } from "react";
import axios from "axios";

function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   axios.get("/user").then((response) => {
  //     setUser(response.data);
  //     alert(user._id);
  //   });
  // }, [user]);

  const handleSubmit = async (e) => {
    await axios
      .post("http://localhost:5000/taskcreate", {
        title,
        description,
        userId,
      })
      .then((response) => {
        alert(response.data);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data); // 捕获并设置错误消息
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>创建新的任务</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "10px" }}>
          任务标题：
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          任务描述：
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" style={{ margin: "10px" }}>
          创建任务
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </div>
  );
}

export default CreateTaskForm;
