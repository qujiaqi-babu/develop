// import logo from './logo.svg';
import "./App.css";
// import Posts from "./components/Posts";

import { useState } from "react";

import { useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  function updateCount() {
    setCount(count + 1);
  }
  return <button onClick={updateCount}>Count is: {count}</button>;
}

function Post(prob) {
  return (
    <>
      <h4>{prob.key}</h4>
      <p>{prob.post}</p>
    </>
  );
}

function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);
  return posts.map((post) => <Post key={post.id} post={post} />);
}

function App() {
  return (
    <div className="App">
      <Counter />
      <PostList />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src="/Babu.svg" className="App-logo" alt="logo" />
        <h1>欢迎光临，儿砸！</h1>
        <p>
          巴布 Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <Posts /> */}
    </div>
  );
}

export default App;
