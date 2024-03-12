import { useRoutes } from "react-router-dom";
import RegisterForm from "../views/RegisterForm";
import LoginForm from "../views/LoginForm";
import CreateTaskForm from "../views/CreateTaskForm";
import TaskList from "../views/TaskList";

const routes = [
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/create-task",
    element: <CreateTaskForm />,
  },
  {
    path: "/task-list",
    element: <TaskList />,
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
